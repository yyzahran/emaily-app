import React, { useState } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import { reduxForm } from 'redux-form';

const SurveyNew = () => {
    const [isShowReview, setIsShowReview] = useState(false);

    const showFormReview = () => {
        setIsShowReview(true);
    };

    const noShowFormReview = () => {
        setIsShowReview(false);
    };

    return (
        <div>
            {isShowReview ? (
                <SurveyFormReview onCancel={noShowFormReview} />
            ) : (
                <SurveyForm onSurveySubmit={showFormReview} />
            )}
        </div>
    );
};

// no destroyOnUnmount here so values get cleared out when leaving this component
export default reduxForm({
    form: 'surveyForm',
})(SurveyNew);
