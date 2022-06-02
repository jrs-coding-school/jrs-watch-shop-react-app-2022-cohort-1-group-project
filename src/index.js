import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Nav from './components/nav/Nav';
import LogInPage from './components/login/LogInPage';
import ProductPage from './components/ProductPage';
import SignUpPage from './components/login/SignUpPage';
import OrderConfirmPage from './components/OrderConfirmPage';
import { ToastProvider } from './services/toasts/toastService'
import ShoppingCart from './components/ShoppingCart'
import Homepage from './components/Homepage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<App />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/orderconfirm/:transactionId" element={<OrderConfirmPage />} />
          <Route path="*" element={<div>404 - That Page Does Not Exist</div>} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
