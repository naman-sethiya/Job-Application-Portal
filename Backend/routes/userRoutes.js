import express from 'express';
import { allUsers, singleUser, editUser, deleteUser, createUserJobsHistory } from '../controllers/userContoller.js'
import { isAuthenticated, isAdmin } from '../middleware/auth.js';


const router = express.Router();


router.get(`/allusers`, isAuthenticated, isAdmin, allUsers);
router.get(`/user/:id`, isAuthenticated, singleUser);
router.put(`/user/edit/:id`, isAuthenticated, isAdmin, editUser);
router.delete(`/user/delete/:id`, isAuthenticated, isAdmin, deleteUser);
router.post(`/user/jobhistory`, isAuthenticated, createUserJobsHistory);

export default router;