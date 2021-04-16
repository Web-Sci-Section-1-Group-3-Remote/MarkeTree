import React from 'react';
import "./Login.css";
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import "mdbreact/dist/css/mdb.css";
import { Icon } from '@iconify/react';
import hammerIcon from '@iconify-icons/ion/hammer';

export default class Login extends React.Component {
    render() {
        return (
            <div>
            <Header />
            <section id="mainContent">

                <div id="top" className="jumbotron"
                    data-position="center right">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-1"></div>
                            <div id="title" className="col-md-5">
                                <h2 id="header">Create your profile on MarkeTree</h2>
                                <h6>The ultimate Platform </h6>
                                <h6>Leave a footprint and make everything worthwhile</h6>
                                <Link className="btn btn-dark trying" to="#creating" role="button"><Icon icon={hammerIcon} />&nbsp;&nbsp;Create
                        Your Lists Now</Link>
                            </div>

                            <div className="col-md-6 wrapper">
                                <div className="inner">
                                    {/* <img id="sale" src={create} className="rounded float-start" alt="..."></img> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div id="creating" className="container">
                    <h2 className="what">Sign up for MarkeTree</h2>
                    <hr></hr>

                    <form className="row">
                        <div className="col-sm">
                            <label htmlFor="usernameInput" className="form-label">Username</label>
                            <input type="name" id="usernameInput" className="form-control"></input>
                        </div>
                        <div className="col-sm">
                            <label htmlFor="passwordInput" className="form-label">Password</label>
                            <input type="password" id="passwordInput" className="form-control"></input>
                        </div>
                        <div className="col-sm">
                            <label htmlFor="confirmPasswordInput" className="form-label">Confirm Password</label>
                            <input type="password" id="confirmPasswordInput" className="form-control"></input>
                        </div>

                        <div className="col-12 text-center">
                            <button type="submit" className="btn btn-success create" onClick={() => { this.userSignUp(); }}>Submit</button>
                        </div>
                    </form>

                </div>


            </section>
        </div>
        )
    }

    userSignUp(){
        let username = document.getElementById('usernameInput').value;
        let password = document.getElementById('passwordInput').value;
        let confirmed = document.getElementById('confirmedPasswordInput').value;

        alert("posting password");

        if(password !== confirmed){
            alert("PASSWORDS DO NOT MATCH");
            return;
        }

        fetch("http://localhost:3030/api/create-user", {
                    method: 'POST',
                    mode:'cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    }),
                })
                .then(response => console.log(response))
    }
}