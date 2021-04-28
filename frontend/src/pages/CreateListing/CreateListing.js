import React from 'react';

import HeaderWithLogin from '../../components/HeaderWithLogin/HeaderWithLogin';
import Jumbotron from '../../components/Jumbotron/Jumbotron';
import "./CreateListing.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "mdbreact/dist/css/mdb.css";


import create from "../../images/createListing.jpg"

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

export default class CreateListing extends React.Component {
    render() {
        return (
            <div>
                <HeaderWithLogin />
                <section id="mainContent">

                    <Jumbotron
                        title="Create Listing"
                        slogan="Use the ultimate selling platform"
                        slogan2="Leave a footprint to make everything worthwhile"
                        img={create}
                    />


                    <div id="creating" className="container">
                        <h2 className="what">Create Listing</h2>
                        <hr></hr>

                        <div className="row g-3">
                            <div className="col-md-8">
                                <label htmlFor="input" className="form-label">Item</label>
                                <input type="text" className="form-control" id="inputItem" placeholder="FOCS Textbook" required></input>
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="inputCategory" className="form-label">Item Catalog</label>
                                <select id="inputCategory" type="text" className="form-select form-control" required>
                                    <option>School Supplies</option>
                                    <option>Dorm Supplies</option>
                                    <option>Mini Home Appliances</option>
                                    <option>COVID-19 Supplies</option>
                                    <option>Clothes</option>
                                    <option>Event</option>
                                    <option>Sporting</option>
                                    <option>Games</option>
                                    <option>Computers/Electronics</option>
                                    <option>Tools</option>
                                    <option>Autos</option>
                                    <option>Apartments/Renting</option>
                                    <option>Shoes</option>
                                    <option>Services</option>
                                    <option>Pets</option>
                                    <option>Phones</option>
                                    <option>Bicycles</option>
                                    <option>Makeup</option>
                                </select>
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputDescription" className="form-label">Item Description</label>
                                <textarea className="form-control" id="inputDescription"
                                    placeholder="Discuss your item condition for faster sold..." rows="3"></textarea>
                            </div>
                            <div className="col-6">
                                <label htmlFor="inputImages" className="form-label">Images Upload</label>
                                <input className="form-control" type="file" id="inputImages" multiple></input>
                            </div>

                            <div className="col-6">
                                <label htmlFor="inputPrice" className="form-label">Price</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="inputGroupPrepend2">$</span>
                                    <input type="text" className="form-control" id="inputPrice" aria-describedby="inputGroupPrepend2"
                                        required></input>
                                </div>
                            </div>

                            <div className="col-12 text-center">
                                <button type="submit" className="btn btn-primary create" onClick={() => { this.createListing(); }}>Submit</button>
                            </div>
                        </div>

                    </div>


                </section>
            </div>

        )
    }
    async getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }


    async createListing() {
        let item = document.getElementById("inputItem").value;
        let category = document.getElementById("inputCategory").value;
        let description = document.getElementById("inputDescription").value;
        let price = document.getElementById("inputPrice").value;

        let imagesInput = document.getElementById("inputImages");
        let images = [];
        if (imagesInput.files) {
            for (let i = 0; i < imagesInput.files.length; ++i) {
                let file = imagesInput.files[i];
                await new Promise((resolve) => {
                    let reader = new FileReader();
                    reader.addEventListener('load', () => {
                        let data = reader.result;
                        images.push(data);
                        resolve();
                    });
                    reader.readAsDataURL(file);
                });
            }
        } else {
            console.log('no files', imagesInput);
        }

        const listingData = {
            username: getCookie('username'),
            item: item,
            category: category,
            description: description,
            price: price,
            images: images
        }
        console.log('listingdata:', listingData);

        let response = await fetch("http://localhost:3030/api/post-listing", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                listingData
            }),
        });
        console.log('waiting for json');
        let data = await response.json();

        console.log('json data', data);

        let listing_id = data.listing_id;

        window.href = '/listing?id=' + listing_id;
    }
}