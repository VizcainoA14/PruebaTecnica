import React, { useState, useEffect } from 'react';
import './css/SingIn.css';
import { useAuth0 } from "@auth0/auth0-react";
import { ResponsiveAppBar } from '../components/header';
import CollapsibleTable from '../components/table';
import "./css/Dashboard.css";

export function Dashboard() {
    const { isAuthenticated, user, loginWithRedirect } = useAuth0();
    const [isLoading, setIsLoading] = useState(true);

    // Simulación de la carga de datos
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Cambia este valor al tiempo que tarda en cargar tus datos

        return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
    }, []);

    return (
        <div className="Dashboard">
            <div className='table'>
            {isAuthenticated && (isLoading ? <div>Cargando...</div> : <CollapsibleTable/>)}
            </div>
            <div className="navbar">
                <ResponsiveAppBar />
            </div>
        </div>
    );
}

export default Dashboard;