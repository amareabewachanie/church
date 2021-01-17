import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/index');
        }
    }
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
Landing.propTypes = {
    auth: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps)(Landing);
