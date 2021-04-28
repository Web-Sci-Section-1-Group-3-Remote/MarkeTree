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
                {console.log("PROPS: ", props)}
                <button type="submit" className="btn btn-success create" onClick={() => {rateUser(props.seller, 0, props.id); }}> 0 </button>
                <button type="submit" className="btn btn-success create" onClick={() => {rateUser(props.seller, 1, props.id); }}> 1 </button>
                <button type="submit" className="btn btn-success create" onClick={() => {rateUser(props.seller, 2, props.id); }}> 2 </button>
                <button type="submit" className="btn btn-success create" onClick={() => {rateUser(props.seller, 3, props.id); }}> 3 </button>
                <button type="submit" className="btn btn-success create" onClick={() => {rateUser(props.seller, 4, props.id); }}> 4 </button>
                <button type="submit" className="btn btn-success create" onClick={() => {rateUser(props.seller, 5, props.id); }}> 5 </button>
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

const rateUser = async(seller, rating, id) => {
    console.log(seller, rating, id);
    let token = getCookie('usertoken');

    let response = await fetch("http://localhost:3030/api/verify-user", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cookie: token
            }),
        });
    let data = await response.json();

    console.log('verify data:', data);

    let username = data.user.username;
    console.log("USERNAMESELLER: ", username);
    const ratingData = {
        username: username,
        seller: seller,
        rating: rating,
        id: id
    }

    console.log("RATINGDATA: ", ratingData);

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

    
}

export default buttonMaker;