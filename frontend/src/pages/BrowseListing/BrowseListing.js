import React from 'react';
import HeaderWithLogin from '../../components/HeaderWithLogin/HeaderWithLogin';
import { Link } from 'react-router-dom';
import './BrowseListing.css';

import bike1 from "../../images/images/bike1.jpg";
import bike2 from "../../images/images/bike2.jpg";
import bike3 from "../../images/images/bike3.jpg";
import sofa from "../../images/images/sofa.jpg";
import textbook from "../../images/images/textbook.jpg";

export default class BrowseListing extends React.Component {
    render() {
        return (
            <div>
                <HeaderWithLogin />
                <div id="listings">
                    <div className="sidebarWrapper">
                        <nav id="sidebar">
                            <div className="sidebar-header">
                                <h3>Categories</h3>
                            </div>

                            <ul className="list-unstyled components">
                                <p>Dummy Heading</p>
                                <li className="active">
                                    <Link to="#homeSubmenu" data-toggle="collapse" aria-expanded="false"
                                        className="dropdown-toggle">Home</Link>
                                    <ul className="collapse list-unstyled" id="homeSubmenu">
                                        <li>
                                            <Link to="#1">Home 1</Link>
                                        </li>
                                        <li>
                                            <Link to="#2">Home 2</Link>
                                        </li>
                                        <li>
                                            <Link to="#3">Home 3</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link to="#">About</Link>
                                </li>
                                <li>
                                    <Link to="#pageSubmenu" data-toggle="collapse" aria-expanded="false"
                                        className="dropdown-toggle">Pages</Link>
                                    <ul className="collapse list-unstyled" id="pageSubmenu">
                                        <li>
                                            <Link to="#1">Page 1</Link>
                                        </li>
                                        <li>
                                            <Link to="#2">Page 2</Link>
                                        </li>
                                        <li>
                                            <Link to="#3">Page 3</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link to="#1">Portfolio</Link>
                                </li>
                                <li>
                                    <Link to="#1">Contact</Link>
                                </li>
                            </ul>
                        </nav>


                    </div>


                    <div id="listingItem" className="container">

                        <div className="row">

                            <div className="col-2 item-show">
                                <Link to="/listing"><img src={bike1} className="sub-image" height="100" width="150"
                                    alt="Certified Users"></img></Link>
                                <p className="text-center">Super Bike</p>
                                <p className="text-center">This is a brand new bike, you can ride him whereever you want</p>

                            </div>

                            <div className="col-2 item-show">
                                <Link to="/listing"><img src={bike2} className="sub-image" height="100" width="150"
                                    alt="Certified Users"></img></Link>
                                <p className="text-center">Awesome Bike</p>
                                <p className="text-center">Cool bike continues</p>

                            </div>

                            <div className="col-2 item-show">
                                <Link to="/listing"><img src={bike3} className="sub-image" height="100" width="150"
                                    alt="Certified Users"></img></Link>
                                <p className="text-center">Jesus Bike</p>
                                <p className="text-center">Cool bike continues</p>

                            </div>

                            <div className="col-2 item-show">
                                <img src={sofa} className="sub-image" height="100" width="150" alt="Certified Users"></img>
                                <p className="text-center">Cute sofa</p>
                                <p className="text-center">Enjoy your dayoff with this</p>
                            </div>

                            <div className="col-2 item-show">
                                <img src={textbook} className="sub-image" height="100" width="150"
                                    alt="Certified Users"></img>
                                <p className="text-center">Student's need</p>
                                <p className="text-center">All textbook you need in one package</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}