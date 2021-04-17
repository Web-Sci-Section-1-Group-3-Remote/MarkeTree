import React, { useState, useRef, useEffect } from 'react';
import HeaderWithLogin from '../../components/HeaderWithLogin/HeaderWithLogin';
import './Listing.css';

import bike1 from "../../images/images/bike1.jpg";
import bike2 from "../../images/images/bike2.jpg";
import bike3 from "../../images/images/bike3.jpg";

function Product({ product }) {
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const paypalRef = useRef();
  
    useEffect(() => {
      window.paypal
        .Buttons({
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
          <img alt={product.description}/>
        </div>
      );
    }
  
    return (
      <div>
        {error && <div>Uh oh, an error occurred! {error.message}</div>}
        <h1>
          {product.description} for ${product.price}
        </h1>
        <img alt={product.description} src={product.image} width="200" />
        <div ref={paypalRef} />
      </div>
    );
  }

  function Listing() {
    const product = {
      price: 777.77,
      name: 'comfy chair',
      description: 'fancy chair, like new',
    };
  
    return (
      <div className="App">
        <Product product={product} />
      </div>
    );
  }
  
  export default Listing;

// export default class Listing extends React.Component {
//     render() {
//         return (
//             <div>
//                 <HeaderWithLogin />
//                 <section id="listingContent">
//                     <h1>Electric Bike</h1>

//                     <div id="listingCarousel" className="carousel slide" data-ride="carousel">
//                         <ol className="carousel-indicators">
//                             <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
//                             <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
//                             <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
//                         </ol>
//                         <div className="carousel-inner">
//                             <div className="carousel-item active">
//                                 <img className="carousel-image d-block w-100" src={bike1} alt="First slide"></img>
//                             </div>
//                             <div className="carousel-item">
//                                 <img className="carousel-image d-block w-100" src={bike2} alt="Second slide"></img>
//                             </div>
//                             <div className="carousel-item">
//                                 <img className="carousel-image d-block w-100" src={bike3} alt="Third slide"></img>
//                             </div>
//                         </div>
//                         <a className="carousel-control-prev" href="#listingCarousel" role="button" data-slide="prev">
//                             <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//                             <span className="sr-only">Previous</span>
//                         </a>
//                         <a className="carousel-control-next" href="#listingCarousel" role="button" data-slide="next">
//                             <span className="carousel-control-next-icon" aria-hidden="true"></span>
//                             <span className="sr-only">Next</span>
//                         </a>
//                     </div>

//                     <div id="listingText">
//                         <section id="listingDescHeader">
//                             Seller's Description
//                         </section>

//                         <section id="listingDesc">
//                             I am selling my electric bike. Been using it for years, ready to give it a new home. Model is
//                             RAD Power v100.
//                          </section>

//                         <section id="listingDescHeader">
//                             Location
//                          </section>

//                         <section id="listingDesc">
//                             7mi - Troy, NY
//                         </section>

//                         <section id="listingDescHeader">
//                             Price
//                          </section>

//                         <section id="listingDesc">
//                             Looking to sell for $1150 OBO
//                         </section>

//                         <section id="paymentButtons">

//                         <section id="paypalbutton"></section>
//                         <script>paypal.Buttons().render('#paypalbutton');</script>

//                         </section>
//                     </div>

//                 </section>
//             </div>
//         )
//     }
// }