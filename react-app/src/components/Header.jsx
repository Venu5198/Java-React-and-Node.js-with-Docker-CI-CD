
export default function Header() {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="brand-wrapper">
          <div className="brand-badge">CI</div>
          <div>
            <h1 className="brand-title">DevOps Service Dashboard</h1>
            <p className="brand-subtitle">Java Spring Boot • React Vite • Node.js Express</p>
          </div>
        </div>
        <div>
          <span className="status-badge healthy">● System Active</span>
        </div>
      </div>
    </header>
  );
}
