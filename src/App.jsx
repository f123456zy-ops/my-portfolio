import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { AIPractice } from "./components/AIPractice";
import { Archive } from "./components/Archive";
import { About } from "./components/About";
import { Capabilities } from "./components/Capabilities";
import { Experience } from "./components/Experience";
import { JobContact } from "./components/JobContact";
import { Projects } from "./components/Projects";
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
  return (
    <div className="site-shell">
      <Header sections={PAGE_SECTIONS} />
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
