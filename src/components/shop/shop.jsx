import React, { useState, useEffect } from 'react';
import ConfirmShop from '../confirmShop/confirmShop.jsx';
import { Modal, Form, Button } from 'react-bootstrap';
import { ShopCode } from '../../redux/actions/actions.js';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';

toast.configure();

export default function Shop({order, handleShow}) {
    
    const [shopMade, setShopMade] = useState({
        shopAmount:""
    })
    const [show, setShow] = useState(false);
    const [flag, setFlag] = useState(false);
    const loggedIn = useSelector(state => state);
    const dispatch = useDispatch();

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

    function codeGenerator(min, max) {
        return Math.floor((Math.random() * (max - (min + 1))) + min);
    }

    function handleConfirm() {
        let {shopAmount} = shopMade;
        if(shopAmount === ""){
            toast.error( "No ingresaste ningún monto de compra", {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined
            } )
        } else if(parseFloat(shopAmount).toFixed(2) > parseFloat(loggedIn.balance).toFixed(2)){
            toast.error("Tu saldo no es suficiente para realizar la compra", {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined
            } )
        } else {
            let code = codeGenerator(100000, 999999);
            dispatch(ShopCode(code));
            const  { firstName, email } = loggedIn;
            axios.post("http://localhost:3001/users/confirm", {firstName, email, code});
            toast.success( `${loggedIn.firstName}, por favor confirma tu compra con el código enviado a tu email `, {
                position: 'top-center',
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined
            } );
            setTimeout(() => {
                handleConfirmShop();
            }, 4100);
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
            <Modal.Header className="header-shop">
                <Modal.Title className="text-white">Ingresa el monto de la compra</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formBasicAmount">
                    <Form.Label >Monto</Form.Label>
                    <Form.Control 
                        onChange={handleChange}
                        name="shopAmount" 
                        type="text" 
                        placeholder="monto de la compra"/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer className="footer-shop">
                <Button className="btn btn-danger" 
                onClick={handleShopMade}>
                    Cancelar
                </Button>
                <Button onClick={handleConfirm} 
                className="btn btn-success">
                    Comprar
                </Button>
            </Modal.Footer>
            <ConfirmShop
                modalConfirm= {flag}
                handleConfirmCode= {handleConfirmShop}
                closeShop= {handleShopMade}
                shopAmount= {shopMade.shopAmount}
            />
        </Modal>
    )
}