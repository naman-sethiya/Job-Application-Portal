import React, { useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CardElement2 from '../../components/CardElement2';

const UserJobsHistory = () => {
    const {user} = useSelector(state => state.userProfile);
    const dispatch = useDispatch();
  


  return (

    <>
        <Box>
                <Typography variant="h4" sx={{ color: "#fafafa" }}> Jobs History</Typography>
                <Box>
                    {
                        user && user.jobHistory.map((history,i) => {
                            return (<CardElement2 
                                key={i}
                                id={history._id}
                                jobTitle={history.title}
                                description={history.description}
                                category=''
                                location={history.location}
                                applicationStatus={history.applicationStatus}
              
                            />)

                        })
                    }

                </Box>
        </Box>


    </>
    
  )
}

export default UserJobsHistory