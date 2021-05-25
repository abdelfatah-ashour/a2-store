import React, { useContext, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Context_API/AuthContext';
import { ToastContainer } from 'react-toastify';
import './Navbar.css';

export function Navbar() {
    const { Auth } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <ToastContainer />
            <Link className="brand" to="/">
                A2 store
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav m-auto justify-content-between align-content-between">
                    <li className="nav-item">
                        <NavLink className="nav-link mr-4" to="/">
                            Home
                        </NavLink>
                    </li>
                    {Auth.state === true && Auth.role === 0 ? (
                        <>
                            <li className="nav-item mr-4">
                                <NavLink className="nav-link" to="/cart">
                                    Cart
                                </NavLink>
                            </li>
                            <li className="nav-item mr-4">
                                <NavLink className="nav-link" to="/myOrder">
                                    My Order
                                </NavLink>
                            </li>
                        </>
                    ) : null}
                </ul>
            </div>
        </nav>
    );
}
