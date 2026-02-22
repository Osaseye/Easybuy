import { useState, useEffect } from 'react';
import { mockSavedProperties, mockProperties, mockDashboardStats } from '../data/mockData';
import type { Property, DashboardStat } from '../types';

export const useSavedProperties = () => {
    const [savedProperties, setSavedProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetch
        setTimeout(() => {
            setSavedProperties(mockSavedProperties as any);
            setLoading(false);
        }, 800);
    }, []);

    return { savedProperties, loading };
};

export const useLandlordListings = () => {
    const [listings, setListings] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        // Simulate fetch
        setTimeout(() => {
            setStats(mockDashboardStats as any);
            setLoading(false);
        }, 800);
    }, []);

    return { stats, loading };
}
