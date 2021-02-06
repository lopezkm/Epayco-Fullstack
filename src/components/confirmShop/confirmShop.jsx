import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Modal, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

toast.configure();

export default function ConfirmShop({modalConfirm, handleConfirmCode, closeShop}) {

    const [code, setCode] = useState({
        confirmCode:""
    })
    const [show, setShow] = useState(false);
    const [flag, setFlag] = useState(false);

    function handleChange(e) {
        setCode({
            ...code,
            [e.target.name]:e.target.value,
        });
    }

    function handleconfirmShop() {
        setShow(false);
        handleConfirmCode();
    }

    function handleConfirm() {
        let {confirmCode} = code;
        if(confirmCode === ""){
            toast.error( "No ingresaste ningún código", {
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
            toast.success( `QUIEN SEAS, compra confirmada con éxito`, {
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
                handleconfirmShop();
                closeShop();
            }, 2100);
        }
    }

    useEffect(()=> {
        setShow(modalConfirm);
    },[modalConfirm])


    return (
        <Modal
            show={show}
            backdrop="static"
            keyboard={false}
        >
            {flag ? <Redirect to="/wallet"/> : null}
            <Modal.Header className="modal-proyect-header">
                <Modal.Title>Ingresa el código de confirmación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label className="form-login-label">Código</Form.Label>
                    <Form.Control className="form-login-control"
                        onChange={handleChange}
                        name="confirmCode" 
                        type="text" 
                        placeholder="código de confirmación"/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer className="modal-proyect-footer">
                <Button className="modal-button-close" 
                onClick={handleconfirmShop}>
                    Cancelar
                </Button>
                <Button onClick={handleConfirm} 
                className="modal-button-save-proyect">
                    Confirmar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}