import React, { useState, useRef, useEffect } from 'react';
import './Product.css';

function Product({props}) {
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const paypalRef = useRef();

    const product = useState(props);
    console.log("MAKING: ",props);

    useEffect(() => {
        window.paypal
            .Buttons({
                style: {
                    layout: 'horizontal',
                    color: 'gold',
                    shape: 'rect',
                    label: 'paypal'
                },
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                description: product.description,
                                amount: {
                                    currency_code: 'USD',
                                    value: product.price,
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    setPaidFor(true);
                    console.log(order);
                },
                onError: err => {
                    setError(err);
                    console.error(err);
                },
            })
            .render(paypalRef.current);
    }, [props.desc, props.price]);

    if (paidFor) {
        return (
            <div>
                <h1>Congrats, you just bought {product.name}!</h1>
            </div>
        );
    }

    return (
        <div>
            {error && <div>Uh oh, an error occurred! {error.message}</div>}
            <h1>
                {props.name} for ${props.price}
            </h1>
            <div ref={paypalRef} />
        </div>
    );
}

function buttonMaker(props) {
    return (
        <Product props={props} />
    );
}

export default buttonMaker;