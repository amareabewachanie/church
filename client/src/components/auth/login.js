import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';

class Login extends Component {
    render() {
        return (
            <div>
                <div className="card mt-5">
                    <h5 className="ml-5">Login with Your Credentials</h5>
                    <div className="p-grid">
                        <div className="p-col-5 p-d-flex p-ai-center p-jc-center">
                            <div className="p-fluid">
                                <div className="p-field">
                                    <label htmlFor="username">Username</label>
                                    <InputText
                                        id="username"
                                        type="email"
                                        required
                                    />
                                </div>
                                <div className="p-field">
                                    <label htmlFor="password">Password</label>
                                    <InputText
                                        id="password"
                                        type="password"
                                        required
                                    />
                                </div>
                                <Button label="Login"></Button>
                            </div>
                        </div>
                        <div className="p-col-2">
                            <Divider layout="vertical">
                                <b>OR</b>
                            </Divider>
                        </div>
                        <div className="p-col-5 p-d-flex p-ai-center p-jc-center">
                            <Button
                                label="Sign Up"
                                icon="pi pi-user-plus"
                                className="p-button-success"
                            ></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;
