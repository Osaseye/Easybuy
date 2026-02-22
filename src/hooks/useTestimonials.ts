import { useState, useEffect } from 'react';
import type { Testimonial } from '../types';
import { mockTestimonials } from '../data/mockData';

export const useTestimonials = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 800));
            setTestimonials(mockTestimonials); // Correctly typed
            setLoading(false);
        };
        fetchTestimonials();
    }, []);

    return { testimonials, loading };
};
