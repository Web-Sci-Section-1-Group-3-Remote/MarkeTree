import React from 'react';

import HeaderWithLogin from '../../components/HeaderWithLogin/HeaderWithLogin';
import Jumbotron from '../../components/Jumbotron/Jumbotron';
import "./CreateListing.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "mdbreact/dist/css/mdb.css";


import create from "../../images/createListing.jpg"



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

                        <form className="row g-3" enctype='multipart/form-data'>
                            <div className="col-4">
                                <label htmlFor="inputName" className="form-label">Name</label>
                                <input type="name" className="form-control" id="inputName" required></input>
                            </div>
                            <div className="col-4">
                                <label htmlFor="inputEmail" className="form-label">Email</label>
                                <input type="email" className="form-control" id="inputEmail"></input>
                            </div>
                            <div className="col-4">
                                <label htmlFor="inputZip" className="form-label">ZIP Code</label>
                                <input type="zip" className="form-control" id="inputZip"></input>
                            </div>
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
                        </form>

                    </div>


                </section>
            </div>

        )
    }
    async createListing() {
        let username = document.getElementById("inputName").value;
        let email = document.getElementById("inputEmail").value;
        let zip = document.getElementById("inputZip").value;
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
            username: username,
            email: email,
            zip: zip,
            item: item,
            category: category,
            description: description,
            price: price,
            images: images
        }
        console.log(listingData);
        alert('yay');

        fetch("http://localhost:3030/api/post-listing", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                listingData
            }),
        })
            .then(response => response.json())
            .then(data => { })
    }
}