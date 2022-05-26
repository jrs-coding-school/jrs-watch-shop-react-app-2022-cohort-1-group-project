import React, { useState } from 'react'
import './ShoppingCart.css'


export default function ShoppingCart({ items }) {

    let subTotal = calculateTotalPrice(items);
    const tax = .07 * subTotal;
    const shipping = 15.00;
    const grandTotal = subTotal + tax + shipping;


    // const [cartItems, setCartItems] = useState([])

    // const onRemove = (product) => {
    //     const exist = items.find((x) => x.id === product.id);
    //     if (exist.quantity === 1) {
    //         setCartItems(
    //             cartItems.filter((x) => x.id !== product.id)
    //         )
    //     } else {
    //         setCartItems(
    //             cartItems.map((x) =>
    //                 x.id === product.id ? { ...exist, quantity: exist.quantity - 1 } : x
    //             )
    //         )
    //     }
    // };

    // const onAdd = (product) => {
    //     const exist = cartItems.find((x) => x.id === product.id);
    //     if (exist) {
    //         setCartItems(
    //             cartItems.map((x) =>
    //                 x.id === product.id ? { ...exist, quantity: exist.quantity + 1 } : x
    //             )
    //         );
    //     } else {
    //         setCartItems([...cartItems, { ...product, quantity: 1 }]);
    //     }
    // };

    function calculateTotalPrice(items) {
        let sum = 0;
        // calculate sum of individual price of every item

        for (let i = 0; i < items.length; i++) {
            sum += items[i]?.price * items[i]?.quantity;
        }

        return sum;
    }

    function calculateIndividualPrice(items) {
        let sum = 0;
        // calculate sum of individual price of every item

        sum += items?.price * items?.quantity;

        return sum;
    }

    return (
        <div className="shopping-cart-root">
            <h2 className="cart-header">Shopping Cart</h2>
            <div>
                {items?.length === 0 && <div>Cart Is Empty</div>}
            </div>
            <div className="cart-container">


                <div className="shopping-cart-items">
                    {items.map((item) => (
                        <CartItem key={item?.id}
                            price={item?.price}
                            quantity={item?.quantity}
                            name={item?.name}
                        // onAdd={onAdd}
                        // onRemove={onRemove}
                        />
                    ))}
                </div>
                {items?.length !== 0 && (
                    <div className="cart-summary-container">
                        <h4 className="summary-header">Order Summary</h4>
                        <div>
                            <div>Sub Total</div>
                            <div>${subTotal.toFixed(2)}</div>
                        </div>
                        <div className="taxes">
                            <div>Tax</div>
                            <div>{tax?.toFixed(2)}</div>
                        </div>
                        <div className="shipping">
                            <div>Shipping Cost</div>
                            <div>${shipping?.toFixed(2)}</div>
                        </div>
                        <div className="total-cost">
                            <h4>Total Price</h4>
                            <h4>${grandTotal?.toFixed(2)}</h4>

                        </div>
                        <div>
                            <button onClick={() => alert('Implement checkout')}
                                className="checkout-btn"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

function CartItem({ id, name, price, quantity, onAdd, onRemove }) {

    return (
        <div key={id} className="item-row-container">

            <div>
                <div>{name}</div>
                <div>${price?.toFixed(2)}</div>
            </div>
            <div className="quantity-btn">
                <button
                    // onClick={() => onAdd(items)} 
                    className="add">
                    +
                </button>
                <button
                    // onClick={() => onRemove(items)}
                    className="remove">
                    -
                </button>
            </div>
            <div className="item-quantity">
                <span>qty</span>  {quantity}
            </div>
            <div>
                ${price * quantity?.toFixed(2)}
            </div>
        </div>
    )
}