export function Footer({ profile }) {
  return (
    <footer className="site-footer">
      <div className="page-width site-footer__inner">
        <strong>{profile.initials}</strong>
        <span>{profile.name} · {profile.title}</span>
        <span>© {new Date().getFullYear()} {profile.name}</span>
      </div>
    </footer>
  );
}
