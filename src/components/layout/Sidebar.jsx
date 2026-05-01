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
        <span className="brand-orb" aria-hidden="true" />
        <div>
          <p className="brand-name">Lifestream</p>
          <p className="brand-kicker">Initiative Intelligence</p>
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
    </aside>
  );
}


