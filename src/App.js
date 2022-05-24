
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LogInPage from './components/login/LogInPage';
import SignUpPage from './components/login/SignUpPage';
// import UserPage from './components/UserPage';
import { createContext, useEffect, useState } from 'react';



const axiosService = require('./services/axios.service');
const localStorageService = require('./services/localStorage.service');

export const Context = createContext();


function App() {
  return (
    <div className="App">
      App
    </div>
  );
}

export default App;
