import { useState, useEffect } from 'react';
import type { User } from '../types';
import { mockUser } from '../data/mockData';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchUser = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setUser(mockUser as User);
      setLoading(false);
    };

    fetchUser();
  }, []);

  return { user, loading };
};
