import { DownloadSimple, EnvelopeSimple, Phone, WechatLogo } from "@phosphor-icons/react";

export function JobContact({ contact }) {
  return (
    <section id="contact" className="job-contact" aria-labelledby="contact-title">
      <div className="page-width job-contact__layout">
        <div className="job-contact__main">
          <p className="section__eyebrow">CONTACT</p>
          <h2 id="contact-title" className="section__title">{contact.heading}</h2>
          <p>{contact.statement}</p>
          <a className="button button--primary" href={contact.resumePath} download>
            下载简历 PDF
            <DownloadSimple aria-hidden="true" weight="bold" />
          </a>
        </div>

        <div className="job-contact__methods">
          <a href={contact.emailHref} aria-label={`发送邮件至 ${contact.email}`}>
            <EnvelopeSimple aria-hidden="true" />
            <span>邮箱</span>
            <strong>{contact.email}</strong>
          </a>
          <a href={contact.phoneHref} aria-label={`拨打电话 ${contact.phone}`}>
            <Phone aria-hidden="true" />
            <span>电话</span>
            <strong>{contact.phone}</strong>
          </a>
          <div className="job-contact__wechat">
            <WechatLogo aria-hidden="true" />
            <span>微信</span>
            <strong>{contact.wechatLabel}</strong>
            <img src={contact.qrPath} alt="王泽毅微信二维码" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}
