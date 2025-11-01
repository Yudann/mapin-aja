// types/database.ts
export type AppRole = 'customer' | 'seller' | 'admin';

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
}

export interface UMKM {
  id: string;
  owner_id: string;
  name: string;
  category: string;
  description: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  rating?: number | null; // Opsional
  email?: string | null; // Opsional
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  read: boolean;
  created_at: string;
  sender_name?: string;
}

export interface Conversation {
  id: string;
  umkm_id: string;
  customer_id: string;
  last_message: string | null;
  last_message_at: string | null;
  created_at: string;
  updated_at: string;
  umkm_name?: string;
  customer_name?: string;
  umkm?: {
    name: string;
    owner_id: string;
  };
}