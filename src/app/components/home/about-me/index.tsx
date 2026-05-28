"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "../../ui/scroll-reveal";
import AnimatedGrid from "../../ui/animated-grid";
import MagneticButton from "../../ui/magnetic-button";

const AboutMe = () => {
  const skills = [
    { name: "UI/UX Design", icon: "✨", accent: "violet" },
    { name: "Frontend Development", icon: "⚡", accent: "cyan" },
    { name: "Indie Game Development", icon: "🎮", accent: "amber" },
    { name: "Interactive Storytelling", icon: "📖", accent: "rose" },
    { name: "Motion Design", icon: "🎬", accent: "violet" },
    { name: "Prototyping", icon: "🔧", accent: "cyan" },
    { name: "Creative Coding", icon: "💻", accent: "amber" },
    { name: "Visual Design", icon: "🎨", accent: "violet" },
    { name: "Design Systems", icon: "📐", accent: "cyan" },
    { name: "Responsive Design", icon: "🖥️", accent: "amber" },
  ];

  const philosophyCards = [
    {
      label: "Immersive Experiences",
      desc: "Crafting digital worlds that pull users in through emotion, motion, and visual depth.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-violet-400">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      label: "Story-Driven Design",
      desc: "Every interface is a narrative — guiding users through meaningful, emotionally resonant journeys.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan-400">
          <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      ),
    },
    {
      label: "Creative Technology",
      desc: "Blending modern frontend craft with game-inspired interactivity and experimental concepts.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-amber-400">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
    },
  ];

  // Stats / Highlights
  const highlights = [
    { value: "UI/UX", label: "Design Focus" },
    { value: "Indie", label: "Game Dev" },
    { value: "Web", label: "& Interactive" },
    { value: "Motion", label: "Driven UI" },
  ];

  return (
    <section id="about" className="relative py-28 sm:py-36 lg:py-44 overflow-hidden">
      <AnimatedGrid />

      {/* Ambient glow specific to this section */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-violet-500/[0.025] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-cyan-500/[0.02] blur-[120px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          {/* Section Label */}
          <ScrollReveal delay={0}>
            <div className="flex items-center gap-4 mb-14 sm:mb-18">
              <span className="section-label">About Me</span>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
            </div>
          </ScrollReveal>

          {/* Main Identity Statement */}
          <ScrollReveal delay={0.1} duration={1}>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-[1.4] mb-7"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Passionate{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-violet-400">UI/UX designer</span>
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-[35%] bg-gradient-to-r from-violet-500/20 to-violet-500/5 rounded-sm"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
                />
              </span>{" "}
              and aspiring{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-cyan-400">indie game developer</span>
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-[35%] bg-gradient-to-r from-cyan-500/20 to-cyan-500/5 rounded-sm"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
                />
              </span>{" "}
              focused on creating immersive digital experiences through modern design, interactive storytelling, and{" "}
              <span className="text-amber-400/80">creative frontend development</span>.
            </h2>
          </ScrollReveal>

          {/* Supporting Description */}
          <ScrollReveal delay={0.2}>
            <p className="text-base sm:text-lg text-primary/35 leading-relaxed mb-8 max-w-2xl">
              I enjoy building visually appealing and meaningful digital experiences that combine creativity, usability, and modern technology. My interests span UI/UX design, frontend development, indie game concepts, and interactive storytelling-driven experiences.
            </p>
          </ScrollReveal>

          {/* Highlight Stats Row */}
          <ScrollReveal delay={0.25}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16 sm:mb-20">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  className="text-center py-5 px-4 rounded-xl border border-white/[0.04] bg-white/[0.015]"
                  whileHover={{ borderColor: "rgba(139, 92, 246, 0.15)", y: -2 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-lg sm:text-xl font-bold gradient-text mb-1" style={{ fontFamily: "var(--font-display)" }}>
                    {item.value}
                  </p>
                  <p className="text-xs text-primary/30 tracking-wide uppercase">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          {/* Philosophy Cards */}
          <ScrollReveal delay={0.1}>
            <div className="flex items-center gap-4 mb-8">
              <span className="section-label">What I Believe</span>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16 sm:mb-20">
              {philosophyCards.map((item, i) => (
                <motion.div
                  key={i}
                  className="glass-card glass-card-hover p-6 sm:p-7 group cursor-default relative overflow-hidden"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Subtle corner glow */}
                  <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-violet-500/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative z-10">
                    <div className="mb-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      {item.icon}
                    </div>
                    <p className="text-sm font-semibold text-primary mb-2 group-hover:text-violet-400 transition-colors duration-300">
                      {item.label}
                    </p>
                    <p className="text-sm text-primary/35 leading-relaxed group-hover:text-primary/50 transition-colors duration-500">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          {/* Skills / Expertise */}
          <ScrollReveal delay={0.1}>
            <div className="flex items-center gap-4 mb-8">
              <span className="section-label">Skills & Expertise</span>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.05} className="flex flex-wrap gap-3 mb-14">
            {skills.map((skill, index) => (
              <StaggerItem key={index}>
                <motion.div
                  className="group relative px-4 py-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] cursor-default overflow-hidden"
                  whileHover={{
                    borderColor:
                      skill.accent === "violet"
                        ? "rgba(139, 92, 246, 0.3)"
                        : skill.accent === "cyan"
                          ? "rgba(6, 182, 212, 0.3)"
                          : skill.accent === "amber"
                            ? "rgba(245, 158, 11, 0.3)"
                            : "rgba(244, 63, 94, 0.3)",
                    backgroundColor:
                      skill.accent === "violet"
                        ? "rgba(139, 92, 246, 0.06)"
                        : skill.accent === "cyan"
                          ? "rgba(6, 182, 212, 0.06)"
                          : skill.accent === "amber"
                            ? "rgba(245, 158, 11, 0.06)"
                            : "rgba(244, 63, 94, 0.06)",
                    y: -2,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Glow sweep on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-violet-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative flex items-center gap-2">
                    <span className="text-sm opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                      {skill.icon}
                    </span>
                    <span className="text-sm font-medium text-primary/60 group-hover:text-primary transition-colors duration-300">
                      {skill.name}
                    </span>
                  </span>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* CTA */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <MagneticButton strength={0.12}>
                <Link
                  href="#side-projects"
                  className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative flex items-center gap-2.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                      <path d="M15 3h6v6M14 10l6.1-6.1M9 21H3v-6M10 14l-6.1 6.1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm font-semibold text-white tracking-wide">View Projects</span>
                  </span>
                </Link>
              </MagneticButton>
              <MagneticButton strength={0.1}>
                <Link
                  href="#experience"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-500"
                >
                  <span className="text-sm font-medium text-primary/50 group-hover:text-primary/80 transition-colors duration-300">
                    View Experience
                  </span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary/30 group-hover:text-primary/60 group-hover:translate-x-0.5 transition-all duration-300">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;