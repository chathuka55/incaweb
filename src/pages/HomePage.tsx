import { Hero } from "@/sections/home/Hero";
import { Intro } from "@/sections/home/Intro";
import { BuildSelector } from "@/sections/home/BuildSelector";
import { SolutionsGrid } from "@/sections/home/SolutionsGrid";
import { IndustriesSelector } from "@/sections/home/IndustriesSelector";
import { Process } from "@/sections/home/Process";
import { WorkShowcase } from "@/sections/home/WorkShowcase";
import { TechArchitecture } from "@/sections/home/TechArchitecture";
import { WhyIncasoft } from "@/sections/home/WhyIncasoft";
import { DiscoveryCTA, FinalCTA } from "@/sections/home/FinalCTA";

export function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <BuildSelector />
      <SolutionsGrid />
      <IndustriesSelector />
      <Process />
      <WorkShowcase />
      <TechArchitecture />
      <WhyIncasoft />
      <DiscoveryCTA />
      <FinalCTA />
    </>
  );
}
