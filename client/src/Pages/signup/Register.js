import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import API from '../../utils/utils';
import './Register.css';
import { toast } from 'react-toastify';

function Register() {
    const history = useHistory();
    const [user, setUSer] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        error: '',
        success: false,
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setUSer({ ...user, success: false, [name]: value });
    };

    const onSubmit = async e => {
        const { firstName, lastName, username, email, password } = user;
        e.preventDefault();
        await API.post(`/api/signup`, {
            firstName,
            lastName,
            username,
            email,
            password,
        })
            .then(({ data }) => {
                toast.success(data.message);
                setTimeout(() => {
                    document.location.href = '/login';
                }, 2000);
            })
            .catch(({ response }) => {
                toast.warning(response.data.message);
                setUSer({
                    ...user,
                    success: false,
                    error: response.data.message,
                });
            });
    };
    const { firstName, lastName, username, email } = user;
    return (
        <>
            <div className="register row justify-content-around">
                <div className="col-6">
                    <div className="banner">
                        <img
                            src="/images/registering/register.png"
                            alt="Login"
                        />
                    </div>
                </div>
                <div className="col-4 align-items-center collectionForm">
                    <form className="flex-column form">
                        {user.error.length > 0 ? (
                            <div className="alert alert-danger">
                                {user.error}
                            </div>
                        ) : null}
                        {user.success === true ? history.push('/login') : null}
                        <div className="form-group">
                            <label htmlFor="firstName" className="pl-2">
                                First Name*
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                name="firstName"
                                id="firstName"
                                placeholder="First Name"
                                onChange={handleChange}
                                value={firstName}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName" className="pl-2">
                                Last Name*
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                name="lastName"
                                id="lastName"
                                aria-describedby="emailHelp"
                                placeholder="Last Name"
                                onChange={handleChange}
                                value={lastName}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username" className="pl-2">
                                Username*
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                name="username"
                                id="username"
                                aria-describedby="emailHelp"
                                placeholder="Username"
                                onChange={handleChange}
                                value={username}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="pl-2">
                                Email address*
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                aria-describedby="emailHelp"
                                placeholder="Email Address"
                                name="email"
                                onChange={handleChange}
                                value={email}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="pl-2">
                                Password*
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                id="password"
                                placeholder="Password"
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-dark btnSubmit mb-3 mt-3"
                            onClick={onSubmit}>
                            Register
                        </button>
                        <br />
                        <span>
                            you have already account ?{'  '}
                            <Link to="/login" className="loginRoot">
                                Login
                            </Link>
                        </span>
                    </form>
                </div>
            </div>
            <button className="btn homeRoot">
                <Link to="/">
                    <HiArrowNarrowLeft />
                </Link>
            </button>
        </>
    );
}

export default Register;
