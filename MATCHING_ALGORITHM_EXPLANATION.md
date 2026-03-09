# EasyBuy Property Matching Algorithm

## Overview
The EasyBuy matching algorithm is currently implemented as a **Weighted Scoring System**. It evaluates all currently available properties against the specific preferences configured by a buyer during their onboarding phase (or later via settings). Each property is assigned a point value based on how strongly its attributes align with the buyer's needs.

The logic resides in the front-end dashboard component (`src/pages/buyer/BuyerDashboard.tsx`). 

## How It Works

When a buyer logs in and views their dashboard, the system fetches active properties and the buyer's saved preferences profile. The algorithm processes each property through a grading function:

### 1. Scoring Weights
The system applies the following heuristic weights to determine relevance:

- **Location Match (+10 points)**: *Highest Priority*
  - The algorithm runs a case-insensitive validation between the buyer's `preferredLocation` and the property's `city`. 
  - If a match is found (e.g., "Lekki" matches a property located in "Lekki Phase 1"), the property gains 10 points.

- **Budget Match (+5 points)**: *Medium Priority*
  - The system checks if the property's `price` is less than or equal to the buyer's max `budget`.
  - Properties within the budget afford the listing an extra 5 points.

- **Property Type Match (+5 points)**: *Medium Priority*
  - The system checks if the listing's `propertyType` (e.g., "Apartment", "Duplex") is included in the buyer's array of acceptable `propertyTypes`.
  - Matching types gain 5 points.

- **Bedrooms Match (+3 points)**: *Lower Priority*
  - The algorithm checks if the listing's `bedrooms` count is greater than or equal to the minimum bedrooms the buyer requested. (A 3-bedroom property satisfies a requirement for a 2-bedroom property).
  - Valid bedroom counts yield 3 points.

- **Tie-Breaker Variance (0 to 0.99 points)**
  - To prevent sorting stagnation when multiple properties share the exact same score (e.g., two identical apartments in the same city), the algorithm adds `Math.random()` to the total score. This randomly distributes properties with identical absolute scores.

### 2. Filtering Thresholds
Once a score is calculated for every available property:
- **Pruning**: The algorithm filters out any property with a score `< 1`. Because the random tie-breaker adds a fractional amount (0.01 - 0.99), any property with a score strictly below 1 means **zero actual preferences matched**. These are eliminated from the recommendation pool.

### 3. Sorting & Truncation
- The resulting list is sorted in descending order (from highest score to lowest).
- The system takes the top 5 highest-scoring properties (`.slice(0, 5)`) and dynamically surfaces them in the "Recommended for You" section of the Buyer Dashboard.

---

## Future Scaling Considerations 

As the property database grows, executing this algorithm on the client UI will become less efficient. To scale this system securely and performantly, it is recommended to eventually adopt the following:

1. **Backend Indexing**: Move the scoring algorithm to a Firebase Cloud Function or an indexing service like **Algolia** or **Meilisearch** to offload computation from the user's browser.
2. **Geospatial Distance Matching**: Swap string-based location matching ("Lekki") for geospatial bounding boxes using coordinates (e.g., matching properties within a 10km radius of the user's preferred map pin).
3. **Behavioral Analytics**: Add tracking points for properties the buyer "saves" or "views repeatedly", dynamically adding weight to similar listings.