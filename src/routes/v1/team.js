import express from 'express';
import { getAllTeam, getTeamById, createTeamMember, updateTeamMember, deleteTeamMember } from '../../controllers/teamController.js';
import { authenticate } from '../../middleware/auth.js';

const router = express.Router();

router.get('/', getAllTeam);
router.get('/:id', getTeamById);

router.post('/', authenticate, createTeamMember);
router.patch('/:id', authenticate, updateTeamMember);
router.delete('/:id', authenticate, deleteTeamMember);

export default router;
