---
description: "Task list for Weekly Project Progress Report feature implementation"
---

# Tasks: Weekly Project Progress Report

**Input**: Design documents from `/specs/001-weekly-progress-report/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/openapi.yaml

**Tests**: Tests are included per constitution requirement for P1 user stories (US1, US2).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Backend**: `src/server/`
- **Frontend**: `src/web/`
- **Tests**: `tests/unit/`, `tests/e2e/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create project directory structure: `src/server/`, `src/web/`, `tests/unit/`, `tests/e2e/`, `data/`
- [X] T002 Initialize backend Node.js project in `src/server/` with package.json (Express, better-sqlite3, dotenv)
- [X] T003 Initialize frontend Vite project in `src/web/` with package.json (minimal dependencies)
- [X] T004 [P] Configure ESLint and Prettier for `src/server/` (Node.js rules)
- [X] T005 [P] Configure ESLint and Prettier for `src/web/` (browser rules)
- [X] T006 [P] Add `.gitignore` to exclude `node_modules/`, `data/*.db`, `dist/`, `.env`
- [X] T007 Create `README.md` with quickstart instructions based on quickstart.md
- [X] T008 [P] Setup CI configuration file (GitHub Actions or equivalent) for linting and tests

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T009 Create SQLite database schema in `src/server/db.js` (tables: users, projects, updates, exports)
- [X] T010 Implement database initialization with WAL mode in `src/server/db.js`
- [X] T011 [P] Create basic Express server setup in `src/server/index.js` (middleware, error handling, CORS)
- [X] T012 [P] Implement authentication middleware in `src/server/middleware/auth.js` (JWT validation, role extraction)
- [X] T013 [P] Implement RBAC authorization middleware in `src/server/middleware/rbac.js` (Admin, ProjectMember, Viewer)
- [X] T014 Create User model and repository in `src/server/models/user.js`
- [X] T015 Create Project model and repository in `src/server/models/project.js`
- [X] T016 Create Update model and repository in `src/server/models/update.js`
- [X] T017 [P] Setup Vite configuration in `src/web/vite.config.js` (dev server, build, proxy to backend)
- [X] T018 [P] Create base HTML template in `src/web/index.html` (shell, navigation placeholder)
- [X] T019 [P] Create shared CSS utilities in `src/web/src/styles/base.css` (reset, typography, layout helpers)
- [X] T020 [P] Create frontend API client helper in `src/web/src/api.js` (fetch wrapper with auth headers)
- [X] T021 [P] Setup Jest configuration in `tests/unit/jest.config.js`
- [X] T022 [P] Setup Playwright configuration in `tests/e2e/playwright.config.js`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Submit Weekly Project Update (Priority: P1) 🎯 MVP

**Goal**: Project members can create and submit weekly updates containing status, blockers, progress %, and next steps

**Independent Test**: Authenticate as a project member, create or open a project, submit an update, verify it saves with timestamp and appears on the project timeline

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T023 [P] [US1] Contract test for POST /projects/{id}/updates in tests/unit/routes/updates.test.js
- [X] T024 [P] [US1] Integration test for update submission flow in tests/e2e/submit-update.spec.js
- [X] T025 [P] [US1] Unit test for Update model validation in tests/unit/models/update.test.js

### Implementation for User Story 1

- [X] T026 [US1] Implement POST /projects/{id}/updates endpoint in src/server/routes/updates.js (validate input, save to DB, return 201)
- [X] T027 [US1] Implement GET /projects/{id}/updates endpoint in src/server/routes/updates.js (retrieve updates, order by created_at DESC)
- [X] T028 [US1] Add input validation for Update entity in src/server/models/update.js (status required, percent_complete 0-100)
- [X] T029 [US1] Create update form component in src/web/src/components/UpdateForm.js (vanilla JS, status dropdown, progress slider, textareas)
- [X] T030 [US1] Create update form styles in src/web/src/styles/update-form.css
- [X] T031 [US1] Create project timeline component in src/web/src/components/Timeline.js (display updates chronologically)
- [X] T032 [US1] Create project page in src/web/src/pages/project.html (includes UpdateForm and Timeline)
- [X] T033 [US1] Wire form submission to POST /projects/{id}/updates in src/web/src/pages/project.js
- [X] T034 [US1] Add error handling and user feedback for form submission in src/web/src/pages/project.js
- [X] T035 [US1] Add logging for update creation in src/server/routes/updates.js

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - View Weekly Dashboard (Priority: P1) 🎯 MVP

