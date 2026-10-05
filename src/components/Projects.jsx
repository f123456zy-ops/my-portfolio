import { useCallback, useRef, useState } from "react";
import { ArrowUpRight, Play } from "@phosphor-icons/react";
import { MediaDialog } from "./MediaDialog";

export function Projects({ items }) {
  const [selected, setSelected] = useState(null);
  const lastTrigger = useRef(null);

  const openProject = (item, trigger) => {
    lastTrigger.current = trigger;
    setSelected(item);
  };

  const closeProject = useCallback(() => {
    setSelected(null);
    lastTrigger.current?.focus();
  }, []);

  return (
    <section id="projects" className="projects" aria-labelledby="projects-title">
      <div className="page-width projects__header">
        <div>
          <p className="section__eyebrow">SELECTED WORK</p>
          <h2 id="projects-title" className="section__title">
            影像 × 设计 × AI
            <br />
            让创意成为真实结果
          </h2>
        </div>
        <p>从品牌影像到内容工作流，每个项目都从具体问题出发，以清晰的视觉和可交付的结果结束。</p>
      </div>

      <div className="page-width projects__list">
        {items.map((item, index) => {
          const mediaLabel = item.discipline.includes("AI VIDEO") ? "AI 视频" : item.title;
          return (
            <article key={item.id} className="project" data-reverse={index % 2 === 1 || undefined}>
              <button
                className="project__media"
                type="button"
                aria-label={`查看项目：${mediaLabel} · ${item.title}`}
                onClick={(event) => openProject(item, event.currentTarget)}
              >
                <img src={item.image} alt={item.alt} loading="lazy" />
                {item.video && (
                  <span className="project__play" aria-hidden="true">
                    <Play weight="fill" />
                  </span>
                )}
              </button>
              <div className="project__copy">
                <p className="project__discipline">{item.discipline}</p>
                <h3>{item.title}</h3>
                <p className="project__role">{item.role}</p>
                <p>{item.summary}</p>
                <strong>{item.outcome}</strong>
                <button
                  type="button"
                  className="project__open"
                  aria-label={`查看项目详情：${item.title}`}
                  onClick={(event) => openProject(item, event.currentTarget)}
                >
                  查看项目
                  <ArrowUpRight aria-hidden="true" weight="bold" />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {selected && <MediaDialog item={selected} onClose={closeProject} />}
    </section>
  );
}
