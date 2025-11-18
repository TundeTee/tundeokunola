import { Router } from 'express';
import { submitComplaint, myComplaints, listComplaints, respondComplaint, deleteComplaint } from '../controllers/complaints.controller.js';
import { protect, admin } from '../middleware/auth.js';

const router = Router();

// Require login to submit complaints
router.post('/', protect, submitComplaint);

// Authenticated user: list own complaints
router.get('/mine', protect, myComplaints);

// Admin: list all complaints and reply
router.get('/', protect, admin, listComplaints);
router.put('/:id/respond', protect, admin, respondComplaint);
router.delete('/:id', protect, admin, deleteComplaint);

export default router;