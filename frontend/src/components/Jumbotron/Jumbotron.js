import React from 'react';
import "./Jumbotron.css";

export default class Jumbotron extends React.Component {
    render() {
        return (
            <div id="top" className="jumbotron" data-position="center right">
                <div className="container-fluid">
                    <div className="row">
                        <div className="title">
                            <h2 id="header">{this.props.title}</h2>
                            <h6>{this.props.slogan}</h6>
                            <h6>{this.props.slogan2}</h6>
                        </div>
                        <div>
                            <div className="inner">
                                <img id="sale" height="200" src={this.props.img} className="rounded float-start" alt="..."></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

