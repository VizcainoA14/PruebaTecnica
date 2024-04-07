import React from 'react';
import Button from '@mui/material/Button';
import './css/SingIn.css';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";


export function SingIn() {
    const { isAuthenticated, user, loginWithRedirect } = useAuth0();

    useEffect(() => {
        if (isAuthenticated) {
            window.location.href = '/dashboard';
        }
    }, [isAuthenticated]);

    return (
        <div className="SingIn">
            <div className="half half-white"></div>
            <div className="half half-blue"></div>
            <div className='rectangle'></div>
            <Button className='Button' variant="contained"
                onClick={() => loginWithRedirect()}>Sing In</Button>
            <text className="title">Employee Manager</text>
        </div>
    );
}

export default SingIn;