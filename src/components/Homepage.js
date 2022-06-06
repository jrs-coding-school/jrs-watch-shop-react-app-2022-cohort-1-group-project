import React from 'react'
import './homepage.css'
import { useNavigate } from "react-router-dom";


export default function Homepage() {


  const navigate = useNavigate();

  return (
    <div className="home-root">
      <div className="shop-welcome">
        Welcome Time Keepers!
      </div>
      <div>
        <button className="shop-button" onClick={() => {
          navigate('/products')
        }}>
          Shop Here
        </button>
      </div>

    </div >
  )
}
