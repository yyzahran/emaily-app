import React from 'react';
import { Field, reduxForm } from 'redux-form';
import SurveyField from './SurveyField';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { validateEmails } from '../utils/validateEmails';
import { fields } from '../formFields';

const SurveyForm = ({ handleSubmit, onSurveySubmit }) => {
    const renderFields = () => {
        return _.map(fields, ({ label, name }) => {
            return (
                <Field
                    key={name}
                    component={SurveyField}
                    type="text"
                    name={name}
                    label={label}
                />
            );
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSurveySubmit)}>
                {renderFields()}
                <Link to="/surveys" className="red btn-flat white-text">
                    Cancel
                </Link>
                <button
                    className="teal btn-flat right white-text"
                    type="submit"
                >
                    Next
                    <i className="material-icons right">done</i>
                </button>
            </form>
        </div>
    );
};

const validate = (values) => {
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');
    fields.map(({ name }) => {
        if (!values[name]) {
            if (name !== 'recipients') {
                errors[name] = `You must provide a ${name}`;
            } else {
                errors[name] = `You must provide recipient(s)`;
            }
        }
    });

    return errors;
};

// Connecting redux-form to the store
export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false,
})(SurveyForm);
