"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import MagneticButton from "../../ui/magnetic-button";

const Header = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <MagneticButton strength={0.15}>
            <Link href="/" className="group flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center overflow-hidden">
                <span className="text-xs font-bold text-white font-[var(--font-display)]">GK</span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="text-sm font-semibold text-primary/80 tracking-wide hidden sm:block">
                Its.me.goks
              </span>
            </Link>
          </MagneticButton>

          {/* Nav Links */}
          <div className="flex items-center gap-1">
            {["Work", "About", "Experience"].map((item) => (
              <MagneticButton key={item} strength={0.1}>
                <Link
                  href={`#${item.toLowerCase()}`}
                  className="px-4 py-2 text-sm text-primary/60 hover:text-primary transition-colors duration-300 rounded-full hover:bg-white/[0.04]"
                >
                  {item}
                </Link>
              </MagneticButton>
            ))}
            <MagneticButton strength={0.15}>
              <Link
                href="#contact"
                className="ml-2 px-5 py-2 text-sm font-medium text-white bg-white/[0.06] border border-white/[0.08] rounded-full hover:bg-white/[0.1] hover:border-white/[0.15] transition-all duration-300 backdrop-blur-sm"
              >
                Contact
              </Link>
            </MagneticButton>
          </div>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;