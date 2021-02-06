import React, { useState } from 'react';
import AddMoney from '../addMoney/addMoney.jsx';
import Shop from '../shop/shop.jsx';
import { Nav, Navbar, Button } from 'react-bootstrap';

export default function NavBar() {

    const [showAddMoney, setShowAddMoney] = useState(false);
    const [showShop, setShowShop] = useState(false);

    let logId;

    function handleAddMoney() {
        setShowAddMoney(!showAddMoney)
    }

    function handleShop() {
        setShowShop(!showShop)
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            { logId ?   <Nav className="text-white">
                    ePayco - Hacemos tu vida más fácil!
                </Nav> :
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav.Link href="/" className="mr-auto text-white"> 
                        BACK
                    </Nav.Link>
                    <Nav.Link href="/wallet" className="mr-auto text-white"> 
                        Consulta de saldo
                    </Nav.Link>
                    <Nav className="mr-auto text-white"> 
                        <Button onClick={handleAddMoney}>Recarga de saldo</Button>
                    </Nav>
                    <Nav className="mr-auto text-white"> 
                        <Button onClick={handleShop}>Realizar una compra</Button>
                    </Nav>
                    <Nav className="mr-auto text-white"> 
                        ALGUIEN
                    </Nav>
                    <Nav className="mr-auto text-white"> 
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