import { Box, MenuItem, Typography, Select, InputLabel, FormControl } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { editSingleUserAction, userLoadSingleAction } from '../../redux/actions/userAction';
import { useNavigate, useParams } from 'react-router-dom';
import { EDIT_USER_RESET } from '../../redux/constants/userConstant';
import { jobLoadAction } from '../../redux/actions/jobAction';

// Validation Schema
const validationSchema = yup.object({
    isAdmin: yup
        .number('Select role')
        .oneOf([0, 1], 'Invalid role'), // Ensuring the value is either 0 or 1
    appliedJob: yup
        .string('Select a job')
        .nullable(), // Allowing null values for optional fields
    jobStatus: yup
        .string('Select status')
        .oneOf(['pending', 'accepted', 'rejected'], 'Invalid status')
        .nullable(), // Allowing null values for optional fields
});

const DashEditUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const [appliedJobs, setAppliedJobs] = useState([]);
    const [jobsAll, setJobsAll] = useState([]);

    useEffect(() => {
        if (id) {
            dispatch(userLoadSingleAction(id));
        }
        dispatch(jobLoadAction()); // Fetch all jobs
    }, [id]);

    const state = useSelector(state => state);

    const { userInfo } = useSelector(state => state.signIn.userInfo);
    const { singleUser, loading } = useSelector(state => state.singleUser);
    const { jobs } = useSelector(state => state.loadJobs); // Updated to reflect job list state
    const { success } = useSelector(state => state.updateUser);
    useEffect(() => {
        if (jobs) {
            setJobsAll(jobs);
        }
    }, [jobs]);
    //console.log(singleUser);

    useEffect(() => {
        //console.log(state.signIn.userInfo.id);
        if (singleUser?.jobHistory && jobsAll) {


            const jobHistory = singleUser.jobHistory.filter(job => {
                return jobsAll.some(j => j.user._id === state.signIn.userInfo.id && j.title === job.title); // Ensure job.user._id matches userId and titles match
            });



            console.log("Filtered job history:", jobHistory);
            setAppliedJobs(jobHistory);
        }
    }, [singleUser, jobsAll]);



    // Formik Setup
    const formik = useFormik({
        initialValues: {
            isAdmin: singleUser?.isAdmin || 0, // Default to 0 if not set
            appliedJob: '',
            jobStatus: '',
        },
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values, actions) => {
            console.log(values);
            dispatch(editSingleUserAction(singleUser._id, values));
            actions.resetForm();
        },
    });

    // Redirect after successful update
    useEffect(() => {
        if (success) {
            setTimeout(() => {
                dispatch({ type: EDIT_USER_RESET });
                navigate('/admin/users');
            }, 800);
        }
    }, [success]);

    return (
        <Box sx={{ height: '100%', display: "flex", alignItems: "center", justifyContent: "center", pt: 4 }}>
            <Box component="form" onSubmit={formik.handleSubmit} className='form_style border-style'>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                    <Typography variant="h5" component="h2" sx={{ pb: 3 }}>
                        Edit User
                    </Typography>

                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel id="isAdmin-label">Role</InputLabel>
                        <Select
                            labelId="isAdmin-label"
                            id="isAdmin"
                            name="isAdmin"
                            value={formik.values.isAdmin}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.isAdmin && Boolean(formik.errors.isAdmin)}
                            helperText={formik.touched.isAdmin && formik.errors.isAdmin}
                        >
                            <MenuItem value={0}>Regular User</MenuItem>
                            <MenuItem value={1}>Admin</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel id="appliedJob-label">Applied Jobs</InputLabel>
                        <Select
                            labelId="appliedJob-label"
                            id="appliedJob"
                            name="appliedJob"
                            value={formik.values.appliedJob}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.appliedJob && Boolean(formik.errors.appliedJob)}
                            helperText={formik.touched.appliedJob && formik.errors.appliedJob}
                        >
                            {appliedJobs.length === 0 ? (
                                <MenuItem value="" disabled>
                                    No jobs exist
                                </MenuItem>
                            ) : (
                                appliedJobs.map(job => (
                                    <MenuItem key={job._id} value={job._id}>
                                        {job.title}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel id="jobStatus-label">Job Status</InputLabel>
                        <Select
                            labelId="jobStatus-label"
                            id="jobStatus"
                            name="jobStatus"
                            value={formik.values.jobStatus}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.jobStatus && Boolean(formik.errors.jobStatus)}
                            helperText={formik.touched.jobStatus && formik.errors.jobStatus}
                            disabled={!formik.values.appliedJob} // Disable if no applied job is selected
                        >
                            <MenuItem value="" disabled>
                                Select status
                            </MenuItem>
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="accepted">Accepted</MenuItem>
                            <MenuItem value="rejected">Rejected</MenuItem>
                        </Select>
                    </FormControl>

                    <Button fullWidth variant="contained" type='submit'>Edit User</Button>
                </Box>
            </Box>
        </Box>
    );
}

export default DashEditUser;
