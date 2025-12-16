// StatusBadge.js - Color-coded status indicator

export function createStatusBadge(status) {
  const badge = document.createElement('span');
  badge.className = `status-badge status-${status.toLowerCase().replace(' ', '-')}`;
  badge.textContent = status;
  return badge;
}

export default { createStatusBadge };
