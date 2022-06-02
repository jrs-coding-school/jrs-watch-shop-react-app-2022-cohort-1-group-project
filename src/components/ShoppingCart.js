import { useApi } from '../services/axios.service'
import { useNavigate } from "react-router-dom";
import './ShoppingCart.css'
import { useEffect, useState } from 'react';
import { useLocalStorage } from '../services/localStorage.service';

export default function ShoppingCart() {

    const http = useApi();
    const ls = useLocalStorage();
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([]);

    let user = ls.getUser();

    let subTotal = calculateTotalPrice(cartItems);
    const tax = .07 * subTotal;
    const shipping = 15.00;
    const grandTotal = subTotal + tax + shipping;

    function getUserShoppingCart() {
        if (user) {
            http.getUserShoppingCartById(user.id)
                .then((response) => {
                    setCartItems(response?.data?.watches);
                })
                .catch(() => {
                    console.log("error getting shopping cart")
                })
        } else {
            console.log('not logged in');
        }
    }

    function onDecrease(itemId, quantity) {
        if (quantity <= 1) {
            // maybe POP UP: 'Are you sure?'
            http.deleteCartItem(itemId, user.id)
                .then((response) => {

                    setCartItems(cartItems.filter(
                        (item) => item.id !== itemId));
                })
                .catch(() => {
                    console.error("error deleting item")
                })
        } else {
            http.decreaseQtyInCart(itemId, user.id)
                .then((response) => {
                    setCartItems(cartItems.map(item => {
                        if (item.id == itemId) {
                            return {
                                ...item,
                                quantity: item.quantity - 1
                            }
                        } else {
                            return item;
                        }
                    }));
                })
                .catch(() => {
                    console.error("error reducing quantity!")
                })
        }
    }

    function onIncrease(itemId) {
        http.increaseQtyInCart(itemId, user.id)
            .then((response) => {

                setCartItems(cartItems.map(item => {
                    if (item.id == itemId) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        }
                    } else {
                        return item;
                    }
                }));
            })
            .catch(() => {
                console.error("error increasing quantity!")
            })

    }

    function calculateTotalPrice(cartItems) {
        let sum = 0;
        // calculate sum of individual price of every item

        for (let i = 0; i < cartItems.length; i++) {
            sum += cartItems[i]?.price * cartItems[i]?.quantity;
        }

        return sum;
    }

    function handleCheckout() {
        http.createTransaction(user.id, grandTotal, cartItems)
            .then(res => {

                navigate(`/orderconfirm/${res.data.transactionId}`);
            }).catch(err => {
                console.error(err);
            })

    }

    useEffect(() => {
        getUserShoppingCart();
    }, []);

    return (
        <div className="shopping-cart-root"
            onSubmit={handleCheckout}>
            <h2 className="cart-header">Shopping Cart</h2>
            <div>
                {cartItems?.length === 0 &&
                    <div className="empty-cart">
                        Cart Is Empty
                    </div>}
            </div>
            <div className="cart-container">

                <div className="shopping-cart-cartItems">
                    {cartItems.map((item) => (
                        <CartItem key={item?.id}
                            id={item?.id}
                            price={item?.price}
                            quantity={item?.quantity}
                            name={item?.name}
                            onIncrease={onIncrease}
                            onDecrease={onDecrease}
                        />
                    ))}
                </div>
                {cartItems?.length !== 0 && (
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

                        <button type="button"
                            onClick={handleCheckout}
                            className="checkout-btn"
                        >
                            Checkout
                        </button>

                    </div>
                )}
            </div>
        </div>
    )
}

function CartItem({ id, name, price, quantity, onIncrease, onDecrease }) {

    return (
        <div key={id} className="item-row-container">

            <div className="item-name">
                <div>{name}</div>
                <div>${price?.toFixed(2)}</div>
            </div>
            <div className="quantity-btn">
                <button
                    onClick={() => { onIncrease(id) }}
                    className="add">
                    +
                </button>
                <button
                    onClick={() => { onDecrease(id, quantity) }}
                    className="remove">
                    -
                </button>
            </div>
            <div className="item-quantity">
                <span>qty</span>  {quantity}
            </div>
            <div className="item-price">
                ${price * quantity?.toFixed(2)}
            </div>
        </div>
    )
}