import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Nav.css'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Search from './Search'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Nav() {


    return (

        <nav className="hidden">

            <div className="flex left">
                <Link to="burger">
                    <div className="burger">
                        &#9776;
                    </div>
                </Link>
                <Link to="/">
                    <div className="Home">
                        Home
                    </div>
                </Link>



            </div>
            <div className="search-container">
                <Search />
            </div>
            <div className='flex right '>
                <Link to="login">
                    <div className="login">
                        Login/Sign-Up
                    </div>
                </Link>

                <Link to="cart">
                    <div className="checkout">
                        <FontAwesomeIcon icon={faShoppingCart} />
                    </div>
                </Link>
            </div>
        </nav>

    )
}
