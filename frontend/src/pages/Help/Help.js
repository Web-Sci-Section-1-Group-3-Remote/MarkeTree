import React from 'react';
import Header from '../../components/Header/Header';
import Jumbotron from '../../components/Jumbotron/Jumbotron';
import HeaderWithLogin from '../../components/HeaderWithLogin/HeaderWithLogin';
import help from "../../images/help.jpg"
import auth_user from "../../images/auth-user.png";
import used_item from "../../images/used-item.jpg";
import book from "../../images/book.jpg";

import "./Help.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "mdbreact/dist/css/mdb.css";

// A function to check with the user's login cookie.
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

export default class Help extends React.Component {
    render() {
        return (
            <div>
                { getCookie('username') != null ? <HeaderWithLogin /> : <Header />}
                <section id="mainContent">
                    <Jumbotron
                        title="Need Help"
                        slogan="You've got questions?"
                        slogan2="We've got answers."
                        img={help}
                    />
                </section>
                <div className="background-yellow">
                    <div id="faq" className="container">
                        <h2 className="what">FAQ - Frequent Ask Questions</h2>
                        <hr></hr>

                        <div className="row">

                            <div className="col-4 content-block">
                                <img src={auth_user} className="sub-image" height="80" width="80" alt="Certified Users"></img>
                                <h5 className="sub-section">What makes us Different</h5>
                                <p className="brief">
                                    Unlike other marketplace websites, we offered member-only platform that gives you full
                                    experience other platform has to offered,
                                    at the same time shield you from scam and other malicious activities. We also provides event
                                    information from the campus and other
                                    authorized local organizations, so you can always look forward for interesting events.
                                </p>
                            </div>

                            <div className="col-4 content-block">
                                <img src={used_item} className="sub-image" height="80" width="80" alt="Certified Users"></img>
                                <h5 className="sub-section">Payments</h5>
                                <p className="brief">
                                    There are multiple ways to pay your seller, through our website or other methods. Seller
                                    will have to specify which type of payment she/he
                                    accpets during listing creation. The seller can either request a cash or other types of
                                    digitalize transaction.
                                    If you decide to pay through the website, our website supports Venmo as third party payment
                                    service.
                            <b>COVID 19 Notice:</b> We highly recomment digital transaction during COVID 19 Pandemic.
                        </p>
                            </div>

                            <div className="col-4 content-block">
                                <img src={book} className="sub-image" height="80" width="80" alt="Certified Users"></img>
                                <h5 className="sub-section">How to Join</h5>
                                <p className="brief">
                                    As a website that aims to prevent scam and other misconduct, we implemented strict rules on
                                    our membership as followed:
                                    <b> If</b> you are part of the RPI Community, you can join our website through your RCS
                                    account.
                                    <b> If</b> you are NOT part of the RPI Community, you can create account through
                                    existing RPI
                                    student's' referral code.
                                    <b> If</b> you are a local organization, you can contact us to request an offical
                                    organization account.
                        </p>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="background-yellow">
                    <div id="contactus" className="container">
                        <h2 className="what">Contact Us</h2>
                        <hr></hr>

                        <form>
                            <div className="form-group">
                                <label htmlFor="InputEmail">Email address</label>
                                <input type="email" className="form-control" id="InputEmail"
                                    placeholder="Please enter your email..."></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="InputReason">What can we help you with</label>
                                <input type="reason" className="form-control" id="InputReason" aria-describedby="reasonHelp"
                                    placeholder="You need help with..."></input>
                                <small id="reasonHelp" className="form-text text-muted">For example, Potential Scam, Account
                            Referral and etc.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="InputMessage">Message</label>
                                <input type="message" className="form-control input-lg" id="InputMessage"
                                    placeholder="Type your message here..." ></input>
                            </div>

                            <div className="col-md-12 text-center">
                                <button type="button" className="btn btn-primary">Submit</button>
                                <button type="button" className="btn btn-clear">Clear</button>
                            </div>


                        </form>
                    </div>
                </div>
            </div>


        )
    }
}