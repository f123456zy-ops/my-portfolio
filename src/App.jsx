import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { AIPractice } from "./components/AIPractice";
import { Archive } from "./components/Archive";
import { Projects } from "./components/Projects";
import { Section } from "./components/Section";
import {
  AI_DELIVERABLES,
  AI_METRICS,
  ARCHIVE_PROJECTS,
  PAGE_SECTIONS,
  PROJECTS,
  SITE_PROFILE,
} from "./content/portfolio";

const SHELL_SECTIONS = [
  { id: "about", eyebrow: "ABOUT", title: "关于与能力" },
  { id: "experience", eyebrow: "EXPERIENCE", title: "经历" },
  { id: "contact", eyebrow: "CONTACT", title: "期待新的工作机会" },
];

export function App() {
  return (
    <div className="site-shell">
      <Header sections={PAGE_SECTIONS} />
      <main>
        <Hero profile={SITE_PROFILE} />
        <AIPractice deliverables={AI_DELIVERABLES} metrics={AI_METRICS} />
        <Projects items={PROJECTS} />
        <Archive items={ARCHIVE_PROJECTS} />
        <div className="shell-preview" aria-hidden="true">
          {SHELL_SECTIONS.map((section) => (
            <Section key={section.id} {...section} className="shell-preview__section" />
          ))}
        </div>
      </main>
      <Footer profile={SITE_PROFILE} />
    </div>
  );
}
