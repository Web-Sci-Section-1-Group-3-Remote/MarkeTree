import React, { useState } from 'react';
import HeaderWithLogin from '../../components/HeaderWithLogin/HeaderWithLogin';
import Product from '../../components/Product/Product';
import './Listing.css';

import bike1 from "../../images/images/bike1.jpg";
import bike2 from "../../images/images/bike2.jpg";
import bike3 from "../../images/images/bike3.jpg";

export default class Listing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      price: null,
      name: null,
      desc: null,
      id: null,
      seller: null,
      images: null
    };

  }

  componentDidMount() {
    window.addEventListener('load', () => { this.getListingInfo() });
    // this.setState({loading: false});
  }


  render() {
    return (
      <div>
        <HeaderWithLogin />
        <section id="listingContent">

          <h1 id="name">{this.state.loading ? (null) : (this.state.name)}</h1>

          <div id="listingCarousel" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">

              {this.state.loading ? (null) : this.state.images.map((value, index) => {

                if (index === 0) {
                  console.log("IMAGE FIRST")
                  return <li data-target="#carouselExampleIndicators" className="active" data-slide-to={index}></li>
                }

                return <li data-target="#carouselExampleIndicators" data-slide-to={index}></li>
              })}

            </ol>
            <div className="carousel-inner">

              {this.state.loading ? (null) : this.state.images.map((value, index) => {
                console.log({ index }, { value });
                if (index === 0) {
                  return [<div className="carousel-item active"><img className="carousel-image d-block w-100" src={value} alt="First slide"></img></div>];
                }
                return [<div className="carousel-item"><img className="carousel-image d-block w-100" src={value} alt="First slide"></img></div>];
              })}

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

              {this.state.loading ? (null) : (this.state.desc)}
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

              {this.state.loading ? (null) : ("$" + this.state.price)}
            </section>

            <section id="paymentButtons">
              {console.log("STATE: ", this.state)}
              {this.state.loading ? (null) : (<Product price={this.state.price} name={this.state.name} desc={this.state.desc} />)}
            </section>
          </div>

        </section>
      </div>
    )
  }

  async getListingInfo() {
    console.log("fetching listing info");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let id = urlParams.get("id");

    console.log('id', id);

    fetch('http://localhost:3030/get-listing/' + id, {
      method: 'GET',
      mode: 'cors'
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          loading: false,
          price: data['price'],
          name: data['name'],
          desc: data['description'],
          id: data['listing_id'],
          seller: data['seller'],
          images: data['images']
        });
      });
  }
}