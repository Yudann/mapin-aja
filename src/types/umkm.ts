export interface UMKM {
  id: string;
  name: string;
  category: string;
  description?: string;
  address: string;
  distance?: number;
  rating: number;
  reviewCount: number;
  isOpen: boolean;
  isVerified: boolean;
  image: string;
  phone?: string;
  responseTime?: string;
  openingHours?: string;
  priceRange?: string;
  deliveryTime?: string;
  latitude?: number;
  longitude?: number;
  discount?: string;
  isFavorite?: boolean;
  bannerImage?: string;
  taste?: string
  portion?: string
  packaging?: string
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

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isAvailable: boolean;
  category: string;
}