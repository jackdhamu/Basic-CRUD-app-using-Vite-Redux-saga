import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Typography,
    Container,
    Box,
    Link as MuiLink,
    Alert
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { signInRequest } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, user } = useSelector(state => state.auth); // Get error and user from auth state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signInRequest({ email, password })); // Send credentials as an object
    };

    // Effect for redirecting on successful sign-in
    useEffect(() => {
        if (user) {
            navigate('/dashboard'); // Redirect to the Dashboard
        }
    }, [user, navigate]);

    return (
        <Container maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
                <Typography variant="h4" sx={{ mb: 2 }}>Sign In</Typography>

                {error && <Alert severity="error">{error}</Alert>}  {/* Show error alert if present */}

                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Sign In
                    </Button>
                </form>

                <Typography variant="body2" sx={{ mt: 2 }}>
                    Don't have an account? <MuiLink href="/signup">Sign Up</MuiLink>
                </Typography>
            </Box>
        </Container>
    );
};

export default SignIn;