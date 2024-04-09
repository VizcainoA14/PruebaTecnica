import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useAuth0 } from "@auth0/auth0-react";
import "../pages/css/Add.css";


Modal.setAppElement("#root");

export const Update = ({ id,
    nombresProp,
    apellidosProp,
    tipoIdentificacionProp,
    identificacionProp,
    salarioMensualProp,
    cargoProp,
    departamentoProp,

    idEmail1Prop,
    email1Prop,

    idEmail2Prop,
    email2Prop,

    idTelefono1Prop,
    tipo1Prop,
    numero1Prop,
    indicativo1Prop,

    idTelefono2Prop,
    tipo2Prop,
    numero2Prop,
    indicativo2Prop,

}) => {


    const [isOpen, setIsOpen] = useState(false);
    const get_token = useAuth0().getIdTokenClaims();
    const [accessToken, setAccessToken] = useState("");
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [tipoIdentificacion, setTipoIdentificacion] = useState("");
    const [identificacion, setIdentificacion] = useState("");
    const [salarioMensual, setSalarioMensual] = useState("");
    const [cargo, setCargo] = useState("");
    const [departamento, setDepartamento] = useState("");
    const [email1, setEmail1] = useState("");
    const [email2, setEmail2] = useState("");
    const [tipo1, setTipo1] = useState("");
    const [numero1, setNumero1] = useState("");
    const [indicativo1, setIndicativo1] = useState("");
    const [tipo2, setTipo2] = useState("");
    const [numero2, setNumero2] = useState("");
    const [indicativo2, setIndicativo2] = useState("");

    useEffect(() => {
        setNombres(nombresProp);
        setApellidos(apellidosProp);
        setTipoIdentificacion(tipoIdentificacionProp);
        setIdentificacion(identificacionProp);
        setSalarioMensual(salarioMensualProp);
        setCargo(cargoProp);
        setDepartamento(departamentoProp);
        setEmail1(email1Prop);
        setEmail2(email2Prop);
        setTipo1(tipo1Prop);
        setNumero1(numero1Prop);
        setIndicativo1(indicativo1Prop);
        setTipo2(tipo2Prop);
        setNumero2(numero2Prop);
        setIndicativo2(indicativo2Prop);

    }, []);



    const handleSubmit = async (event) => {
        event.preventDefault();

        let accessToken = await get_token;
        get_token.then((result) => {
            setAccessToken(result.__raw);
        });
        const token = accessToken.__raw;


        const requestBody = {
            nombres: nombres,
            apellidos: apellidos,
            tipoIdentificacion: tipoIdentificacion,
            identificacion: identificacion,
            salarioMensual: salarioMensual,
            cargo: cargo,
            departamento: departamento,
        };


        const requestBody2 = {
            email: email1,
            empleadoId: id,
        };

        const requestBody3 = {
            email: email2,
            empleadoId: id ,
        };

        const requestBody4 = {
            tipo: tipo1,
            numero: numero1,
            indicativo: indicativo1,
            empleadoId: id ,
        };

        const requestBody5 = {
            tipo: tipo2,
            numero: numero2,
            indicativo: indicativo2,
            empleadoId: id,

        };

        event.preventDefault();
        await fetch(`http://127.0.0.1:8000/apiempleados/${id}/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body:
                JSON.stringify(requestBody),
        })
            .then((response) => response.json())
            .then((data) => {
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        
        

        if (email1 !== "") {
            await fetch(`http://127.0.0.1:8000/apiemails/${idEmail1Prop}/`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body:
                    JSON.stringify(requestBody2),
            })
                .then((response) => response.json())
                .then((data) => {
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }

        if (email2 !== "") {
            await fetch(`http://127.0.0.1:8000/apiemails/${idEmail2Prop}/`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body:
                    JSON.stringify(requestBody3),
            })
                .then((response) => response.json())
                .then((data) => {
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }

        if (numero1 !== "") {
            await fetch(`http://127.0.0.1:8000/apitelefonos/${idTelefono1Prop}/`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body:
                    JSON.stringify(requestBody4),
            })
                .then((response) => response.json())
                .then((data) => {
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }

        if (numero2 !== "") {
            await fetch(`http://127.0.0.1:8000/apitelefonos/${idTelefono2Prop}/`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body:
                    JSON.stringify(requestBody5),
            })
                .then((response) => response.json())
                .then((data) => {
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        };

        if (idEmail1Prop === null && email1 !== "") {
            await fetch(`http://127.0.0.1:8000/apiemails/`
                , {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    },
                    body:
                        JSON.stringify(requestBody2),
                })
                .then((response) => response.json())
                .then((data) => {
                })
                .catch((error) => {
                    console.error("Error:", error); 
                });
        }   

        if (idEmail2Prop === null && email2 !== "") {
            await fetch(`http://127.0.0.1:8000/apiemails/`
                , {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    },
                    body:
                        JSON.stringify(requestBody3),
                })
                .then((response) => response.json())
                .then((data) => {
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }

        if (idTelefono1Prop === null && numero1 !== "") {
            await fetch(`http://127.0.0.1:8000/apitelefonos/` 
                , {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    },
                    body:
                        JSON.stringify(requestBody4),
                })
                .then((response) => response.json())
                .then((data) => {
                })
                .catch((error) => {
                    console.error("Error:", error); 
                });
        }

        if (idTelefono2Prop === null && numero2 !== "") {
            await fetch(`http://127.0.0.1:8000/apitelefonos/` 
                , {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    },
                    body:
                        JSON.stringify(requestBody5),
                })
                .then((response) => response.json())
                .then((data) => {
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
        window.location.reload();
    };


    const togglePopUp = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button className="update-button-inventory" onClick={togglePopUp}>
                Update
            </button>
            <Modal
                isOpen={isOpen}
                onRequestClose={togglePopUp}
                contentLabel="Example Modal"
                className="popup-content"
            >

<form className="center-items" onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px' }}>
                    <label className="popup-form-child">Nombres</label>
                    <input className="popup-form-child"
                        placeholder="Nombres"
                        value={nombres}
                        type="text"
                        onChange={(event) => setNombres(event.target.value)}
                    />
                    <label className="popup-form-child">Apellidos</label>
                    <input className="popup-form-child"
                        placeholder="Apellidos"
                        value={apellidos}
                        type="text"
                        onChange={(event) => setApellidos(event.target.value)}
                    />
                    <label className="popup-form-child">Tipo de Identificación</label>
                    <select className="popup-form-child"
                        value={tipoIdentificacion}
                        onChange={(event) => setTipoIdentificacion(event.target.value)}>
                        <option value="">Selecciona un tipo</option>
                        <option value="cc">CC</option>
                        <option value="ti">TI</option>
                        {/* Añade más opciones si es necesario */}
                    </select>
                    <label className="popup-form-child">Identificación</label>
                        
                    <input className="popup-form-child"
                        placeholder="Identificación"
                        value={identificacion}
                        type="text"
                        onChange={(event) => setIdentificacion(event.target.value)}
                    />
                    <label className="popup-form-child">Salario Mensual</label>
                    <input className="popup-form-child"
                        placeholder="Salario Mensual"
                        value={salarioMensual}
                        type="text"
                        onChange={(event) => setSalarioMensual(event.target.value)}
                    />
                    <label className="popup-form-child">Cargo</label>
                    <input className="popup-form-child"
                        placeholder="Cargo"
                        value={cargo}
                        type="text"
                        onChange={(event) => setCargo(event.target.value)}
                    />
                    <label className="popup-form-child">Departamento</label>
                    <input className="popup-form-child"
                        placeholder="Departamento"
                        value={departamento}
                        type="text"
                        onChange={(event) => setDepartamento(event.target.value)}
                    />
                    <label className="popup-form-child">Email 1</label>
                    <input className="popup-form-child"
                        placeholder="Email 1"
                        value={email1}
                        type="text"
                        onChange={(event) => setEmail1(event.target.value)}
                    />
                    <label className="popup-form-child">Email 2</label>
                    <input className="popup-form-child"
                        placeholder="Email 2"
                        value={email2}
                        type="text"
                        onChange={(event) => setEmail2(event.target.value)}
                    />

                    <label className="popup-form-child">Tipo1</label>
                    <select className="popup-form-child"
                        value={tipo1}
                        onChange={(event) => setTipo1(event.target.value)}>
                        <option value="">Selecciona un tipo</option>
                        <option value="cell">Celular</option>
                        <option value="tel">Telefono</option>
                    </select>
                    <label className="popup-form-child">Número 1</label>
                    <input className="popup-form-child"
                        placeholder="Número 1"
                        value={numero1}
                        type="text"
                        onChange={(event) => setNumero1(event.target.value)}
                    />
                    <label className="popup-form-child">Indicativo 1</label>
                    <input className="popup-form-child"
                        placeholder="Indicativo 1"
                        value={indicativo1}
                        type="text"
                        onChange={(event) => setIndicativo1(event.target.value)}
                    />
                    <label className="popup-form-child">Tipo2</label>
                    <select className="popup-form-child"
                        value={tipo2}
                        onChange={(event) => setTipo2(event.target.value)}>
                        <option value="">Selecciona un tipo</option>
                        <option value="cell">Celular</option>
                        <option value="tel">Telefono</option>
                    </select>
                    <label className="popup-form-child">Número 2</label>
                    <input className="popup-form-child"
                        placeholder="Número 2"
                        value={numero2}
                        type="text"
                        onChange={(event) => setNumero2(event.target.value)}
                    />
                    <label className="popup-form-child">Indicativo 2</label>
                    <input className="popup-form-child"
                        placeholder="Indicativo 2"
                        value={indicativo2}
                        type="text"
                        onChange={(event) => setIndicativo2(event.target.value)}
                    />
                    <button className="popup-form-child" type="submit" style={{ gridColumn: 'span 2' }}>Update</button>
                </form>
            </Modal>
        </div>
    );
};

export default Update;