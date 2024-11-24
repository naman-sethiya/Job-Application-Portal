import React, { useEffect } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import { useDispatch, useSelector } from 'react-redux';
import { allJobLoadAction, deleteSingleJobAction } from '../../redux/actions/jobAction';
import jsPDF from 'jspdf';

const DashJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allJobLoadAction())
    }, []);

    const { success: deleteSuccess } = useSelector(state => state.deleteJob);
    const { jobs, loading } = useSelector(state => state.loadAllJobs);
    let data = [];
    data = (jobs !== undefined && jobs.length > 0) ? jobs : []

    const deleteJobById = (e, id) => {
        if (window.confirm(`You really want to delete job ID: "${id}" ?`)) {
            dispatch(deleteSingleJobAction(id));
            if (deleteSuccess && deleteSuccess === true) {
                dispatch(allJobLoadAction())
            }
        }
    }

    const downloadAppliedUsers = (jobTitle, users) => {
        const doc = new jsPDF();
        doc.text(`Applied Users for ${jobTitle}`, 20, 20);
        
        let yPosition = 40;
        if (users && users.length > 0) {
            users.forEach((user, index) => {
                doc.text(`${index + 1}. ${user.email}`, 20, yPosition);
                yPosition += 10;
            });
        } else {
            doc.text('No applicants', 20, yPosition);
        }
        
        doc.save(`${jobTitle}-applicants.pdf`);
    };

    const columns = [
        {
            field: 'title',
            headerName: 'Job name',
            width: 150,
        },
        {
            field: 'jobType',
            headerName: 'Category',
            width: 150,
            renderCell: (data) => data.row.jobType?.jobTypeName || ''
        },
        {
            field: 'user',
            headerName: 'Created By',
            width: 150,
            renderCell: (data) => {
                return data.row.user ? data.row.user.firstName + ' ' + data.row.user.lastName: ''
            }
        },
        {
            field: 'available',
            headerName: 'Available',
            width: 150,
            renderCell: (values => (
                values.row.available ? "Yes" : "No"
            ))
        },
        {
            field: 'salary',
            headerName: 'Salary',
            type: Number,
            width: 150,
            renderCell: (values => (
                "₹" + values.row.salary
            ))
        },
        {
            field: 'appliedUsers',
            headerName: 'Applied Users',
            width: 200,
            renderCell: (data) => (
                <Button 
                    variant="contained" 
                    size="small"
                    startIcon={<DownloadIcon />}
                    onClick={() => downloadAppliedUsers(data.row.title, data.row.appliedUsers)}
                >
                    Download List
                </Button>
            )
        },
        {
            field: "Actions",
            width: 200,
            renderCell: (values) => (
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                    <Button variant="contained">
                        <Link style={{ color: "white", textDecoration: "none" }} to={`/admin/edit/job/${values.row._id}`}>Edit</Link>
                    </Button>
                    <Button onClick={(e) => deleteJobById(e, values.row._id)} variant="contained" color="error">
                        Delete
                    </Button>
                </Box>
            )
        }
    ];

    return (
        <Box>
            <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                Jobs list
            </Typography>
            <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
                <Button variant='contained' color="success" startIcon={<AddIcon />}>
                    <Link style={{ color: "white", textDecoration: "none" }} to="/admin/job/create">Create Job</Link>
                </Button>
            </Box>
            <Paper sx={{ bgcolor: "secondary.midNightBlue" }}>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        sx={{
                            '& .MuiTablePagination-displayedRows': {
                                color: 'black',
                            },
                            '& .MuiDataGrid-columnHeaders': {
                                color: 'black'
                            },
                            [`& .${gridClasses.row}`]: {
                                bgcolor: (theme) =>
                                    theme.palette.secondary.main,
                                color: 'white'
                            },
                            button: {
                                color: '#ffffff'
                            }
                        }}
                        rows={data}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        slots={{ toolbar: GridToolbar }}
                    />
                </Box>
            </Paper>
        </Box>
    )
}

export default DashJobs;