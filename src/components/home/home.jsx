import React, { useState } from 'react';
import Login from '../login/login.jsx';
import Register from '../register/register.jsx';
import { useSelector } from 'react-redux';

export default function Home() {

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const loggedIn = useSelector(state => state);

    function handleShowLogin() {
        setShowLogin(!showLogin)
    }
    function handleShowRegister() {
        setShowRegister(!showRegister)
    }

    return (
        <div>
            { !loggedIn.isLogged ? <div className="jumbotron">
                <h1 className="home-title">Bienvenido a ePayco!</h1>
                <p className="lead">La billetera virtual que te permitirá realizar compras y recargar tu cuenta sin moverte de casa</p>
                <hr className="my-4"/>
                <p className="guide-text">Por favor registrate o inicia sesión para poder empezar a operar</p>
                <button className="btn btn-success btn-lg login-button" onClick={handleShowLogin}>Login</button>
                <button className="btn btn-secondary btn-lg register-button" onClick={handleShowRegister}>Registrarse</button>
                <Login 
                    order= {showLogin}
                    handleShow= {handleShowLogin}
                />
                <Register
                    order={showRegister}
                    handleShow={handleShowRegister}
                />
                </div> :
                <div className="jumbotron">
                    <h1 className="welcome-message-login-home">{loggedIn.firstName}, gracias por confiar en ePayco!</h1>
                    <p className="option-text-home">Accede a tus opciones desde la barra de navegación superior </p>
                    <hr className="my-4"/>
                    <p className="conrim-text-home">No olvides confirmar tus compras con los códigos que se enviarán a tu correo</p>
                </div>
            }
        </div>
    )
}