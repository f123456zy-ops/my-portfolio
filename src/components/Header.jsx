import { useState } from "react";
import { DownloadSimple, List, X } from "@phosphor-icons/react";

const NAV_ITEMS = [
  { id: "home", label: "首页" },
  { id: "ai-practice", label: "AI 实践" },
  { id: "projects", label: "项目" },
  { id: "archive", label: "早期作品" },
  { id: "about", label: "关于" },
  { id: "experience", label: "经历" },
  { id: "contact", label: "联系" },
];

export function Header({ sections, activeSection = "home" }) {
  const [open, setOpen] = useState(false);
  const availableSections = new Set(sections);
  const items = NAV_ITEMS.filter((item) => availableSections.has(item.id));
  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header" data-menu-open={open || undefined}>
      <a className="site-header__logo" href="#home" onClick={closeMenu} aria-label="王泽毅首页">
        WZY
      </a>

      <button
        className="site-header__toggle"
        type="button"
        aria-controls="primary-navigation"
        aria-expanded={open}
        aria-label={open ? "关闭导航" : "打开导航"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X aria-hidden="true" /> : <List aria-hidden="true" />}
      </button>

      <nav
        id="primary-navigation"
        className="site-header__nav"
        aria-label="主导航"
        data-open={open || undefined}
      >
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={activeSection === item.id ? "page" : undefined}
            onClick={closeMenu}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <a className="button button--header" href="/resume-wang-zeyi.pdf" download>
        下载简历
        <DownloadSimple aria-hidden="true" weight="bold" />
      </a>
    </header>
  );
}
