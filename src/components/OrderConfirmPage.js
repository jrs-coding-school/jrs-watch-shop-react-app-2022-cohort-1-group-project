import React from 'react'
import './OrderConfirm.css'

export default function OrderConfirmPage() {
    return (
        <div className="order-root">
            <h1>
                ** Order is confirmed **
            </h1>
            <div className="confirm-header">Thank you, your purchase was succesful. </div>
            <div> image name, brand and color goes here</div>

            <div> Total Cost: $ { }</div>
            <div className="item-root"></div>
        </div>
    )
}
