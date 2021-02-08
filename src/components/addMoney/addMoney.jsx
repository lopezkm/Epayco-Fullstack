import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Modal, Form, Button } from 'react-bootstrap';
import { MoneyAdded } from '../../redux/actions/actions.js';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';

toast.configure();

export default function AddMoney( {order, handleShow} ) {

    const [moneyAdded, setMoneyAdded] = useState({
        documentNumber:"",
        phoneNumber:"",
        money:0
    })
    const [show, setShow] = useState(false);
    const [flag, setFlag] = useState(false);
    const loggedIn = useSelector(state => state);
    const dispatch = useDispatch();

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
        
        let {documentNumber, phoneNumber, money} = moneyAdded;
        let {balance, firstName} = loggedIn
        
        if(documentNumber === "" || phoneNumber === "" || money === ""){
            toast.error("Debes completar todos los campos", {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined
            })
        } else if (parseInt(documentNumber) !== loggedIn.documentNumber){
            toast.error('El n° de documento no coincide', {
                position: "top-center",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
        } else if (phoneNumber !== loggedIn.phoneNumber){
            toast.error('El n° de celular no coincide', {
                position: "top-center",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
        } else {
            axios.put('http://localhost:3001/users/addMoney', {documentNumber, phoneNumber, money, balance})
            .then((response) => {
                toast.success( `${firstName}, la operación de realizo exitosamente!. Recargaste $ ${money} `, {
                    position: "top-center",
                    autoClose: 4000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                } );
                dispatch(MoneyAdded(response.data.balance));
                setTimeout(() => {
                    setFlag(true);
                    handleMoneyAdded();
                }, 4100);
            } )
            .catch(( error ) => {
                const message = (error.request.status === 404) ? '¡Número de codumento incorrecto!': 
                (error.request.status === 401) ? 'Número telefónico incorrecto':'Error Inesperado';
                
                toast.error(message, {
                    position: "top-center",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
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
            {flag ? <Redirect to="/wallet"/> : null}
            <Modal.Header className="modal-proyect-header">
                <Modal.Title>Carga saldo en tu billetera</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label className="form-login-label">Ingresa tu documento</Form.Label>
                    <Form.Control className="form-login-control"
                        onChange={handleChange}
                        name="documentNumber" 
                        type="text" 
                        placeholder="N° de documento"/>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label className="form-login-label">Ingresa tu celular</Form.Label>
                    <Form.Control className="form-login-control"
                        onChange={handleChange}
                        name="phoneNumber" 
                        type="text" 
                        placeholder="N° de celular"/>
                </Form.Group>
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