// navbar/navbar.type.ts
export interface NavigationItem {
  type: "link" | "scroll";
  href?: string;
  section?: string;
  label: string;
  icon: React.ComponentType<any>;
}

export interface User {
  email: string;
  id?: string;
}

export interface UserDropdownProps {
  user: User;
  userRole: string;
  onLogout: () => void;
}

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: NavigationItem[];
  user: User | null;
  userRole: string;
  onLogout: () => void;
  onNavigate: (sectionId: string) => void;
}

export interface NavItemProps {
  item: NavigationItem;
  onClick?: () => void;
  isMobile?: boolean;
}