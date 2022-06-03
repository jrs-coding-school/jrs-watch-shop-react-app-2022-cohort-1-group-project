import React, { useState } from 'react';
import './Nav.css'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Search from './Search'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useParams, useNavigate } from "react-router-dom";
import { useApi } from '../../services/axios.service';

import { useLocalStorage } from '../../services/localStorage.service';

export default function Nav() {

    const http = useApi();
    const navigate = useNavigate();
    const { userId } = useParams();
    const ls = useLocalStorage();
    const user = ls.getUser();

    const loginButton = (
        <button className='loginButton' onClick={() => {
            navigate('/login')
        }}>
            Log In
        </button>
    )

    function onLogoutClicked() {
        ls.removeUser()
        navigate('/')
    }
    const logoutButton = (
        <button className='logoutButton' onClick={onLogoutClicked}>
            Log out
        </button>
    )

    const signUpButton = (
        <button className='loginButton' onClick={() => {
            navigate('/signup')
        }}>
            Sign up
        </button>
    )

    return (
        <nav>
            <div className="flex left">
                <Link to="/">
                    <div className="home">
                        Home
                    </div>
                </Link>
                <Link to="/products">
                    <div className="products">
                        Products
                    </div>
                </Link>
                <Link to="/transactions">
                    <div className='past-orders'>
                        Past Orders
                    </div>
                </Link>
            </div>


            <div className="search-container">
                <Search />
            </div>
            <div className="nav-bar-right-root">
                <div className='nav-bar-right'>
                    {user ? '' : signUpButton}

                    {user ? logoutButton : loginButton}
                </div>
                <Link to="cart">
                    <div className="checkout">
                        <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                    </div>
                </Link>
            </div>
        </nav>

    )
}
