// src\types\umkm.ts

export interface UMKM {
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  distance: number;
  rating: number;
  reviewCount: number;
  isOpen: boolean;
  isVerified: boolean;
  image: string;
  bannerImage: string;
  phone: string;
  responseTime: string;
  openingHours: string;
  priceRange: string;
  deliveryTime: string;
  latitude: number;
  longitude: number;
  discount?: string;
  taste: string;
  portion: string;
  packaging: string;
  isFavorite: boolean;
  products: Product[];
  reviews: Review[];
  openingSchedules: OpeningSchedule[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isAvailable: boolean;
  category: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  images?: string[];
  helpful: number;
}

export interface OpeningSchedule {
  day: string;
  hours: string;
  isToday: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface QuickFilter {
  id: string;
  label: string;
  icon: string;
  emoji?: string;
  color?: string;
}