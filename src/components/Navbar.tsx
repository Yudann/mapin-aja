"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  MapPin,
  User,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  Heart,
  Settings,
  ChevronDown,
  Search,
  Sparkles,
  Store,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

// UserDropdown Component - Enhanced
const UserDropdown = ({
  user,
  userRole,
  onLogout,
}: {
  user: any;
  userRole: string;
  onLogout: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    {
      href: userRole === "seller" ? "/dashboard-seller" : "/profile",
      label: userRole === "seller" ? "Dashboard Seller" : "Profile Saya",
      icon: userRole === "seller" ? LayoutDashboard : User,
    },
    {
      href: "/favorites",
      label: "Favorit Saya",
      icon: Heart,
    },
    {
      href: "/settings",
      label: "Pengaturan",
      icon: Settings,
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-card/80 backdrop-blur-sm hover:bg-muted rounded-full border border-border transition-all group"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
          <User className="h-4 w-4 text-primary-foreground" />
        </div>
        <div className="hidden sm:block text-left min-w-0">
          <p className="text-xs text-foreground font-semibold truncate max-w-[100px]">
            {user.email?.split("@")[0]}
          </p>
          <p className="text-[10px] text-muted-foreground capitalize">
            {userRole}
          </p>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-foreground transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 top-full mt-2 w-64 bg-card/95 backdrop-blur-xl rounded-2xl border border-border shadow-2xl z-50 overflow-hidden"
          >
            {/* User Info Header */}
            <div className="p-4 border-b border-border bg-gradient-to-r from-secondary to-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {user.email}
                  </p>
                  <Badge variant="secondary" className="text-[10px] mt-1">
                    {userRole === "seller" ? "UMKM Seller" : "Customer"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 text-foreground hover:text-primary hover:bg-muted rounded-xl transition-all duration-200 group"
                >
                  <item.icon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Logout Button */}
            <div className="p-2 border-t border-border">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onLogout();
                }}
                className="w-full flex items-center gap-3 px-3 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all duration-200 group"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Main Navbar Component - Ultra Modern
const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  const { scrollY } = useScroll();
  const navbarY = useTransform(scrollY, [0, 100], [0, -10]);
  const navbarOpacity = useTransform(scrollY, [0, 50], [1, 0.95]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          setUser(session.user);
          await fetchUserRole(session.user.id);
        }
      } catch (error) {
        console.error("Error getting user:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserRole = async (userId: string) => {
      try {
        const { data: roles } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", userId)
          .single();

        if (roles) {
          setUserRole(roles.role);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    getCurrentUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        await fetchUserRole(session.user.id);
      } else {
        setUser(null);
        setUserRole("");
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setUserRole("");
      setMobileMenuOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  const navigationItems = [
    {
      type: "link",
      href: "/umkm",
      label: "Jelajahi UMKM",
      icon: Search,
    },
    {
      type: "scroll",
      section: "fitur",
      label: "Fitur",
      icon: Sparkles,
    },
    {
      type: "scroll",
      section: "umkm-showcase",
      label: "UMKM Unggulan",
      icon: Store,
    },
  ];

  if (loading) {
    return (
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4">
        <div className="bg-card/80 backdrop-blur-xl border border-border rounded-full shadow-lg">
          <div className="flex justify-between items-center px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-muted rounded-xl animate-pulse" />
              <div className="w-24 h-6 bg-muted rounded animate-pulse" />
            </div>
            <div className="w-20 h-8 bg-muted rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Floating Navbar */}
      <motion.nav
        style={{ y: navbarY, opacity: navbarOpacity }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4 transition-all duration-300 ${
          scrolled ? "top-4" : "top-6"
        }`}
      >
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`bg-card/80 backdrop-blur-xl border border-border rounded-full shadow-soft hover:shadow-card transition-all duration-300 ${
            scrolled ? "shadow-2xl" : ""
          }`}
        >
          <div className="flex justify-between items-center px-4 md:px-6 py-3 md:py-4">
            {/* Logo - Enhanced */}
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-xl blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                  <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="hidden sm:block"
              >
                <span className="text-lg md:text-xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  MapinAja
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation - Pills Style */}
            <div className="hidden md:flex items-center gap-2">
              {navigationItems.map((item, index) => {
                const IconComponent = item.icon;

                if (item.type === "scroll") {
                  return (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => scrollToSection(item.section!)}
                      className="flex items-center gap-2 px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-full transition-all duration-200 font-medium text-sm group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                      <IconComponent className="h-4 w-4 relative z-10" />
                      <span className="relative z-10">{item.label}</span>
                    </motion.button>
                  );
                }

                return (
                  <Link key={index} href={item.href!}>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-full transition-all duration-200 font-medium text-sm group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                      <IconComponent className="h-4 w-4 relative z-10" />
                      <span className="relative z-10">{item.label}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 md:gap-3">
              {user ? (
                <UserDropdown
                  user={user}
                  userRole={userRole}
                  onLogout={handleLogout}
                />
              ) : (
                <>
                  {/* Desktop Auth Buttons */}
                  <div className="hidden md:flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => scrollToSection("register")}
                      className="px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-full transition-all duration-200 font-semibold text-sm"
                    >
                      Daftar
                    </motion.button>
                    <Link href="/auth?mode=login">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg rounded-full px-6 font-semibold"
                        >
                          Login
                        </Button>
                      </motion.div>
                    </Link>
                  </div>

                  {/* Mobile Login Button */}
                  <Link href="/auth?mode=login" className="md:hidden">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-primary to-accent rounded-full px-4 py-2 text-xs"
                      >
                        Login
                      </Button>
                    </motion.div>
                  </Link>
                </>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-full bg-muted border border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-all"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-card/95 backdrop-blur-xl border-l border-border shadow-2xl z-50 md:hidden overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-card/95 backdrop-blur-xl border-b border-border p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="text-xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      MapinAja
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-muted transition-colors"
                  >
                    <X className="h-5 w-5 text-foreground" />
                  </button>
                </div>
              </div>

              {/* Navigation */}
              <div className="p-6 space-y-2">
                {navigationItems.map((item, index) => {
                  const IconComponent = item.icon;

                  if (item.type === "scroll") {
                    return (
                      <motion.button
                        key={index}
                        whileHover={{ x: 4 }}
                        onClick={() => scrollToSection(item.section!)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-foreground hover:text-primary hover:bg-muted rounded-xl transition-all font-medium text-left"
                      >
                        <IconComponent className="h-5 w-5" />
                        {item.label}
                      </motion.button>
                    );
                  }

                  return (
                    <Link key={index} href={item.href!}>
                      <motion.div
                        whileHover={{ x: 4 }}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-foreground hover:text-primary hover:bg-muted rounded-xl transition-all font-medium"
                      >
                        <IconComponent className="h-5 w-5" />
                        {item.label}
                      </motion.div>
                    </Link>
                  );
                })}

                {user && (
                  <Link href="/favorites">
                    <motion.div
                      whileHover={{ x: 4 }}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-foreground hover:text-primary hover:bg-muted rounded-xl transition-all font-medium"
                    >
                      <Heart className="h-5 w-5" />
                      Favorit Saya
                    </motion.div>
                  </Link>
                )}
              </div>

              {/* User Section */}
              <div className="p-6 border-t border-border">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {user.email}
                        </p>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {userRole}
                        </Badge>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all font-semibold"
                    >
                      <LogOut className="h-5 w-5" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        scrollToSection("register");
                      }}
                      className="w-full px-4 py-3 text-center border-2 border-border text-foreground rounded-xl hover:bg-muted transition-all font-semibold"
                    >
                      Daftar
                    </motion.button>
                    <Link
                      href="/auth?mode=login"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <motion.div whileTap={{ scale: 0.95 }}>
                        <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 rounded-xl py-6 font-semibold">
                          Login Sekarang
                        </Button>
                      </motion.div>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
