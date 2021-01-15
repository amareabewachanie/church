import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

class Register extends Component {
    render() {
        return (
            <div>
                <div className="card mt-5">
                    <h5 className="ml-5">Create your Account</h5>
                    <div className="p-grid">
                        <div className="p-col-5 p-d-flex p-ai-center p-jc-center">
                            <div className="p-fluid">
                                <div className="p-field">
                                    <label htmlFor="fullname">Full Name</label>
                                    <InputText
                                        id="fullname"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="p-field">
                                    <label htmlFor="email">Email</label>
                                    <InputText
                                        id="email"
                                        type="email"
                                        required
                                    />
                                </div>
                                <div className="p-field">
                                    <label htmlFor="password">Password</label>
                                    <Password id="password" required />
                                </div>
                                <div className="p-field">
                                    <label htmlFor="confirm">
                                        Confirm Password
                                    </label>
                                    <InputText
                                        id="confirm"
                                        type="password"
                                        required
                                    />
                                </div>
                                <Button label="Sign Up"></Button>
                            </div>
                        </div>
                        <div className="p-col-2">
                            <Divider layout="vertical">
                                <b>OR</b>
                            </Divider>
                        </div>
                        <div className="p-col-5 p-d-flex p-ai-center p-jc-center">
                            <Button
                                label="Login"
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
export default Register;
