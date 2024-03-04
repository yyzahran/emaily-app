import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

const Header = () => {
    // Getting the state from the store
    const auth = useSelector((state) => state.auth);

    const renderContent = () => {
        switch (auth) {
            case null:
                return;
            case false:
                return (
                    <li>
                        <a href="/auth/google">Login with Google</a>
                    </li>
                );
            default:
                return (
                    <>
                        <li>
                            <Payments />
                        </li>
                        <li style={{ margin: '0 10px' }}>
                            Available Credits: {auth.credits}
                        </li>
                        <li>
                            <a href="/api/logout">Logout</a>
                        </li>
                    </>
                );
        }
    };

    return (
        <nav>
            <div className="nav-wrapper">
                <Link to={auth ? '/surveys' : '/'} className="left brand-logo">
                    Emaily
                </Link>
                <ul id="nav-mobile" className="right">
                    {renderContent()}
                </ul>
            </div>
        </nav>
    );
};

export default Header;
