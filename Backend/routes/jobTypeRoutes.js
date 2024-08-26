import express from 'express';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';
import { createJobType, allJobsType, updateJobType, deleteJobType } from '../controllers/jobTypeController.js';
const router = express.Router();

router.post(`/type/create`, isAuthenticated, isAdmin, createJobType);
router.get(`/type/jobs`, allJobsType);
router.put(`/type/update/:type_id`, isAuthenticated, isAdmin, updateJobType)
router.delete(`/type/delete/:type_id`, isAuthenticated, isAdmin, deleteJobType);

export default router;