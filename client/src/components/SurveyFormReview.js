import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fields } from '../formFields';
import * as actions from '../actions/';
import { useNavigate } from 'react-router-dom';

const SurveyFormReview = ({ onCancel }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        surveyForm: { values },
    } = useSelector((state) => state.form);

    const renderedFields = fields.map((field) => {
        return (
            <div key={field.name}>
                <label>{field.label}</label>
                <div>{values[field.name]}</div>
            </div>
        );
    });

    const onSubmitSurvey = () => {
        dispatch(actions.submitSurvey(values, navigate));
    };
    return (
        <div>
            <h5>Please confirm your entries!</h5>
            {renderedFields}
            <button
                className="yellow darken-3 white-text btn-flat"
                onClick={onCancel}
            >
                Back
            </button>
            <button
                onClick={onSubmitSurvey}
                className="teal btn-flat white-text right"
                type="submit"
            >
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

export default SurveyFormReview;
