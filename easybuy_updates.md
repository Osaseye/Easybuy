# EasyBuy — Bug Fixes & Architecture Updates

This document is a structured task list for Copilot. Each issue includes the affected file(s), the exact problem, and the required fix. Work through them in order — the Critical bugs first, then Architecture, then Minor.

---

## SECTION 1 — CRITICAL BUGS

---

### BUG-01: Recommendation Engine — Location Match Never Fires

**Files:** `src/pages/buyer/BuyerDashboard.tsx`, `src/pages/buyer/BuyerOnboarding.tsx`

**Problem:**
During onboarding, `data.location` is set from the Leaflet reverse geocode result, which returns a full address string like `"15 Admiralty Way, Lekki Phase 1, Lagos Island, Lagos, Nigeria"`. This full string is stored as `preferences.preferredLocation`. In the dashboard, the match check is:

```ts
if (prop.city?.toLowerCase().includes(prefLoc))
```

This checks if the **property's short city field** (e.g. `"Lekki"`) contains the **long address string** — which is always false. The strings need to be flipped, and the preference should store just the city/neighborhood, not the full address.

**Fix:**
1. In `BuyerOnboarding.tsx` step 2, when the user types in the location input or clicks the map, extract just the city/neighborhood. If using reverse geocode data, store `data.address?.city || data.address?.town || data.address?.county` as `preferredLocation`, not `data.display_name`.
2. In `BuyerDashboard.tsx`, change the location match logic to:
```ts
const prefLoc = prefs.preferredLocation?.toLowerCase() || '';
const propCity = prop.city?.toLowerCase() || '';
const propState = prop.state?.toLowerCase() || '';
if (propCity.includes(prefLoc) || propState.includes(prefLoc) || prefLoc.includes(propCity)) {
    score += 50;
}
```

---

### BUG-02: Recommendation Engine — Budget Has No Hard Ceiling, Wrong Scale

**File:** `src/pages/buyer/BuyerDashboard.tsx`

**Problem:**
The budget scoring uses `-20` as a penalty for over-budget properties, but location alone scores `+50`. A property costing 10x the user's budget in their preferred city still scores `50 - 20 = 30`, passing the `> 20` threshold and appearing in recommendations. Additionally, rent prices and sale prices are compared against the same budget field with no distinction.

**Fix:**
Add a hard pre-filter before scoring that excludes properties where `prop.price > maxBudget * 1.5`. Also add a `type` filter: if the user has a rent budget (set during onboarding as a yearly figure), only score properties with `prop.type === 'rent'`, and vice versa. Update the onboarding step 2 to also save the user's intent (`rent` or `buy`) alongside the budget.

```ts
// Add this BEFORE the scoring map:
const hardFiltered = fetchedProperties.filter(prop => {
    if (!prefs.budget) return true;
    const maxBudget = Number(prefs.budget);
    return prop.price <= maxBudget * 1.5;
});

// Then score hardFiltered instead of fetchedProperties
```

---

### BUG-03: Recommendation Engine — Threshold Passes Zero-Match Properties

**File:** `src/pages/buyer/BuyerDashboard.tsx`

**Problem:**
The filter `score > 20` is meant to exclude zero-preference-match properties, but the `Math.random()` tie-breaker adds up to `0.99`, which doesn't change the outcome since the lowest real score from one match is `+15`. The actual risk is the budget penalty (`-20`) causing a multi-match property to score `0` (e.g. location +50, budget -20 = 30 but type mismatch means 30 - 20 could happen in other combinations). The threshold logic is fragile.

**Fix:**
Replace the numeric threshold with an explicit count of matched criteria:

```ts
const scoredProperties = fetchedProperties.map(prop => {
    let score = 0;
    let matchCount = 0;

    if (/* location match */) { score += 50; matchCount++; }
    if (/* budget match */)   { score += 30; matchCount++; }
    if (/* type match */)     { score += 20; matchCount++; }
    if (/* bedroom match */)  { score += 15; matchCount++; }

    score += Math.random(); // tie-breaker only
    return { ...prop, score, matchCount };
});

// Require at least 1 real preference match
const recommendations = scoredProperties
    .filter(p => p.matchCount >= 1)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
```

