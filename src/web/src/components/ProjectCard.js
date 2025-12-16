// ProjectCard.js - Display project summary card

export function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card card';

  const latestUpdate = project.latest_update;
  const status = latestUpdate?.status || 'No updates';
  const percent = latestUpdate?.percent_complete ?? 0;
  const statusClass = status.toLowerCase().replace(' ', '-');

  const hasBlockers = project.has_blockers;
  const blockerIndicator = hasBlockers
    ? '<span class="blocker-indicator" title="Has blockers">⚠️</span>'
    : '';

  card.innerHTML = `
    <div class="card-header">
      <h3><a href="/project.html?id=${project.id}">${project.name}</a></h3>
      ${blockerIndicator}
    </div>
    <div class="card-body">
      <div class="project-meta">
        <span class="status-badge status-${statusClass}">${status}</span>
        <span class="progress-badge">${percent}%</span>
      </div>
      <div class="project-info">
        <div><strong>Team:</strong> ${project.team || 'N/A'}</div>
        <div><strong>Owners:</strong> ${project.owners.join(', ')}</div>
      </div>
      ${latestUpdate?.blockers ? `<div class="project-blockers"><strong>Blockers:</strong> ${latestUpdate.blockers}</div>` : ''}
      ${latestUpdate ? `<div class="last-updated">Last update: ${new Date(latestUpdate.created_at * 1000).toLocaleDateString()}</div>` : '<div class="last-updated">No updates yet</div>'}
    </div>
  `;

  return card;
}

export default { createProjectCard };
