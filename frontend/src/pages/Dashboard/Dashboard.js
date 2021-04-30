import React from 'react';
import HeaderWithLogin from '../../components/HeaderWithLogin/HeaderWithLogin';
import Jumbotron from '../../components/Jumbotron/Jumbotron';
import Login from '..//Login/Login'
import "./Dashboard.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "mdbreact/dist/css/mdb.css"; 

import sale from "../../images/sale.jpg";
import auth_user from "../../images/auth-user.png";
import used_item from "../../images/used-item.jpg";
import book from "../../images/book.jpg";
import transaction from "../../images/transaction.png";
import quick_find from "../../images/quick-finding.png";
import union from "../../images/union.jpg";

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

export default class Dashboard extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          username: 'Loading...',
          user_rating: 'Loading...',
          user_rating_count: 'Loading...',
        };
    }
    
    componentDidMount() {
        window.addEventListener('load', this.verify());
    }

    render() {
        console.log('rendering with state', this.state);

        return (
            <div>
            <HeaderWithLogin />
            <section id="mainContent">
                

            {this.state.loading ? (null) : (<Jumbotron title = {"Hello, " + this.state.username} slogan= { "\u2605 " + (this.state.user_rating ? this.state.user_rating.toFixed(2) + ' (' + this.state.user_rating_count + ' ratings)' : 'No Ratings')} img={sale}/>)}
    
                <div className="background-yellow">
              
                    <div id="about-us" className="container">
                        <h2 className="what">What is MarkeTree?</h2>
                        <hr></hr>
                        
                      
                        <div className="row"> 
                            <div className="col-4 content-block">
                                <img src={auth_user} className="sub-image" height="80" width="80" alt="Certified Users"></img>
                                <h5 className="sub-section">Trust and Certified Users</h5>
                                <p className="brief">
                                    Students only can login with school credentials in order to access the
                                    resources on MarkeTree. Non-students can access MarketTree if they have a referral code from
                                    another student or prove their landlord's title.'
                                </p>
                            </div>
                   
                            <div className="col-4 content-block">
                                <img src={used_item} className="sub-image" height="80" width="80" alt="Certified Users"></img>
                                <h5 className="sub-section">Dealing Used Products</h5>
                                <p className="brief">
                                    Graduating seniors can sell their items instead of taking all of them back home.
                                    Incoming students can buy some used items for a deal. You can post your used
                                    products and unwanted items on MarkeTree. </p>
                            </div>
                       
                            <div className="col-4 content-block">
                                <img src={book} className="sub-image" height="80" width="80" alt="Certified Users"></img>
                                <h5 className="sub-section">Over 300 School/Dorm Supplies </h5>
                                <p className="brief">
                                    At the end of the semester, it can be annoying to have to take home all of your school
                                    supplies. Further, some students are looking for a deal. MarkeTree allows users to buy
                                    their supplies used instead of brand new from the store. This creates a more efficient
                                    transfer of value for some items including printers, fridges, and much much more.
                                </p>
                            </div>
                        </div>
                            <div className="row">
        
                            <div className="col-4 content-block">
                                <img src={transaction} className="sub-image" height="80" width="80"
                                    alt="Certified Users"></img>
                                <h5 className="sub-section">Safe Non-Contact Transaction</h5>
                                <p className="brief">
                                    Transactions will be handled using PayPal or Venmo. Students can then determine a safe
                                    drop-off spot to transfer the items.
                                </p>
                            </div>
        
                            <div className="col-4 content-block">
                                <img src={quick_find} className="sub-image" height="80" width="80"
                                    alt="Certified Users"></img>
                                <h5 className="sub-section">Faster finding in over 300+ goods</h5>
                                <p className="brief">
                                    Users might do not want to spend lots of time finding products. MarkeTree provides a
                                    filter searching system for users to make finding items a breeze.
                                </p>
                            </div>
        
                            <div className="col-4 content-block">
                                <img src={union} className="sub-image" height="80" width="80" alt="Certified Users"></img>
                                <h5 className="sub-section">Parnership with Union / Club </h5>
                                <p className="brief">
                                    MarkeTree partners up with clubs and the union to publicize special events. These events
                                    include the big sales event hosted by MarkeTree through the union.
                                </p>
                            </div>
                        </div>
                        
                    </div>
                
            </div>
            
    
                <div id="feature" className="container">
                    <h2 className="what">Features</h2>
                    <hr></hr>
        
                    <div className="row">
                        <div className="col-6">
                            <h4 className="sub-section">Create Listing</h4>
                            <p className="brief2">
                                Offer items or services through our easy-to-use listing systems without worrying about scams.
                                Makes extra bucks from the items you don't' need while providing those who needed these products
                                within the RPI communities.
                                Your listings will only be visible to RPI Community and Verified local Organizations.
                            </p>
                        </div>
        
                        <div className="col-6">
                            <h4 className="sub-section">Browse Listing with Filter</h4>
                            <p className="brief2">
                                Just joined RPI and in needed for some cheap furnitures?
                                MarkeTree's' listing provides items range from furniture to services such as move-in/move-out.
                                Browse through numerous listing and filter the one that fits your need.
        
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        )
    }

    async verify() {
        let username = getCookie('username');
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
        
        this.setState({
          loading: false,
          username: data.user.username,
          user_rating: data.user.user_rating,
          user_rating_count: data.user.number_ratings
        });

    }
}
