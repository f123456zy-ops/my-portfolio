import { useEffect } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { AIPractice } from "./components/AIPractice";
import { Archive } from "./components/Archive";
import { About } from "./components/About";
import { Capabilities } from "./components/Capabilities";
import { Experience } from "./components/Experience";
import { JobContact } from "./components/JobContact";
import { IntroCurtain } from "./components/IntroCurtain";
import { Projects } from "./components/Projects";
import { useSectionObserver } from "./hooks/useSectionObserver";
import {
  AI_DELIVERABLES,
  AI_METRICS,
  ARCHIVE_PROJECTS,
  CAPABILITIES,
  CONTACT,
  EXPERIENCE,
  PAGE_SECTIONS,
  PROJECTS,
  SITE_PROFILE,
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
        <AIPractice deliverables={AI_DELIVERABLES} metrics={AI_METRICS} />
        <Projects items={PROJECTS} />
        <Archive items={ARCHIVE_PROJECTS} />
        <About profile={SITE_PROFILE} />
        <Capabilities items={CAPABILITIES} />
        <Experience items={EXPERIENCE} />
        <JobContact contact={CONTACT} />
      </main>
      <Footer profile={SITE_PROFILE} />
    </div>
  );
}
