"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  once?: boolean;
}

const FadeIn = ({
  children,
  className,
  delay = 0,
  duration = 0.6,
  direction = "up",
  distance = 30,
  once = true,
}: FadeInProps) => {
  const getInitial = () => {
    switch (direction) {
      case "up": return { opacity: 0, y: distance };
      case "down": return { opacity: 0, y: -distance };
      case "left": return { opacity: 0, x: distance };
      case "right": return { opacity: 0, x: -distance };
      case "none": return { opacity: 0 };
    }
  };

  const getAnimate = () => {
    switch (direction) {
      case "up":
      case "down": return { opacity: 1, y: 0 };
      case "left":
      case "right": return { opacity: 1, x: 0 };
      case "none": return { opacity: 1 };
    }
  };

  return (
    <motion.div
      className={className}
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once, margin: "-50px" }}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
