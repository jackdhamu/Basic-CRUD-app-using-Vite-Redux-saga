
import React from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth); // Get user data from Redux store

    const handleEdit = () => {
        // Implement edit functionality if needed
        alert('Edit functionality not implemented yet!');
    };

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser'); // Clear localStorage on logout
        navigate('/'); // Redirect to the sign-in page
    };

    return (
        <Container>
            <Typography variant="h4" sx={{ mb: 2 }}>Profile</Typography>
            <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={user?.firstName || ''}
                disabled
            />
            <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={user?.lastName || ''}
                disabled
            />
            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={user?.email || ''}
                disabled
            />
            <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={user?.phone || ''}
                disabled
            />
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleEdit}>
                Edit Details
            </Button>
            <Button variant="outlined" color="secondary" sx={{ mt: 2, ml: 2 }} onClick={handleLogout}>
                Logout
            </Button>
        </Container>
    );
};

export default Profile;