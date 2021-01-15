const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
    let errors = {};
    // data.name = !isEmpty(data.name) ? data.name : '';
    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';
    data.to = !isEmpty(data.to) ? data.to : '';
    //data.password2 = !isEmpty(data.password2) ? data.password2 : '';
    if (Validator.isEmpty(data.title)) {
        errors.title = 'Job title is required';
    }
    if (Validator.isEmpty(data.company)) {
        errors.company = 'Company is required';
    }
    if (Validator.isEmpty(data.from)) {
        errors.from = 'When do start this job?';
    }
    return {
        errors,
        isValid: isEmpty(errors),
    };
};
