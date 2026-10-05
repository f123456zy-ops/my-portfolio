export function Section({ id, eyebrow, title, children, className = "", theme = "paper" }) {
  return (
    <section id={id} className={`section section--${theme} ${className}`.trim()}>
      <div className="page-width">
        <p className="section__eyebrow">{eyebrow}</p>
        <h2 className="section__title">{title}</h2>
        {children}
      </div>
    </section>
  );
}
