import { useRef, useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { getWorkflowStage } from "../lib/workflow";

const WORKFLOW_STAGES = [
  { index: "01", name: "策略", detail: "需求分析 · 内容规划" },
  { index: "02", name: "生成", detail: "AI 生成 · 素材生产" },
  { index: "03", name: "编辑", detail: "精细优化 · 品牌适配" },
  { index: "04", name: "交付", detail: "多端发布 · 效果复盘" },
];

export function AIPractice({ deliverables, metrics }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabRefs = useRef([]);
  const selected = deliverables[selectedIndex];
  const progress = deliverables.length > 1 ? selectedIndex / (deliverables.length - 1) : 0;
  const activeStage = getWorkflowStage(progress, WORKFLOW_STAGES.length);

  const selectTab = (index, focus = false) => {
    const nextIndex = (index + deliverables.length) % deliverables.length;
    setSelectedIndex(nextIndex);
    if (focus) {
      tabRefs.current[nextIndex]?.focus();
    }
  };

  const handleKeyDown = (event, index) => {
    const keyActions = {
      ArrowRight: () => selectTab(index + 1, true),
      ArrowLeft: () => selectTab(index - 1, true),
      Home: () => selectTab(0, true),
      End: () => selectTab(deliverables.length - 1, true),
    };

    if (keyActions[event.key]) {
      event.preventDefault();
      keyActions[event.key]();
    }
  };

  return (
    <section id="ai-practice" className="ai-practice" aria-labelledby="ai-practice-title">
      <div className="page-width ai-practice__header">
        <div>
          <p className="section__eyebrow">AI PRACTICE</p>
          <h2 id="ai-practice-title" className="section__title">
            从创意到交付
            <br />
            AI 让好内容更高效
          </h2>
        </div>
        <p className="ai-practice__intro">
          摄影、设计与 AI 不是各自独立的工具，而是一套从判断到落地的完整生产流程。
          目标始终是更稳定的质量、更清晰的表达和更高效的交付。
        </p>
      </div>

      <div className="page-width ai-metrics" aria-label="AI 内容生产效率">
        {metrics.map((metric) => (
          <article key={metric.id} className="ai-metric">
            <strong>{metric.value}</strong>
            <h3>{metric.label}</h3>
            <p>{metric.detail}</p>
          </article>
        ))}
      </div>

      <div className="page-width ai-workflow" data-active-stage={activeStage}>
        <ol className="ai-workflow__stages" aria-label="AI 内容生产流程">
          {WORKFLOW_STAGES.map((stage, index) => (
            <li key={stage.index} data-active={index <= activeStage || undefined}>
              <span className="ai-workflow__index">{stage.index}</span>
              <strong className="ai-workflow__stage-name">{stage.name}</strong>
              <span>{stage.detail}</span>
            </li>
          ))}
        </ol>

        <div className="ai-workflow__showcase">
          <div
            className="ai-deliverables"
            role="tablist"
            aria-label="AI 可交付成果"
            aria-orientation="horizontal"
          >
            {deliverables.map((item, index) => (
              <button
                key={item.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                id={`tab-${item.id}`}
                type="button"
                role="tab"
                aria-selected={selectedIndex === index}
                aria-controls={`panel-${item.id}`}
                tabIndex={selectedIndex === index ? 0 : -1}
                onClick={() => selectTab(index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.shortLabel}
              </button>
            ))}
          </div>

          <article
            id={`panel-${selected.id}`}
            className="ai-deliverable-panel"
            role="tabpanel"
            aria-labelledby={`tab-${selected.id}`}
          >
            <div className="ai-deliverable-panel__media">
              <img key={selected.image} src={selected.image} alt={selected.alt} />
              <span>{selected.stage}</span>
            </div>
            <div className="ai-deliverable-panel__copy">
              <p className="ai-deliverable-panel__count">
                {String(selectedIndex + 1).padStart(2, "0")} / {String(deliverables.length).padStart(2, "0")}
              </p>
              <h3>{selected.title}</h3>
              <p>{selected.description}</p>
              <p className="ai-deliverable-panel__outcome">
                {selected.outcome}
                <ArrowUpRight aria-hidden="true" weight="bold" />
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
