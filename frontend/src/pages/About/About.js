import React from 'react';
import Header from '../../components/Header/Header';
import HeaderWithLogin from '../../components/HeaderWithLogin/HeaderWithLogin';
import Jumbotron from '../../components/Jumbotron/Jumbotron';
import "./About.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "mdbreact/dist/css/mdb.css";

import auth from "../../images/auth-user.png";
import team from "../../images/team.png";
import Michael from "../../images/michael.jpg";
import Anthony from "../../images/anthony.jpg";
import Yanshen from "../../images/yanshen.jpg";
import Bo from "../../images/Bo.jpg";

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

export default class About extends React.Component {
    render() {
        return (

            <div>
                { getCookie('username') != null ? <HeaderWithLogin /> : <Header />}
                <section id="mainContent">

                    <Jumbotron
                        title="Meet the Team"
                        slogan="Cutting edge developers."
                        img={team}
                    />

                    <div className="background-yellow">
                        <div id="about-us" className="container">
                            <h2 className="what">The Branches of MarkeTree</h2>
                            <hr></hr>
                            <div className="row">

                                <div className="col-3 content-block">
                                    <img src={Michael} className="sub-image" height="180" width="180" alt="Certified Users"></img>
                                    <h5 className="sub-section">Michael Peters</h5>
                                    <p className="brief">Flexbox Machine</p>
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
                                    <img src={Bo} className="sub-image" height="180" width="180" alt="Certified Users"></img>
                                    <h5 className="sub-section">Bolai Lin</h5>
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