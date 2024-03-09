import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSurveys } from '../actions';

const SurveyList = () => {
    const dispatch = useDispatch();
    const surveys = useSelector((state) => state.survey);
    console.log(surveys);

    useEffect(() => {
        if (!surveys.length) {
            dispatch(fetchSurveys());
        }
    }, [dispatch, surveys]);

    const renderedSurveys = surveys
        .reverse()
        .map(({ _id, title, no, yes, dateSent, body }) => {
            return (
                <div key={_id} className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">{title}</span>
                        <p>{body}</p>
                        <p className="right">
                            Sent on: {new Date(dateSent).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="card-action">
                        <a>Yes: {yes}</a>
                        <a>No: {no}</a>
                    </div>
                </div>
            );
        });

    useEffect(() => {
        dispatch(fetchSurveys());
    }, [dispatch]);

    return <div>{renderedSurveys}</div>;
};

export default SurveyList;
