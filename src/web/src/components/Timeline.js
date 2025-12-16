// Timeline.js - Display updates chronologically

export function createTimeline(updates) {
  const container = document.createElement('div');
  container.className = 'timeline';

  if (!updates || updates.length === 0) {
    container.innerHTML = '<p class="no-data">No updates yet. Submit the first one!</p>';
    return container;
  }

  const heading = document.createElement('h3');
  heading.textContent = 'Update History';
  container.appendChild(heading);

  const timeline = document.createElement('div');
  timeline.className = 'timeline-items';

  updates.forEach((update) => {
    const item = document.createElement('div');
    item.className = 'timeline-item card';
    
    const date = new Date(update.created_at * 1000);
    const statusClass = update.status.toLowerCase().replace(' ', '-');
    
    item.innerHTML = `
      <div class="timeline-header">
        <span class="status-badge status-${statusClass}">${update.status}</span>
        <span class="progress-badge">${update.percent_complete}%</span>
        <span class="timestamp">${date.toLocaleDateString()} ${date.toLocaleTimeString()}</span>
      </div>
      ${update.blockers ? `<div class="timeline-blockers"><strong>Blockers:</strong> ${update.blockers}</div>` : ''}
      ${update.next_steps ? `<div class="timeline-next"><strong>Next Steps:</strong> ${update.next_steps}</div>` : ''}
    `;

    timeline.appendChild(item);
  });

  container.appendChild(timeline);
  return container;
}

export default { createTimeline };
