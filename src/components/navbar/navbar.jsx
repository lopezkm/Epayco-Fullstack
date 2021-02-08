import React, { useState } from 'react';
import AddMoney from '../addMoney/addMoney.jsx';
import Shop from '../shop/shop.jsx';
import { Nav, Navbar } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Logout } from '../../redux/actions/actions.js';

export default function NavBar() {

    const [showAddMoney, setShowAddMoney] = useState(false);
    const [showShop, setShowShop] = useState(false);
    const loggedIn = useSelector(state => state);
    const dispatch = useDispatch();

    function handleAddMoney() {
        setShowAddMoney(!showAddMoney);
    }

    function handleShop() {
        setShowShop(!showShop);
    }

    function handleLogout() {
        dispatch(Logout());
        localStorage.removeItem('state');
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            { !loggedIn.isLogged ? <Redirect to="/"/> : null}
            { !loggedIn.isLogged ?  <Nav className="text-white">
                    ePayco - Hacemos tu vida más fácil!
                </Nav> :
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav.Link href="/" className="mr-auto text-white"> 
                        BACK
                    </Nav.Link>
                    <Nav.Link href="/wallet" className="mr-auto text-white"> 
                        Consulta de saldo
                    </Nav.Link>
                    <Nav className="mr-auto text-white" onClick={handleAddMoney}> 
                        Recarga de saldo
                    </Nav>
                    <Nav className="mr-auto text-white" onClick={handleShop}> 
                        Realizar una compra
                    </Nav>
                    <Nav className="mr-auto text-white"> 
                        {loggedIn.firstName}
                    </Nav>
                    <Nav className="mr-auto text-white" onClick={handleLogout}> 
                        Logout
                    </Nav>
                </Navbar.Collapse>
            }
            <AddMoney 
                order= {showAddMoney}
                handleShow= {handleAddMoney}
                />
            <Shop
                order={showShop}
                handleShow={handleShop}
            />
        </Navbar>
    )
}