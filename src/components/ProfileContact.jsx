export function ProfileContact({ profile, contact }) {
  return (
    <section id="about" className="profile-contact" aria-labelledby="profile-contact-title">
      <div className="page-width profile-contact__layout">
        <figure className="profile-contact__portrait" data-reveal>
          <img src={profile.portrait} alt={`${profile.name}个人肖像`} loading="lazy" />
          <figcaption>
            <span>{profile.city}</span>
            <strong>{profile.title}</strong>
          </figcaption>
        </figure>

        <div className="profile-contact__content" data-reveal>
          <p className="section__eyebrow">ABOUT & CONTACT</p>
          <h2 id="profile-contact-title" className="section__title">
            关于王泽毅
          </h2>
          <p className="profile-contact__summary">{profile.summary}</p>
          <p className="profile-contact__intent">{profile.jobSeekingStatement}</p>

          <div className="profile-contact__actions">
            <a className="button button--primary" href={contact.resumePath} download>
              下载简历 PDF
            </a>
            <a href={contact.emailHref} aria-label={`发送邮件至 ${contact.email}`}>
              <span>邮箱</span>
              <strong>{contact.email}</strong>
            </a>
            <a href={contact.phoneHref} aria-label={`拨打电话 ${contact.phone}`}>
              <span>电话</span>
              <strong>{contact.phone}</strong>
            </a>
          </div>

          <div className="profile-contact__wechat">
            <div>
              <span>微信</span>
              <strong>{contact.wechatLabel}</strong>
            </div>
            <img src={contact.qrPath} alt="王泽毅微信二维码" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}
