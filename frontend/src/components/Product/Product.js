import React, { useState, useRef, useEffect } from 'react';
import './Product.css';

function Product({ props }) {
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const paypalRef = useRef();

    const product = useState(props);
    console.log("MAKING: ", props);

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
                                description: props.description,
                                amount: {
                                    currency_code: 'USD',
                                    value: props.price,
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
                You have bought {props.name} Rate User:
                <button type="submit" className="btn btn-success create"> 0 </button>
                <button type="submit" className="btn btn-success create"> 1 </button>
                <button type="submit" className="btn btn-success create"> 2 </button>
                <button type="submit" className="btn btn-success create"> 3 </button>
                <button type="submit" className="btn btn-success create"> 4 </button>
                <button type="submit" className="btn btn-success create"> 5 </button>
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

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function rateUser(seller, rating, id) {

    const ratingData = {
        username: getCookie('username'),
        seller: seller,
        rating: rating,
        id: id
    }

    fetch("http://localhost:3030/rate-user", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ratingData
        }),
    })
        .then(response => response.json())

    window.location.href = '/dashboard';
}

function buttonMaker(props) {
    return (
        <Product props={props} />
    );
}

export default buttonMaker;