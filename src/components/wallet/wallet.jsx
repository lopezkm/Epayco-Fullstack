import React from 'react';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function Wallet() {

    const loggedIn = useSelector(state => state);

    return (
        <Card>
            <Card.Header>Hola {loggedIn.firstName}</Card.Header>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                <p>
                    Tu estado de cuenta es: $ {loggedIn.balance}
                </p>
                <footer className="blockquote-footer">
                    Recuerda que puedes ingresar dinero a tu cuenta y realizar compras cuando lo prefieras! 
                </footer>
                </blockquote>
            </Card.Body>
        </Card>
    )
}