import { useEffect } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { AIContentSystem } from "./components/AIContentSystem";
import { FeaturedCases } from "./components/FeaturedCases";
import { CareerProfile } from "./components/CareerProfile";
import { ProfileContact } from "./components/ProfileContact";
import { IntroCurtain } from "./components/IntroCurtain";
import { useSectionObserver } from "./hooks/useSectionObserver";
import {
  AI_DELIVERABLES,
  AI_METRICS,
  AI_WORKFLOW_STAGES,
  CAREER,
  CONTACT,
  FEATURED_CASES,
  PAGE_SECTIONS,
  ROLE_SKILLS,
  SITE_PROFILE,
  VISUAL_ARCHIVE,
} from "./content/portfolio";

export function App() {
  const { activeId, visibleIds } = useSectionObserver(PAGE_SECTIONS);

  useEffect(() => {
    for (const id of PAGE_SECTIONS) {
      document.getElementById(id)?.toggleAttribute("data-revealed", visibleIds.has(id));
    }
  }, [visibleIds]);

  useEffect(() => {
    const sections = document.querySelectorAll("main > section");
    const observedSections = new Set(PAGE_SECTIONS);
    sections.forEach((section) => {
      section.setAttribute("data-reveal", "");
      if (!observedSections.has(section.id)) {
        section.setAttribute("data-revealed", "");
      }
    });
    const frame = window.requestAnimationFrame(() => {
      document.documentElement.setAttribute("data-motion-ready", "");
    });
    return () => {
      window.cancelAnimationFrame(frame);
      document.documentElement.removeAttribute("data-motion-ready");
    };
  }, []);

  return (
    <div className="site-shell">
      <IntroCurtain />
      <Header sections={PAGE_SECTIONS} activeSection={activeId} />
      <main>
        <Hero profile={SITE_PROFILE} />
        <AIContentSystem
          stages={AI_WORKFLOW_STAGES}
          metrics={AI_METRICS}
          deliverables={AI_DELIVERABLES}
        />
        <FeaturedCases cases={FEATURED_CASES} archive={VISUAL_ARCHIVE} />
        <CareerProfile items={CAREER} skills={ROLE_SKILLS} />
        <ProfileContact profile={SITE_PROFILE} contact={CONTACT} />
      </main>
      <Footer profile={SITE_PROFILE} />
    </div>
  );
}
