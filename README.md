# Weekly Project Progress Report

A lightweight web application for managing weekly project updates and sharing progress with stakeholders.

## Features

- **Submit Updates**: Project members submit weekly status, blockers, progress %, and next steps
- **Dashboard View**: Consolidated view of all projects with filters (team, owner, status)
- **Weekly Reminders**: Configurable email reminders before meetings
- **Shareable Exports**: Generate PDF or shareable links for external stakeholders

## Tech Stack

- **Frontend**: Vite + vanilla HTML/CSS/JavaScript
- **Backend**: Node.js 18+ + Express
- **Database**: SQLite (local file-based storage)
- **Testing**: Jest (unit), Playwright (e2e)

## Prerequisites

- Node.js 18+ installed
- Git access to repository

## Quick Start

### Development Setup

```bash
# Install backend dependencies
cd src/server
npm install

# Start backend server (dev with hot reload)
npm run dev

# In a new terminal, install frontend dependencies
cd src/web
npm install

# Start frontend dev server
npm run dev
```

The frontend will be available at `http://localhost:5173` and will proxy API requests to the backend at `http://localhost:3000`.

### Database

- SQLite DB file path: `data/weekly-progress.db` (created on first server run)
- To reset dev DB: stop server, remove `data/weekly-progress.db`, then restart

### Running Tests

```bash
# Run backend unit tests
cd src/server
npm test

# Run e2e tests (Playwright)
cd tests/e2e
npm test
```

### Building for Production

```bash
# Build frontend
cd src/web
npm run build

# Start server with production build
cd src/server
NODE_ENV=production node index.js
```

## Deployment

Use a container or VM; mount `data/` for persistent SQLite storage and schedule backups.

Configure SMTP settings via environment variables for reminders:
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `JWT_SECRET`

## Documentation

- [Feature Specification](specs/001-weekly-progress-report/spec.md)
- [Implementation Plan](specs/001-weekly-progress-report/plan.md)
- [Task List](specs/001-weekly-progress-report/tasks.md)
- [API Documentation](docs/api.md)

## License

Internal use only
