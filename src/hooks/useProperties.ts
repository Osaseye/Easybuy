import { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, query, orderBy, limit, startAfter } from 'firebase/firestore';
import type { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Property } from '../types';

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const propertiesRef = collection(db, 'properties');
      const q = query(
          propertiesRef, 
          orderBy('createdAt', 'desc'),
          limit(20)
      );
      const querySnapshot = await getDocs(q);
      
      const fetchedProperties: Property[] = [];
      querySnapshot.forEach((doc) => {
        fetchedProperties.push({ id: doc.id, ...doc.data() } as Property);
      });
      
      setProperties(fetchedProperties);
      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1] || null);
      setHasMore(querySnapshot.docs.length === 20);
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError('Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchMore = useCallback(async () => {
    if (!lastDoc || !hasMore || loading) return;

    try {
      setLoading(true);
      const propertiesRef = collection(db, 'properties');
      const nextQ = query(
          propertiesRef,
          orderBy('createdAt', 'desc'),
          startAfter(lastDoc),
          limit(20)
      );

      const querySnapshot = await getDocs(nextQ);
      
      const newProperties: Property[] = [];
      querySnapshot.forEach((doc) => {
        newProperties.push({ id: doc.id, ...doc.data() } as Property);
      });

      setProperties(prev => [...prev, ...newProperties]);
      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1] || null);
      setHasMore(querySnapshot.docs.length === 20);
    } catch (err) {
       console.error("Error fetching more properties:", err);
       setError('Failed to fetch properties');
    } finally {
       setLoading(false);
    }
  }, [lastDoc, hasMore, loading]);

  return { properties, loading, error, fetchMore, hasMore };
};
