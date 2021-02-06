import React, { useState, useEffect } from 'react';
import ConfirmShop from '../confirmShop/confirmShop.jsx';
import { Redirect } from 'react-router-dom';
import { Modal, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

toast.configure();

export default function Shop({order, handleShow}) {

    const [shopMade, setShopMade] = useState({
        shopAmount:""
    })
    const [show, setShow] = useState(false);
    const [flag, setFlag] = useState(false);

    function handleChange(e) {
        setShopMade({
            ...shopMade,
            [e.target.name]:e.target.value,
        });
    }

    function handleShopMade() {
        setShow(false);
        handleShow();
    }

    function handleConfirmShop() {
        setFlag(!flag)
    }

    function handleConfirm() {
        let {shopAmount} = shopMade;
        if(shopAmount === ""){
            toast.error( "No ingresaste ningún monto de compra", {
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
            toast.success( `QUIEN SEAS, por favor confirma tu compra con el código enviado a tu email `, {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined
            } );
            setTimeout(() => {
                handleConfirmShop();
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
            <Modal.Header className="modal-proyect-header">
                <Modal.Title>Ingresa el monto de la compra</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label className="form-login-label">Monto</Form.Label>
                    <Form.Control className="form-login-control"
                        onChange={handleChange}
                        name="shopAmount" 
                        type="text" 
                        placeholder="monto de la compra"/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer className="modal-proyect-footer">
                <Button className="modal-button-close" 
                onClick={handleShopMade}>
                    Cancelar
                </Button>
                <Button onClick={handleConfirm} 
                className="modal-button-save-proyect">
                    Comprar
                </Button>
            </Modal.Footer>
            <ConfirmShop
                modalConfirm= {flag}
                handleConfirmCode= {handleConfirmShop}
                closeShop= {handleShopMade}
            />
        </Modal>
    )
}