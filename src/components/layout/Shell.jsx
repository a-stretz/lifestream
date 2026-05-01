import { Sidebar } from "./Sidebar";
import { PageHeader } from "./PageHeader";

export function Shell({ activeView, onNavigate, header, children }) {
  return (
    <div className="app-shell">
      <Sidebar activeView={activeView} onNavigate={onNavigate} />
      <main className="main-panel">
        <PageHeader {...header} />
        {children}
      </main>
    </div>
  );
}
