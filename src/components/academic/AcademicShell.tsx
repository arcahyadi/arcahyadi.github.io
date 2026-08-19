import React from "react";
import { Header } from "@/components/sites/opencode-2d59a23a/root-8a5edab2/Header";
import { FooterSection } from "@/components/sites/opencode-2d59a23a/root-8a5edab2/FooterSection";
import { LegalSection } from "@/components/sites/opencode-2d59a23a/root-8a5edab2/LegalSection";
import { AuthorSidebar } from "./AuthorSidebar";

export function AcademicShell({
  title,
  subtitle,
  children,
  withSidebar = true,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  withSidebar?: boolean;
}) {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <div className="max-w-[67.5rem] mx-auto border-x border-[var(--color-border-weak)] max-[65rem]:border-x-0">
        <Header />
        <div className="flex flex-col md:flex-row gap-0">
          {withSidebar ? (
            <div className="border-b md:border-b-0 md:border-r border-[var(--color-border-weak)]">
              <AuthorSidebar />
            </div>
          ) : null}
          <div className="flex-1 min-w-0">
            <div className="px-6 py-10 md:px-10 md:py-12 border-b border-[var(--color-border-weak)]">
              <h1 className="text-[24px] md:text-[30px] font-bold text-[var(--color-text-strong)] leading-tight">{title}</h1>
              {subtitle ? <p className="text-[var(--color-text)] text-sm md:text-base mt-2 leading-relaxed">{subtitle}</p> : null}
            </div>
            <div className="px-6 py-8 md:px-10 md:py-10">{children}</div>
          </div>
        </div>
        <FooterSection />
        <LegalSection />
      </div>
    </main>
  );
}
