
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic (e.g., clearing localStorage, resetting state)
    localStorage.removeItem('loggedInUser');
    onLogout(); // Call the logout callback
    navigate('/'); // Redirect to home or sign-in page
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Blog Dashboard
        </Typography>
        <Button color="inherit" onClick={() => navigate('/profile')}>Profile</Button>
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;