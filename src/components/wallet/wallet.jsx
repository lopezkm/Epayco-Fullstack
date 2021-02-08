import React from 'react';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function Wallet() {

    const loggedIn = useSelector(state => state);

    return (
        <Card>
            <Card.Header className="header-wallet">{loggedIn.firstName}, estas en tu cuenta</Card.Header>
            <Card.Body className="body-wallet">
                <blockquote className="blockquote mb-0">
                <p className="balance-wallet">
                    Tu saldo actual es: $ {loggedIn.balance}
                </p>
                <footer className="footer-wallet">
                    Recuerda que puedes ingresar dinero a tu cuenta y/o realizar compras cuando lo prefieras! 
                </footer>
                </blockquote>
            </Card.Body>
        </Card>
    )
}