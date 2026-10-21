import React from 'react';

export default function StatusCard({ title, value, detail, badge, badgeType = 'info' }) {
  return (
    <div className="card">
      <div className="status-card-header">
        <span className="status-label">{title}</span>
        {badge && <span className={`status-badge ${badgeType}`}>{badge}</span>}
      </div>
      <div className="status-val">{value}</div>
      <div className="status-detail">{detail}</div>
    </div>
  );
}
