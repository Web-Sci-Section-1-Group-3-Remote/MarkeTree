import React from 'react';
import HeaderWithLogin from '../../components/HeaderWithLogin/HeaderWithLogin'
import "./BrowseEvent.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "mdbreact/dist/css/mdb.css";

export default class BrowseEvent extends React.Component {
    render() {
        return (
            <div>
                <HeaderWithLogin />
                This is the browseven page.
            </div>
        )
    }
}