import db from '../db.js';
import { randomUUID } from 'crypto';

export class UpdateRepository {
  static findById(id) {
    const stmt = db.prepare('SELECT * FROM updates WHERE id = ?');
    const update = stmt.get(id);
    if (update && update.attachments) {
      update.attachments = JSON.parse(update.attachments);
    }
    return update;
  }

  static listByProject(projectId) {
    const stmt = db.prepare(`
      SELECT * FROM updates 
      WHERE project_id = ? 
      ORDER BY created_at DESC
    `);
    const updates = stmt.all(projectId);
    return updates.map((u) => ({
      ...u,
      attachments: u.attachments ? JSON.parse(u.attachments) : [],
    }));
  }

  static create(updateData) {
    // Validate status
    const validStatuses = ['On Track', 'At Risk', 'Blocked'];
    if (!validStatuses.includes(updateData.status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    // Validate percent_complete
    if (
      updateData.percent_complete < 0 ||
      updateData.percent_complete > 100 ||
      !Number.isInteger(updateData.percent_complete)
    ) {
      throw new Error('percent_complete must be an integer between 0 and 100');
    }

    const id = randomUUID();
    const attachments = JSON.stringify(updateData.attachments || []);
    const now = Math.floor(Date.now() / 1000);

    const stmt = db.prepare(`
      INSERT INTO updates (id, project_id, author_id, status, percent_complete, blockers, next_steps, attachments, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id,
      updateData.project_id,
      updateData.author_id,
      updateData.status,
      updateData.percent_complete,
      updateData.blockers || null,
      updateData.next_steps || null,
      attachments,
      now,
      now
    );

    return this.findById(id);
  }

  static update(id, updateData) {
    const updates = [];
    const params = [];

    if (updateData.status !== undefined) {
      const validStatuses = ['On Track', 'At Risk', 'Blocked'];
      if (!validStatuses.includes(updateData.status)) {
        throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
      }
      updates.push('status = ?');
      params.push(updateData.status);
    }

    if (updateData.percent_complete !== undefined) {
      if (
        updateData.percent_complete < 0 ||
        updateData.percent_complete > 100 ||
        !Number.isInteger(updateData.percent_complete)
      ) {
        throw new Error('percent_complete must be an integer between 0 and 100');
      }
      updates.push('percent_complete = ?');
      params.push(updateData.percent_complete);
    }

    if (updateData.blockers !== undefined) {
      updates.push('blockers = ?');
      params.push(updateData.blockers);
    }

    if (updateData.next_steps !== undefined) {
      updates.push('next_steps = ?');
      params.push(updateData.next_steps);
    }

    if (updateData.attachments !== undefined) {
      updates.push('attachments = ?');
      params.push(JSON.stringify(updateData.attachments));
    }

    updates.push('updated_at = ?');
    params.push(Math.floor(Date.now() / 1000));

    params.push(id);

    const stmt = db.prepare(`UPDATE updates SET ${updates.join(', ')} WHERE id = ?`);
    stmt.run(...params);

    return this.findById(id);
  }

  static delete(id) {
    const stmt = db.prepare('DELETE FROM updates WHERE id = ?');
    return stmt.run(id);
  }
}

export default { UpdateRepository };
