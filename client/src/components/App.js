import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './Landing';
import Header from './Header';
import { useDispatch } from 'react-redux';
import * as actions from '../actions';

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

const App = () => {
    const dispatch = useDispatch();
    // const auth = useSelector((state) => state.auth); // Assuming user is stored in the Redux store under the 'user' key
    useEffect(() => {
        dispatch(actions.fetchUser());
    }, [dispatch]);

    return (
        <div className="container">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/surveys" element={<Dashboard />} />
                    <Route path="/surveys/new" element={<SurveyNew />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
