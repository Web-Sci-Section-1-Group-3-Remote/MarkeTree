import React from 'react';
import HeaderWithLogin from '../../components/HeaderWithLogin/HeaderWithLogin';
import Product from '../../components/Product/Product';
import buttonMaker from '../../components/Product/Product';
import './Listing.css';

import bike1 from "../../images/images/bike1.jpg";
import bike2 from "../../images/images/bike2.jpg";
import bike3 from "../../images/images/bike3.jpg";

export default class Listing extends React.Component {

  product = {
    price: 23.17,
    name: 'no thanks',
    description: 'alksdjflskdafjsfaksdjfklasdjfaslkdfjaskldfjaklsdfasdf'
  }

  componentDidMount() {
    window.addEventListener('load', () => { this.getListingInfo() });
  }


  render() {
    console.log("PRODUCT1: ", this.product);
    return (
      <div>
        <HeaderWithLogin />
        <section id="listingContent">
          <h1 id="name">Electric Bike</h1>

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
            <section className="listingDescHeader">
              Seller's Description
                        </section>

            <section id="Desc" className="listingDesc">
              I am selling my electric bike. Been using it for years, ready to give it a new home. Model is
              RAD Power v100.
                         </section>

            <section className="listingDescHeader">
              Location
                         </section>

            <section id="locat" className="listingDesc">
              7mi - Troy, NY
                        </section>

            <section className="listingDescHeader">
              Price
              </section>

            <section id="price" className="listingDesc">
              Looking to sell for $1150 OBO
                        </section>

            <section id="paymentButtons">
              {/* <Product product={this.product} /> */}
              <Product />
            </section>
          </div>

        </section>
      </div >
    )
  }


  displayData(data) {

    console.log("displaying data");

    this.product = {
      price: data['price'],
      name: data['name'],
      description: data['description']
    };

    // this.forceUpdate();
    // The listing associate with each item is now working.
    let name = document.querySelector('#name');
    name.innerHTML = data['name'];

    let desc = document.querySelector('#Desc');
    desc.innerHTML = data['description'];

    let locat = document.querySelector('#locat');
    locat.innerHTML = data['location'];

    let price = document.querySelector('#price');
    price.innerHTML = data['price'];

    let p = data['price'];
    let n = data['name'];
    let d = data['description'];

    buttonMaker(p, n, d);
    // console.log(data['price'])
    // console.log(button(data['price'], data['name'], data['description']));
  }

  async getListingInfo() {
    console.log("fetching listing info");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let id = urlParams.get("id");

    console.log(id);

    fetch('http://localhost:3030/get-listing/' + id, {
      method: 'GET',
      mode: 'cors'
    })
      .then(response => response.json())
      .then(data => {
        this.displayData(data);
      });
  }
}