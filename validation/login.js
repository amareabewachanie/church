const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};
    // data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    //data.password2 = !isEmpty(data.password2) ? data.password2 : '';
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Please provide a valid email';
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Please Provide your password';
    }
    return {
        errors,
        isValid: isEmpty(errors),
    };
};
