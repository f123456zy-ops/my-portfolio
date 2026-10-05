import { ArrowUpRight } from "@phosphor-icons/react";

export function Archive({ items }) {
  return (
    <section id="archive" className="archive" aria-labelledby="archive-title">
      <div className="page-width archive__header">
        <div>
          <p className="section__eyebrow">EARLY ARCHIVE</p>
          <h2 id="archive-title" className="section__title">早期作品 / 设计基础</h2>
        </div>
        <p>这些作品记录了摄影、品牌、界面与三维表达的基础，也构成今天跨媒介工作的底层能力。</p>
      </div>

      <div className="page-width archive__grid">
        {items.map((item) => (
          <article key={item.id} className="archive-card">
            <div className="archive-card__media">
              <img src={item.image} alt={item.alt} loading="lazy" />
            </div>
            <div className="archive-card__meta">
              <div>
                <p>{item.category} · {item.year}</p>
                <h3>{item.title}</h3>
              </div>
              <ArrowUpRight aria-hidden="true" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
