import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Modal, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

toast.configure();

export default function AddMoney( {order, handleShow} ) {

    const [moneyAdded, setMoneyAdded] = useState({
        money:""
    })
    const [show, setShow] = useState(false);
    const [flag, setFlag] = useState(false);

    function handleChange(e) {
        setMoneyAdded({
            ...moneyAdded,
            [e.target.name]:e.target.value,
        });
    }

    function handleMoneyAdded() {
        setShow(false);
        handleShow();
    }

    function handleConfirm() {
        let {money} = moneyAdded;
        if(money === ""){
            toast.error( "No ingresaste ningún monto", {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined
            } )
        }   
        else {
            toast.success( `Listo QUIEN SEAS, la operación de realizo exitosamente`, {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined
            } );
            setTimeout(() => {
                setFlag(true);
                handleMoneyAdded();
            }, 2100);
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
            {flag ? <Redirect to="/wallet"/> : null}
            <Modal.Header className="modal-proyect-header">
                <Modal.Title>Ingresa el monto a recargar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label className="form-login-label">Recarga</Form.Label>
                    <Form.Control className="form-login-control"
                        onChange={handleChange}
                        name="money" 
                        type="text" 
                        placeholder="monto a recargar"/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer className="modal-proyect-footer">
                <Button className="modal-button-close" 
                onClick={handleMoneyAdded}>
                    Cancelar
                </Button>
                <Button onClick={handleConfirm} 
                className="modal-button-save-proyect">
                    Recargar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}