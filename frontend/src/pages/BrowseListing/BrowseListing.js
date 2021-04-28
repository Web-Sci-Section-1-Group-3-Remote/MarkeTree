import React from 'react';
import HeaderWithLogin from '../../components/HeaderWithLogin/HeaderWithLogin';
import { Link } from 'react-router-dom';
import './BrowseListing.css';

// import bike1 from "../../images/images/bike1.jpg";
// import bike2 from "../../images/images/bike2.jpg";
// import bike3 from "../../images/images/bike3.jpg";
// import sofa from "../../images/images/sofa.jpg";
// import textbook from "../../images/images/textbook.jpg";

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
                        <div className="topbar-header">
                            <h3>Filter Categories</h3>
                        </div>
                        <nav id="topbar">
                            <nav meta-filter="All" className="sidesM">
                                <Link onClick={() => { this.browseListing(); }}>All</Link>
                            </nav>
                            <nav meta-filter="School Supplies" className="sidesM">
                                <Link onClick={() => { this.filterListing("School Supplies"); }}>School Supplies</Link>
                            </nav>
                            <nav meta-filter="Dorm Supplies" className="sidesM">
                                <Link onClick={() => { this.filterListing("Dorm Supplies"); }}>Dorm Supplies</Link>
                            </nav>
                            <nav meta-filter="Mini Home Appliances" className="sidesM">
                                <Link onClick={() => { this.filterListing("Mini Home Appliances"); }}>Mini Home Appliances</Link>
                            </nav>
                            <nav meta-filter="COVID-19 Supplies" className="sidesM">
                                <Link onClick={() => { this.filterListing("COVID-19 Supplies"); }}>COVID-19 Supplies</Link>
                            </nav>
                            <nav meta-filter="Clothes" className="sidesM">
                                <Link onClick={() => { this.filterListing("Clothes"); }}>Clothes</Link>
                            </nav>
                            <nav meta-filter="Event" className="sidesM">
                                <Link onClick={() => { this.filterListing("Event"); }}>Event</Link>
                            </nav>
                            <nav meta-filter="Sporting" className="sidesM">
                                <Link onClick={() => { this.filterListing("Sporting"); }}>Sporting</Link>
                            </nav>
                            <nav meta-filter="Games" className="sidesM">
                                <Link onClick={() => { this.filterListing("Games"); }}>Games</Link>
                            </nav>
                            <nav meta-filter="Electronics" className="sidesM">
                                <Link onClick={() => { this.filterListing("Electronics"); }}>Electronics</Link>
                            </nav>
                            <nav meta-filter="Tools" className="sidesM">
                                <Link onClick={() => { this.filterListing("Tools"); }}>Tools</Link>
                            </nav>
                            <nav meta-filter="Autos" className="sidesM">
                                <Link onClick={() => { this.filterListing("Autos"); }}>Autos</Link>
                            </nav>
                            <nav meta-filter="Renting" className="sidesM">
                                <Link onClick={() => { this.filterListing("Renting"); }}>Renting</Link>
                            </nav>
                            <nav meta-filter="Shoes" className="sidesM">
                                <Link onClick={() => { this.filterListing("Shoes"); }}>Shoes</Link>
                            </nav>
                            <nav meta-filter="Services" className="sidesM">
                                <Link onClick={() => { this.filterListing("Services"); }}>Services</Link>
                            </nav>
                            <nav meta-filter="Pets" className="sidesM">
                                <Link onClick={() => { this.filterListing("Pets"); }}>Pets</Link>
                            </nav>
                            <nav meta-filter="Phones" className="sidesM">
                                <Link onClick={() => { this.filterListing("Phones"); }}>Phones</Link>
                            </nav>
                            <nav meta-filter="Bicycles" className="sidesM">
                                <Link onClick={() => { this.filterListing("Bicycles"); }}>Bicycles</Link>
                            </nav>
                            <nav meta-filter="Makeup" className="sidesM">
                                <Link onClick={() => { this.filterListing("Makeup"); }}>Makeup</Link>
                            </nav>
                        </nav>
                        <input id="itemSearch" onKeyUp={() => { this.searchListings(); }} type="text" placeholder="Search for an item"></input>
                    </div>


                    <div id="entire">

                    </div>
                </div>
            </div>
        )
    }

    displayData(data) {
        let html = `<div id="listingItem" class="container-fluid">
                        <div class="row browse">`;
        for (let i = Object.keys(data).length - 1; i >= 0; i--) {
            let id = data[i]['listing_id'];
            let name = data[i]['name'];
            let category = data[i]['category'];
            let description = data[i]['description'];
            let images = data[i]['images'];
            let price = data[i]['price'];
            this.info.push({
                name: name,
                description: description,
                category: category,
                price: price
            });
            let imageSrc = 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/8/87/Mk8item19.png?width=1280'
            if (images && images.length > 0) {
                imageSrc = images[0];
            }

            html += `<a href='http://localhost:3000/listing?id=${id}'>
                    <div class="singleListing">
                        <img src=${imageSrc} alt="screen readers">
                        <p class="listingName text-center">${name}</p>
                        <p class="listingPrice text-center color">&#36;${price}</p>
                        <p class="listingPrice text-center color">${category}</p>
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
        let navs = document.querySelectorAll('#topbar nav');
        for (let nav of navs) {
            nav.classList.remove('active');
        }
        document.querySelector('#topbar nav[meta-filter="All"]').classList.add('active');
        fetch("http://localhost:3030/browse-listing", {
            method: 'GET',
            mode: 'cors'
        })
            .then(response => response.json())
            .then(data => {
                this.displayData(data);
            });
    }

    async filterListing(cat) {
        let navs = document.querySelectorAll('#topbar nav');
        for (let nav of navs) {
            nav.classList.remove('active');
        }
        document.querySelector('#topbar nav[meta-filter="' + cat + '"]').classList.add('active');

        console.log(cat);
        fetch("http://localhost:3030/filter-listing/" + cat, {
            method: 'GET',
            mode: 'cors'
        })
            .then(response => response.json())
            .then(data => {
                this.displayData(data);
            });
    }

    searchListings() {
        // Declare variables
        var input, filter, list, listings, p, i, txtValue;
        input = document.getElementById("itemSearch");
        filter = input.value.toUpperCase();
        list = document.getElementById("listingItem");
        listings = list.getElementsByClassName("singleListing");

        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < listings.length; i++) {
            p = listings[i].getElementsByTagName("p")[0];
            txtValue = p.textContent || p.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                listings[i].style.display = "";
            } else {
                listings[i].style.display = "none";
            }
            // Reposition footer as needed based on element removal/addition
        }
    }
}