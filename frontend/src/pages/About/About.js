import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import balanceScale from '@iconify-icons/fa/balance-scale';
import Header from '../../components/Header/Header';
import "./About.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "mdbreact/dist/css/mdb.css";

import auth from "../../images/auth-user.jpg";
import team from "../../images/team.png"
import Anthony from "../../images/anthony.jpg"
import Yanshen from "../../images/yanshen.jpg"


export default class About extends React.Component {
    render() {
        return (

            <div>
                <Header />
                <section id="mainContent">

                    <div id="top" className="jumbotron" data-position="center right">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-1"></div>
                                <div id="title" className="col-md-5">
                                    <h2 id="header">About MarkeTree</h2>
                                    <h6>The team of individuals, ready for you</h6>
                                    <Link className="btn btn-dark trying" to="/login" role="button"><Icon icon={balanceScale} />&nbsp;&nbsp;Try
                                    MarkeTree Now</Link>
                                </div>

                                <div className="col-md-6 wrapper">
                                    <div className="inner">
                                        <img id="sale" src={team} className="rounded float-start" alt="..."></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="background-yellow">
                        <div id="about-us" className="container">
                            <h2 className="what">The Branches of MarkeTree</h2>
                            <hr></hr>
                            <div className="row">

                                <div className="col-3 content-block">
                                    <img src={auth} className="sub-image" height="180" width="180" alt="Certified Users"></img>
                                    <h5 className="sub-section">Michael Peters</h5>
                                    <p className="brief">
                                        Epic Gamer
                </p>
                                </div>

                                <div className="col-3 content-block">
                                    <img src={Anthony} className="sub-image" height="180" width="180" alt="Certified Users"></img>
                                    <h5 className="sub-section">Anthony Bonadies</h5>
                                    <p className="brief">
                                        Microphone professional
                                     </p>
                                </div>

                                <div className="col-3 content-block">
                                    <img src={Yanshen} className="sub-image" height="180" width="180" alt="Certified Users"></img>
                                    <h5 className="sub-section">Yanshen Lin </h5>
                                    <p className="brief">
                                        Front end machine
                                    </p>
                                </div>

                                <div className="col-3 content-block">
                                    <img src={auth} className="sub-image" height="180" width="180" alt="Certified Users"></img>
                                    <h5 className="sub-section">Bo Lin</h5>
                                    <p className="brief">
                                        Fast database god
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}