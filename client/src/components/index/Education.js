import React, { Component } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button } from 'primereact/button';

import { deleteEducation } from '../../actions/profileActions';

class Education extends Component {
    onDeleteClick(id) {
        //this.props.deleteEducation(id);
    }
    render() {
        const education = this.props.education.map((edu) => (
            <tr key={edu._id}>
                <td>{edu.degree}</td>
                <td>{edu.school}</td>
                <td>{edu.fieldofstudy}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{edu.from}</Moment>-
                    {edu.to === null ? (
                        'Now'
                    ) : (
                        <Moment format="YYYY/MM/DD">{edu.to}</Moment>
                    )}
                </td>
                <td>
                    <Button
                        icon="pi pi-times"
                        onClick={this.onDeleteClick.bind(this, edu._id)}
                        className="p-button-danger p-button-outlined"
                    >
                        Delete
                    </Button>
                </td>
            </tr>
        ));
        return (
            <div>
                <h4 className="mb-4">Educational credentials</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Degree</th>
                            <th>Field Of Study</th>
                            <th>School</th>
                            <th>Years</th>
                            <th />
                        </tr>
                        {education}
                    </thead>
                </table>
            </div>
        );
    }
}
Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired,
};
export default connect(null, { deleteEducation })(Education);
