import express from 'express';
import { ProjectRepository } from '../models/project.js';
import { UpdateRepository } from '../models/update.js';
import { authMiddleware } from '../middleware/auth.js';
import { requireProjectMember } from '../middleware/rbac.js';

const router = express.Router();

// GET /projects - List projects with filters
router.get('/projects', authMiddleware, async (req, res, next) => {
  try {
    const { team, owner, visibility, status } = req.query;

    const filters = {};
    if (team) filters.team = team;
    if (visibility) filters.visibility = visibility;

    let projects = ProjectRepository.list(filters);

    // Filter by owner if provided (client-side filtering for JSON field)
    if (owner) {
      projects = projects.filter((p) => p.owners.includes(owner));
    }

    // Enrich with latest update status if status filter requested
    if (status || req.query.enrich === 'true') {
      projects = projects.map((project) => {
        const updates = UpdateRepository.listByProject(project.id);
        const latestUpdate = updates[0] || null;
        return {
          ...project,
          latest_update: latestUpdate,
          has_blockers: latestUpdate?.blockers ? true : false,
        };
      });

      // Filter by status if provided
      if (status) {
        projects = projects.filter((p) => p.latest_update?.status === status);
      }
    }

    res.json({ projects });
  } catch (error) {
    next(error);
  }
});

// POST /projects - Create a new project
router.post('/projects', authMiddleware, requireProjectMember, async (req, res, next) => {
  try {
    const { name, owners, team, meeting_schedule, tags, visibility } = req.body;

    if (!name) {
      return res.status(400).json({ error: { message: 'name is required' } });
    }

    const project = ProjectRepository.create({
      name,
      owners: owners || [req.user.id],
      team,
      meeting_schedule,
      tags,
      visibility,
    });

    console.log(`Project created: ${project.id} by ${req.user.name}`);

    res.status(201).json({ project });
  } catch (error) {
    next(error);
  }
});

// GET /projects/:id - Get a single project
router.get('/projects/:id', authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = ProjectRepository.findById(id);
    if (!project) {
      return res.status(404).json({ error: { message: 'Project not found' } });
    }

    res.json({ project });
  } catch (error) {
    next(error);
  }
});

// PUT /projects/:id - Update a project
router.put('/projects/:id', authMiddleware, requireProjectMember, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, owners, team, meeting_schedule, tags, visibility } = req.body;

    const project = ProjectRepository.findById(id);
    if (!project) {
      return res.status(404).json({ error: { message: 'Project not found' } });
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (owners !== undefined) updateData.owners = owners;
    if (team !== undefined) updateData.team = team;
    if (meeting_schedule !== undefined) updateData.meeting_schedule = meeting_schedule;
    if (tags !== undefined) updateData.tags = tags;
    if (visibility !== undefined) updateData.visibility = visibility;

    const updated = ProjectRepository.update(id, updateData);

    res.json({ project: updated });
  } catch (error) {
    next(error);
  }
});

export default router;
