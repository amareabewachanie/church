import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
// import { Button } from 'primereact/button';
// import { InputText } from 'primereact/inputtext';
// import { Divider } from 'primereact/divider';
import { Link } from 'react-router-dom';
import { Divider } from 'primereact/divider';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {},
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/index');
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/index');
        }
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const loginUser = {
            email: this.state.email,
            password: this.state.password,
        };
        this.props.loginUser(loginUser);
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 m-auto">
                            <h1 className="display-4 text-center">Login</h1>
                            <p className="lead text-center">
                                Sign in to Your Account
                            </p>
                            <form noValidate onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    type="email"
                                    name="email"
                                    placeholder="Email address"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    error={errors.email}
                                />
                                <TextFieldGroup
                                    type="password"
                                    name="password"
                                    placeholder="Your password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    error={errors.password}
                                />

                                <p className="text-warning">
                                    <Link to="/forgotpassword">
                                        Forgot Password?
                                    </Link>
                                </p>
                                <input
                                    type="submit"
                                    className="btn btn-info btn-block mt-4"
                                />
                            </form>
                        </div>
                        <div className="col-md-2">
                            <Divider layout="vertical">
                                <b>OR</b>
                            </Divider>
                        </div>
                        <div className="col-md-4 my-auto">
                            <Link
                                to="/register"
                                className="btn btn-lg btn-success"
                            >
                                <i
                                    className="pi pi-user-plus"
                                    style={{ fontSize: '2rem' }}
                                ></i>{' '}
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
});
export default connect(mapStateToProps, { loginUser })(Login);
