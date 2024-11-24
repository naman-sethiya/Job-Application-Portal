import React, { useEffect, useMemo } from 'react';
import { Box, Paper, Stack, Typography } from '@mui/material';
import StatComponent from '../../components/StatComponent';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import WorkIcon from '@mui/icons-material/Work';
import CategoryIcon from '@mui/icons-material/Category';
import { useDispatch, useSelector } from 'react-redux';
import { allJobLoadAction } from '../../redux/actions/jobAction';
import { allUserAction } from '../../redux/actions/userAction';
import { jobTypeLoadAction } from '../../redux/actions/jobTypeAction';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allJobLoadAction());
        dispatch(allUserAction());
        dispatch(jobTypeLoadAction());
    }, [dispatch]);

    const { jobType } = useSelector(state => state.jobTypeAll);
    const { users } = useSelector(state => state.allUsers);
    const { jobs } = useSelector(state => state.loadAllJobs);

    const data_jobs = jobs || [];
    const data_users = users || [];
    const data_jobtypes = jobType || [];

    const jobTypeData = useMemo(() => {
        const jobTypeCounts = data_jobs.reduce((acc, job) => {
            const jobTypeName = job.jobType?.jobTypeName || 'Uncategorized';
            acc[jobTypeName] = (acc[jobTypeName] || 0) + 1;
            return acc;
        }, {});
        
        return Object.entries(jobTypeCounts).map(([name, count]) => ({
            name,
            count
        }));
    }, [data_jobs]);

    const adminCount = data_users.reduce((count, user) => 
        user.role === 1 ? count + 1 : count, 
        0
    );

    return (
        <Box>
            <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                Dashboard
            </Typography>

            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
            >
                <StatComponent
                    value={adminCount}
                    icon={<SupervisorAccountIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
                    description="Administrators"
                    money=""
                />
                <StatComponent
                    value={data_jobs.length}
                    icon={<WorkIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
                    description="Jobs"
                    money=""
                />
                <StatComponent
                    value={data_jobtypes.length}
                    icon={<CategoryIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
                    description="Jobs Categories"
                    money=""
                />
            </Stack>

            <Stack sx={{mt:7}}>
                <Paper sx={{ p: 3, bgcolor: "secondary.midNightBlue" }}>
                    <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
                        Job Categories Distribution
                    </Typography>
                    <Box sx={{ width: '100%', height: 400 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={jobTypeData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="name"
                                    angle={-45}
                                    textAnchor="end"
                                    height={80}
                                    interval={0}
                                    tick={{ fill: 'white', fontSize: 12 }}
                                />
                                <YAxis tick={{ fill: 'white' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1a1a1a', border: 'none' }}
                                    labelStyle={{ color: 'white' }}
                                />
                                <Bar dataKey="count" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>
                </Paper>
            </Stack>
        </Box>
    );
};

export default AdminDashboard;
