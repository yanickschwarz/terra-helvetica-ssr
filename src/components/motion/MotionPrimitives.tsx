"use client";

import { motion, type MotionProps } from "framer-motion";
import type { ImgHTMLAttributes, HTMLAttributes } from "react";

type MotionImageProps = ImgHTMLAttributes<HTMLImageElement> & MotionProps;
type MotionDivProps = HTMLAttributes<HTMLDivElement> & MotionProps;

export function MotionImage(props: MotionImageProps) {
  return <motion.img {...props} />;
}

export function MotionDiv(props: MotionDivProps) {
  return <motion.div {...props} />;
}
