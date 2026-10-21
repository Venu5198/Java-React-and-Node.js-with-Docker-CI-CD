import React, { useState } from 'react';
import Header from './components/Header';
import StatusCard from './components/StatusCard';
import EmployeeTable from './components/EmployeeTable';

const INITIAL_EMPLOYEES = [
  { id: 1, name: 'Alice Johnson', role: 'DevOps Engineer', department: 'Infrastructure', email: 'alice.johnson@example.com' },
  { id: 2, name: 'Bob Smith', role: 'Backend Developer', department: 'Engineering', email: 'bob.smith@example.com' },
  { id: 3, name: 'Carol Williams', role: 'Frontend Developer', department: 'Product Design', email: 'carol.williams@example.com' },
  { id: 4, name: 'David Brown', role: 'Site Reliability Engineer', department: 'Operations', email: 'david.brown@example.com' }
];

export default function App() {
  const [employees] = useState(INITIAL_EMPLOYEES);

  return (
    <div className="app">
      <Header />

      <main className="dashboard-container">
        <section className="stats-grid">
          <StatusCard
            title="React Frontend"
            value="Healthy"
            detail="Serving static SPA bundle via Nginx (Port 3000)"
            badge="Online"
            badgeType="healthy"
          />
          <StatusCard
            title="Java Service"
            value="Spring Boot 3.3"
            detail="REST API listening on container port 8080"
            badge="Port 8080"
            badgeType="info"
          />
          <StatusCard
            title="Node.js Service"
            value="Express API"
            detail="REST API listening on host port 3001"
            badge="Port 3001"
            badgeType="info"
          />
          <StatusCard
            title="CI/CD Pipeline"
            value="GitHub Actions"
            detail="Automated test, lint & multi-stage Docker build"
            badge="Configured"
            badgeType="healthy"
          />
        </section>

        <section>
          <div className="section-header">
            <h2 className="section-title">Sample Employees Directory</h2>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Showing {employees.length} records
            </span>
          </div>
          <EmployeeTable employees={employees} />
        </section>
      </main>

      <footer className="footer">
        DevOps Practice Project • Java 21, React 18, Node 20/22 LTS, Docker & GitHub Actions CI
      </footer>
    </div>
  );
}
