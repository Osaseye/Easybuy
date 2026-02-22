// This file centralizes all dummy data to be replaced by API calls in backend integration.

export const mockUser = {
  id: '1',
  name: 'Chisom',
  email: 'chisom@example.com',
  role: 'buyer',
  avatar: '/avatars/default.png'
};

export const mockProperties = [
  {
    id: '1',
    title: 'Lekki Phase 1',
    location: 'Admiralty Way, Lagos',
    price: 85000000,
    currency: 'NGN',
    type: 'sale',
    status: 'active',
    bedrooms: 3,
    bathrooms: 4,
    size: 400,
    sizeUnit: 'sqm',
    images: ['/properties/property-1.jpg'],
    features: ['Best Match'],
    matchScore: 95
  },
  {
    id: '2',
    title: 'Luxury Villa Abuja',
    location: 'Maitama, Abuja',
    price: 150000000,
    currency: 'NGN',
    type: 'sale',
    status: 'active',
    bedrooms: 5,
    bathrooms: 6,
    size: 600,
    sizeUnit: 'sqm',
    images: ['/properties/property-2.jpg'],
    features: [],
    matchScore: 88
  },
  {
    id: '3',
    title: 'Modern 3-Bed Apartment',
    location: 'Wuse 2, Abuja',
    price: 4500000,
    currency: 'NGN',
    period: 'year',
    type: 'rent',
    status: 'active',
    bedrooms: 3,
    bathrooms: 4,
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuC-jY3GntlKDTKqpNABTnFTdNFJEk0yvxa1a17t9avR5NYVOYRQpQUIgcCL1EmBN4vBLPAxxi4xTK0oc40Q54ZDfCQ0p8TvwMJMYMU57czMGnNf-7ituwJK_7_aFz8eBizZki3a8a-yx9vYdpvfWBj6KYSJ7kXkMs-BLhoUohLRfOYLjPK9mYPyrJHxVt1nEJWAlnb8Yswn3pbnzB7z7loL1cfxfuwONzdmFCcnCsRceKwoRemLRcYhqOzA60PQf5D63u5S3Uf9ZZCZ'],
    features: ['24h Power']
  },
  {
    id: '4',
    title: 'Classic Bungalow',
    location: 'Bodija Estate, Ibadan',
    price: 35000000,
    currency: 'NGN',
    type: 'sale',
    status: 'active',
    bedrooms: 4,
    bathrooms: 0, 
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuA6bqL9m2-_kjAoOPu5I3WPy2NbHevyewgEjEeQwpMVp_znZvIKrSKOXJErkIwnhP6feahaK03zeElDFU6AkxvyYl2GJ7wLVJTu1sEau3yacH_lE4Lj4vARXOCc2bj8MJ60XMUS1e8GcugFwIddTfpp_7lkkVP3azir7pVwhAiWLA862kTsVBUlgFY94Rfovfx6YGqxNnhXgIfjTFjpBZD_yu3w-LHm0UFKRvrhy-tin7byD_G0XwsqhPBBIohj0wdCrKortqUTj0N7'],
    features: ['Garden', '2 Cars']
  },
  {
    id: '5',
    title: 'Luxury 2 Bedroom Apartment',
    location: 'Lekki, Lagos',
    price: 2500000,
    currency: 'NGN',
    type: 'rent',
    status: 'active',
    bedrooms: 2,
    bathrooms: 2,
    views: 124,
    saves: 12,
    images: ['/properties/property-1.jpg'],
    matchScore: 90
  },
  {
    id: '6',
    title: 'Mini Flat in Yaba',
    location: 'Yaba, Lagos',
    price: 800000,
    currency: 'NGN',
    type: 'rent',
    status: 'pending',
    bedrooms: 1,
    bathrooms: 1,
    views: 45,
    saves: 5,
    images: ['/properties/property-1.jpg'],
    matchScore: 80
  },
];

export const mockTestimonials = [
  {
    id: '1',
    content: "I was tired of agents taking me to see houses that looked nothing like the pictures. EasyBuy changed that. The verification process is real!",
    author: "Chinedu Okafor",
    role: "Bought in Lekki",
    rating: 5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZPlSdSkOshAEPb1B-RE7amugZ195Zi55gSah3exo1TUuvQjggMYAMrIlLvrcIOllOJkVGPBEm31cgL27InUyYf4detDJThjr2g7TnMUSv02a0xvHRuPqC7dtjwky37IvfDPEXcQ9RfDePkRms4xcXnNldaG6Db7LNSD356359Mtujj5-IYjYfvQQpo2Z1i71X_f7mbg4fWe_iz4GdjNj4WE6h3R7FVcujOk_i4cEW4DurZSixFj1aEwcRJmh-s6fUuY4x5C8rRieo"
  },
  {
    id: '2',
    content: "Moving from Lagos to Abuja was stressful until I found this app. I secured my apartment in Wuse without even travelling first.",
    author: "Amina Yusuf",
    role: "Rented in Abuja",
    rating: 5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBP7WJzsHrtLzeIehrPRqqw4lQs5iZXDUQvlFcnVSuDe3Ep-HS3H6kKRGcdGksDdzsNwNdkdbG8p4ZzExpvMwTML4M9affAOH-H2BiwUyyn6hwszByRuRWg9IxvJ-M7rFCcUU_GWWaphImCfmS_IfYp8AksBDOWkHO8WFJ85RSMuqCpxMqCH3gqdwLXqSM9YY5LL2pte5R7wTs2x4kW1NRJCvMLDsTRrY1UcWjP6rlmPWo2eoCXApn4cRn0lFUQoIIR3Qc19cE41E3D"
  },
  {
    id: '3',
    content: "As a landlord, listing here has been seamless. I get serious inquiries only, and the dashboard is very easy to use.",
    author: "Mr. Adebayo",
    role: "Property Owner, Ibadan",
    rating: 5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKDhzAZ1GsfXYY_UENlbLeLOwqwu3bz3HuswPJCMpII_pxvew-AMqwqzb6NNFTM-EYgZudTpLBU--ZSaRBgTA8B3foxCSYYkpGjK3ZgZ4c91SVOd4dz79FflAzsjpaG68B3KTckAuAfEomUqVLQ-Px-n1jKx-s0IFlHAdl-aiKl_XDFJcvXmW4qzICod76lgNC0lJhnJzTqpnlbscOY9ln5CdIB_N2n1zsW9c1f7OqzgZX8ii20HOtYEJqjz5z2WGjdF87qsfyz1IW"
  },
];

export const mockDashboardStats = [
    { label: 'Total Listings', value: '12', trend: '+2 this month', icon: 'apartment', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Total Views', value: '8.4k', trend: '+12% vs last month', icon: 'visibility', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { label: 'Pending Inquiries', value: '24', trend: '5 new today', icon: 'chat', color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20' },
    { label: 'Occupancy Rate', value: '92%', trend: 'Top 5% in area', icon: 'pie_chart', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' }
];

export const mockSavedProperties = mockProperties.slice(0, 4); // First 4 as saved
