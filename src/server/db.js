import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '../../data/weekly-progress.db');

// Initialize database with WAL mode
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    roles TEXT NOT NULL,
    team TEXT,
    created_at INTEGER DEFAULT (strftime('%s', 'now'))
  );

  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    owners TEXT NOT NULL,
    team TEXT,
    meeting_schedule TEXT,
    tags TEXT,
    visibility TEXT DEFAULT 'internal',
    created_at INTEGER DEFAULT (strftime('%s', 'now')),
    updated_at INTEGER DEFAULT (strftime('%s', 'now'))
  );

  CREATE TABLE IF NOT EXISTS updates (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL,
    author_id TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('On Track', 'At Risk', 'Blocked')),
    percent_complete INTEGER NOT NULL CHECK(percent_complete >= 0 AND percent_complete <= 100),
    blockers TEXT,
    next_steps TEXT,
    attachments TEXT,
    created_at INTEGER DEFAULT (strftime('%s', 'now')),
    updated_at INTEGER DEFAULT (strftime('%s', 'now')),
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (author_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS meetings (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL,
    schedule TEXT NOT NULL,
    agenda_generated_at INTEGER,
    created_at INTEGER DEFAULT (strftime('%s', 'now')),
    FOREIGN KEY (project_id) REFERENCES projects(id)
  );

  CREATE TABLE IF NOT EXISTS exports (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL,
    format TEXT NOT NULL CHECK(format IN ('pdf', 'link')),
    generated_by TEXT NOT NULL,
    generated_at INTEGER DEFAULT (strftime('%s', 'now')),
    path_or_token TEXT,
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (generated_by) REFERENCES users(id)
  );

  CREATE INDEX IF NOT EXISTS idx_updates_project_created 
    ON updates(project_id, created_at DESC);
  
  CREATE INDEX IF NOT EXISTS idx_projects_team_visibility 
    ON projects(team, visibility);
  
  CREATE INDEX IF NOT EXISTS idx_projects_owners 
    ON projects(owners);
`);

console.log('Database initialized at:', dbPath);

export default db;
