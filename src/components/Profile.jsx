// src/components/Profile.jsx

import React from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    
    // Retrieve user data from local storage
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!user) {
        return <Typography variant="h6">No user data found. Please log in.</Typography>; // Show a message if user is not found
    }

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser'); // Clear user data from local storage
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
                value={user.firstName}
                disabled
            />
            <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={user.lastName}
                disabled
            />
            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={user.email}
                disabled
            />
            <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={user.phone}
                disabled
            />
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleLogout}>
                Logout
            </Button>
        </Container>
    );
};

export default Profile;