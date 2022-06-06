
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LogInPage from './components/login/LogInPage';
import SignUpPage from './components/login/SignUpPage';
// import UserPage from './components/UserPage';
import { createContext, useEffect, useState } from 'react';
import ProductCard from './components/productCard/ProductCard';
import { useApi } from './services/axios.service';
import { useLocalStorage } from './services/localStorage.service';


export const Context = createContext();

function App() {

  const [watches, setWatches] = useState([])
  const ls = useLocalStorage();
  let user = ls.getUser();

  const http = useApi();

  function getWatches() {
    http.getAllWatches()
      .then((response) => {
        console.log(response)
        setWatches(response.data.watches);
      })
      .catch(() => {
        console.log("error getting all")
      })
  }

  useEffect(() => {
    getWatches();
  }, []);

  // state value for your data

  // function to get data via http request

  // use effect => get data

  return (
    
    <div className="App">
      <h1 className='header'>Check out These Beautiful Time-Pieces! </h1>

      <div className='products-container'>

      {watches.map(watch => <ProductCard key={watch.id} {...watch} />)}
      </div>

      {/* array.map data => cards */}
    </div>
  );
}

export default App;
