import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Modal, Form, Button } from 'react-bootstrap';
import { MoneySubstracted } from '../../redux/actions/actions.js';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';

toast.configure();

export default function ConfirmShop({modalConfirm, handleConfirmCode, closeShop, shopAmount}) {

    const [code, setCode] = useState({
        confirmCode:""
    })
    const [show, setShow] = useState(false);
    const [flag, setFlag] = useState(false);
    const loggedIn = useSelector(state => state);
    const dispatch = useDispatch();

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
        let {firstName, shopCode, balance, documentNumber, phoneNumber} = loggedIn;
        if(confirmCode === ""){
            toast.error( "No ingresaste ningún código", {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined
            } )
        }   
        else if (parseInt(confirmCode) !== shopCode) {
            toast.error( "Código incorrecto", {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined
            } )
        } else {
            axios.put("http://localhost:3001/users/substractMoney", {documentNumber, phoneNumber, shopAmount, balance})
            .then((response) => {
                toast.success(`${firstName}, tu compra fue confirmada con éxito`, {
                    position: 'top-center',
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined
                } );
                dispatch(MoneySubstracted(response.data.balance));
                setTimeout(() => {
                    setFlag(true);
                    handleconfirmShop();
                    closeShop();
                }, 4100);
            })
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
            <Modal.Header className="header-confirmShop">
                <Modal.Title className="text-white">Ingresa el código de confirmación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formBasicCode">
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        onChange={handleChange}
                        name="confirmCode" 
                        type="text" 
                        placeholder="código de confirmación"/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer className="footer-confirmShop">
                <Button className="btn btn-danger" 
                onClick={handleconfirmShop}>
                    Cancelar
                </Button>
                <Button onClick={handleConfirm} 
                className="btn btn-success">
                    Confirmar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}