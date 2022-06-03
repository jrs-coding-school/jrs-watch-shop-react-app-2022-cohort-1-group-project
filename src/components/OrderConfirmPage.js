import React, { useState, useEffect } from 'react'
import './OrderConfirm.css'
import { useApi } from '../services/axios.service';
import { useParams } from 'react-router-dom';

export default function OrderConfirmPage() {

    let { transactionId } = useParams()
    // let transactionId = '9ea27064-ddcd-11ec-902c-ef6a451bb744'

    const [order, setOrder] = useState({});
    const [items, setItems] = useState([]);
    // const ls = useLocalStorage();
    //trans id to test in orderconfirm url: 9ea27064-ddcd-11ec-902c-ef6a451bb744

    const http = useApi();

    function getItemsPurchasedByTransactionId() {
        http.getItemsPurchasedByTransactionId(transactionId)
            .then((response) => {
                console.log("you're in the order confirm page server response ")
                console.log(response)
                setItems(response.data.items);
            })
            .catch(() => {
                console.log("error getting all")
            })
    }

    function getTransactionData() {
        http.getTransactionById(transactionId)
            .then((response) => {
                console.log(response)
                response.data.transaction.date = new Date(response.data.transaction.date);
                setOrder(response.data.transaction);
            })
            .catch(() => {
                console.log("error getting transaction data")
            })
    }

    useEffect(() => {
        console.log("im in the useEffect function")
        getTransactionData();
        getItemsPurchasedByTransactionId();
    }, []);

    useEffect(() => {
        console.log(order)
    }, [order])

    return (
        <div className="order-root">

            <div className='order-page-content'>
                <div className="order-status-root">
                    <div className="order-status1">

                        {transactionId == order.id
                            ? `Thank you for shopping with us!!!`
                            : `Order '${transactionId}' Doesnt exist`}



                    </div>

                    <div className="order-status2">

                        {order.id
                            ? <b>Order Number: {order.id}</b>
                            : <b>Your order was not succesful, please try again</b>}

                    </div>
                    <div className="orderDate-display"> Date:&nbsp;
                        {order.date ? order.date.toLocaleString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }) : ''}

                    </div>
                    <div className="grand-total">Grand Total: ${order?.total?.toFixed(2)}</div>

                </div>

                {items.map((item) => (
                    <div className="order-detail-root "
                        key={item.id}>
                        <div className="order-display">

                            <div className="product-image-frame">
                                <img src={item.image} />

                            </div>

                            <div className="order-data-root">
                                {/* <div className="orderId-display">
                                    {transactionId == order.id ? `Order Number: ${order.id}` : ''}
                                </div> */}

                                {/* <div className="order-display-id"> Product ID: {item.id}</div> */}
                                <div className="order-display-brand"> Brand:  {item.brand} </div>
                                <div className="order-display-name"> Name: {item.name} </div>
                                <div className="order-display-color"> Color: {item.color} </div>
                                <div className="order-display-quantity"> Qty: {item.quantity} </div>
                                {/* <div className="order-display-total"> Total Price: ${item.total} </div> */}

                            </div>

                        </div>
                    </div>
                ))}
            </div>

        </div>
    )

}
