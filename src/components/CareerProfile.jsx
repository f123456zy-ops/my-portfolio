export function CareerProfile({ items, skills }) {
  return (
    <section id="career" className="career-profile" aria-labelledby="career-profile-title">
      <div className="page-width career-profile__heading" data-reveal>
        <p className="section__eyebrow">EXPERIENCE & CAPABILITY</p>
        <div>
          <h2 id="career-profile-title" className="section__title">
            经历与岗位能力
          </h2>
          <p>从视觉设计进入真实内容生产，在新媒体运营、影像执行与 AI 应用之间建立可复用的方法。</p>
        </div>
      </div>

      <div className="page-width career-profile__layout">
        <div className="career-profile__timeline-wrap">
          <h3>工作与教育</h3>
          <ol className="career-profile__timeline" aria-label="工作与教育经历">
            {items.map((item) => (
              <li key={item.id} data-reveal>
                <p className="career-profile__period">{item.period}</p>
                <h4>{item.company}</h4>
                <p className="career-profile__role">{item.role}</p>
                <p>{item.summary}</p>
                <p className="career-profile__highlights">
                  {item.highlights.map((highlight) => (
                    <span key={highlight}>{highlight}</span>
                  ))}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="career-profile__skills">
          <h3>岗位能力</h3>
          {skills.map((skill) => (
            <article key={skill.id} data-role-skill data-reveal>
              <span>{skill.index}</span>
              <div>
                <h4>{skill.title}</h4>
                <p>{skill.description}</p>
                <ul aria-label={`${skill.title}相关工具与领域`}>
                  {skill.tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
