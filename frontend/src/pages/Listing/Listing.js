import React from 'react';
import HeaderWithLogin from '../../components/HeaderWithLogin/HeaderWithLogin';
import './Listing.css';

import bike1 from "../../images/images/bike1.jpg";
import bike2 from "../../images/images/bike2.jpg";
import bike3 from "../../images/images/bike3.jpg";

export default class Listing extends React.Component {
    render() {
        return (
            <div>
                <HeaderWithLogin />
                <section id="listingContent">
                    <h1>Electric Bike</h1>

                    <div id="listingCarousel" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img className="carousel-image d-block w-100" src={bike1} alt="First slide"></img>
                            </div>
                            <div className="carousel-item">
                                <img className="carousel-image d-block w-100" src={bike2} alt="Second slide"></img>
                            </div>
                            <div className="carousel-item">
                                <img className="carousel-image d-block w-100" src={bike3} alt="Third slide"></img>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#listingCarousel" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#listingCarousel" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>

                    <div id="listingText">
                        <section id="listingDescHeader">
                            Seller's Description
                        </section>

                        <section id="listingDesc">
                            I am selling my electric bike. Been using it for years, ready to give it a new home. Model is
                            RAD Power v100.
                         </section>

                        <section id="listingDescHeader">
                            Location
                         </section>

                        <section id="listingDesc">
                            7mi - Troy, NY
                        </section>

                        <section id="listingDescHeader">
                            Price
                         </section>

                        <section id="listingDesc">
                            Looking to sell for $1150 OBO
                        </section>

                        <section id="paymentButtons">

                            <button type="button" className="btn btn-success">PayPal</button>
                            <button type="button" className="btn btn-success">Venmo</button>

                        </section>
                    </div>

                </section>
            </div>
        )
    }
}