**Goal**: Users can view a dashboard showing project health, blockers, status, and filters for team/owner/status

**Independent Test**: As a viewer, open the weekly dashboard, verify projects display with status/owner/percent/blockers, and test filters work

### Tests for User Story 2 ⚠️

- [X] T036 [P] [US2] Contract test for GET /projects with filters in tests/unit/routes/projects.test.js
- [X] T037 [P] [US2] Integration test for dashboard filtering in tests/e2e/dashboard.spec.js
- [X] T038 [P] [US2] Performance test for dashboard response time in tests/e2e/dashboard-perf.spec.js (P95 < 200ms for 500 projects)

### Implementation for User Story 2

- [X] T039 [US2] Implement GET /projects endpoint in src/server/routes/projects.js (support filters: team, owner, status, tags)
- [X] T040 [US2] Add indexes for project filtering in src/server/db.js (team, visibility, owner)
- [X] T041 [US2] Create dashboard page in src/web/src/pages/dashboard.html
- [X] T042 [US2] Create project card component in src/web/src/components/ProjectCard.js (display status, owner, percent, blockers)
- [X] T043 [US2] Create dashboard styles in src/web/src/styles/dashboard.css (grid layout, responsive)
- [X] T044 [US2] Implement dashboard filter controls in src/web/src/pages/dashboard.js (team, owner, status dropdowns)
- [X] T045 [US2] Wire filters to GET /projects API in src/web/src/pages/dashboard.js
- [X] T046 [US2] Add status indicator visualization in src/web/src/components/StatusBadge.js (color-coded: On Track=green, At Risk=yellow, Blocked=red)
- [X] T047 [US2] Implement blockers highlight in src/web/src/components/ProjectCard.js
- [X] T048 [US2] Add pagination or infinite scroll for large project lists in src/web/src/pages/dashboard.js

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Weekly Reminders (Priority: P2)

**Goal**: System sends configurable email reminders to project members before weekly meetings

**Independent Test**: Configure a weekly reminder, confirm users receive reminder email 24 hours before scheduled meeting

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [ ] T049 [P] [US3] Unit test for reminder scheduler in tests/unit/services/reminder.test.js
- [ ] T050 [P] [US3] Integration test for email sending (mock SMTP) in tests/e2e/reminders.spec.js

### Implementation for User Story 3

- [ ] T051 [P] [US3] Create Meeting model and repository in src/server/models/meeting.js
- [ ] T052 [US3] Implement reminder service in src/server/services/reminder.js (load projects, check schedule, send emails)
- [ ] T053 [US3] Create email template for weekly reminder in src/server/templates/reminder-email.html
- [ ] T054 [US3] Implement SMTP client wrapper in src/server/services/email.js (use nodemailer, config from env)
- [ ] T055 [US3] Add scheduled job runner in src/server/jobs/scheduler.js (use node-cron for daily check at 9am)
- [ ] T056 [US3] Create admin UI for configuring reminder schedule in src/web/src/pages/admin-reminders.html
- [ ] T057 [US3] Implement PUT /projects/{id}/meeting endpoint in src/server/routes/projects.js (update meeting schedule)
- [ ] T058 [US3] Wire admin UI to PUT /projects/{id}/meeting in src/web/src/pages/admin-reminders.js
- [ ] T059 [US3] Add logging for reminder sending in src/server/services/reminder.js

**Checkpoint**: User Stories 1, 2, and 3 should now be independently functional

---

## Phase 6: User Story 4 - Shareable Export (Priority: P3)

**Goal**: Generate exportable PDF or shareable link of weekly summary for external coworkers

**Independent Test**: Generate and download a weekly summary, verify content includes status, blockers, owners, timestamp

### Tests for User Story 4 (OPTIONAL - only if tests requested) ⚠️

- [ ] T060 [P] [US4] Contract test for POST /exports/projects/{id} in tests/unit/routes/exports.test.js
- [ ] T061 [P] [US4] Performance test for export generation in tests/e2e/export-perf.spec.js (< 15s for 100 updates)

### Implementation for User Story 4

