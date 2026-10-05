export function Capabilities({ items }) {
  return (
    <section className="capabilities" aria-labelledby="capabilities-title">
      <div className="page-width capabilities__layout">
        <div className="capabilities__intro">
          <p className="section__eyebrow">CAPABILITIES</p>
          <h2 id="capabilities-title" className="section__title">我的能力</h2>
          <p>AI 是能力结构的第一项；摄影、剪辑与视觉设计仍是判断质量和完成交付的基础。</p>
        </div>
        <div className="capabilities__list">
          {items.map((item, index) => (
            <article key={item.id} className="capability" data-featured={index === 0 || undefined}>
              <span>{item.index}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ul aria-label={`${item.title}相关工具与领域`}>
                  {item.tools.map((tool) => <li key={tool}>{tool}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
