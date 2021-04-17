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
                    <h2 className="what">All Events</h2>
                    <hr></hr>
                </div>

            </div>
        )
    }
}