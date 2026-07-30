"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import AnimatedHeroBackground from "./animated-bg";
import MagneticButton from "../../ui/magnetic-button";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const [mounted, setMounted] = useState(false);

  const springConfig = { damping: 30, stiffness: 100, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax transforms for floating elements
  const floatX1 = useTransform(smoothX, [0, 1], [-15, 15]);
  const floatY1 = useTransform(smoothY, [0, 1], [-10, 10]);
  const floatX2 = useTransform(smoothX, [0, 1], [10, -10]);
  const floatY2 = useTransform(smoothY, [0, 1], [8, -8]);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/gokul-sundhar-b9184a2a4/",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "https://github.com/gokul12072006",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  // Rotating role titles
  const roles = ["UI/UX Designer", "Indie Game Dev", "Creative Developer"];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col">
      {/* Cinematic Background */}
      <div className="relative">
        <AnimatedHeroBackground />
        {/* Gradient fade into content */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0f] to-transparent z-10" />
      </div>

      {/* Floating glass elements (parallax) */}
      {mounted && (
        <>
          <motion.div
            className="absolute top-[20%] right-[8%] w-20 h-20 rounded-2xl glass-card opacity-20 hidden lg:block"
            style={{ x: floatX1, y: floatY1 }}
            animate={{ rotate: [0, 5, -3, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-[35%] left-[5%] w-14 h-14 rounded-xl glass-card opacity-15 hidden lg:block"
            style={{ x: floatX2, y: floatY2 }}
            animate={{ rotate: [0, -8, 4, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Floating accent dots */}
          <motion.div
            className="absolute bottom-[30%] right-[15%] w-3 h-3 rounded-full bg-violet-500/30 hidden lg:block"
            style={{ x: floatX2, y: floatY1 }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-[40%] left-[12%] w-2 h-2 rounded-full bg-cyan-500/30 hidden lg:block"
            style={{ x: floatX1, y: floatY2 }}
            animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />
          {/* Extra floating elements for depth */}
          <motion.div
            className="absolute top-[55%] right-[25%] w-1.5 h-1.5 rounded-full bg-amber-400/25 hidden lg:block"
            style={{ x: floatX1, y: floatY1 }}
            animate={{ scale: [1, 2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          />
        </>
      )}

      {/* Hero Content */}
      <div className="relative z-20 -mt-24 sm:-mt-32">
        <div className="container">
          <motion.div
            className="max-w-4xl mx-auto px-4 sm:px-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Profile Image with glow */}
            <motion.div variants={itemVariants} className="flex justify-center mb-8">
              <div className="relative group">
                {/* Glow ring */}
                <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-violet-500/40 via-cyan-500/40 to-amber-500/40 blur-lg opacity-40 group-hover:opacity-75 transition-opacity duration-700" />
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-white/10">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/hero-sec/user-img.jpg`}
                    alt="UI/UX Designer & Indie Game Developer"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
                {/* Availability indicator */}
                <div className="absolute bottom-2 right-2 z-10">
                  <div className="availability-pulse">
                    <div className="w-4 h-4 bg-emerald-400 rounded-full border-2 border-[#0a0a0f] shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Rotating Role Badge */}
            <motion.div variants={itemVariants} className="flex justify-center mb-6">
              <motion.div
                key={roleIndex}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/[0.06]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                <span className="text-xs font-medium text-violet-300/90 tracking-wider uppercase">
                  {roles[roleIndex]}
                </span>
              </motion.div>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={itemVariants} className="text-center mb-6">
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="text-primary">Designing </span>
                <span className="gradient-text">Immersive</span>
              </h1>
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="text-primary">Digital </span>
                <span className="text-primary/60">Experiences</span>
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.div variants={itemVariants} className="text-center mb-10">
              <p
                className="text-lg sm:text-xl md:text-2xl text-primary/45 font-light leading-relaxed max-w-2xl mx-auto"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Where{" "}
                <span className="text-primary/70 font-normal">UI/UX design</span> meets{" "}
                <span className="text-primary/70 font-normal">interactive storytelling</span>
                <br className="hidden sm:block" />
                and{" "}
                <span className="text-primary/70 font-normal">creative development</span>.
              </p>
            </motion.div>

            {/* Social & CTA Row */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-5"
            >
              {/* Social Icons */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => (
                  <MagneticButton key={index} strength={0.2}>
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative w-11 h-11 flex items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-500 text-primary/40 hover:text-primary/90"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </Link>
                  </MagneticButton>
                ))}
              </div>

              {/* CTA — Explore My Work */}
              <MagneticButton strength={0.15}>
                <Link
                  href="#work"
                  className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full overflow-hidden"
                >
                  {/* Gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Shine sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  {/* Content */}
                  <span className="relative flex items-center gap-2.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M15 3h6v6M14 10l6.1-6.1M9 21H3v-6M10 14l-6.1 6.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm font-semibold text-white tracking-wide">Explore My Work</span>
                  </span>
                </Link>
              </MagneticButton>

              {/* Secondary CTA */}
              <MagneticButton strength={0.1}>
                <Link
                  href="#about"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-500"
                >
                  <span className="text-sm font-medium text-primary/60 group-hover:text-primary/90 transition-colors duration-300">
                    About Me
                  </span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-primary/30 group-hover:text-primary/60 group-hover:translate-y-0.5 transition-all duration-300"
                  >
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </Link>
              </MagneticButton>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
