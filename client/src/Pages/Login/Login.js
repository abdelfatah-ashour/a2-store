import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import API from '../../utils/utils';
import Cookie from 'universal-cookie';
import { AuthContext } from '../../Context_API/AuthContext';
import './Login.css';
function Login() {
    const history = useHistory();
    const MainCookies = new Cookie();
    const { Auth, setAuth } = useContext(AuthContext);

    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
        error: null,
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, success: false, [name]: value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        await API.post(`/api/login`, userInfo)
            .then(resp => {
                const { success, message } = resp.data;
                setUserInfo({
                    email: '',
                    password: '',
                    success: success,
                    error: null,
                });

                setAuth({
                    ...Auth,
                    token: resp.headers.authorization,
                    state: true,
                    id: resp.data.message.id,
                    displayName: resp.data.message.displayName,
                    email: resp.data.message.email,
                    role: resp.data.message.role,
                });

                MainCookies.set('UserInfo', message, {
                    httpOnly: false,
                    secure: true,
                    sameSite: 'strict',
                    maxAge: 7 * 24 * 60 * 60,
                    path: '/',
                });

                MainCookies.set('auth', resp.headers.authorization, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    maxAge: 7 * 24 * 60 * 60,
                    path: '/',
                });

                toast.success('Login success');

                setTimeout(() => {
                    history.push('/');
                }, 1500);
            })
            .catch(error => {
                if (error.response) {
                    toast.warning(error.response.data.message);
                } else {
                    alert('something went wrong!');
                }
            });
    };

    return (
        <>
            <div className="login row justify-content-center">
                <div className="col-md-6 col-sm-12  mt-4 d-flex justify-content-center align-content-center">
                    <div className="banner col-8">
                        <img src="/images/registering/login.png" alt="Login" />
                    </div>
                </div>
                <div className="col-md-6 col-sm-12 d-flex justify-content-around  align-content-center collectionForm">
                    <form>
                        <>
                            {userInfo.error ? (
                                <div className="alert alert-danger">
                                    {userInfo.error}
                                </div>
                            ) : null}
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    aria-describedby="emailHelp"
                                    name="email"
                                    value={userInfo.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    id="password"
                                    onChange={handleChange}
                                    value={userInfo.password}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-dark btnSubmit mb-3 mt-3"
                                onClick={onSubmit}>
                                Login
                            </button>
                            <br />
                            <span>
                                don't have account ?{'  '}
                                <Link to="/register" className="">
                                    Register
                                </Link>
                            </span>
                        </>
                    </form>
                </div>
            </div>
            <button className="btn mr-auto homeRoot">
                <Link to="/">
                    <HiArrowNarrowLeft />
                </Link>
            </button>
        </>
    );
}

export default Login;
