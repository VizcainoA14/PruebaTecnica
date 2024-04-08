
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

function createData(id, emails, telefonos, nombres, apellidos, tipoIdentificacion, identificacion, fechaIngreso, salarioMensual, cargo, departamento) {
    return {
        id,
        emails,
        telefonos,
        nombres,
        apellidos,
        tipoIdentificacion,
        identificacion,
        fechaIngreso,
        salarioMensual,
        cargo,
        departamento
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [accessToken, setAccessToken] = useState("");
    const [error, setError] = useState(null);
    const get_token = useAuth0().getIdTokenClaims();


    const deleteEmployee = async (id) => { 
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
            window.location.reload();
        }
    }

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
                    <button>Actualizar</button>
                </TableCell>
                <TableCell align="right">
                    <button onClick={() => deleteEmployee(row.id)}>Eliminar</button>
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


Row.propTypes = {
    row: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
};

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export default function CollapsibleTable() {

    const [Employees, setEmployees] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [accessToken, setAccessToken] = useState("");
    const [error, setError] = useState(null);
    const get_token = useAuth0().getIdTokenClaims();

    useEffect(() => {
        GetData();
    }, []);

    const GetData = async () => {
        try {
            let accessToken = await get_token;
            get_token.then((result) => {
                setAccessToken(result.__raw);
            });
            const token = accessToken.__raw;
            setLoading(true);
            const response = await fetch(
                "http://127.0.0.1:8000/apiempleados/",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
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
                    {Employees.map((row) => (
                        <Row key={row.id} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}