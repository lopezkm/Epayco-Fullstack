import React from 'react';
import { Card } from 'react-bootstrap';

export default function Wallet() {

    return (
        <Card>
            <Card.Header>Hola QUIEN SEAS</Card.Header>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                <p>
                    Tu estado de cuenta es: BLABLA $$$
                </p>
                <footer className="blockquote-footer">
                    Recuerda que puedes ingresar dinero a tu cuenta y realizar compras cuando lo prefieras! 
                </footer>
                </blockquote>
            </Card.Body>
        </Card>
    )
}