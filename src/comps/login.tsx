import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../hooks/useAuth';
import { login } from '../reducers/userReducer';

import {
    Button,
    Typography,
    Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = () => {
            fetch("http://localhost:3000/auth/login/success", {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    // "Access-Control-Allow-Credentials": true,
                },
            })
                .then((response) => {
                    if (response.status === 200) { const r = response.json(); console.log(r); return r; };
                    throw new Error("authentication has been failed!");
                })
                .then((resObject) => {
                    console.log(`resObject: ${resObject}`);
                    // setUser(resObject);
                    dispatch(login());
                    navigate('/');
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        getUser();
    }, []);

    const { loginn } = useAuth();

    const handleLogin = () => {
        try {
            loginn();
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <Box component="main" maxWidth="xs"
            sx={{
                display: 'flex', flexDirection: "column",
                alignItems: "center", justifyContent: 'center',
                height: '100vh',
            }}>
            <Typography component="h1" variant="h3">
                Welcome!
            </Typography>
            <Typography component="h1" variant="h5">
                Please log in to continue
            </Typography>
            <Button
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLogin}
            >
                Sign In With GitHub
            </Button>
        </Box>
    );
};

export default Login;