---

### BUG-04: Dual `useAuth` Hook — Silent Mock Data Risk

**Files:** `src/hooks/useAuth.ts`, `src/contexts/AuthContext.tsx`

**Problem:**
There are two `useAuth` exports in the project. `src/hooks/useAuth.ts` returns stale mock data `{ user, loading }`. `src/contexts/AuthContext.tsx` exports the real one `{ currentUser, firebaseUser, loading, logout }`. Any component that accidentally imports from the wrong path silently gets mock data with no TypeScript error because the return shape is different but both are valid objects.

**Fix:**
Delete `src/hooks/useAuth.ts` entirely. It is not imported anywhere in the current codebase (all components correctly import from `../../contexts/AuthContext`), but its presence is a landmine. Also add a barrel export or path alias to make the correct import path unambiguous.

---

### BUG-05: Post-Login Redirect Ignores Saved `from` Location

**Files:** `src/components/common/ProtectedRoute.tsx`, `src/pages/auth/Login.tsx`

**Problem:**
`ProtectedRoute` correctly saves the attempted URL:
```ts
return <Navigate to="/login" state={{ from: location }} replace />;
```
But `Login.tsx` after successful login always navigates to a hardcoded path:
```ts
if (userData.role === 'buyer') navigate('/dashboard');
else if (userData.role === 'landlord') navigate('/landlord/dashboard');
```
It never reads `location.state?.from`. If a user is on `/property/abc123`, gets logged out, tries to visit that URL, logs back in — they land on the generic dashboard instead of the property page they wanted.

**Fix:**
In `Login.tsx`, read the saved location and use it:
```ts
import { useLocation } from 'react-router-dom';

const location = useLocation();
const from = (location.state as any)?.from?.pathname;

// After successful login:
if (userData.role === 'buyer') {
    navigate(from || '/dashboard', { replace: true });
} else if (userData.role === 'landlord') {
    navigate(from || '/landlord/dashboard', { replace: true });
}
```

---

### BUG-06: `SavedProperties` Page Is Non-Functional

**Files:** `src/pages/buyer/SavedProperties.tsx`, `src/hooks/useData.ts`

**Problem:**
`useSavedProperties()` returns `mockSavedProperties` (4 hardcoded mock items), but the component renders a hardcoded `"0 saved properties"` count and immediately shows the empty state — the mock data is fetched but never displayed. There is also no Firestore query to fetch real saved properties. The `firestore.rules` already has a `savedProperties` collection defined, but no write logic exists anywhere to save properties.

**Fix (two parts):**

**Part A — Display mock data correctly while backend is pending:**
Replace the hardcoded count and add the property cards grid before the empty-state check. The empty state should only render when `savedProperties.length === 0`.

**Part B — Wire up real Firestore saved properties:**
1. In `PropertyDetails.tsx`, implement the "Save this Property" button:
```ts
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const handleSave = async () => {
    if (!currentUser) return;
    await setDoc(doc(db, 'savedProperties', `${currentUser.uid}_${property.id}`), {
        userId: currentUser.uid,
        propertyId: property.id,
        savedAt: serverTimestamp(),
    });
    toast.success('Property saved!');
};
```
2. Replace `useSavedProperties` in `SavedProperties.tsx` with a real Firestore query:
```ts
const q = query(
    collection(db, 'savedProperties'),
    where('userId', '==', currentUser.uid)
);
```
Then fetch the property documents for each saved ID.

---

### BUG-07: Property Deletion Does Not Clean Up Storage

**File:** `src/pages/landlord/MyListings.tsx`

**Problem:**
`handleDelete` only calls `deleteDoc()` on the Firestore document. The property's images remain in Firebase Storage indefinitely, accruing cost.

**Fix:**
Before deleting the Firestore document, fetch the property's `images` array and delete each file from Storage:

