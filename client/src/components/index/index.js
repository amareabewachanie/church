import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
class Index extends Component {
    componentDidMount() {
        this.props.getCurrentProfile();
    }
    render() {
        return (
            <div>
                <h1>Dashboard</h1>
            </div>
        );
    }
}
export default connect(null, { getCurrentProfile })(Index);
