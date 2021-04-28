import React from 'react';
import "./Login.css";

import Header from '../../components/Header/Header';
import Jumbotron from '../../components/Jumbotron/Jumbotron';
import 'bootstrap/dist/css/bootstrap.min.css';
import "mdbreact/dist/css/mdb.css";


import loginImg from '../../images/auth-user.png';

// Get and set cookies are from
// https://stackoverflow.com/questions/51312980/how-to-get-and-set-cookies-in-javascript#51313011

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

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

export default class Login extends React.Component {

    render() {
        return (
            <div>
                <Header />
                <section id="mainContent">

                    <Jumbotron
                        title="Log In"
                        slogan="Get ready to roll."
                        img={loginImg}
                    />

                    <div className="container">
                        <h2 className="what">Log In</h2>
                        <hr></hr>
                        <div className="col-4">
                            <label htmlFor="usernameInput" className="form-label">Username</label>
                            <input type="name" id="usernameInput" className="form-control"></input>
                        </div>
                        <div className="col-4">
                            <label htmlFor="passwordInput" className="form-label">Password</label>
                            <input type="password" id="passwordInput" className="form-control"></input>
                        </div>
                        <div className="col-12 text-center">
                            <button type="submit" className="btn btn-success create" onClick={() => { this.login(); }}>Login</button>
                        </div>


                    </div>


                </section>
            </div>
        )
    }

    async login() {
        let username = document.getElementById('usernameInput').value;
        let password = document.getElementById('passwordInput').value;

        let response = await fetch("http://localhost:3030/api/authenticate-user", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        });

        let data = await response.json();
        if (data.err) {
            alert(data.err);
        } else {
            let cookie = data.cookie;

            setCookie('username', username);
            setCookie('usertoken', cookie);

            window.location.href = '/dashboard';
        }
    }
}