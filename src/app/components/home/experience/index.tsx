"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "../../ui/scroll-reveal";

const accentMap: Record<string, { border: string; bg: string; text: string; glow: string; dot: string; shadow: string }> = {
  violet: {
    border: "rgba(139, 92, 246, 0.25)",
    bg: "rgba(139, 92, 246, 0.06)",
    text: "text-violet-400",
    glow: "bg-violet-500/20",
    dot: "bg-violet-500",
    shadow: "rgba(139, 92, 246, 0.15)",
  },
  cyan: {
    border: "rgba(6, 182, 212, 0.25)",
    bg: "rgba(6, 182, 212, 0.06)",
    text: "text-cyan-400",
    glow: "bg-cyan-500/20",
    dot: "bg-cyan-500",
    shadow: "rgba(6, 182, 212, 0.15)",
  },
  amber: {
    border: "rgba(245, 158, 11, 0.25)",
    bg: "rgba(245, 158, 11, 0.06)",
    text: "text-amber-400",
    glow: "bg-amber-500/20",
    dot: "bg-amber-500",
    shadow: "rgba(245, 158, 11, 0.15)",
  },
  rose: {
    border: "rgba(244, 63, 94, 0.25)",
    bg: "rgba(244, 63, 94, 0.06)",
    text: "text-rose-400",
    glow: "bg-rose-500/20",
    dot: "bg-rose-500",
    shadow: "rgba(244, 63, 94, 0.15)",
  },
};

const roleIcons: Record<string, React.JSX.Element> = {
  violet: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-violet-400">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  cyan: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan-400">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
      <polyline points="7.5 19.79 7.5 14.6 3 12" />
      <polyline points="21 12 16.5 14.6 16.5 19.79" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  amber: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-amber-400">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  rose: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-rose-400">
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  ),
};

const Experience = () => {
  const [experienceData, setExperienceData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
        const res = await fetch(`${basePath}/data/page-data.json`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setExperienceData(data?.experienceData);
      } catch (error) {
        console.error("Error fetching experience:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="experience" className="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-violet-500/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          {/* Section Header */}
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-6 sm:mb-8">
              <span className="section-label">Experience</span>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-base sm:text-lg text-primary/30 leading-relaxed mb-14 sm:mb-18 max-w-2xl">
              A journey through design, development, and creative leadership — building experiences that matter.
            </p>
          </ScrollReveal>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-[23px] top-0 bottom-0 w-px hidden sm:block">
              <div className="w-full h-full bg-gradient-to-b from-violet-500/40 via-cyan-500/20 via-amber-500/15 to-transparent" />
            </div>

            <StaggerContainer staggerDelay={0.2} className="flex flex-col gap-8 sm:gap-10">
              {experienceData?.map((exp: any, index: number) => {
                const accent = accentMap[exp?.accent] || accentMap.violet;
                const icon = roleIcons[exp?.accent] || roleIcons.violet;

                return (
                  <StaggerItem key={index}>
                    <motion.div
                      className="group relative sm:ml-14"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      {/* Timeline dot */}
                      <div className="absolute -left-[calc(3.5rem+1px)] top-7 hidden sm:flex items-center">
                        <div className={`relative w-[12px] h-[12px] rounded-full border-2 ${
                          exp?.endYear === "Present"
                            ? `border-current ${accent.text}`
                            : "border-white/20"
                        }`}>
                          <div className={`absolute inset-[-3px] rounded-full ${accent.glow} ${
                            exp?.endYear === "Present" ? "animate-pulse" : "opacity-0"
                          }`} />
                        </div>
                        <div className="w-[calc(3.5rem-11px)] h-px bg-white/[0.06]" />
                      </div>

                      {/* Card */}
                      <motion.div
                        className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden"
                        whileHover={{
                          borderColor: accent.border,
                          boxShadow: `0 8px 40px ${accent.shadow}`,
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        {/* Top accent line */}
                        <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${accent.text.replace('text-', 'via-')}/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                        {/* Corner glow */}
                        <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full ${accent.glow} blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700`} />

                        <div className="relative z-10 p-6 sm:p-8">
                          {/* Header Row */}
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                            <div className="flex items-start gap-4">
                              {/* Icon */}
                              <div className={`w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center flex-shrink-0 group-hover:border-white/[0.12] transition-colors duration-300`}>
                                {icon}
                              </div>
                              <div>
                                <h4
                                  className={`text-lg sm:text-xl font-semibold text-primary group-hover:${accent.text} transition-colors duration-300`}
                                  style={{ fontFamily: "var(--font-display)" }}
                                >
                                  {exp?.role}
                                </h4>
                                <p className="text-sm text-primary/40 mt-1">
                                  {exp?.company}
                                  {exp?.type && (
                                    <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-primary/30">
                                      {exp?.type}
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>

                            {/* Duration Badge */}
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] flex-shrink-0">
                              <div className={`w-2 h-2 rounded-full ${
                                exp?.endYear === "Present"
                                  ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                                  : "bg-white/20"
                              }`} />
                              <span className="text-xs sm:text-sm text-primary/50 whitespace-nowrap font-mono">
                                {exp?.startYear} — {exp?.endYear}
                              </span>
                            </div>
                          </div>

                          {/* Location */}
                          <div className="flex items-center gap-1.5 mb-4 ml-0 sm:ml-16">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary/25">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                              <circle cx="12" cy="10" r="3" />
                            </svg>
                            <span className="text-xs text-primary/30">{exp?.location}</span>
                          </div>

                          {/* Description */}
                          <p className="text-sm text-primary/40 leading-relaxed mb-5 ml-0 sm:ml-16 group-hover:text-primary/55 transition-colors duration-500">
                            {exp?.description}
                          </p>

                          {/* Skills Tags */}
                          {exp?.skills && (
                            <div className="flex flex-wrap gap-2 ml-0 sm:ml-16">
                              {exp.skills.map((skill: string, skillIndex: number) => (
                                <motion.span
                                  key={skillIndex}
                                  className="text-xs px-3 py-1.5 rounded-lg border border-white/[0.05] bg-white/[0.02] text-primary/40 group-hover:text-primary/60 group-hover:border-white/[0.08] transition-all duration-300"
                                  whileHover={{
                                    borderColor: accent.border,
                                    backgroundColor: accent.bg,
                                    y: -1,
                                  }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {skill}
                                </motion.span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;