import { api } from '../api.js';
import { createProjectCard } from '../components/ProjectCard.js';

const app = document.getElementById('app');

let currentFilters = {};

function createFilterControls() {
  const filters = document.createElement('div');
  filters.className = 'dashboard-filters';
  filters.innerHTML = `
    <div>
      <label for="team-filter">Team</label>
      <select name="team-filter" id="team-filter">
        <option value="">All teams</option>
        <option value="Engineering">Engineering</option>
        <option value="Sales">Sales</option>
        <option value="Product">Product</option>
      </select>
    </div>

    <div>
      <label for="status-filter">Status</label>
      <select name="status-filter" id="status-filter">
        <option value="">All statuses</option>
        <option value="On Track">On Track</option>
        <option value="At Risk">At Risk</option>
        <option value="Blocked">Blocked</option>
      </select>
    </div>

    <div>
      <label for="owner-filter">Owner</label>
      <input type="text" name="owner-filter" id="owner-filter" placeholder="Filter by owner ID..." />
    </div>
  `;

  // Add event listeners
  filters.querySelector('#team-filter').addEventListener('change', (e) => {
    currentFilters.team = e.target.value || undefined;
    loadDashboard();
  });

  filters.querySelector('#status-filter').addEventListener('change', (e) => {
    currentFilters.status = e.target.value || undefined;
    loadDashboard();
  });

  filters.querySelector('#owner-filter').addEventListener('input', (e) => {
    currentFilters.owner = e.target.value || undefined;
    loadDashboard();
  });

  return filters;
}

async function loadDashboard() {
  try {
    const { projects } = await api.projects.list(currentFilters);

    // Clear grid and re-render
    const existingGrid = document.querySelector('.projects-grid');
    if (existingGrid) {
      existingGrid.remove();
    }

    if (!projects || projects.length === 0) {
      const noProjects = document.createElement('div');
      noProjects.className = 'no-projects';
      noProjects.textContent = 'No projects found. Adjust filters or create a new project.';
      app.appendChild(noProjects);
      return;
    }

    const grid = document.createElement('div');
    grid.className = 'projects-grid';

    projects.forEach((project) => {
      const card = createProjectCard(project);
      grid.appendChild(card);
    });

    app.appendChild(grid);
  } catch (error) {
    console.error('Failed to load dashboard:', error);
    app.innerHTML = `<div class="error-message">Failed to load dashboard: ${error.message}</div>`;
  }
}

// Initialize dashboard
app.innerHTML = '<h2>Project Dashboard</h2>';
const filterControls = createFilterControls();
app.appendChild(filterControls);

const dashboardContainer = document.createElement('div');
dashboardContainer.className = 'dashboard';
app.appendChild(dashboardContainer);

loadDashboard();
