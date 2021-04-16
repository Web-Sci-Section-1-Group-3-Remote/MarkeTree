import React from 'react';
import "mdbreact/dist/css/mdb.css";
import "./HeaderWithLogin.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default class HeaderWithLogin extends React.Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-static-top navbar-expand-xl navbar-dark bg-dark">
                    <a className="nav-link" href="/">
                        <section className="navbar-brand"><span className="marke">Marke</span>Tree</section>
                    </a>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-end list" id="navbarSupportedContent">
                        <ul className="navbar-nav justify-content-end">
                            <li className="nav-item">
                                <a className="nav-link" href="/about">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/event">Events</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/create">Create Listing</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/browseListing">Browse Listing</a>
                            </li>

                        </ul>

                    </div>
                </nav>
            </div >
        )
    }
}