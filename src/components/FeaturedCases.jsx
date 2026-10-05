import { useCallback, useRef, useState } from "react";
import { CaseStudyDialog } from "./CaseStudyDialog";

function FeaturedCase({ item, index, onOpen }) {
  const [mediaFailed, setMediaFailed] = useState(false);

  return (
    <article
      className="featured-cases__case"
      data-featured-case
      data-layout={index === 1 ? "offset" : "wide"}
      data-reveal
    >
      <button
        type="button"
        className="featured-cases__media"
        data-media-failed={mediaFailed || undefined}
        aria-label={`查看案例：${item.title}`}
        onClick={(event) => onOpen(item, event.currentTarget)}
      >
        <img src={item.image} alt={item.alt} loading="lazy" onError={() => setMediaFailed(true)} />
        <span className="featured-cases__media-status" aria-hidden="true">
          {mediaFailed ? "IMAGE UNAVAILABLE" : String(index + 1).padStart(2, "0")}
        </span>
      </button>

      <div className="featured-cases__copy">
        <div className="featured-cases__meta">
          <p>{item.discipline}</p>
          <p>{item.period}</p>
        </div>
        <h3>{item.title}</h3>
        <p className="featured-cases__role">{item.role}</p>
        <p>{item.context}</p>
        <strong>{item.outcome}</strong>
        <button
          type="button"
          className="featured-cases__open"
          aria-label={`查看案例详情：${item.title}`}
          onClick={(event) => onOpen(item, event.currentTarget)}
        >
          查看完整案例
        </button>
      </div>
    </article>
  );
}

export function FeaturedCases({ cases, archive }) {
  const [selected, setSelected] = useState(null);
  const lastTrigger = useRef(null);

  const openCase = (item, trigger) => {
    lastTrigger.current = trigger;
    setSelected(item);
  };

  const closeCase = useCallback(() => {
    setSelected(null);
    lastTrigger.current?.focus();
  }, []);

  return (
    <section id="work" className="featured-cases" aria-labelledby="featured-cases-title">
      <div className="page-width featured-cases__heading" data-reveal>
        <p className="section__eyebrow">SELECTED CASES</p>
        <div>
          <h2 id="featured-cases-title" className="section__title">
            代表项目
          </h2>
          <p>用三个真实项目说明我如何连接内容判断、AI 生产、现场拍摄和最终交付。</p>
        </div>
      </div>

      <div className="page-width featured-cases__list">
        {cases.map((item, index) => (
          <FeaturedCase key={item.id} item={item} index={index} onOpen={openCase} />
        ))}
      </div>

      <details className="page-width featured-cases__archive" data-reveal>
        <summary>
          <span>视觉基础档案</span>
          <span>{String(archive.length).padStart(2, "0")} PROJECTS</span>
        </summary>
        <p className="featured-cases__archive-intro">
          摄影、品牌、界面、海报与三维练习，构成今天跨媒介内容工作的视觉基础。
        </p>
        <div className="featured-cases__archive-grid">
          {archive.map((item) => (
            <article key={item.id}>
              <div className="featured-cases__archive-media">
                <img src={item.image} alt={item.alt} loading="lazy" />
              </div>
              <p>
                {item.category} · {item.year}
              </p>
              <h3>{item.title}</h3>
            </article>
          ))}
        </div>
      </details>

      {selected && <CaseStudyDialog item={selected} onClose={closeCase} />}
    </section>
  );
}
