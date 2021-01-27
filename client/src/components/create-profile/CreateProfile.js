import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import InputGroup from '../common/InputGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListFieldGroup from '../common/SelectListFieldGroup';
import { createProfile } from '../../actions/profileActions';

import { ScrollTop } from 'primereact/scrolltop';

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            phone: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            bio: '',
            githubusername: '',
            youtube: '',
            twitter: '',
            facebook: '',
            instagram: '',
            linkedin: '',
            errors: {},
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        const profileData = {
            handle: this.state.handle,
            phone: this.state.phone,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            bio: this.state.bio,
            githubusername: this.state.githubusername,
            youtube: this.state.youtube,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            instagram: this.state.instagram,
            linkedin: this.state.linkedin,
        };
        this.props.createProfile(profileData, this.props.history);
    }

    render() {
        const { errors, displaySocialInputs } = this.state;
        let socialInputs;
        if (displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup
                        name="githubusername"
                        placeholder="Your Github profile URL"
                        value={this.state.githubusername}
                        onChange={this.onChange}
                        error={errors.githubusername}
                        icon="pi pi-github"
                    />
                    <InputGroup
                        name="twitter"
                        placeholder="Your twitter profile URL"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                        icon="pi pi-twitter"
                    />
                    <InputGroup
                        name="linkedin"
                        placeholder="Your Linkedin profile URL"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                        icon="fa fa-linkedin"
                    />
                    <InputGroup
                        name="facebook"
                        placeholder="Your facebook profile URL"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                        icon="pi pi-facebook"
                    />
                    <InputGroup
                        name="youtube"
                        placeholder="Your youtube profile URL"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                        icon="pi pi-youtube"
                    />
                    <InputGroup
                        name="instagram"
                        placeholder="Your Instagram profile URL"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                        icon="fab fa-instagram-square"
                    />
                </div>
            );
        }
        const options = [
            { label: '* Select professional status', value: 0 },
            { label: 'Accountant', value: 'Accountant' },
            { label: 'Developer', value: 'Developer' },
            { label: 'Engineer', value: 'Engineer' },
            { label: 'Priest', value: 'Priest' },
            { label: 'Cashier', value: 'Cashier' },
            { label: 'Teacher', value: 'Teacher' },
            { label: 'Diplomat', value: 'Diplomat' },
            { label: 'Manager', value: 'Manager' },
            { label: 'Doctor', value: 'Doctor' },
            { label: 'Student', value: 'Student' },
            { label: 'Other', value: 'Other' },
        ];
        return (
            <div className="create-profile">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="diplay-4 text-center">
                            Creat your profile
                        </h1>
                        <p className="lead text-center">
                            Let's get some information to make your profile
                            stand out
                        </p>
                        <small className="d-block pb-3">
                            * = required fields
                        </small>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                name="handle"
                                value={this.state.handle}
                                onChange={this.onChange}
                                placeholder="* Profile handle"
                                required="true"
                                error={errors.handle}
                                info="A unique short name for your profile url, your full name, company name, nick name, etc."
                            />
                            <TextFieldGroup
                                name="phone"
                                value={this.state.phone}
                                onChange={this.onChange}
                                placeholder="* Phone number"
                                type="tel"
                                error={errors.phone}
                                info="Give us your working phone number."
                            />

                            <SelectListFieldGroup
                                placeholder="Status"
                                name="status"
                                value={this.state.status}
                                onChange={this.onChange}
                                options={options}
                                error={errors.status}
                                info="Give us an idea of where you are at in your career"
                            />
                            <TextFieldGroup
                                placeholder="Company"
                                name="company"
                                value={this.state.company}
                                onChange={this.onChange}
                                error={errors.company}
                                info="Could be your own or one you work for"
                            />
                            <TextFieldGroup
                                placeholder="Website"
                                name="website"
                                value={this.state.website}
                                onChange={this.onChange}
                                error={errors.website}
                                info="Could be your own website or a company one"
                            />
                            <TextFieldGroup
                                placeholder="* Address"
                                name="location"
                                value={this.state.location}
                                onChange={this.onChange}
                                error={errors.location}
                                info="City or City & country, Suggested(eg. Addis Ababa, Ethiopia)"
                            />
                            <TextFieldGroup
                                placeholder="* Skills"
                                name="skills"
                                value={this.state.skills}
                                onChange={this.onChange}
                                error={errors.skills}
                                info="Please use comma separated values.(eg. Mezmur,coding,writing etc.)"
                            />
                            <TextAreaFieldGroup
                                placeholder="Short Bio"
                                name="bio"
                                value={this.state.bio}
                                onChange={this.onChange}
                                error={errors.bio}
                                info="Tell us a little about your selef"
                            />
                            <div className="mb-3">
                                <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={() => {
                                        this.setState((prevState) => ({
                                            displaySocialInputs: !prevState.displaySocialInputs,
                                        }));
                                    }}
                                >
                                    Add Social Network links
                                </button>
                                <span className="text-muted">Optional</span>
                            </div>
                            {socialInputs}
                            <input
                                type="submit"
                                value="Submit"
                                className="btn btn-info btn-block mt-4"
                            />
                        </form>
                    </div>
                </div>
                <ScrollTop />
            </div>
        );
    }
}
CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors,
});
export default connect(mapStateToProps, { createProfile })(
    withRouter(CreateProfile)
);
