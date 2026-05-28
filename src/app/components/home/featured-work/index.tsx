"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "../../ui/scroll-reveal";
import MagneticButton from "../../ui/magnetic-button";

const FeaturedWork = () => {
  const [featureWork, setFeatureWork] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
        const res = await fetch(`${basePath}/data/featured-work.json`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setFeatureWork(data?.featureWork);
      } catch (error) {
        console.error("Error fetching featured work:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="work" className="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-violet-500/[0.03] blur-[150px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          {/* Section Header */}
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-16 sm:mb-20">
              <div className="flex items-center gap-4">
                <span className="section-label">Featured Work</span>
                <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent min-w-[60px]" />
              </div>
              <MagneticButton strength={0.1}>
                <a
                  href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/document/gokul.resume.pdf`}
                  download="gokul.resume.pdf"
                  className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-500"
                >
                  <span className="text-sm font-medium text-primary/70 group-hover:text-primary transition-colors duration-300">
                    Download Portfolio
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-primary/40 group-hover:text-primary/70 group-hover:translate-y-0.5 transition-all duration-300"
                  >
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </a>
              </MagneticButton>
            </div>
          </ScrollReveal>

          {/* Project Grid */}
          <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {featureWork?.map((work: any, index: number) => (
              <StaggerItem key={index}>
                <motion.div
                  className="group relative rounded-2xl overflow-hidden glass-card border border-white/[0.04]"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {/* Project Image */}
                  <Link href="/" className="block relative aspect-[4/3] overflow-hidden">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent z-10 opacity-40 group-hover:opacity-70 transition-opacity duration-700" />

                    {/* Image */}
                    <Image
                      src={work?.image}
                      alt={work?.title}
                      width={600}
                      height={450}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.2s] ease-out"
                    />

                    {/* Hover overlay content */}
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-8">
                      <motion.div
                        className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100"
                      >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-white/90 border border-white/10 mb-4">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                          View Case Study
                        </span>
                      </motion.div>
                    </div>

                    {/* Corner glow on hover */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" />
                  </Link>

                  {/* Project Info */}
                  <div className="p-6 sm:p-7">
                    <Link href="/" className="group/title">
                      <h4 className="text-lg sm:text-xl font-semibold text-primary mb-2 group-hover/title:text-violet-400 transition-colors duration-300" style={{ fontFamily: "var(--font-display)" }}>
                        {work?.title}
                      </h4>
                    </Link>
                    <p className="text-sm text-primary/40 leading-relaxed mb-4 line-clamp-2">
                      {work?.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {work?.roles?.map((role: string, roleIndex: number) => (
                        <span
                          key={roleIndex}
                          className="text-xs px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-primary/50 font-medium"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom gradient line */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;