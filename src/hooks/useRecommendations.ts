import { useMemo } from 'react';
import type { AppUser } from '../contexts/AuthContext';

export interface Property {
  id: string;
  title: string;
  price: number;
  city: string;
  state: string;
  propertyType: string;
  type?: 'rent' | 'sale';
  bedrooms: number;
  bathrooms: number;
  images: string[];
  status: string;
  score?: number;
  matchCount?: number;
  matchReasons?: string[];
}

export function useRecommendations(properties: Property[], currentUser: AppUser | null) {
    return useMemo(() => {
        const prefs = (currentUser as any)?.preferences;
        if (!prefs || properties.length === 0) return [];

        const maxBudget = prefs.budget ? Number(prefs.budget) : Infinity;

        // BUG-02: Hard Ceiling filter + Type filter
        const hardFiltered = properties.filter(prop => {
            if (prop.price > maxBudget * 1.5) return false;
            
            // Rent vs Buy Type check if intent is set
            if (prefs.intent) {
                const userWantsRent = prefs.intent === 'rent';
                // 'rent' vs 'sale'
                const isPropertyRent = prop.type === 'rent';
                const isPropertySale = prop.type === 'sale';
                
                if (userWantsRent && isPropertySale) return false;
                if (!userWantsRent && isPropertyRent) return false;
            }
            return true;
        });

        // BUG-01, BUG-02, BUG-03 Scoring
        const scoredProperties = hardFiltered.map(prop => {
            let score = 0;
            let matchCount = 0;
            let explanations: string[] = [];

            // 1. Location match
            if (prefs.preferredLocation) {
                const prefLoc = prefs.preferredLocation.toLowerCase();
                const propCity = prop.city?.toLowerCase() || '';
                const propState = prop.state?.toLowerCase() || '';
                
                // BUG-01: Correctly fixed logic
                if (propCity.includes(prefLoc) || propState.includes(prefLoc) || prefLoc.includes(propCity)) {
                    score += 50; 
                    matchCount++;
                    explanations.push('Location match');
                }
            }

            // 2. Budget calculation
            if (prefs.budget) {
                if (prop.price <= maxBudget) {
                    score += 30; // Within budget is great
                    matchCount++;
                    explanations.push('Within budget');
                } else if (prop.price <= maxBudget * 1.2) {
                    score += 10; // Slightly over budget (20%) is okay
                    // We don't increment matchCount here because it's technically over
                    explanations.push('Slightly over budget');
                } else {
                    score -= 20; // Over budget penalty
                }
            }

            // 3. Property type match
            if (prefs.propertyTypes && prefs.propertyTypes.length > 0) {
                if (prefs.propertyTypes.includes(prop.propertyType)) {
                    score += 20;
                    matchCount++;
                    explanations.push('Preferred type');
                }
            }

            // 4. Bedrooms match
            if (prefs.bedrooms) {
                const prefBeds = parseInt(prefs.bedrooms) || 0;
                if (prop.bedrooms === prefBeds) {
                    score += 15; // Exact match
                    matchCount++;
                } else if (prop.bedrooms > prefBeds) {
                    score += 10; // More bedrooms than needed
                }
            }
            
            // Add tiny random variance to break exact ties and make the feed dynamic
            score += Math.random();
            
            return { ...prop, score, matchCount, matchReasons: explanations };
        });

        // BUG-03: Require at least 1 real preference match
        const recommendations = scoredProperties
            .filter(p => p.matchCount >= 1)
            .sort((a, b) => b.score! - a.score!)
            .slice(0, 5);

        return recommendations;
    }, [properties, currentUser]);
}
