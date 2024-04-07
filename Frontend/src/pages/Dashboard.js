import React from 'react';
import './css/SingIn.css';
import { useAuth0 } from "@auth0/auth0-react";
import { ResponsiveAppBar } from '../components/header';
import CollapsibleTable from '../components/table';
import "./css/Dashboard.css";

export function Dashboard() {
    const { isAuthenticated, user, loginWithRedirect } = useAuth0();

    return (
        <div className="Dashboard">
            
            
            <div className='table'>
            {isAuthenticated && <CollapsibleTable/>}
            </div>
            <div className="navbar">
                <ResponsiveAppBar />
            </div>

        </div>
    );
}

export default Dashboard;