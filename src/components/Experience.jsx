export function Experience({ items }) {
  return (
    <section id="experience" className="experience" aria-labelledby="experience-title">
      <div className="page-width experience__header">
        <div>
          <p className="section__eyebrow">EXPERIENCE</p>
          <h2 id="experience-title" className="section__title">
            在实践中持续成长
          </h2>
        </div>
        <p>从视觉设计进入真实内容生产，在影像、运营与 AI 应用之间建立可复用的方法。</p>
      </div>
      <ol className="page-width experience__timeline">
        {items.map((item) => (
          <li key={item.id}>
            <span className="experience__dot" aria-hidden="true" />
            <p className="experience__period">{item.period}</p>
            <h3>{item.company}</h3>
            <p className="experience__role">{item.role}</p>
            <p>{item.summary}</p>
            <ul>
              {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
