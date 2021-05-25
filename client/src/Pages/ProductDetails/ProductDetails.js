import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../Context_API/AuthContext';
import { CartContext } from '../../Context_API/CartContext';
import { FaOpencart, FaLongArrowAltLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { API } from '../../utils/keys.json';
import './ProductDetails.css';

function ProductDetails(props) {
    const history = useHistory();
    const { Auth } = useContext(AuthContext);
    const { cartContext, setCartContext } = useContext(CartContext);

    const id = props.match.params.productId;
    const products = JSON.parse(localStorage.getItem('products'));
    const [product, setProduct] = useState('');

    const handleAddToCart = product => {
        if (Auth.state) {
            let cart = [];
            let clone = JSON.parse(`${localStorage.getItem('cart')}`);
            let item = { ...product, quantity: 1 };
            if (clone === null) {
                cart.push(item);
                localStorage.setItem('cart', JSON.stringify(cart));
                setCartContext({ cartContext: cartContext.countCart + 1 });
            }

            if (clone !== null) {
                const result = clone.filter(item => {
                    return item._id === product._id;
                });
                if (result.length === 1) {
                    return toast.warn('in cart', {
                        autoClose: 1500,
                        style: {
                            textAlign: 'center',
                            fontSize: '1.5rem',
                            textTransform: 'uppercase',
                            color: 'var(--mainColor)',
                        },
                    });
                } else {
                    cart.push(item);
                    cart.push(...clone);
                    setCartContext({ cartContext: cartContext.countCart + 1 });
                    return localStorage.setItem('cart', JSON.stringify(cart));
                }
            }
        } else {
            history.push('/login');
        }
    };

    useEffect(() => {
        let oneProduct = products.filter(product => product._id === id);
        setProduct(...oneProduct);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { name, title, company, price, description, photo, quantity } =
        product;
    return (
        <>
            <div className="row details justify-content-around">
                <div className="container_image col-md-6 col-sm-12">
                    <div className="content_image">
                        <img src={API + '/' + photo} alt={title} />
                    </div>
                </div>
                <div className="content_info col-md-6 col-sm-12">
                    <span>
                        Name :{' '}
                        <b style={{ textTransform: 'uppercase' }}>{name}</b>
                    </span>
                    <span>Title : {title}</span>
                    <span>Company : {company}</span>
                    <span>Quantity :{quantity}</span>
                    <span className="d-block">Price : $ {price} </span>
                    <p>
                        Description :<small>{description}</small>
                    </p>
                </div>
                <button className="btn mr-auto mt-5">
                    <Link to="/">
                        <FaLongArrowAltLeft style={{ style: 'inlineBlock' }} />
                    </Link>
                </button>
                <button
                    className="btn ml-auto mt-5"
                    onClick={() => {
                        handleAddToCart(product);
                    }}>
                    add cart
                    <FaOpencart />
                </button>
            </div>
        </>
    );
}

export default ProductDetails;
