import React from 'react';
import HeaderWithLogin from '../../components/HeaderWithLogin/HeaderWithLogin'
import { Link } from 'react-router-dom';
import event from '../../images/event.jpg';
import "./Event.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "mdbreact/dist/css/mdb.css";

export default class Event extends React.Component {
    render() {
        return (
            <div>
                <HeaderWithLogin />
                <section id="mainContent">

                    <div id="top" className="jumbotron"
                        data-position="center right">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-1"></div>
                                <div id="title" className="col-md-5">
                                    <h2 id="header">Create MarkeTree</h2>
                                    <h6>The ultimate Platform </h6>
                                    <h6>Leave a footprint and make everything worthwhile</h6>
                                    <Link className="btn btn-dark trying" to="/createEvent" role="button">Create
                            A event</Link>
                                </div>

                                <div className="col-md-6 wrapper">
                                    <div className="inner">
                                        <img id="sale" src={event} className="rounded float-start event" alt="..."></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div id="creating" className="container">
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-4">
                            <h2 className="allEvent">All Events</h2>
                        </div>
                        <div className="col-2"></div>
                        <div className="col-4">
                            <h2 className="allEvent">Create an Event</h2>
                        </div>
                    </div>
                    <hr></hr>

                    {/* Show all event */}
                    <div className="show_event">

                    </div>

                    {/* Create a event */}
                    <form className="row g-3 create_event">
                        <div className="col-12">
                            <label htmlFor="inputHost" className="form-label">Host</label>
                            <input type="name" className="form-control" id="inputHost" placeholder="Union Club" required></input>
                        </div>
                        <div className="col-4">
                            <label htmlFor="inputEventName" className="form-label">Name</label>
                            <input type="text" className="form-control" id="inputEventName" placeholder="Event Name" required></input>
                        </div>
                        <div className="col-8">
                            <label htmlFor="inputEventLocation" className="form-label">Event Location</label>
                            <input type="text" className="form-control" id="inputEventLocation" placeholder="110 8th St, Troy, NY 12180" required></input>
                        </div>
                        <div className="col-4">
                            <label htmlFor="inputDate" className="form-label">Date</label>
                            <input type="text" className="form-control" id="inputDate" placeholder="4/18/2021" required></input>
                        </div>
                        <div className="col-4">
                            <label htmlFor="inputTime" className="form-label">Time</label>
                            <input type="text" className="form-control" id="inputTime" placeholder="10:00 AM" required></input>
                        </div>


                        <div className="col-12">
                            <label htmlFor="inputEventDescription" className="form-label">Event's description</label>
                            <textarea className="form-control" id="inputEventDescription"
                                placeholder="This is a sale event. You can buy any used items you want during the event. We have clothes, sofa, bike, furniture, etc. Spend you time here to capture the best item." rows="4"></textarea>
                        </div>
                        <div className="col-12 text-center">
                            <button type="submit" className="btn btn-primary create" onClick={() => { this.createEvent(); }}>Submit</button>
                        </div>
                    </form>


                </div>
            </div>
        )
    }
    createEvent() {
        let host = document.getElementById('inputHost').value;
        let eventName = document.getElementById('inputEventName').value;
        let location = document.getElementById('inputEventLocation').value;
        let date = document.getElementById('inputDate').value;
        let time = document.getElementById('inputTime').value;
        let desc = document.getElementById('inputEventDescription').value;



        const data = {
            host: host,
            eventName: eventName,
            eventLocation: location,
            date: date,
            time: time,
            description: desc
        }
        console.log(data);

        // Assign the value into mongoDB
        fetch("http://localhost:3030/post-listing", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data
            }),
        })
            .then(response => response.json())
            .then(data => { })

    }
}