```ts
import { ref, deleteObject } from 'firebase/storage';

const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this listing and all its photos?')) return;
    try {
        // 1. Fetch the property to get image URLs
        const propDoc = await getDoc(doc(db, 'properties', id));
        const images: string[] = propDoc.data()?.images || [];

        // 2. Delete each image from Storage
        await Promise.all(
            images.map(url => {
                const imageRef = ref(storage, url);
                return deleteObject(imageRef).catch(() => {}); // ignore if already gone
            })
        );

        // 3. Delete Firestore document
        await deleteDoc(doc(db, 'properties', id));
        setListings(prev => prev.filter(l => l.id !== id));
        toast.success('Listing deleted successfully');
    } catch (error) {
        toast.error('Failed to delete listing');
    }
};
```

---

### BUG-08: Property Photos Stored by Landlord UID, Not Property ID

**File:** `src/pages/landlord/UploadProperty.tsx`

**Problem:**
```ts
const photoRef = ref(storage, `properties/${currentUser.uid}/${fileName}`);
```
All photos from all of a landlord's properties share one flat directory. When a property is deleted you cannot tell which images belong to it, making targeted cleanup impossible.

**Fix:**
Generate the Firestore document reference *before* uploading so the property ID is known:

```ts
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';

// In onFinalSubmit, replace addDoc with:
const newPropertyRef = doc(collection(db, 'properties'));
const propertyId = newPropertyRef.id;

// Upload photos to the property-specific path:
const photoRef = ref(storage, `properties/${propertyId}/${fileName}`);

// Then save with setDoc instead of addDoc:
await setDoc(newPropertyRef, {
    ...step1Data,
    images: uploadedUrls,
    landlordId: currentUser.uid,
    status,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    amenities: ['Parking', 'Water Supply', 'Security'],
});
```

---

## SECTION 2 — ARCHITECTURE ISSUES

---

### ARCH-01: Move Recommendation Logic Out of UI Component

**File:** `src/pages/buyer/BuyerDashboard.tsx`

**Problem:**
The scoring engine is embedded inside a `useEffect` in a page component. It cannot be unit tested, re-runs on every `currentUser` change, and will degrade as the property count grows.

**Fix:**
Extract into a dedicated hook `src/hooks/useRecommendations.ts`:

```ts
// src/hooks/useRecommendations.ts
import { useMemo } from 'react';
import type { AppUser } from '../contexts/AuthContext';

export function useRecommendations(properties: Property[], currentUser: AppUser | null) {
    return useMemo(() => {
        const prefs = (currentUser as any)?.preferences;
        if (!prefs || properties.length === 0) return [];

        // ... scoring logic here ...

        return scored
            .filter(p => p.matchCount >= 1)
            .sort((a, b) => b.score - a.score)
            .slice(0, 5);
    }, [properties, currentUser]);
}
```

Then in `BuyerDashboard.tsx`:
```ts
const recommended = useRecommendations(properties, currentUser);
```

---

### ARCH-02: Add Pagination / `limit()` to All Firestore Property Queries

**Files:** `src/pages/buyer/BuyerDashboard.tsx`, `src/pages/buyer/Explore.tsx`, `src/hooks/useProperties.ts`

**Problem:**
Every property query fetches the entire collection with no limit. This will become slow and expensive as listings grow.

**Fix:**
Add `limit(50)` to all queries as an immediate stopgap, and implement cursor-based pagination for `Explore.tsx`:

```ts
import { query, collection, where, orderBy, limit, startAfter } from 'firebase/firestore';

// Initial load:
const q = query(
    collection(db, 'properties'),
    where('status', '==', 'available'),
    orderBy('createdAt', 'desc'),
    limit(20)
);

// Store the last document snapshot for "load more":
const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

// Next page:
const nextQ = query(
    collection(db, 'properties'),
    where('status', '==', 'available'),
    orderBy('createdAt', 'desc'),
    startAfter(lastDoc),
    limit(20)
);
```

---

### ARCH-03: Replace Firestore Role Reads in Security Rules with Custom Claims

**Files:** `firestore.rules`, `storage.rules`, `src/pages/auth/Register.tsx`

