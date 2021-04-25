import React from 'react';
import HeaderWithLogin from '../../components/HeaderWithLogin/HeaderWithLogin'

import "./Event.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "mdbreact/dist/css/mdb.css";

export default class Event extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showInfo: true
        }
    }
    // const[show, setShow]=useState(true)
    displaying() {
        this.setState({
            showInfo: false
        })
        console.log(this.state.showInfo);

    }

    displaying2() {

        this.setState({
            showInfo: true
        })
        console.log(this.state.showInfo);
        window.location.reload(false);

    }
    componentDidMount() {
        window.addEventListener('load', () => { this.getEvent() });
    }

    render() {
        return (
            <div>
                <HeaderWithLogin />

                <div id="creating" className="container">
                    <div id="rowNum" className="row">
                        <div className="col-2"></div>
                        <div className="col-4">
                            <h3 className="allEvent" onClick={() => this.displaying2()} >All Events</h3>
                        </div>
                        <div className="col-2"></div>
                        <div className="col-4">
                            <h3 className="allEvent" onClick={() => this.displaying()}>Create an Event</h3>
                        </div>
                    </div>
                    <hr></hr>

                    {/* Show all event */}
                    <div div id="show_event" style={{ display: this.state.showInfo ? "block" : "none" }}>

                    </div>

                    {/* Create a event {{`display: { ${this.state.showInfo ? ('flex') : ('none')};`}}
                    style={{ display: ${this.state.showInfo ? 'flex' : 'none' } }} */}
                    <div className="create_event" style={{ display: this.state.showInfo ? "none" : "block" }}>
                        <div className="row g-3">
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
                                <input type="date" className="form-control" id="inputDate" placeholder="4/18/2021" required></input>
                            </div>
                            <div className="col-4">
                                <label htmlFor="inputTime" className="form-label">Time</label>
                                <input type="time" className="form-control" id="inputTime" placeholder="10:00 AM" required></input>
                            </div>


                            <div className="col-12">
                                <label htmlFor="inputEventDescription" className="form-label">Event's description</label>
                                <textarea className="form-control" id="inputEventDescription"
                                    placeholder="This is a sale event. You can buy any used items you want during the event. We have clothes, sofa, bike, furniture, etc. Spend you time here to capture the best item." rows="4"></textarea>
                            </div>
                            <div className="col-12 text-center">
                                <button type="submit" className="btn btn-primary create" onClick={() => { this.createEvent(); }}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        )
    }

    // Load the data from Database when the page is loaded. 
    async getEvent() {
        fetch('http://localhost:3030/get-event', {
            method: 'GET',
            mode: 'cors'
        })
            .then(response => response.json())
            .then(data => {
                console.log(Object.keys(data).length)
                let html = `<div class="event-container">
                                <h3 class="year">2021</h3>`;
                for (let i = 0; i < Object.keys(data).length; i++) {
                    // console.log(data[i]);
                    var month;
                    switch (data[i]['event_month']) {
                        case "01":
                            month = "Jan";
                            break;
                        case "02":
                            month = "Feb";
                            break;
                        case "03":
                            month = "Mar";
                            break;
                        case "04":
                            month = "Apr";
                            break;
                        case "05":
                            month = "May";
                            break;
                        case "06":
                            month = "Jun";
                            break;
                        case "07":
                            month = "Jul";
                            break;
                        case "08":
                            month = "Aug";
                            break;
                        case "09":
                            month = "Sep";
                            break;
                        case "10":
                            month = "Oct";
                            break;
                        case "11":
                            month = "Nov";
                            break;
                        case "12":
                            month = "Dec";
                            break;
                        default:
                            month = "unknown";
                            break;
                    }
                    html += `<div class="event">
                                <div class="event-left">
                                    <div class="event-date">
                                        <div class="date">${data[i]['event_day']}</div>
                                        <div class="month">${month}</div>
                                    </div>
                                </div>
                                
                                <div class="event-right">
                                    <h3 class="event-title">${data[i]['event_name']}</h3>
                                    <div class="event-description">${data[i]['event_description']}</div>
                                    <p class="location">The location is: ${data[i]['event_location']}</p>

                                    <div class="event-timing">
                                       ${data[i]['event_hour']}:${data[i]['event_min']}
                                    </div>
                                </div>
                        </div>`;
                } // This is the end of for loop
                html += `</div>`; // event-container end tag.

                let container = document.querySelector('#show_event');
                container.innerHTML = html;
            });
    }


    // Submit value to the MongoDB
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
        fetch("http://localhost:3030/post-event", {
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
        alert("Your record has been submit.");
        this.forceUpdate();
    }
}