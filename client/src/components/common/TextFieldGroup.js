import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
    name,
    placeholder,
    value,
    label,
    error,
    info,
    type,
    onChange,
    diabled,
}) => {
    return (
        <div className="form-group">
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                className={classnames('form-control form-control-lg', {
                    'is-invalid': error,
                })}
                required
                value={value}
                onChange={onChange}
                disabled={diabled}
            />
            {info && <small className="form-text text-muted">{info}</small>}
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};
TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.string,
};
TextFieldGroup.defaultProps = {
    type: 'text',
};
export default TextFieldGroup;
