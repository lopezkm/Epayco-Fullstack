import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { LoggedUser } from '../../redux/actions/actions.js';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';

toast.configure();

export default function Login({order, handleShow}) {

    const [loggedUser, setLoggedUser] = useState({
        email:"",
        password:""
    })
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    function handleChange(e) {
        setLoggedUser({
            ...loggedUser,
            [e.target.name]:e.target.value,
        });
    }

    function handleLogued() {
        setShow(false);
        handleShow();
    }

    function handleConfirm() {
        
        let {email, password} = loggedUser;
        
        if(email === "" || password === ""){
            toast.error( "Hay campos sin completar", {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined
            })
        }   
        else {
            axios.post('http://localhost:3001/users/login', loggedUser)
            .then((response) => {
                toast.success(`Hola ${response.data.firstName}, bienvenid@! `, {
                    position: "top-center",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                } );
                dispatch(LoggedUser(response.data));
                handleLogued();
            })
            .catch((error) => {
                const message = (error.request.status === 404) ? '¡Usuario no registrado!': 
                (error.request.status === 401) ? 'Contraseña incorrecta':'Error Inesperado';
                toast.error(message, {
                    position: "top-center",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            });
        }
    }

    useEffect(()=> {
        setShow(order);
    },[order])

    return (
        <Modal
            show={show}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header className="modal-proyect-header">
                <Modal.Title>Inicia Sesión</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label className="form-login-label">Email</Form.Label>
                    <Form.Control className="form-login-control"
                        onChange={handleChange}
                        name="email" 
                        type="email" 
                        placeholder="ingresa tu email"/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label className="form-login-label">Contraseña</Form.Label>
                    <Form.Control className="form-login-control"
                        onChange={handleChange}
                        name="password" 
                        type="password" 
                        placeholder="ingresa tu contraseña" />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer className="modal-proyect-footer">
                <Button className="modal-button-close" 
                onClick={handleLogued}>
                    Cancelar
                </Button>
                <Button onClick={handleConfirm} 
                className="modal-button-save-proyect">
                    Ingresar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}