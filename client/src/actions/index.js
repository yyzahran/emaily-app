import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async (dispatch) => {
    const { data } = await axios.get('/api/current-user');
    dispatch({ type: FETCH_USER, payload: data });
};

export const handleToken = (token) => async (dispatch) => {
    const resp = await axios.post('/api/stripe', token);
    console.log(token);
    // Reusing the same action
    dispatch({ type: FETCH_USER, payload: resp.data });
};

export const submitSurvey = (values, navigate) => async (dispatch) => {
    const resp = await axios.post('/api/surveys', values);
    navigate('/surveys');
    dispatch({ type: FETCH_USER, payload: resp.data });
};
