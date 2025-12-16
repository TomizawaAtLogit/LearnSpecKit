# research.md — Weekly Project Progress Report (Phase 0)

## Purpose
Resolve open questions from the spec and make concrete technology/operational
choices so Phase 1 design can proceed.

## Open Questions (from spec)
1. Roles & permissions: exact roles and permission mapping (FR-007).  
2. Deployment platform: web app vs integration-only vs internal portal (FR-008).  
3. Reminder delivery: email vs Slack/Teams integration.  
4. SQLite backup and concurrency approach for multi-user server.

## Decisions

### Roles & Permissions
Decision: Use three roles by default: `Admin`, `ProjectMember` (read/write for assigned
projects), and `Viewer` (read-only). Admins can manage projects, schedules and
reminder settings. The RBAC model is simple and map-able to company SSO groups.

Rationale: Matches spec requirements and keeps permission matrix small.

Alternatives considered: Fine-grained ACL per-field (rejected for MVP complexity).

### Deployment Platform
Decision: Web app with a minimal Node backend + Vite-built frontend. Host on an
internal VM or container (Docker) accessible to staff. This allows centralized
SQLite storage and scheduled backups.

Rationale: Central server enables sharing, backups, and scheduled reminders.

Alternatives considered: Fully client-side (sql.js) — rejected because sharing
across users and centralized backups would be difficult.

### Reminder Delivery
Decision: Implement email reminders for MVP, with a pluggable provider
interface to add Slack/Teams later. Use SMTP config stored in environment for
sending reminders.

Rationale: Email is universally available for Engineers and Sales; Slack/Teams
can be added as adapters later.

### SQLite Backup & Concurrency
Decision: Use `better-sqlite3` (synchronous API) or `sqlite3` with WAL mode.
Store DB in `data/weekly-progress.db`. Implement nightly backups (copy file) and
on-demand dump endpoint for admins. Use WAL to improve concurrency.

Rationale: SQLite suffices for modest scale and is simple to operate. WAL
improves concurrent readers/writers.

## Research Tasks (Phase 0 output)
- Task: Validate SMTP provider availability in company infra.  
- Task: Confirm preferred deployment target (VM vs container registry).  
- Task: Confirm SSO provider details and scoping for RBAC mapping.

## Outcome
All core clarifications resolved except final deployment host and SSO configuration
(details needed from infra/identity teams). With these choices, Phase 1 design
can proceed.

***
