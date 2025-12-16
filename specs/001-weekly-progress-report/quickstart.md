# Quickstart — Weekly Project Progress Report (Developer)

Prerequisites

- Node.js 18+ installed
- Git access to repository

Install and run (development)

```bash
# from repo root
cd src/server
npm install
# start server (dev)
NODE_ENV=development node index.js

# in new terminal
cd src/web
npm install
npm run dev
```

Local DB (dev)

- SQLite DB file path: `data/weekly-progress.db` (created on first server run)
- To reset dev DB: stop server, remove `data/weekly-progress.db`, then restart

Running tests

```bash
# run backend unit tests
cd tests
npm test

# run e2e tests (Playwright)
npm run test:e2e
```

Building for production

```bash
# build frontend
cd src/web
npm run build

# start server with production build
cd src/server
NODE_ENV=production node index.js
```

Deployment notes

- Use a container or VM; mount `data/` for persistent SQLite storage and schedule backups.
- Configure SMTP settings via environment variables for reminders.

***
