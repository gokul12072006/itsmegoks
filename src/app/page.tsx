"use client";

import SmoothScrollProvider from "./components/providers/smooth-scroll";
import HeroSection from "./components/home/hero-section";
import AboutMe from "./components/home/about-me";
import FeaturedWork from "./components/home/featured-work";
import Experience from "./components/home/experience";
import Education from "./components/home/education";
import ProjectOverview from "./components/home/project-overview";

const Page = () => {
  return (
    <SmoothScrollProvider>
      <main className="relative">
        {/* Ambient background glow */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/4 w-[800px] h-[600px] rounded-full bg-violet-500/[0.03] blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/[0.03] blur-[120px]" />
        </div>

        <div className="relative z-10">
          <HeroSection />
          <AboutMe />
          <FeaturedWork />
          <Experience />
          <Education />
          <ProjectOverview />
        </div>
      </main>
    </SmoothScrollProvider>
  );
};

export default Page;