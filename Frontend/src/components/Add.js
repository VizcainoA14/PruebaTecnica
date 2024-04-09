import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "../pages/css/Add.css";
import { useAuth0 } from "@auth0/auth0-react";



Modal.setAppElement("#root");

export const PopupForm = () => {
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
    const [isLoading, setIsLoading] = useState(false);

    const [id, setId] = useState(0);


    const [email1, setEmail1] = useState("");
    const [email2, setEmail2] = useState("");

    const [tipo1, setTipo1] = useState("");
    const [numero1, setNumero1] = useState("");
    const [indicativo1, setIndicativo1] = useState("");

    const [tipo2, setTipo2] = useState("");
    const [numero2, setNumero2] = useState("");
    const [indicativo2, setIndicativo2] = useState("");




    useEffect(() => {
        setNombres("Name");
        setApellidos("Last Name");
        setTipoIdentificacion("cc");
        setIdentificacion("123456789");
        setSalarioMensual("1000000");
        setCargo("Developer");
        setDepartamento("IT");

        setEmail1("Name@gmail.com");
        setEmail2("");

        setTipo1("cell");
        setNumero1(1234567890);
        setIndicativo1("+1");

        setTipo2("cell");
        setNumero2("");
        setIndicativo2("");



    }, []);

    async function fetchData() {
        try {
            let accessToken = await get_token;
            get_token.then((result) => {
                setAccessToken(result.__raw);
            });
            const token = accessToken.__raw;
            const response = await fetch(`http://127.0.0.1:8000/apiempleados/last_created/`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            setId(data.id);
            return data.id;
        } catch (error) {
            console.error("Error:", error);
        }
    }



    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        let accessToken = await get_token;
        get_token.then((result) => {
            setAccessToken(result.__raw);
        });
        const token = accessToken.__raw;

        const id = await fetchData();
        console.log(id)

        const requestBody = {
            nombres: nombres,
            apellidos: apellidos,
            tipoIdentificacion: tipoIdentificacion,
            identificacion: identificacion,
            salarioMensual: salarioMensual,
            cargo: cargo,
            departamento: departamento,
        };

        console.log(id)

        const requestBody2 = {
            email: email1,
            empleadoId: id,
        };

        const requestBody3 = {
            email: email2,
            empleadoId: id,
        };

        const requestBody4 = {
            tipo: tipo1,
            numero: numero1,
            indicativo: indicativo1,
            empleadoId: id,
        };
        
        const requestBody5 = {
            tipo: tipo2,
            numero: numero2,
            indicativo: indicativo2,
            empleadoId: id,

        };

        event.preventDefault();
        await fetch(`http://127.0.0.1:8000/apiempleados/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body:
                JSON.stringify(requestBody),
        })
            .then((response) => response.json())
            .then((data) => {
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        
        if (email1 !== "") {
            await fetch(`http://127.0.0.1:8000/apiemails/`, {
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
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }

        if (email2 !== "") {
        await fetch(`http://127.0.0.1:8000/apiemails/`, {
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
                setIsLoading(false);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }

        if (numero1 !== "") {
            await fetch(`http://127.0.0.1:8000/apitelefonos/`, {
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
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }

        if (numero2 !== "") {
            await fetch(`http://127.0.0.1:8000/apitelefonos/`, {
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
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        };


    };

    const togglePopUp = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button className="add-button" onClick={togglePopUp}>
                Añadir Empleado
            </button>

            <Modal
                isOpen={isOpen}
                onRequestClose={togglePopUp}
                contentLabel="Example Modal"
                className="popup-content"
            >

                {isLoading ? (
                    <div className="loading">Loading...</div>

                ) : (

                <form className="popup-form" onSubmit={handleSubmit}>
                    <label className="popup-form-child">Nombres</label>
                    <input className="popup-form-child"
                        placeholder="Name"
                        type="text"
                        onChange={(event) => setNombres(event.target.value)}
                    />

                    <label className="popup-form-child">Apellidos</label>
                    <input className="popup-form-child"
                        placeholder="Last Name"
                        type="text"
                        onChange={(event) => setApellidos(event.target.value)}
                    />
                    <label className="popup-form-child">Tipo de Identificación</label>
                    <select className="popup-form-child" onChange={(event) => setTipoIdentificacion(event.target.value)}>
                        <option value="">Selecciona un tipo</option>
                        <option value="cc">CC</option>
                        <option value="ti">TI</option>
                        {/* Añade más opciones si es necesario */}
                    </select>

                    <label className="popup-form-child">Identificación</label>
                    <input className="popup-form-child"
                        placeholder="123456789"
                        type="text"
                        onChange={(event) => setIdentificacion(event.target.value)}
                    />

                    <label className="popup-form-child">Salario Mensual</label>
                    <input className="popup-form-child"
                        placeholder="1000000"
                        type="number"
                        min="1,000"
                        step="0.01"
                        onChange={(event) => setSalarioMensual(event.target.value)}
                    />

                    <label className="popup-form-child">Cargo</label>
                    <input className="popup-form-child"
                        placeholder="Developer"
                        type="text"
                        onChange={(event) => setCargo(event.target.value)}
                    />

                    <label className="popup-form-child">Departamento</label>
                    <input className="popup-form-child"
                        placeholder="IT"
                        type="text"
                        onChange={(event) => setDepartamento(event.target.value)}
                    />

                    <label className="popup-form-child">Email 1</label>
                    <input className="popup-form-child"
                        placeholder="Name@gmail.com"
                        type="text"
                        onChange={(event) => setEmail1(event.target.value)}
                    />

                    <label className="popup-form-child">Email 2</label>
                    <input className="popup-form-child"
                        placeholder=""
                        type="text"
                        onChange={(event) => setEmail2(event.target.value)}
                    />

                    <label className="popup-form-child">Telefono1</label>
                    <label className="popup-form-child">Tipo</label>
                    <select className="popup-form-child" onChange={(event) => setTipo1(event.target.value)}>
                        <option value="">Selecciona un tipo</option>
                        <option value="cell">Celular</option>
                        <option value="tel">Telefono</option>

                    </select>

                    <label className="popup-form-child">Numero</label>
                    <input className="popup-form-child"
                        placeholder="1234567890"
                        type="text"
                        onChange={(event) => setNumero1(event.target.value)}
                    />

                    <label className="popup-form-child">Indicativo</label>
                    <input className="popup-form-child"
                        placeholder="+1"
                        type="text"
                        onChange={(event) => setIndicativo1(event.target.value)}
                    />

                    <label className="popup-form-child">Telefono2</label>
                    <label className="popup-form-child">Tipo</label>
                    <select className="popup-form-child" onChange={(event) => setTipo2(event.target.value)}>
                        <option value="">Selecciona un tipo</option>
                        <option value="cell">Celular</option>
                        <option value="tel">Telefono</option>

                    </select>

                    <label className="popup-form-child">Numero</label>
                    <input className="popup-form-child"
                        placeholder=""
                        type="text"
                        onChange={(event) => setNumero2(event.target.value)}
                    />

                    <label className="popup-form-child">Indicativo</label>
                    <input className="popup-form-child"
                        placeholder=""
                        type="text"
                        onChange={(event) => setIndicativo2(event.target.value)}
                    
                    />  
                    <div className="center-items">
                        <button
                            className="popup-form-child-button-form-add-item"
                            type="submit">
                            Enviar
                        </button>
                        <div className="flex-container">
                            <div>
                                <button className="close" onClick={togglePopUp}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                    </form>
                        
                )}
            </Modal>
        </div>
    );
};

export default PopupForm;