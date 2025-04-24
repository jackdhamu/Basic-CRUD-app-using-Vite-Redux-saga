// src/components/SignUp.jsx

import React, { useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    Container,
    Box,
    Link as MuiLink,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { signUpRequest } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const countryCodes = [
    { code: '+1', label: 'United States' },
    { code: '+44', label: 'United Kingdom' },
    { code: '+91', label: 'India' },
    { code: '+61', label: 'Australia' },
    // Add more country codes as needed
];

const SignUp = () => {
    const dispatch = useDispatch();
    const { error, user } = useSelector(state => state.auth); // Get error and user data from auth state
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        countryCode: countryCodes[0].code, // Default country code
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate(); // For navigation

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if passwords match before dispatching
        if (formValues.password !== formValues.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Dispatch sign-up request
        dispatch(signUpRequest(formValues));
    };

    // Effect to handle successful sign-up
    React.useEffect(() => {
        if (user) {
            // Show success alert using MUI Snackbar or alert component, here simply using Alert
            alert("Sign-up successful! Redirecting to Sign-In page...");
            navigate("/"); // Redirect to Sign-In page
        }
    }, [user, navigate]); // Run this effect when `user` is updated

    return (
        <Container maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
                <Typography variant="h4" sx={{ mb: 2 }}>Sign Up</Typography>
                
                {error && <Alert severity="error">{error}</Alert>}  {/* Show error alert if present */}
                
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        name="firstName"
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formValues.firstName}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        name="lastName"
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formValues.lastName}
                        onChange={handleChange}
                        required
                    />
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel>Country Code</InputLabel>
                        <Select
                            name="countryCode"
                            value={formValues.countryCode}
                            onChange={handleChange}
                            label="Country Code"
                        >
                            {countryCodes.map((country) => (
                                <MenuItem key={country.code} value={country.code}>
                                    {country.label} ({country.code})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        name="phone"
                        label="Phone Number"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formValues.phone}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        name="email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formValues.email}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        name="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formValues.password}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={formValues.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Sign Up
                    </Button>
                </form>

                <Typography variant="body2" sx={{ mt: 2 }}>
                    Already have an account? <MuiLink href="/">Sign In</MuiLink>
                </Typography>
            </Box>
        </Container>
    );
};

export default SignUp;