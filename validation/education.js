const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
    let errors = {};
    // data.name = !isEmpty(data.name) ? data.name : '';
    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
    data.from = !isEmpty(data.from) ? data.from : '';
    data.to = !isEmpty(data.to) ? data.to : '';
    //data.password2 = !isEmpty(data.password2) ? data.password2 : '';
    if (Validator.isEmpty(data.school)) {
        errors.school = 'School name is required';
    }
    if (Validator.isEmpty(data.degree)) {
        errors.degree = 'Degree/level is required';
    }
    if (Validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = 'Department/Field of study is required';
    }
    if (Validator.isEmpty(data.from)) {
        errors.from = 'When do start this education?';
    }
    return {
        errors,
        isValid: isEmpty(errors),
    };
};
