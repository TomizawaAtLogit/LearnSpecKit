const API_BASE = '/api';

async function fetchAPI(endpoint, options = {}) {
  const token = localStorage.getItem('auth_token') || 'mock-token-dev';

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: { message: 'Request failed' } }));
    throw new Error(error.error?.message || 'Request failed');
  }

  return response.json();
}

export const api = {
  projects: {
    list: (filters) => {
      const params = new URLSearchParams({ ...filters, enrich: 'true' });
      return fetchAPI(`/projects?${params}`);
    },
    get: (id) => fetchAPI(`/projects/${id}`),
    create: (data) => fetchAPI('/projects', { method: 'POST', body: JSON.stringify(data) }),
  },
  updates: {
    list: (projectId) => fetchAPI(`/projects/${projectId}/updates`),
    create: (projectId, data) =>
      fetchAPI(`/projects/${projectId}/updates`, { method: 'POST', body: JSON.stringify(data) }),
    update: (projectId, updateId, data) =>
      fetchAPI(`/projects/${projectId}/updates/${updateId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (projectId, updateId) =>
      fetchAPI(`/projects/${projectId}/updates/${updateId}`, { method: 'DELETE' }),
  },
};

export default api;
