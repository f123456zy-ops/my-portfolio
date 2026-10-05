import { DownloadSimple } from "@phosphor-icons/react";

const PROFILE_METRICS = [
  { value: "3+", label: "年实战经验" },
  { value: "100+", label: "培训与协作场次" },
  { value: "前 5%", label: "专业排名" },
  { value: "持续", label: "探索 AI 应用" },
];

export function About({ profile }) {
  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="page-width about__layout">
        <div className="about__copy">
          <p className="section__eyebrow">ABOUT</p>
          <h2 id="about-title" className="section__title">
            用影像讲述真实
            <br />
            也用 AI 创造更多可能
          </h2>
          <p>{profile.summary}</p>
          <div className="about__metrics" aria-label="个人概况">
            {PROFILE_METRICS.map((metric) => (
              <div key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
          <a className="button button--primary" href="/resume-wang-zeyi.pdf" download>
            下载简历 PDF
            <DownloadSimple aria-hidden="true" weight="bold" />
          </a>
        </div>
        <figure className="about__portrait">
          <img src={profile.portrait} alt={`${profile.name}个人肖像`} loading="lazy" />
          <figcaption>
            <span>VISUAL CREATOR</span>
            <strong>保持热爱，持续创造</strong>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
