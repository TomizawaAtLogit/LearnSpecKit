import express from 'express';
import { UpdateRepository } from '../models/update.js';
import { ProjectRepository } from '../models/project.js';
import { authMiddleware } from '../middleware/auth.js';
import { requireProjectMember } from '../middleware/rbac.js';

const router = express.Router();

// GET /projects/:id/updates - List all updates for a project
router.get('/projects/:id/updates', authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;

    // Verify project exists
    const project = ProjectRepository.findById(id);
    if (!project) {
      return res.status(404).json({ error: { message: 'Project not found' } });
    }

    const updates = UpdateRepository.listByProject(id);
    res.json({ updates });
  } catch (error) {
    next(error);
  }
});

// POST /projects/:id/updates - Create a new update
router.post('/projects/:id/updates', authMiddleware, requireProjectMember, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, percent_complete, blockers, next_steps, attachments } = req.body;

    // Verify project exists
    const project = ProjectRepository.findById(id);
    if (!project) {
      return res.status(404).json({ error: { message: 'Project not found' } });
    }

    // Validate required fields
    if (!status) {
      return res.status(400).json({ error: { message: 'status is required' } });
    }

    if (percent_complete === undefined || percent_complete === null) {
      return res.status(400).json({ error: { message: 'percent_complete is required' } });
    }

    const update = UpdateRepository.create({
      project_id: id,
      author_id: req.user.id,
      status,
      percent_complete: parseInt(percent_complete, 10),
      blockers,
      next_steps,
      attachments,
    });

    console.log(`Update created: ${update.id} for project ${id} by ${req.user.name}`);

    res.status(201).json({ update });
  } catch (error) {
    if (error.message.includes('Invalid status') || error.message.includes('percent_complete')) {
      return res.status(400).json({ error: { message: error.message } });
    }
    next(error);
  }
});

// PUT /projects/:id/updates/:updateId - Update an existing update
router.put(
  '/projects/:id/updates/:updateId',
  authMiddleware,
  requireProjectMember,
  async (req, res, next) => {
    try {
      const { id, updateId } = req.params;
      const { status, percent_complete, blockers, next_steps, attachments } = req.body;

      // Verify project exists
      const project = ProjectRepository.findById(id);
      if (!project) {
        return res.status(404).json({ error: { message: 'Project not found' } });
      }

      // Verify update exists and belongs to project
      const existingUpdate = UpdateRepository.findById(updateId);
      if (!existingUpdate) {
        return res.status(404).json({ error: { message: 'Update not found' } });
      }

      if (existingUpdate.project_id !== id) {
        return res.status(400).json({ error: { message: 'Update does not belong to this project' } });
      }

      const updateData = {};
      if (status !== undefined) updateData.status = status;
      if (percent_complete !== undefined) updateData.percent_complete = parseInt(percent_complete, 10);
      if (blockers !== undefined) updateData.blockers = blockers;
      if (next_steps !== undefined) updateData.next_steps = next_steps;
      if (attachments !== undefined) updateData.attachments = attachments;

      const updated = UpdateRepository.update(updateId, updateData);

      res.json({ update: updated });
    } catch (error) {
      if (error.message.includes('Invalid status') || error.message.includes('percent_complete')) {
        return res.status(400).json({ error: { message: error.message } });
      }
      next(error);
    }
  }
);

// DELETE /projects/:id/updates/:updateId - Delete an update
router.delete(
  '/projects/:id/updates/:updateId',
  authMiddleware,
  requireProjectMember,
  async (req, res, next) => {
    try {
      const { id, updateId } = req.params;

      // Verify update exists and belongs to project
      const existingUpdate = UpdateRepository.findById(updateId);
      if (!existingUpdate) {
        return res.status(404).json({ error: { message: 'Update not found' } });
      }

      if (existingUpdate.project_id !== id) {
        return res.status(400).json({ error: { message: 'Update does not belong to this project' } });
      }

      UpdateRepository.delete(updateId);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
