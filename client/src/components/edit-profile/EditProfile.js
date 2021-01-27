import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import InputGroup from '../common/InputGroup';
import SelectListFieldGroup from '../common/SelectListFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import CreateProfile from '../create-profile/CreateProfile';
import isEmpty from '../../validation/isEmpty';
import { Link, withRouter } from 'react-router-dom';
import { ScrollTop } from 'primereact/scrolltop';
import { Button } from 'primereact/button';

class EditProfile extends Component {
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
    componentDidMount() {
        this.props.getCurrentProfile();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
        if (nextProps.profile.profile) {
            const profile = nextProps.profile.profile;

            // Bring skills array to CSV
            const skillsCSV = profile.skills.join(',');

            // If profile field doesn't exist, make empty string
            profile.company = !isEmpty(profile.company) ? profile.company : '';
            profile.website = !isEmpty(profile.website) ? profile.website : '';
            profile.location = !isEmpty(profile.location)
                ? profile.location
                : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
            profile.phone = !isEmpty(profile.phone) ? profile.phone : '';
            profile.status = !isEmpty(profile.status) ? profile.status : '';
            profile.social = !isEmpty(profile.social) ? profile.social : {};
            profile.githubusername = !isEmpty(profile.social.githubusername)
                ? profile.social.githubusername
                : '';
            profile.twitter = !isEmpty(profile.social.twitter)
                ? profile.social.twitter
                : '';
            profile.linkedin = !isEmpty(profile.social.linkedin)
                ? profile.social.linkedin
                : '';
            profile.facebook = !isEmpty(profile.social.facebook)
                ? profile.social.facebook
                : '';
            profile.instagram = !isEmpty(profile.social.instagram)
                ? profile.social.instagram
                : '';
            profile.youtube = !isEmpty(profile.social.youtube)
                ? profile.social.youtube
                : '';

            // Set component state
            this.setState({
                handle: profile.handle,
                phone: profile.phone,
                status: profile.status,
                company: profile.company,
                website: profile.website,
                skills: skillsCSV,
                location: profile.location,
                bio: profile.bio,
                githubusername: profile.githubusername,
                twitter: profile.twitter,
                linkedin: profile.linkedin,
                youtube: profile.youtube,
                facebook: profile.facebook,
                instagram: profile.instagram,
            });
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
                        icon="fa fa-instagram-square"
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
            <div className="scrollpanel-demo">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to="/index">
                            <Button
                                icon="pi pi-angle-left"
                                className="p-button-rounded p-button-text"
                                label="Back"
                            />
                        </Link>
                        <h1 className="diplay-4 text-center">Edit profile</h1>
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
                                type="link"
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
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors,
});
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
    withRouter(EditProfile)
);
