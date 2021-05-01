import React, { useState } from 'react';
import HeaderWithLogin from '../../components/HeaderWithLogin/HeaderWithLogin';
import Header from '../../components/Header/Header';
import Product from '../../components/Product/Product';
import './Listing.css';

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

  //get the listing based off of id from the url
  componentDidMount() {
    window.addEventListener('load', () => { this.getListingInfo() });
    // this.setState({loading: false});
  }

  render() {
    return (
      <div>
        { getCookie('username') != null ? <HeaderWithLogin /> : <Header />}

        <section id="listingContent">
          {/*if the data is loaded load the description of the name*/}
          <h1 id="name">{this.state.loading ? (null) : (this.state.name)}</h1>

          <div id="listingCarousel" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">

              {/*if the listing is loaded loop through images and add to carousel*/}
              {this.state.loading ? (null) : this.state.images.map((value, index) => {

                if (index === 0) {
                  console.log("IMAGE FIRST")
                  return <li data-target="#carouselExampleIndicators" className="active" data-slide-to={index}></li>
                }

                return <li data-target="#carouselExampleIndicators" data-slide-to={index}></li>
              })}

            </ol>

            {/*if the listing is loaded loop through images and add to carousel*/}
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
              {/*if the data is loaded load the description of the item*/}
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
              {/*if the data is loaded load the description of the price*/}
              {this.state.loading ? (null) : ("$" + this.state.price)}
            </section>

            <section id="paymentButtons">
              {console.log("STATE: ", this.state)}
              {/*if the data is loaded load the PayPal Components*/}
              {this.state.loading ? (null) : (<Product price={this.state.price} name={this.state.name} desc={this.state.desc} seller={this.state.seller} id={this.state.id} />)}
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

    //fetches to our API with the id of the item based off of the query string
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