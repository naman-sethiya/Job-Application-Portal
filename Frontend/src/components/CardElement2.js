import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton, useTheme } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';


const CardElement = ({ jobTitle, description, category, location, id, applicationStatus }) => {
    const { palette } = useTheme();

    const statusStyles = {
        accepted: { color: 'green' },
        rejected: { color: 'red' },
        pending: { color: 'orange' }
    };

    const statusStyle = statusStyles[applicationStatus] || { textTransform: 'uppercase' };

    return (
        <Card sx={{ minWidth: 275, mb: 3, mt: 3 }}>

            <CardContent >
                <Typography sx={{ fontSize: 15, color: palette.secondary.main, fontWeight: 500 }} gutterBottom>
                    <IconButton><LocationOnIcon sx={{ color: palette.secondary.main, fontSize: 18 }} /></IconButton> {location}
                </Typography>
                <Typography variant="h5" component="div">
                    {jobTitle}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="black">
                    {category}
                </Typography>
                <Typography variant="body2">
                    Description: {description.split(" ").slice(0, 15).join(" ") + "..."}
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 2, ...statusStyle }}>
                    APPLICATION STATUS: {applicationStatus ? applicationStatus.toUpperCase() : 'NOT APPLIED'}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default CardElement;