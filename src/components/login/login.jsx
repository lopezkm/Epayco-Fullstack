import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

toast.configure();

export default function Login({order, handleShow}) {

    const [loguedUser, setLoguedUser] = useState({
        email:"",
        password:""
    })
    const [show, setShow] = useState(false);

    function handleChange(e) {
        setLoguedUser({
            ...loguedUser,
            [e.target.name]:e.target.value,
        });
    }

    function handleLogued() {
        setShow(false);
        handleShow();
    }

    function handleConfirm() {
        toast.success( `Logueo exitoso con ${loguedUser.email}`, {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined
        } );
        handleLogued();
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