**Problem:**
`isLandlord()` in `firestore.rules` performs a Firestore document read on every write operation to check `users/{uid}.role`. This costs one read per security check and will add up. The Storage rules don't check role at all — any authenticated user can upload to `properties/`.

**Fix:**

**Step 1 — Set custom claims on registration** via a Firebase Cloud Function:

```ts
// functions/src/index.ts
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const setRoleClaim = functions.firestore
    .document('users/{userId}')
    .onCreate(async (snap, context) => {
        const { role } = snap.data();
        await admin.auth().setCustomUserClaims(context.params.userId, { role });
    });
```

**Step 2 — Update `firestore.rules`:**
```
function isLandlord() {
    return isAuthenticated() && request.auth.token.role == 'landlord';
}
```

**Step 3 — Update `storage.rules`:**
```
match /properties/{propertyId}/{allPaths=**} {
    allow read: if true;
    allow write: if request.auth.token.role == 'landlord'
                 && request.resource.size < 10 * 1024 * 1024
                 && request.resource.contentType.matches('image/.*');
}
```

**Step 4 — Force token refresh after registration** in `Register.tsx` so the claim is available immediately:
```ts
await firebaseUser.getIdToken(true); // force refresh after Firestore doc is created
```

---

### ARCH-04: Remove Fabricated Analytics from Landlord Dashboard

**File:** `src/pages/landlord/LandlordDashboard.tsx`

**Problem:**
```ts
const totalViews = totalPropertiesCount * 15;
const totalInquiries = totalPropertiesCount * 3;
```
These fake numbers are displayed in stat cards with no disclaimer. This is misleading.

**Fix (two options — choose one):**

**Option A (quick):** Replace with `"—"` and a tooltip until real tracking exists:
```ts
{ label: 'Total Views', value: '—', note: 'Coming soon' },
{ label: 'Total Inquiries', value: '—', note: 'Coming soon' },
```

**Option B (proper):** Add a `views` counter to each property document and increment it in `PropertyDetails.tsx` when a buyer views a property:
```ts
// In PropertyDetails.tsx, after fetching the property:
import { increment, updateDoc } from 'firebase/firestore';
await updateDoc(doc(db, 'properties', id), { views: increment(1) });
```
Then sum views across the landlord's properties in the dashboard query.

---

### ARCH-05: Remove or Replace the Wrong Backend Plan Document

**File:** `BACKEND_IMPLEMENTATION_PLAN.md`

**Problem:**
This document describes an entirely different app (Express/NestJS + PostgreSQL + Prisma). It references "EasyBuy" but the architecture is for a generic property API, not this Firebase-based project. It will confuse any developer (or Copilot) reading the repo.

**Fix:**
Delete `BACKEND_IMPLEMENTATION_PLAN.md` and replace it with a `FIREBASE_ARCHITECTURE.md` that documents the actual Firestore collections, Cloud Functions plan, and security model for this project.

---

### ARCH-06: Remove Dead Dependencies

**File:** `package.json`

**Changes needed:**

1. Move `vite-plugin-pwa` from `dependencies` to `devDependencies`:
```json
"devDependencies": {
    "vite-plugin-pwa": "^1.2.0",
    ...
}
```

2. Remove `intersection-observer` — it is deprecated and all supported browsers have native support:
```
npm uninstall intersection-observer
```
Also remove its import from any file that uses it (search for `import 'intersection-observer'`).

---

## SECTION 3 — MINOR / STUB FIXES

---

### MINOR-01: `ReviewModal` Submit Does Nothing

**File:** `src/components/common/ReviewModal.tsx`

**Problem:** The submit button only calls `console.log({ rating, feedback })`. No Firestore write, no toast confirmation to the user.

**Fix:**
```ts
// Replace the onClick handler:
onClick={async () => {
    if (rating === 0) { toast.error('Please select a rating'); return; }
    try {
        await addDoc(collection(db, 'reviews'), {
            landlordId: landlordId, // pass this as a prop
            rating,
            feedback,
            reviewerId: currentUser?.uid,
            createdAt: serverTimestamp(),
        });
        toast.success('Review submitted!');
        onClose();
    } catch {
        toast.error('Failed to submit review');
    }
}}
```

