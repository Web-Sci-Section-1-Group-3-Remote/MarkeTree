import React, { useState, useRef, useEffect } from 'react';
import './Product.css';

function Product({ product }) {
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const paypalRef = useRef();

    // console.log(product);

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
    }, [product.description, product.price]);

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
                {product.description} for ${product.price}
            </h1>
            <div ref={paypalRef} />
        </div>
    );
}

function buttonMaker(p, n, d) {
    console.log(p, n, d);
    // p, n, d are the info from the listing.js. This step is correct. But we cannot assign these value into the product json object.
    let product = {
        price: 2,
        name: 'name',
        description: 'name'
    };
    // console.log(product[0]);
    // let data = product[0];
    // const product = {
    //     price: 777.77,
    //     name: 'comfy chair',
    //     description: 'Electric bike',
    // };

    return (
        <Product product={product} />
    );
}

export default buttonMaker;

// function buttonMaker() {
//     const product = {
//         price: 777.77,
//         name: 'comfy chair',
//         description: 'Electric bike',
//     };

//     return (
//         <div className="App">
//             <Product product={product} />
//         </div>
//     );
// }