import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import { AiOutlineTwitter } from 'react-icons/ai';
import { CgLogIn } from 'react-icons/cg';
import { BsCloudUpload } from 'react-icons/bs';
import { GoSignOut } from 'react-icons/go';
import { FiShoppingCart } from 'react-icons/fi';
import { AuthContext } from '../../Context_API/AuthContext';
import { CartContext } from '../../Context_API/CartContext';
import { remove, getJSON } from 'js-cookie';
import API from '../../utils/utils';
import { toast } from 'react-toastify';
import './Head.css';

export function Head() {
    const { Auth, setAuth } = useContext(AuthContext);
    const { cartContext } = useContext(CartContext);
    const [isCart, setInCart] = useState(0);
    const cart = JSON.parse(localStorage.getItem('cart'));

    useEffect(() => {
        if (getJSON('UserInfo')) {
            const { id, displayName, email, role } = getJSON('UserInfo');

            setAuth({
                ...Auth,
                state: true,
                id: id,
                displayName: displayName,
                email: email,
                role: role,
            });
        }

        return () => {
            return null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSignout = async e => {
        await API.post('/api/signout')
            .then(response => {
                const { success, message } = response.data;
                if (success) {
                    remove('UserInfo');
                    remove('auth');
                    setAuth({
                        state: false,
                        id: null,
                        displayName: '',
                        email: '',
                        role: 'undefined',
                        token: null,
                    });
                    toast(message, {
                        autoClose: 3000,
                        style: {
                            textAlign: 'center',
                            fontSize: '1.25rem',
                        },
                    });
                }
            })
            .catch(error => {
                return toast.success(error.response.data.message, {
                    autoClose: 1500,
                    style: {
                        textAlign: 'center',
                        fontSize: '1.25rem',
                    },
                });
            });
    };

    useEffect(() => {
        if (window !== 'undefined' && cart) {
            setInCart(cart.length);
        }
    }, [cart, cartContext.countCart]);

    return (
        <div className="head">
            <ul className="listSocial">
                <li>
                    <a href="https://www.facebook.com">
                        <FaFacebookF />
                    </a>
                </li>
                <li>
                    <a href="https://www.facebook.com">
                        <AiOutlineTwitter />
                    </a>
                </li>
                <li>
                    <a href="https://www.facebook.com">
                        <FaInstagram />
                    </a>
                </li>
            </ul>
            <ul className="listSetting">
                {Auth.state === true ? (
                    <li style={{ fontSize: '0.9rem' }}>
                        Hi! {Auth.displayName}
                    </li>
                ) : null}
                {Auth.role === 0 ? (
                    <li>
                        <Link to="/api/upload">
                            <BsCloudUpload />
                        </Link>
                    </li>
                ) : null}
                {Auth.state === true ? (
                    <li className="linkIconCart">
                        <Link to="/cart" className="linkIconCart">
                            <FiShoppingCart /> <span>{isCart}</span>
                        </Link>
                    </li>
                ) : null}

                {Auth.state === false ? (
                    <li>
                        <Link to="/login">
                            <CgLogIn />
                        </Link>
                    </li>
                ) : null}
                {Auth.state ? (
                    <li>
                        <Link to="/">
                            <GoSignOut onClick={handleSignout} />
                        </Link>
                    </li>
                ) : null}
            </ul>
        </div>
    );
}
