// src/components/navbar/navbar.type.ts
import type { LucideIcon } from 'lucide-react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];

// Tipe UserData yang sama dengan yang dikembalikan useUser
export interface UserData {
  user: SupabaseUser | null;
  profile: Profile | null;
}

// Tipe yang digunakan di Dropdown dan Mobile Menu
export interface NavbarUser {
  user: SupabaseUser;
  profile: Profile;
}


export interface NavigationItem {
  type: "link" | "scroll";
  href?: string;
  section?: string;
  label: string;
  icon: LucideIcon;
}

export interface UserDropdownProps {
  user: SupabaseUser;
  profile: Profile;
  userRole: string;
  onLogout: () => Promise<void>;
}

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: NavigationItem[];
  user: SupabaseUser | null;
  userRole: string;
  onLogout: () => Promise<void>;
  onNavigate: (section: string) => void;
  currentPath: string; 
}

export interface NavItemProps {
  item: NavigationItem;
  onClick?: () => void;
  isMobile?: boolean;
}