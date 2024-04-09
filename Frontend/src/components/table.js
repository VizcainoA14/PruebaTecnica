
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import React, { useState } from 'react';
import Update from './update';


function Row(props) {
    const { row, handleDelete } = props;
    const [open, setOpen] = React.useState(false);
    const [accessToken, setAccessToken] = useState("");
    const [error, setError] = useState(null);
    const get_token = useAuth0().getIdTokenClaims();

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.nombres}
                </TableCell>
                <TableCell align="right">{row.apellidos}</TableCell>
                <TableCell align="right">{row.tipoIdentificacion}</TableCell>
                <TableCell align="right">{row.identificacion}</TableCell>
                <TableCell align="right">{row.fechaIngreso}</TableCell>
                <TableCell align="right">{row.salarioMensual}</TableCell>
                <TableCell align="right">{row.cargo}</TableCell>
                <TableCell align="right">{row.departamento}</TableCell>
                <TableCell align="right">
                    <button>
                        <Update id={row.id}
                            nombresProp={row.nombres}
                            apellidosProp={row.apellidos}
                            tipoIdentificacionProp={row.tipoIdentificacion}
                            identificacionProp={row.identificacion}
                            fechaIngresoProp={row.fechaIngreso}
                            salarioMensualProp={row.salarioMensual}
                            cargoProp={row.cargo}
                            departamentoProp={row.departamento}



                            idEmail1Prop={row.emails[0] ? row.emails[0].id : ""}
                            email1Prop={row.emails[0] ? row.emails[0].email : ""}


                            idEmail2Prop={row.emails[1] ? row.emails[1].id : ""}
                            email2Prop={row.emails[1] ? row.emails[1].email : ""}


                            idTelefono1Prop={row.telefonos[0] ? row.telefonos[0].id : ""}
                            tipo1Prop={row.telefonos[0] ? row.telefonos[0].tipo : ""}
                            numero1Prop={row.telefonos[0] ? row.telefonos[0].numero : ""}
                            indicativo1Prop={row.telefonos[0] ? row.telefonos[0].indicativo : ""}


                            idTelefono2Prop={row.telefonos[1] ? row.telefonos[1].id : ""}
                            tipo2Prop={row.telefonos[1] ? row.telefonos[1].tipo : ""}
                            numero2Prop={row.telefonos[1] ? row.telefonos[1].numero : ""}
                            indicativo2Prop={row.telefonos[1] ? row.telefonos[1].indicativo : ""}
                        />
                    </button>
                </TableCell>
                <TableCell align="right">
                    <button onClick={() => {
                        handleDelete(row.id);
                        window.scrollTo(0, 0);
                    }}>Eliminar</button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Emails y Teléfonos
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Tipo de Teléfono</TableCell>
                                        <TableCell>Número de Teléfono</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.emails.map((email, index) => (
                                        <TableRow key={email.id}>
                                            <TableCell component="th" scope="row">
                                                {email.email}
                                            </TableCell>
                                            <TableCell>{row.telefonos[index].tipo}</TableCell>
                                            <TableCell>{row.telefonos[index].numero}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


export default function CollapsibleTable() {

    const [triggerUpdate, setTriggerUpdate] = React.useState(false);
    const [Employees, setEmployees] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [accessToken, setAccessToken] = useState("");
    const [error, setError] = useState(null);
    const get_token = useAuth0().getIdTokenClaims();


    const handleDelete = async (id) => {
        await deleteEmployee(id);
        setTriggerUpdate(!triggerUpdate); // toggle the value to trigger an update
    };


    const deleteEmployee = async (id) => {
        setLoading(true); // Agrega esta línea para establecer loading en true al inicio de la eliminación
        try {
            let accessToken = await get_token;
            get_token.then((result) => {
                setAccessToken(result.__raw);
            });
            const token = accessToken.__raw;
            const response = await fetch(
                `http://127.0.0.1:8000/apiempleados/${id}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            }
            );
            if (!response.ok) {
                throw new Error("Network response was not OK");
            }

        } catch (error) {
            setError(error);

        } finally {
            setLoading(false); // Agrega esta línea para establecer loading en false una vez que la eliminación se haya completado
            setTriggerUpdate(!triggerUpdate); // toggle the value to trigger an update
        }
    }

    useEffect(() => {
        setLoading(true);
        const GetData = async () => {
            try {
                let accessToken = await get_token;
                get_token.then((result) => {
                    setAccessToken(result.__raw);
                });
                const token = accessToken.__raw;
                //await 3 seconds
                await new Promise(resolve => setTimeout(resolve, 3000));
                const response = await fetch(
                    `http://127.0.0.1:8000/apiempleados/`,
                    {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token,
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error("Network response was not OK");
                }
                const json = await response.json();
                setEmployees(json);

            } catch (error) {
                setError(error);

            } finally {
                setLoading(false);
            }
        };

        GetData();
    }, [triggerUpdate]);

    // En tu componente de renderizado
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Nombres</TableCell>
                        <TableCell align="right">Apellidos</TableCell>
                        <TableCell align="right">Tipo de Identificación</TableCell>
                        <TableCell align="right">Identificación</TableCell>
                        <TableCell align="right">Fecha de Ingreso</TableCell>
                        <TableCell align="right">Salario Mensual</TableCell>
                        <TableCell align="right">Cargo</TableCell>
                        <TableCell align="right">Departamento</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={9}>Cargando...</TableCell>
                        </TableRow>
                    ) : (
                        Employees.map((row) => (
                            <Row key={row.id} row={row} handleDelete={handleDelete} />
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}