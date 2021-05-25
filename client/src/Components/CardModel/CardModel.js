import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MdAddShoppingCart } from 'react-icons/md';
import { CartContext } from '../../Context_API/CartContext';
import { AuthContext } from '../../Context_API/AuthContext';
import { toast } from 'react-toastify';
import './CardModel.css';
import { API } from '../../utils/keys.json';
function Card({ product }) {
    const { cartContext, setCartContext } = useContext(CartContext);
    const { Auth } = useContext(AuthContext);

    const handleAddToCart = product => {
        let cart = [];
        let clone = JSON.parse(`${localStorage.getItem('cart')}`);
        setCartContext({ countCart: cartContext.countCart + 1 });
        let item = { ...product, quantity: 1 };
        if (clone === null) {
            cart.push(item);
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        if (clone !== null) {
            const result = clone.filter(item => {
                return item._id === product._id;
            });
            if (result.length === 1) {
                return toast('in cart', {
                    autoClose: 1000,
                    style: {
                        textAlign: 'center',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                    },
                });
            } else {
                cart.push(item);
                cart.push(...clone);
                return localStorage.setItem('cart', JSON.stringify(cart));
            }
        }
    };

    return (
        <>
            <div className="mainCard column flex-column">
                <div className="image_card">
                    <img src={API + '/' + product.photo} alt={product.title} />
                </div>
                <div className="content_card">
                    <h6>{product.name}</h6>
                    <span> ${product.price} </span>
                </div>
                {Auth.role <= 0 ? (
                    <div
                        className="btn btn-addCart"
                        onClick={() => {
                            handleAddToCart(product);
                        }}>
                        <MdAddShoppingCart />
                    </div>
                ) : null}

                <div className="btn btn-details">
                    <Link to={'api/details/' + product._id}>show details</Link>
                </div>
                <div className="overlay"></div>
            </div>
        </>
    );
}

export default Card;
