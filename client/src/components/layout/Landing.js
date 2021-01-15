import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
    render() {
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="display-3 mb-4">
                                    Our Church Members
                                </h1>
                                <p className="lead">
                                    Create a servant profile/portifolio, share
                                    posts and get help from other servants
                                </p>
                                <hr />
                                <Link
                                    to="/register"
                                    className="btn btn-info btn-lg mr-2"
                                >
                                    Register
                                </Link>
                                <Link
                                    to="login"
                                    className="btn btn-lg btn-primary"
                                >
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Landing;
