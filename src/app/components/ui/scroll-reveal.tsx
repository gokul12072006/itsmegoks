"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  className?: string;
  once?: boolean;
  blur?: boolean;
  scale?: boolean;
}

const ScrollReveal = ({
  children,
  delay = 0,
  duration = 0.8,
  direction = "up",
  distance = 40,
  className = "",
  once = true,
  blur = true,
  scale = false,
}: RevealProps) => {
  const getInitial = () => {
    const base: Record<string, number | string> = { opacity: 0 };
    if (blur) base.filter = "blur(8px)";
    if (scale) base.scale = 0.95;

    switch (direction) {
      case "up": base.y = distance; break;
      case "down": base.y = -distance; break;
      case "left": base.x = distance; break;
      case "right": base.x = -distance; break;
    }
    return base;
  };

  const getAnimate = () => {
    const base: Record<string, number | string> = { opacity: 1 };
    if (blur) base.filter = "blur(0px)";
    if (scale) base.scale = 1;

    switch (direction) {
      case "up":
      case "down": base.y = 0; break;
      case "left":
      case "right": base.x = 0; break;
    }
    return base;
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once, amount: 0.15, margin: "-50px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1] as const,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Staggered children container
interface StaggerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
  once?: boolean;
}

const StaggerContainer = ({
  children,
  staggerDelay = 0.1,
  className = "",
  once = true,
}: StaggerProps) => {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StaggerItem = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};

export { ScrollReveal, StaggerContainer, StaggerItem };
