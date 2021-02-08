import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';

toast.configure();

export default function Register({order, handleShow}) {

    const [registeredUser, setRegisteredUser] = useState({
        firstName:"",
        lastName: "",
        email:"",
        documentNumber:"",
        phoneNumber:"",
        password:""
    })
    const [show, setShow] = useState(false);

    function handleChange(e) {
        setRegisteredUser({
            ...registeredUser,
            [e.target.name]:e.target.value,
        });
    }

    function handleRegistered() {
        setShow(false);
        handleShow();
    }

    function handleConfirm() {
        let {firstName, lastName, email, documentNumber, phoneNumber, password} = registeredUser;
        
        if(firstName === "" || lastName === "" || email === ""
         || documentNumber === "" || phoneNumber === "" || password === ""){
            toast.error( "Hay campos sin completar", {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined
            } )
        }   
        else {
            axios.post('http://localhost:3001/users/register', registeredUser)
            .then((response) => {
                
                toast.success(`${response.data.firstName} te has registrado con éxito`, {
                    position: "top-center",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                } ); 
                handleRegistered();
            } )
            .catch((error) => {
                const message = (error.request.status === 409) ? '¡Ya existe una cuenta con ese email!' : 'Ocurrió un error inesperado';
                
                toast.error(message, {
                    position: "top-center",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                } );
            } );
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
                <Modal.Title>Registrate</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label className="form-login-label">Nombre</Form.Label>
                    <Form.Control className="form-login-control"
                        onChange={handleChange}
                        name="firstName" 
                        type="text" 
                        placeholder="ingresa tu nombre"/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label className="form-login-label">Apellido</Form.Label>
                    <Form.Control className="form-login-control"
                        onChange={handleChange}
                        name="lastName" 
                        type="text" 
                        placeholder="ingresa tu apellido"/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label className="form-login-label">Email</Form.Label>
                    <Form.Control className="form-login-control"
                        onChange={handleChange}
                        name="email" 
                        type="email" 
                        placeholder="ingresa tu email"/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label className="form-login-label">Documento</Form.Label>
                    <Form.Control className="form-login-control"
                        onChange={handleChange}
                        name="documentNumber" 
                        type="number" 
                        placeholder="ingresa tu número de documento"/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label className="form-login-label">Celular</Form.Label>
                    <Form.Control className="form-login-control"
                        onChange={handleChange}
                        name="phoneNumber" 
                        type="number" 
                        placeholder="ingresa tu número de celular"/>
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
                onClick={handleRegistered}>
                    Cancelar
                </Button>
                <Button onClick={handleConfirm} 
                className="modal-button-save-proyect">
                    Registrarme
                </Button>
            </Modal.Footer>
        </Modal>
    )
}