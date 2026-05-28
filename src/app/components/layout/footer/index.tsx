"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollReveal } from "../../ui/scroll-reveal";

const Footer = () => {
  return (
    <footer id="contact" className="relative border-t border-white/[0.04] bg-[#0a0a0f]">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      <div className="container">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          {/* CTA Section */}
          <ScrollReveal>
            <div className="py-20 sm:py-28 text-center">
              <p className="section-label mb-6">Let&apos;s collaborate</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8" style={{ fontFamily: "var(--font-display)" }}>
                <span className="text-primary">Have a project in mind?</span>
                <br />
                <span className="gradient-text">Let&apos;s talk.</span>
              </h2>
              <motion.a
                href="https://mail.google.com/mail/?view=cm&to=gokulgoks@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold text-base hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-shadow duration-500"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 6L2 7" />
                </svg>
                gokulgoks@gmail.com
              </motion.a>
            </div>
          </ScrollReveal>

          {/* Bottom bar */}
          <div className="border-t border-white/[0.04] py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-primary/25">
              2026 © All rights reserved
            </p>
            <p className="text-xs text-primary/25">
              Created by Goks
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;