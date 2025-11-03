"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { LucideIcon } from "lucide-react";

// Types
interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  background?: "white" | "gradient" | "brown-light";
  container?: "default" | "wide";
  withPattern?: boolean;
  withCircles?: boolean;
  spacing?: "sm" | "md" | "lg" | "xl";
}

interface SectionHeaderProps {
  badge?: {
    icon: LucideIcon;
    text: string;
  };
  title: string;
  subtitle?: string;
  highlightText?: string;
  className?: string;
  centered?: boolean;
}

interface SectionBadgeProps {
  icon: LucideIcon;
  text: string;
  className?: string;
}

interface GradientTextProps {
  children: string;
  className?: string;
}

// Color constants
export const COLORS = {
  brown: {
    light: "#D7CCC8",
    accent: "#8B5E3C",
    dark: "#3E2C23",
  },
  gradients: {
    primary: "linear-gradient(135deg, #8B5E3C 0%, #3E2C23 100%)",
    light: "linear-gradient(135deg, #D7CCC8 0%, #8B5E3C 100%)",
    accent: "linear-gradient(135deg, #8B5E3C 0%, #A3B18A 100%)",
  },
} as const;

// Animation variants
export const sectionContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export const cardVariant: Variants = {
  hidden: { y: 40, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Gradient Text Component
export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className = "",
}) => (
  <span
    className={`bg-clip-text text-transparent ${className}`}
    style={{ backgroundImage: COLORS.gradients.primary }}
  >
    {children}
  </span>
);

// Section Badge Component
export const SectionBadge: React.FC<SectionBadgeProps> = ({
  icon: Icon,
  text,
  className = "",
}) => (
  <div
    className={`inline-flex items-center justify-center space-x-2 bg-brown-accent/10 border border-brown-accent/30 rounded-full px-6 py-3 ${className}`}
  >
    <Icon className="w-5 h-5 text-brown-accent" />
    <span className="text-sm font-bold text-brown-dark uppercase tracking-wider">
      {text}
    </span>
  </div>
);

// Section Header Component
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  highlightText,
  className = "",
  centered = true,
}) => {
  const renderTitle = () => {
    if (!highlightText) {
      return (
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
          {title}
        </h2>
      );
    }

    const parts = title.split(highlightText);

    return (
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
        {parts[0]}
        <GradientText>{highlightText}</GradientText>
        {parts[1]}
      </h2>
    );
  };

  const Container = centered ? "div" : React.Fragment;
  const containerProps = centered ? { className: "text-center" } : {};

  return (
    <motion.div variants={cardVariant} className={`mb-16 ${className}`}>
      <Container {...containerProps}>
        {badge && (
          <SectionBadge icon={badge.icon} text={badge.text} className="mb-6" />
        )}

        {renderTitle()}

        {subtitle && (
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6 leading-relaxed">
            {subtitle}
          </p>
        )}
      </Container>
    </motion.div>
  );
};

// Main Section Wrapper Component
const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  className = "",
  background = "white",
  container = "default",
  withPattern = true,
  withCircles = true,
  spacing = "lg",
}) => {
  const getBackgroundClass = () => {
    switch (background) {
      case "white":
        return "bg-white";
      case "gradient":
        return "bg-linear-to-b from-white via-brown-light/30 to-white";
      case "brown-light":
        return "bg-brown-light/50";
      default:
        return "bg-white";
    }
  };

  const getSpacingClass = () => {
    switch (spacing) {
      case "sm":
        return "py-16";
      case "md":
        return "py-20";
      case "lg":
        return "py-24 sm:py-32";
      case "xl":
        return "py-32 sm:py-40";
      default:
        return "py-24 sm:py-32";
    }
  };

  const getMaxWidthClass = () => {
    switch (container) {
      case "default":
        return "max-w-7xl";
      case "wide":
        return "max-w-8xl";
      default:
        return "max-w-7xl";
    }
  };

  return (
    <motion.section
      className={`relative ${getSpacingClass()} ${getBackgroundClass()} overflow-hidden ${className}`}
      variants={sectionContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Background Pattern */}
      {withPattern && (
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,94,60,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,94,60,0.02)_1px,transparent_1px)] bg-size-[4rem_4rem]" />
      )}

      {/* Floating Decorative Circles */}
      {withCircles && background !== "brown-light" && (
        <>
          <div className="absolute top-20 left-10 w-64 h-64 bg-brown-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-brown-light/10 rounded-full blur-3xl" />
        </>
      )}

      <div
        className={`relative z-10 ${getMaxWidthClass()} mx-auto px-4 sm:px-6 lg:px-8`}
      >
        {children}
      </div>
    </motion.section>
  );
};

export default SectionWrapper;
