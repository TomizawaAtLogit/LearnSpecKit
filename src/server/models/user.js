import db from '../db.js';
import { randomUUID } from 'crypto';

export class UserRepository {
  static findById(id) {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id);
  }

  static findByEmail(email) {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email);
  }

  static create(userData) {
    const id = randomUUID();
    const roles = JSON.stringify(userData.roles || ['Viewer']);

    const stmt = db.prepare(`
      INSERT INTO users (id, name, email, roles, team)
      VALUES (?, ?, ?, ?, ?)
    `);

    stmt.run(id, userData.name, userData.email, roles, userData.team || null);
    return this.findById(id);
  }

  static list() {
    const stmt = db.prepare('SELECT * FROM users');
    return stmt.all();
  }
}

export default { UserRepository };
