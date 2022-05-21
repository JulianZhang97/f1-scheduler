import React, { useEffect } from "react";
import Home from './Home';
import Dashboard from './Dashboard';

import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'


function App() {


  const ProtectedRoute = () => {
    const auth = null; // determine if authorized, from context or however you're doing it
    console.log("Checking Protected Route!!");

    const localNylasToken = sessionStorage.getItem('nylasToken')

    console.log("Local Nylas Token is", localNylasToken);


    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return localNylasToken ? <Dashboard /> : <Navigate to="/" />;
}

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path='/secureuser' element={<ProtectedRoute/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
