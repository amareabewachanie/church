import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <Link to="/" className="navbar-brand ml-5">
                        Church
                    </Link>
                    <button
                        type="button"
                        className="navbar-toggler"
                        data-toggle="collapse"
                        data-target="#mobile-nav"
                    >
                        <div className="navbar-toggler-icon"></div>
                    </button>
                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to="profiles" className="nav-link">
                                    {''}
                                    Profile
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to="/register" className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">
                                    Sign In
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
export default Navbar;