---

### MINOR-02: "Similar Homes" Section Is Permanently Empty

**File:** `src/pages/buyer/PropertyDetails.tsx`

**Problem:** The section always renders the empty state — no query is attempted.

**Fix:**
Add a Firestore query for properties with the same `propertyType` and `city`, excluding the current property:

```ts
const [similarProperties, setSimilarProperties] = useState<Property[]>([]);

useEffect(() => {
    if (!property) return;
    const q = query(
        collection(db, 'properties'),
        where('propertyType', '==', property.propertyType),
        where('city', '==', property.city),
        where('status', '==', 'available'),
        limit(3)
    );
    getDocs(q).then(snap => {
        const results = snap.docs
            .map(d => ({ id: d.id, ...d.data() }) as Property)
            .filter(p => p.id !== property.id);
        setSimilarProperties(results);
    });
}, [property]);
```

---

### MINOR-03: Nominatim Reverse Geocode Missing Required User-Agent

**Files:** `src/pages/buyer/BuyerOnboarding.tsx`, `src/pages/landlord/LandlordOnboarding.tsx`

**Problem:**
The Nominatim API Terms of Service require a valid `User-Agent` header identifying your application. Missing it can result in requests being blocked.

**Fix:**
Add the header to all `fetch` calls to Nominatim:
```ts
const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
    {
        headers: {
            'User-Agent': 'EasyBuy/1.0 (easybuy.ng; contact@easybuy.ng)',
        },
    }
);
```

---

### MINOR-04: Mock Data Hooks Must Be Labelled or Removed

**File:** `src/hooks/useData.ts`

**Problem:**
`useSavedProperties`, `useLandlordListings`, and `useDashboardStats` return hardcoded mock data but are used in real pages. There's no comment or flag indicating they're temporary.

**Fix:**
Add a `TODO` comment at the top of each mock hook and a console warning in development:

```ts
// TODO: Replace with real Firestore query — see BUG-06 in easybuy_updates.md
if (import.meta.env.DEV) {
    console.warn('[useData] Using mock data — not connected to Firestore');
}
```

Then prioritise replacing them with real queries as part of the BUG-06 fix.

---

## SUMMARY TABLE

| ID | Severity | File(s) | One-line description |
|---|---|---|---|
| BUG-01 | Critical | BuyerDashboard, BuyerOnboarding | Location match string comparison is inverted |
| BUG-02 | Critical | BuyerDashboard | No budget ceiling; rent/sale not distinguished |
| BUG-03 | Critical | BuyerDashboard | Scoring threshold is fragile; replace with matchCount |
| BUG-04 | Critical | hooks/useAuth.ts | Duplicate useAuth hook — delete the mock one |
| BUG-05 | Critical | Login.tsx, ProtectedRoute | Post-login redirect ignores saved `from` URL |
| BUG-06 | Critical | SavedProperties, useData | Page is non-functional; no Firestore save/fetch |
| BUG-07 | Critical | MyListings | Delete property leaves orphaned Storage images |
| BUG-08 | High | UploadProperty | Photos stored by UID not property ID |
| ARCH-01 | High | BuyerDashboard | Move scoring engine to dedicated hook |
| ARCH-02 | High | All property queries | Add limit() and pagination to all Firestore queries |
| ARCH-03 | High | firestore.rules, storage.rules | Replace role document reads with Custom Claims |
| ARCH-04 | Medium | LandlordDashboard | Remove fabricated view/inquiry numbers |
| ARCH-05 | Low | BACKEND_IMPLEMENTATION_PLAN.md | Wrong project — delete or replace |
| ARCH-06 | Low | package.json | Move PWA plugin to devDeps; remove dead polyfill |
| MINOR-01 | Low | ReviewModal | Submit button is a stub — wire up Firestore write |
| MINOR-02 | Low | PropertyDetails | Similar homes section always empty — add query |
| MINOR-03 | Low | Both Onboarding files | Nominatim requests missing required User-Agent header |
| MINOR-04 | Low | hooks/useData.ts | Label mock hooks with TODO warnings |
