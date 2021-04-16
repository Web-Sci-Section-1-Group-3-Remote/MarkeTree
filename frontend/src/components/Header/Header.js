import React from 'react';
import "mdbreact/dist/css/mdb.css";
import "./Header.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Header extends React.Component {
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

                        </ul>

                        <div className="btnlogin">
                            <button className="btn my-2 my-sm-0 login login" type="submit"><a href="/login" className="btnlogin">Login / Signup</a></button>
                        </div>

                    </div>
                </nav>
            </div >
        )
    }
}