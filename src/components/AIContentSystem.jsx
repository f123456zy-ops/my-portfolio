import { useRef, useState } from "react";
import { getWorkflowStage } from "../lib/workflow";

export function AIContentSystem({ stages, metrics, deliverables }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabRefs = useRef([]);
  const selected = deliverables[selectedIndex];
  const progress = deliverables.length > 1 ? selectedIndex / (deliverables.length - 1) : 0;
  const activeStage = getWorkflowStage(progress, stages.length);

  const selectTab = (index, shouldFocus = false) => {
    const nextIndex = (index + deliverables.length) % deliverables.length;
    setSelectedIndex(nextIndex);
    if (shouldFocus) {
      tabRefs.current[nextIndex]?.focus();
    }
  };

  const handleTabKeyDown = (event, index) => {
    const actions = {
      ArrowRight: () => selectTab(index + 1, true),
      ArrowLeft: () => selectTab(index - 1, true),
      Home: () => selectTab(0, true),
      End: () => selectTab(deliverables.length - 1, true),
    };

    const action = actions[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  };

  return (
    <section id="ai" className="ai-system" aria-labelledby="ai-system-title">
      <div className="page-width ai-system__heading" data-reveal>
        <p className="section__eyebrow">AI CONTENT SYSTEM</p>
        <div className="ai-system__heading-grid">
          <h2 id="ai-system-title" className="section__title">
            AI 进入流程，内容真正落地
          </h2>
          <p>
            从选题与脚本开始，让生成式工具、实拍、剪辑和平台适配进入同一条生产链。
            AI 提升效率，最终判断仍由人完成。
          </p>
        </div>
      </div>

      <ol className="page-width ai-system__stages" aria-label="AI 内容生产流程">
        {stages.map((stage, index) => (
          <li key={stage.id} data-active={index <= activeStage || undefined} data-reveal>
            <span className="ai-system__stage-index">{stage.index}</span>
            <div>
              <h3>{stage.title}</h3>
              <p>{stage.description}</p>
              <ul aria-label={`${stage.title}相关工具与方法`}>
                {stage.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <div className="page-width ai-system__metrics" aria-label="已验证的内容生产效率">
        {metrics.map((metric) => (
          <article key={metric.id} className="ai-system__metric" data-reveal>
            <strong>{metric.value}</strong>
            <h3>{metric.label}</h3>
            <p>{metric.detail}</p>
          </article>
        ))}
      </div>

      <div className="page-width ai-system__deliverables" data-reveal>
        <div
          className="ai-system__tabs"
          role="tablist"
          aria-label="可落地的 AI 内容交付物"
          aria-orientation="horizontal"
        >
          {deliverables.map((item, index) => (
            <button
              key={item.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={`ai-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={selectedIndex === index}
              aria-controls={`ai-panel-${item.id}`}
              tabIndex={selectedIndex === index ? 0 : -1}
              onClick={() => selectTab(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.shortLabel}
            </button>
          ))}
        </div>

        <article
          id={`ai-panel-${selected.id}`}
          className="ai-system__panel"
          role="tabpanel"
          aria-labelledby={`ai-tab-${selected.id}`}
        >
          <div className="ai-system__panel-media">
            <img key={selected.image} src={selected.image} alt={selected.alt} loading="lazy" />
          </div>
          <div className="ai-system__panel-copy">
            <p className="ai-system__panel-category">{selected.stage}</p>
            <h3>{selected.title}</h3>
            <p>{selected.description}</p>
            <p className="ai-system__panel-outcome">{selected.outcome}</p>
            <p className="ai-system__panel-count">
              {String(selectedIndex + 1).padStart(2, "0")} /{" "}
              {String(deliverables.length).padStart(2, "0")}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
