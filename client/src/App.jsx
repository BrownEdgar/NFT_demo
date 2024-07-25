import React, { useState, useEffect } from 'react';
import Form from './components/Form/Form';
import NavBar from "./components/NavBar/NavBar";
import Home from './pages/Home/Home'
import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';

import "./App.css";

function App() {

  useEffect(() => {

    return () => {
      localStorage.removeItem('token')
    }
  }, [])

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add' element={<Form />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
