import express from 'express';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';
import {createJob, singleJob, updateJob, showJobs, deleteJob, allJobs} from '../controllers/jobsController.js';

const router = express.Router();

router.post(`/job/create`,isAuthenticated,isAdmin,createJob);
router.get(`/job/:id`,singleJob);
router.put('/job/update/:job_id',isAuthenticated,isAdmin,updateJob);
router.delete('/job/delete/:job_id', isAuthenticated, isAdmin, deleteJob)
router.get(`/jobs/show`,showJobs);
router.get(`/jobs/alljobs`,isAuthenticated,isAdmin,allJobs);
export default router;