"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "../../ui/scroll-reveal";

const accentColors: Record<string, { border: string; bg: string; text: string; glow: string; gradient: string }> = {
  violet: {
    border: "rgba(139, 92, 246, 0.25)",
    bg: "rgba(139, 92, 246, 0.06)",
    text: "text-violet-400",
    glow: "bg-violet-500/15",
    gradient: "from-violet-500/20 to-violet-500/0",
  },
  cyan: {
    border: "rgba(6, 182, 212, 0.25)",
    bg: "rgba(6, 182, 212, 0.06)",
    text: "text-cyan-400",
    glow: "bg-cyan-500/15",
    gradient: "from-cyan-500/20 to-cyan-500/0",
  },
  amber: {
    border: "rgba(245, 158, 11, 0.25)",
    bg: "rgba(245, 158, 11, 0.06)",
    text: "text-amber-400",
    glow: "bg-amber-500/15",
    gradient: "from-amber-500/20 to-amber-500/0",
  },
};

const Education = () => {
  const [educationData, setEducationData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
        const res = await fetch(`${basePath}/data/page-data.json`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setEducationData(data?.educationData);
      } catch (error) {
        console.error("Error fetching education:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[400px] bg-violet-500/[0.02] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-cyan-500/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          {/* Section Header */}
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-6 sm:mb-8">
              <span className="section-label">Education</span>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-base sm:text-lg text-primary/30 leading-relaxed mb-14 sm:mb-18 max-w-2xl">
              The academic foundations that shaped my approach to design, technology, and creative problem-solving.
            </p>
          </ScrollReveal>

          {/* Education Cards */}
          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-8 top-0 bottom-0 w-px hidden sm:block">
              <div className="w-full h-full bg-gradient-to-b from-violet-500/30 via-cyan-500/20 to-transparent" />
            </div>

            <StaggerContainer staggerDelay={0.2} className="flex flex-col gap-8">
              {educationData?.map((item: any, index: number) => {
                const accent = accentColors[item?.accent] || accentColors.violet;
                const isCurrent = item?.status === "current";

                return (
                  <StaggerItem key={index}>
                    <motion.div
                      className="group relative sm:ml-20"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      {/* Timeline connector */}
                      <div className="absolute -left-[calc(5rem+1px)] top-8 hidden sm:flex items-center">
                        {/* Year label */}
                        <div className="relative">
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            isCurrent
                              ? `border-violet-400 bg-violet-500/30`
                              : "border-white/15 bg-white/[0.04]"
                          } transition-all duration-500 group-hover:scale-110`}>
                            {isCurrent && (
                              <div className="absolute inset-0 rounded-full bg-violet-500/30 animate-ping" />
                            )}
                          </div>
                        </div>
                        <div className="w-[calc(5rem-15px)] h-px bg-white/[0.06]" />
                      </div>

                      {/* Card */}
                      <motion.div
                        className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden"
                        whileHover={{
                          borderColor: accent.border,
                          boxShadow: `0 8px 40px ${accent.bg}`,
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        {/* Top accent line */}
                        <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${accent.text.replace('text-', 'via-')}/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                        {/* Corner glow */}
                        <div className={`absolute -top-10 -left-10 w-28 h-28 rounded-full ${accent.glow} blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700`} />

                        <div className="relative z-10 p-6 sm:p-8">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                            <div className="flex items-start gap-4">
                              {/* Graduation cap icon */}
                              <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center flex-shrink-0 group-hover:border-white/[0.12] transition-colors duration-300">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={accent.text}>
                                  {index === 0 ? (
                                    <>
                                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                    </>
                                  ) : index === 1 ? (
                                    <>
                                      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                                    </>
                                  ) : (
                                    <>
                                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                    </>
                                  )}
                                </svg>
                              </div>

                              <div>
                                <h4
                                  className={`text-lg sm:text-xl font-semibold text-primary group-hover:${accent.text} transition-colors duration-300`}
                                  style={{ fontFamily: "var(--font-display)" }}
                                >
                                  {item?.degree}
                                </h4>
                                <p className="text-sm text-primary/40 mt-1.5 flex items-center gap-2">
                                  {item?.institution}
                                </p>
                                {item?.field && (
                                  <p className="text-xs text-primary/30 mt-1 italic">
                                    {item.field}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Duration & Status Badge */}
                            <div className="flex items-center gap-3 flex-shrink-0">
                              {isCurrent && (
                                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
                                  Pursuing
                                </span>
                              )}
                              <div className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                                <span className="text-xs sm:text-sm text-primary/50 whitespace-nowrap font-mono">
                                  {item?.startYear} — {item?.endYear}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Location */}
                          <div className="flex items-center gap-1.5 mb-5 ml-0 sm:ml-16">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary/25">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                              <circle cx="12" cy="10" r="3" />
                            </svg>
                            <span className="text-xs text-primary/30">{item?.location}</span>
                          </div>

                          {/* Highlights */}
                          {item?.highlights && item.highlights.length > 0 && (
                            <div className="flex flex-wrap gap-2 ml-0 sm:ml-16">
                              {item.highlights.map((highlight: string, hIndex: number) => (
                                <motion.span
                                  key={hIndex}
                                  className="text-xs px-3 py-1.5 rounded-lg border border-white/[0.05] bg-white/[0.02] text-primary/40 group-hover:text-primary/60 group-hover:border-white/[0.08] transition-all duration-300 flex items-center gap-1.5"
                                  whileHover={{
                                    borderColor: accent.border,
                                    backgroundColor: accent.bg,
                                    y: -1,
                                  }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <span className={`w-1 h-1 rounded-full ${accent.text.replace('text-', 'bg-')}/50`} />
                                  {highlight}
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

export default Education;