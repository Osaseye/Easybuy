import { useState, useEffect } from 'react';
import { mockSavedProperties, mockProperties, mockDashboardStats } from '../data/mockData';
import type { Property, DashboardStat } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const useSavedProperties = () => {
    const [savedProperties, setSavedProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchSaved = async () => {
            if (!currentUser) {
                setSavedProperties([]);
                setLoading(false);
                return;
            }
            try {
                const q = query(
                    collection(db, 'savedProperties'),
                    where('userId', '==', currentUser.uid)
                );
                const snapshot = await getDocs(q);
                
                const properties: Property[] = [];
                for (const docSnap of snapshot.docs) {
                    const data = docSnap.data();
                    const propRef = doc(db, 'properties', data.propertyId);
                    const propSnap = await getDoc(propRef);
                    if (propSnap.exists()) {
                        properties.push({ id: propSnap.id, ...propSnap.data() } as Property);
                    }
                }
                setSavedProperties(properties);
            } catch (error) {
                console.error("Error fetching saved properties:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSaved();
    }, [currentUser]);

    return { savedProperties, loading };
};

export const useLandlordListings = () => {
    const [listings, setListings] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    // TODO: Replace with real Firestore query
    if (import.meta.env.DEV) {
        console.warn('[useData] useLandlordListings: Using mock data — not connected to Firestore');
    }

    useEffect(() => {
        // Simulate fetch
        setTimeout(() => {
            setListings(mockProperties.slice(4, 7) as any);
            setLoading(false);
        }, 800);
    }, []);

    return { listings, setListings, loading };
};

export const useDashboardStats = () => {
    const [stats, setStats] = useState<DashboardStat[]>([]);
    const [loading, setLoading] = useState(true);

    // TODO: Replace with real Firestore query
    if (import.meta.env.DEV) {
        console.warn('[useData] useDashboardStats: Using mock data — not connected to Firestore');
    }

    useEffect(() => {
        // Simulate fetch
        setTimeout(() => {
            setStats(mockDashboardStats as any);
            setLoading(false);
        }, 800);
    }, []);

    return { stats, loading };
};
