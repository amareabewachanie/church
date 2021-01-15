const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
    let errors = {};
    // data.name = !isEmpty(data.name) ? data.name : '';
    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.location = !isEmpty(data.location) ? data.location : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';
    if (!Validator.isLength(data.handle, { min: 3, max: 40 })) {
        errors.handle = 'Handle must be between 3 and 40 characters';
    }
    if (isEmpty(data.location)) {
        errors.location = 'Location is required';
    }
    if (Validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required';
    }
    if (Validator.isEmpty(data.status)) {
        errors.status = 'Status is required';
    }
    if (Validator.isEmpty(data.skills)) {
        errors.skills = 'Skill is required';
    }
    if (!isEmpty(data.website)) {
        if (!Validator.isURL(data.website)) {
            errors.website = 'Please input a valid website';
        }
    }
    if (!isEmpty(data.youtube)) {
        if (!Validator.isURL(data.youtube)) {
            errors.youtube = 'Please input a valid youtube link';
        }
    }
    if (!isEmpty(data.twitter)) {
        if (!Validator.isURL(data.twitter)) {
            errors.twitter = 'Please input a valid twitter link';
        }
    }
    if (!isEmpty(data.facebook)) {
        if (!Validator.isURL(data.facebook)) {
            errors.facebook = 'Please input a valid facebook link';
        }
    }
    if (!isEmpty(data.instagram)) {
        if (!Validator.isURL(data.instagram)) {
            errors.instagram = 'Please input a valid instagram link';
        }
    }
    if (!isEmpty(data.linkedin)) {
        if (!Validator.isURL(data.linkedin)) {
            errors.linkedin = 'Please input a valid linkedin link';
        }
    }
    return {
        errors,
        isValid: isEmpty(errors),
    };
};
