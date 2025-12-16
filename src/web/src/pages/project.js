import { api } from '../api.js';
import { createUpdateForm } from '../components/UpdateForm.js';
import { createTimeline } from '../components/Timeline.js';

const app = document.getElementById('app');

// Get project ID from URL params
const params = new URLSearchParams(window.location.search);
const projectId = params.get('id') || 'demo-project';

async function loadUpdates() {
  try {
    const { updates } = await api.updates.list(projectId);
    
    // Render timeline
    const timelineContainer = document.querySelector('.timeline-container');
    if (timelineContainer) {
      timelineContainer.remove();
    }
    
    const timeline = createTimeline(updates);
    timeline.className = 'timeline-container';
    app.appendChild(timeline);
  } catch (error) {
    console.error('Failed to load updates:', error);
  }
}

async function handleSubmit(data) {
  await api.updates.create(projectId, data);
  await loadUpdates();
}

// Initialize page
app.innerHTML = '<h2>Project Updates</h2>';

const form = createUpdateForm(projectId, handleSubmit);
app.appendChild(form);

loadUpdates();
