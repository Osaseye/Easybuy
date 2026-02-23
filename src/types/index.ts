export interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'landlord' | 'admin';
  avatar?: string;
}

export interface Property {
  id: string;
  title: string;
  location: string;
  city?: string;
  state?: string;
  price: number;
  currency: string;
  period?: 'year' | 'month'; // for rent
  type: 'sale' | 'rent';
  propertyType?: string;
  status: 'active' | 'pending' | 'sold' | 'draft';
  bedrooms: number;
  bathrooms: number;
  size?: number; // in  
  sizeUnit?: string;
  description?: string;
  images: string[];
  features?: string[];
  amenities?: string[];
  ownerId?: string;
  createdAt: string;
  views?: number;
  saves?: number;
  inquiries?: number;
  matchScore?: number; // for buyer recommendations
}

export const Property = {};

export interface Testimonial {
  id: string;
  content: string;
  author: string;
  role: string;
  image: string;
  rating: number;
}

export interface DashboardStat {
  label: string;
  value: string | number;
  trend: string;
  icon: string;
  color: string;
  bg: string;
}

export interface DashboardStats {
  // This was the old one, but I'll keeping it might not be needed if I use DashboardStat[]
  totalListings?: number;
}
