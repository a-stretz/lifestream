export function PageHeader({ title, eyebrow, description, metric }) {
  return (
    <header className="page-header">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-description">{description}</p>
      </div>
      {metric ? (
        <div className="header-metric" aria-label={metric.label}>
          <strong>{metric.value}</strong>
          <span>{metric.label}</span>
        </div>
      ) : null}
    </header>
  );
}
