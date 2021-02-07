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
                <h1 className="display-4">Bienvenido a ePayco!</h1>
                <p className="lead">La billetera virtual que te permitirá... </p>
                <hr className="my-4"/>
                <p>Por favor registrate o inicia sesión para poder empezar a operar</p>
                <button className="btn btn-primary btn-lg" onClick={handleShowLogin}>Login</button>
                <button className="btn btn-primary btn-lg" onClick={handleShowRegister}>Registrarse</button>
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
                    <h1 className="display-4">{loggedIn.firstName}, gracias por confiar en ePayco!</h1>
                    <p className="lead">Accede a tus opciones desde la barra de navegación superior </p>
                    <hr className="my-4"/>
                    <p>No olvides confirmar tus compras con los códigos de confirmación que se enviarána tu correo al momento de realizadas</p>
                </div>
            }
        </div>
    )
}