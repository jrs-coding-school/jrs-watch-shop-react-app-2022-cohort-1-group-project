import React from 'react'
import './productCard.css'
import { useApi } from '../../services/axios.service'
import { useLocalStorage } from '../../services/localStorage.service';

export default function ProductCard({ id, name, price, brand, color, style, description, image, rating, customer_id, product_id }) {

    const http = useApi();
    const ls = useLocalStorage();
    let user = ls.getUser();

    console.log(image)

    function addItemToCart() {
        if (user.id && id) {
            http.addItemToCart(user.id, id)
                .then(results => {
                    console.log(results);
                    // maybe make a little toast message or something
                })
                .catch(error => {
                    console.log(error.response)
                });
        }
    }

    return (
        <div className='product-card'>
            <img className='image' src={image} />
            <div className='product-info'>
                <h4 className='product-name'>{name}</h4>
                <h4 className='brand'>{brand}</h4>
                <h4 className='price'>${price}</h4>
                {/* <h4 className='description'>{description}</h4> */}
                <button onClick={addItemToCart} className='add-button'>
                    <span> Add to Cart</span>
                </button>
            </div>
        </div>
    )
}