import { Header } from "@/components/sites/opencode-2d59a23a/root-8a5edab2/Header";
import { FooterSection } from "@/components/sites/opencode-2d59a23a/root-8a5edab2/FooterSection";
import { LegalSection } from "@/components/sites/opencode-2d59a23a/root-8a5edab2/LegalSection";
import { HomeHero, WhatIDo, FeaturedPortfolio, RecentBlogs, TechStack, ContactCTA } from "@/components/home/HomeSections";

export default function HomePage() {
  return (
    <main data-page="opencode" className="min-h-screen bg-[var(--color-background)]">
      <div
        data-component="container"
        className="max-w-[67.5rem] mx-auto border-x border-[var(--color-border-weak)] max-[65rem]:border-x-0"
      >
        <Header />
        <div data-component="content">
          <HomeHero />
          <WhatIDo />
          <FeaturedPortfolio />
          <RecentBlogs />
          <TechStack />
          <ContactCTA />
          <FooterSection />
          <LegalSection />
        </div>
      </div>
    </main>
  );
}
