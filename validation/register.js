const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';
    if (!Validator.isLength(data.name, { min: 2, max: 50 })) {
        errors.name = 'Name must be between 2 and 50 characters';
    }
    if (Validator.isEmpty(data.name)) {
        errors.name = 'Full name is required';
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Please provide a valid email';
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password =
            'Password must be at least 6 and maximum of 30 charachters';
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Please confirm your password';
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match';
    }
    return {
        errors,
        isValid: isEmpty(errors),
    };
};
