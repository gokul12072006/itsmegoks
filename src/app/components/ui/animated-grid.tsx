"use client";

import { motion } from "framer-motion";

const AnimatedGrid = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Animated dot grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-dots" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-dots)" />
      </svg>

      {/* Floating gradient orbs */}
      <motion.div
        className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 25, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.06) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 30, -20, 0],
          scale: [1, 0.9, 1.05, 1],
        }}
        transition={{ duration: 30, ease: "easeInOut", repeat: Infinity }}
      />
    </div>
  );
};

export default AnimatedGrid;
