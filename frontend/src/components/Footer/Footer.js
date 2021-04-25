import React from 'react';
import { FaGithubSquare } from "react-icons/fa";
import "./Footer.css";


export default class Footer extends React.Component {
    render() {
        return (
            <div id="footerWrapper">
                <footer className="text-center text-black">
                    <div className="container pt-3">
                        <div className="footer-s">
                            <p className="border-endh"><a href="/help">FAQ</a></p>
                            <p className="border-lineh"></p>
                            <p className="border-endh"><a href="/about">Meet the Team</a></p>
                            <p className="border-lineh"></p>

                            <p className="border-endh"><a href="https://github.com/Web-Sci-Section-1-Group-3-Remote/MarkeTree"><FaGithubSquare /> Github</a></p>
                        </div>
                    </div>

                    <div className="text-center mod pt-3 pb-3">
                        © 2021 MarkeTree
                    </div>
                </footer>
            </div>
        )
    }
}







