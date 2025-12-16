# data-model.md

## Entities

### Project
- id: string (uuid)
- name: string
- owners: [user_id]
- team: string
- meeting_schedule: cron or recurrence rule
- tags: [string]
- visibility: enum (internal, external)

### Update
- id: string (uuid)
- project_id: string
- author_id: string
- status: enum (On Track, At Risk, Blocked)
- percent_complete: integer (0-100)
- blockers: text
- next_steps: text
- attachments: JSON (file metadata) — attachments are stored on server filesystem and not uploaded to external services
- created_at: timestamp
- updated_at: timestamp

### User
- id: string
- name: string
- email: string
- roles: [enum]
- team: string

### Meeting
- id
- project_id
- schedule
- agenda_generated_at: timestamp

### Export
- id
- project_id
- format: enum (pdf, link)
- generated_by
- generated_at
- path_or_token

## Indexes & Constraints
- Index on `updates(project_id, created_at)` for fast retrieval of latest updates
- Index on `projects(team, visibility)` for dashboard filters

## Validation Rules
- `percent_complete` between 0 and 100
- `status` required
- `project_id` foreign key to `projects` table

***