- [ ] T062 [P] [US4] Create Export model and repository in src/server/models/export.js
- [ ] T063 [US4] Implement POST /exports/projects/{id} endpoint in src/server/routes/exports.js (generate PDF or link)
- [ ] T064 [US4] Implement PDF generation service in src/server/services/pdf-generator.js (use puppeteer or pdfkit)
- [ ] T065 [US4] Create shareable link service in src/server/services/share-link.js (generate token, store in exports table)
- [ ] T066 [US4] Implement GET /shared/{token} endpoint in src/server/routes/exports.js (public read-only view)
- [ ] T067 [US4] Create export summary template in src/server/templates/export-summary.html
- [ ] T068 [US4] Add export button to project page in src/web/src/pages/project.html
- [ ] T069 [US4] Wire export button to POST /exports/projects/{id} in src/web/src/pages/project.js
- [ ] T070 [US4] Add download/share modal in src/web/src/components/ExportModal.js

**Checkpoint**: All user stories should now be independently functional

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T071 [P] Add accessibility attributes (ARIA labels, keyboard navigation) to dashboard in src/web/src/pages/dashboard.html
- [ ] T072 [P] Add accessibility attributes to update form in src/web/src/components/UpdateForm.js
- [ ] T073 [P] Run automated accessibility scan (axe-core or Lighthouse) and fix violations
- [ ] T074 [P] Add error boundary and global error handling in src/web/src/utils/error-handler.js
- [ ] T075 [P] Implement loading states and spinners in src/web/src/components/Spinner.js
- [ ] T076 [P] Add mobile-responsive breakpoints in src/web/src/styles/base.css
- [ ] T077 Create database backup script in src/server/scripts/backup-db.sh (copy data/weekly-progress.db to backup location)
- [ ] T078 [P] Add API documentation in docs/api.md based on openapi.yaml
- [ ] T079 [P] Create user guide in docs/user-guide.md
- [ ] T080 [P] Add development setup guide in docs/development.md
- [ ] T081 Performance optimization: add caching headers for static assets in src/server/index.js
- [ ] T082 Security hardening: add rate limiting middleware in src/server/middleware/rate-limit.js
- [ ] T083 Security hardening: add input sanitization in src/server/middleware/sanitize.js
- [ ] T084 [P] Add comprehensive logging config in src/server/utils/logger.js (Winston or Pino)
- [ ] T085 Run all tests from quickstart.md validation scenarios
- [ ] T086 Create deployment guide in docs/deployment.md (Docker, env vars, backup schedule)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 US1 → P1 US2 → P2 US3 → P3 US4)
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Independent (reads from same DB tables but separate endpoints)
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - Adds Meeting model but doesn't block US1/US2
- **User Story 4 (P3)**: Can start after Foundational (Phase 2) - Uses existing Project/Update data, independent export flow

### Within Each User Story

- Tests MUST be written and FAIL before implementation (constitution requirement for P1)
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task T023: "Contract test for POST /projects/{id}/updates in tests/unit/routes/updates.test.js"
Task T024: "Integration test for update submission flow in tests/e2e/submit-update.spec.js"
Task T025: "Unit test for Update model validation in tests/unit/models/update.test.js"

# After tests fail, implement backend and frontend in parallel (different files):
Backend: Task T026 "Implement POST /projects/{id}/updates endpoint"
Frontend: Task T029 "Create update form component"
```

---

## Implementation Strategy

### MVP First (User Stories 1 & 2 Only - Both P1)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Submit Update)
4. Complete Phase 4: User Story 2 (Dashboard)
5. **STOP and VALIDATE**: Test US1 and US2 independently
6. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (basic MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo (full MVP with visibility!)
4. Add User Story 3 → Test independently → Deploy/Demo (automation added)
5. Add User Story 4 → Test independently → Deploy/Demo (external sharing enabled)
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Submit Update)
   - Developer B: User Story 2 (Dashboard)
   - Developer C: User Story 3 (Reminders)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing (constitution requirement for P1)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- SQLite file location: `data/weekly-progress.db` (created on first server run)
- Environment variables needed: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, JWT_SECRET
- Constitution compliance: Tests included for P1 stories, linting enforced, performance tests included

---

**Total Tasks**: 86  
**P1 User Stories**: 2 (US1: Submit Update, US2: Dashboard)  
**P2 User Stories**: 1 (US3: Reminders)  
**P3 User Stories**: 1 (US4: Export)  
**MVP Scope**: Phase 1 + Phase 2 + Phase 3 + Phase 4 (48 tasks)  
**Parallel Opportunities**: 28 tasks marked [P] across all phases
