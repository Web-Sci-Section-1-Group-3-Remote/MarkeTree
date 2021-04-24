import React from 'react';
import HeaderWithLogin from '../../components/HeaderWithLogin/HeaderWithLogin';
import { Link } from 'react-router-dom';
import './BrowseListing.css';

// import bike1 from "../../images/images/bike1.jpg";
// import bike2 from "../../images/images/bike2.jpg";
// import bike3 from "../../images/images/bike3.jpg";
// import sofa from "../../images/images/sofa.jpg";
// import textbook from "../../images/images/textbook.jpg";

export default class BrowseListing extends React.Component {
    info = [];
    componentDidMount() {
        window.addEventListener('load', this.browseListing());
    }
    render() {
        return (
            <div>
                <HeaderWithLogin />
                <div id="listings">
                    <div className="topbarWrapper">
                        <nav id="topbar">
                            <div className="topbar-header">
                                <h3>Categories</h3>
                            </div>

                            <ul className="list-unstyled components">
                                <p>Dummy Heading</p>
                                <li className="active sidesM">
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
                                <li className="sidesM">
                                    <Link to="#">About</Link>
                                </li>
                                <li className="sidesM">
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
                                <li className="sidesM">
                                    <Link to="#1">Portfolio</Link>
                                </li>
                                <li className="sidesM">
                                    <Link to="#1">Contact</Link>
                                </li>
                            </ul>
                        </nav>


                    </div>


                    <div id="entire">

                    </div>

                    {/* <script>{this.browseListing()}</script> */}
                    {/* <button type="submit" className="btn btn-primary create" onClick={() => { this.browseListing(); }}>Submit</button> */}
                    {/* <div id="listingItem" className="container">

                        <div className="row">

                            <div className="singleListing col-2 item-show">
                                <Link to="/listing"><img src={bike1} className="sub-image" height="100" width="150"
                                    alt="Certified Users"></img></Link>
                                <p className="text-center">Super Bike</p>
                                <p className="text-center">This is a brand new bike, you can ride him whereever you want</p>

                            </div>

                            <div className="singleListing col-2 item-show">
                                <Link to="/listing"><img src={bike2} className="sub-image" height="100" width="150"
                                    alt="Certified Users"></img></Link>
                                <p className="text-center">Awesome Bike</p>
                                <p className="text-center">Cool bike continues</p>

                            </div>

                            <div className="singleListing col-2 item-show">
                                <Link to="/listing"><img src={bike3} className="sub-image" height="100" width="150"
                                    alt="Certified Users"></img></Link>
                                <p className="text-center">Jesus Bike</p>
                                <p className="text-center">Cool bike continues</p>

                            </div>

                            <div className="singleListing col-2 item-show">
                                <img src={sofa} className="sub-image" height="100" width="150" alt="Certified Users"></img>
                                <p className="text-center">Cute sofa</p>
                                <p className="text-center">Enjoy your dayoff with this</p>
                            </div>

                            <div className="singleListing col-2 item-show">
                                <img src={textbook} className="sub-image" height="100" width="150"
                                    alt="Certified Users"></img>
                                <p className="text-center">Student's need</p>
                                <p className="text-center">All textbook you need in one package</p>
                            </div>

                        </div>
                    </div> */}
                </div>
            </div>
        )
    }

    displayData(data) {
        console.log(data, data);
        let html = `<div id="listingItem" class="container-fluid">
                        <div class="row browse">`;
        for (let i = Object.keys(data).length - 1; i >= 0; i--) {
            let id = data[i]['listing_id'];
            let name = data[i]['name'];
            let description = data[i]['description'];
            let images = data[i]['images'];
            let price = data[i]['price'];
            this.info.push({
                name: name,
                description: description,
                price: price
            });

            let imageSrc = images.length > 0 ? images[0] : 'http://memes.elipzer.com/memes/33.jpg';

            html += `<a href='http://localhost:3000/listing?id=${id}'>
                    <div class="singleListing">
                        <img src=${imageSrc} alt="screen readers">
                        <p class="listingName text-center">${name}</p>
                        <p class="listingPrice text-center color">&#36;${price}</p>
                        <p class="listingDesc">${description}</p>
                    </div>
                </a>`;
        }
        html += `</div>
                </div>`;
        let container = document.querySelector('#entire');
        container.innerHTML = html;

    }


    async browseListing() {
        fetch("http://localhost:3030/browse-listing", {
            method: 'GET',
            mode: 'cors'
        })
            .then(response => response.json())
            .then(data => {
                this.displayData(data);
            });
    }
}