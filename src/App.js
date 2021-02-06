import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/home/home.jsx';
import Wallet from './components/wallet/wallet.jsx';
import NavBar from './components/navbar/navbar.jsx';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
      <Route path='/' render={() => <NavBar/>}/>
      <Route exact path='/' render={() => <Home/>}/>
      <Route exact path='/wallet' render={() => <Wallet/>}/>
    </div>
  );
}

export default App;
