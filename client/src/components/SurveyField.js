import React from 'react';

const SurveyField = ({ input, meta: { error, touched }, label }) => {
    return (
        <div>
            <label htmlFor="">{label}</label>
            <input {...input} style={{ marginBottom: '5px' }} />
            <div className="red-text" style={{ marginBottom: '20px' }}>
                {touched && error}
            </div>
        </div>
    );
};

export default SurveyField;
