"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "../../ui/scroll-reveal";

const ProjectOverview = () => {
  const [projectData, setProjectData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
        const res = await fetch(`${basePath}/data/page-data.json`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setProjectData(data?.projectOverview);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[400px] bg-amber-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          {/* Case Studies */}
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-10 sm:mb-12">
              <span className="section-label">Case Studies</span>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.1} className="flex flex-col gap-4 mb-20 sm:mb-24">
            {projectData?.caseStudies?.map((study: any, index: number) => (
              <StaggerItem key={index}>
                <Link href={study?.url || "#"} target="_blank" rel="noopener noreferrer" className="group">
                  <motion.div
                    className="flex items-center justify-between p-5 sm:p-6 rounded-xl glass-card glass-card-hover"
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary/60">{index + 1}</span>
                      </div>
                      <h4 className="text-lg sm:text-xl font-semibold text-primary group-hover:text-violet-400 transition-colors duration-300" style={{ fontFamily: "var(--font-display)" }}>
                        {study?.name}
                      </h4>
                    </div>
                    <motion.div
                      className="flex-shrink-0"
                      whileHover={{ rotate: 45, scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-primary/30 group-hover:text-violet-400 transition-colors duration-300"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </motion.div>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Side Projects */}
          <ScrollReveal>
            <div id="side-projects" className="flex items-center gap-4 mb-10 sm:mb-12">
              <span className="section-label">Side Projects</span>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
            </div>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.1} className="flex flex-col gap-4">
            {projectData?.sideProjects?.map((project: any, index: number) => {
              const isComingSoon = project?.comingSoon;

              const content = (
                <motion.div
                  className={`flex items-center justify-between p-5 sm:p-6 rounded-xl ${
                    isComingSoon
                      ? "border border-white/[0.04] bg-white/[0.01]"
                      : "glass-card glass-card-hover"
                  }`}
                  whileHover={!isComingSoon ? { x: 8 } : undefined}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isComingSoon
                        ? "bg-white/[0.02]"
                        : "bg-gradient-to-br from-amber-500/20 to-rose-500/20"
                    }`}>
                      <span className={`text-sm font-bold ${isComingSoon ? "text-primary/20" : "text-primary/60"}`}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h4
                      className={`text-lg sm:text-xl font-semibold transition-colors duration-300 ${
                        isComingSoon
                          ? "text-primary/25"
                          : "text-primary group-hover:text-amber-400"
                      }`}
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {project?.name}
                    </h4>
                  </div>

                  {isComingSoon ? (
                    <span className="text-xs px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-primary/25 font-medium">
                      Coming Soon
                    </span>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-primary/30 group-hover:text-amber-400 transition-colors duration-300 flex-shrink-0"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  )}
                </motion.div>
              );

              return isComingSoon ? (
                <StaggerItem key={index}>{content}</StaggerItem>
              ) : (
                <StaggerItem key={index}>
                  <Link href={project?.url || "/"} target="_blank" rel="noopener noreferrer" className="group block">
                    {content}
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default ProjectOverview;