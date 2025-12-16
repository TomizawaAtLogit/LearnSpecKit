# Implementation Plan: Weekly Project Progress Report

**Branch**: `001-weekly-progress-report` | **Date**: 2025-12-16 | **Spec**: ../spec.md
**Input**: Feature specification from `/specs/001-weekly-progress-report/spec.md`

## Summary

Build a lightweight web application used weekly to collect and share concise project
updates from project members (Engineers and Sales). The UI is built with Vite and
vanilla HTML/CSS/JS. A minimal Node backend exposes a small JSON API and stores
metadata in a local SQLite database. Images remain local files (not uploaded to
external storage). The system supports role-based access (Project Member, Viewer,
Admin), weekly reminders, and exportable summaries.

## Technical Context

**Language/Version**: Node.js 18+ (server), modern browsers (frontend)  
**Primary Dependencies**: Vite (dev server/build), Express (minimal server), `sqlite3` (or `better-sqlite3`) for local DB, node-fetch (if needed)  
**Storage**: Local SQLite database stored on server filesystem (file-based).  
**Testing**: Jest for backend unit tests, Playwright (or Puppeteer) for end-to-end smoke tests; lightweight frontend unit tests using vitest if needed.  
**Target Platform**: Internal web app served from company network / container; optional small VM.  
**Project Type**: Web app (frontend + minimal backend)  
**Performance Goals**: Dashboard response P95 < 200ms for up to 500 projects; export generation < 15s for projects with <=100 updates.  
**Constraints**: Minimal external libraries; images not uploaded externally; DB must remain SQLite; support up to ~1k projects initially.

## Constitution Check

- Test-First: All P1 user stories require tests added to `specs/001-weekly-progress-report/research.md` and included in tasks.  
- Code Quality: Linting and formatting (ESLint + Prettier) enforced in CI.  
- Performance: Add a CI smoke test for export generation and dashboard response.  

*GATE:* Phase 0 research must resolve authentication approach and backup strategy for SQLite before implementation proceeds.

## Project Structure

```text
specs/001-weekly-progress-report/
├── plan.md            # this file
├── research.md        # Phase 0 output
├── data-model.md      # Phase 1 output
├── quickstart.md      # Phase 1 output
├── contracts/
│   └── openapi.yaml   # minimal API contract
└── tasks.md           # Phase 2 output (TBD)

src/
├── server/            # minimal Node server (Express)
│   ├── index.js
│   ├── db.js
│   └── routes/
└── web/               # Vite frontend (vanilla JS)
    ├── index.html
    ├── src/
    └── assets/

tests/
├── unit/
└── e2e/
```

**Structure Decision**: Single repository with frontend (`src/web`) and backend (`src/server`). SQLite file stored on server under `data/` and backed up by scheduled job.

## Complexity Tracking

No constitution violations expected. Authentication integration (SSO) marked as NEEDS CLARIFICATION; if required, this increases integration scope.

## Phase Plan

- Phase 0 (Research): Resolve auth, backup/restore for SQLite, reminder delivery mechanism (email/Slack/Teams). Produce `research.md`.
- Phase 1 (Design): Produce `data-model.md`, API contracts, `quickstart.md` and implement minimal prototypes.
- Phase 2 (Implementation): Create server endpoints, Vite frontend, tests, CI pipeline tasks, and tasks.md.

***

