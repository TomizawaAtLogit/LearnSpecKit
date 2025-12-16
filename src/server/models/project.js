import db from '../db.js';
import { randomUUID } from 'crypto';

export class ProjectRepository {
  static findById(id) {
    const stmt = db.prepare('SELECT * FROM projects WHERE id = ?');
    const project = stmt.get(id);
    if (project) {
      project.owners = JSON.parse(project.owners);
      project.tags = project.tags ? JSON.parse(project.tags) : [];
    }
    return project;
  }

  static list(filters = {}) {
    let query = 'SELECT * FROM projects WHERE 1=1';
    const params = [];

    if (filters.team) {
      query += ' AND team = ?';
      params.push(filters.team);
    }

    if (filters.visibility) {
      query += ' AND visibility = ?';
      params.push(filters.visibility);
    }

    query += ' ORDER BY updated_at DESC';

    const stmt = db.prepare(query);
    const projects = stmt.all(...params);

    return projects.map((p) => ({
      ...p,
      owners: JSON.parse(p.owners),
      tags: p.tags ? JSON.parse(p.tags) : [],
    }));
  }

  static create(projectData) {
    const id = randomUUID();
    const owners = JSON.stringify(projectData.owners || []);
    const tags = JSON.stringify(projectData.tags || []);
    const now = Math.floor(Date.now() / 1000);

    const stmt = db.prepare(`
      INSERT INTO projects (id, name, owners, team, meeting_schedule, tags, visibility, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id,
      projectData.name,
      owners,
      projectData.team || null,
      projectData.meeting_schedule || null,
      tags,
      projectData.visibility || 'internal',
      now,
      now
    );

    return this.findById(id);
  }

  static update(id, projectData) {
    const updates = [];
    const params = [];

    if (projectData.name !== undefined) {
      updates.push('name = ?');
      params.push(projectData.name);
    }

    if (projectData.owners !== undefined) {
      updates.push('owners = ?');
      params.push(JSON.stringify(projectData.owners));
    }

    if (projectData.team !== undefined) {
      updates.push('team = ?');
      params.push(projectData.team);
    }

    if (projectData.meeting_schedule !== undefined) {
      updates.push('meeting_schedule = ?');
      params.push(projectData.meeting_schedule);
    }

    if (projectData.tags !== undefined) {
      updates.push('tags = ?');
      params.push(JSON.stringify(projectData.tags));
    }

    updates.push('updated_at = ?');
    params.push(Math.floor(Date.now() / 1000));

    params.push(id);

    const stmt = db.prepare(`UPDATE projects SET ${updates.join(', ')} WHERE id = ?`);
    stmt.run(...params);

    return this.findById(id);
  }
}

export default { ProjectRepository };
