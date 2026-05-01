const navItems = [
  "Overview",
  "Initiatives",
  "Prioritize",
  "Intelligence",
  "Software Rationalization",
  "Roadmap",
  "Add Initiative",
  "Add Input"
];

export function Sidebar({ activeView, onNavigate }) {
  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <div className="brand-lockup">
        <img src="/assets/Lifestream-white-icon.png" alt="" className="brand-mark" />
        <div>
          <p className="brand-name">Lifestream</p>
          <p className="brand-kicker">Initiative intelligence</p>
        </div>
      </div>

      <nav className="nav-list">
        {navItems.map((item) => (
          <button
            key={item}
            type="button"
            className={`nav-item ${activeView === item ? "active" : ""}`}
            onClick={() => onNavigate(item)}
          >
            <span className="nav-dot" aria-hidden="true" />
            <span>{item}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <img src="/assets/Lifestream-full.png" alt="Lifestream" className="footer-logo" />
        <p>Lifestream captures distributed signals and turns them into reusable operating context.</p>
      </div>
    </aside>
  );
}
