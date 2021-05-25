import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { PaypalButtonCheckout } from '../../Components/Paypal/PaypalPayment';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { BiEdit } from 'react-icons/bi';
import { MdDeleteForever } from 'react-icons/md';
import { CartContext } from '../../Context_API/CartContext';
import './Cart.css';

function Cart() {
    const [cart, setCart] = useState([]);
    const [clone, setCLone] = useState('');
    const [Total, setTotal] = useState(0);
    const [checked, setChecked] = useState(true);
    const { cartContext, setCartContext } = useContext(CartContext);
    const [itemsOrder, setItemsOrder] = useState();
    const cloneOrder = JSON.parse(localStorage.getItem('cart'));

    const handleDelete = product => {
        // GET CLONE CART
        const cloneCart = JSON.parse(localStorage.getItem('cart'));
        // FILTER ALL ITEMS NOT MATCHING ID
        const newCloneCart = cloneCart.filter(item => item._id !== product._id);
        //  new clone for life cycle
        setCLone(newCloneCart);
        // RETURN NEW CLONE CART
        localStorage.setItem('cart', JSON.stringify(newCloneCart));
        setCartContext({ countCart: cartContext.countCart - 1 });
    };

    // handle to delete all products
    const handleDeleteAll = () => {
        let cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        setCartContext({ countCart: 0 });
        window.location.href = '/';
    };

    useEffect(() => {
        const hasCart = JSON.parse(localStorage.getItem('cart'));
        if (hasCart === null) {
            return null;
        }
        setCart(hasCart);
    }, [clone]);

    useEffect(() => {
        const ordering = cloneOrder.map(item => {
            let order = {};
            order.name = item.name;
            order.quantity = item.quantity;
            return order;
        });
        setItemsOrder(ordering);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartContext.countCart]);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        // method to get all quantity of products and total it
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + item.price * item.quantity;
            }, 0);
            setTotal(total);
        };
        getTotal();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clone]);

    return (
        <div className="Cart">
            {cart.length === 0 ? (
                <div className="warning">
                    <div className="banner">
                        <img src="/images/warning/cart.jpg" alt="warning" />
                    </div>
                    <h6> you should select equal or more than 1 product :) </h6>
                </div>
            ) : null}

            {cart.length > 0 ? (
                <>
                    <table className="table table-hover">
                        {/* table head */}
                        <thead>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">name</th>
                                <th scope="col">quantity</th>
                                <th scope="col">total</th>
                                <th scope="col">manage</th>
                            </tr>
                        </thead>
                        {/* table body */}
                        <tbody>
                            {cart.map(item => {
                                return (
                                    <React.Fragment key={item._id}>
                                        <tr key={item._id}>
                                            <th scope="row">{item._id}</th>
                                            <td>{item.name}</td>
                                            <td>{item.quantity}</td>
                                            <td>
                                                ${item.price * item.quantity}
                                            </td>
                                            <td className="manageEdit">
                                                {/* btn for editing quantity order from cart */}
                                                <span>
                                                    <Link
                                                        to={
                                                            '/api/edit/' +
                                                            item._id
                                                        }>
                                                        <BiEdit />
                                                    </Link>
                                                </span>
                                                {/* btn for deleting order from cart */}
                                                <span>
                                                    <MdDeleteForever
                                                        onClick={() => {
                                                            handleDelete(item);
                                                        }}
                                                    />
                                                </span>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="row d-flex justify-content-around  align-content-center">
                        <div className="col-md-3 col-sm-12">
                            <div
                                className="btn btn-danger"
                                onClick={handleDeleteAll}>
                                Delete All
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-12 justify-content-around  align-content-center">
                            <h6>total amount : ${Total}</h6>
                            <div className="dropdown-divider"></div>
                            {checked ? (
                                <div className="payment-div">
                                    <PaypalButtonCheckout
                                        amount={Total}
                                        items={itemsOrder}
                                    />
                                </div>
                            ) : (
                                <button
                                    className="btn btn-dark"
                                    onClick={() => {
                                        setChecked(true);
                                    }}>
                                    Checkout with Paypal
                                </button>
                            )}
                        </div>
                    </div>
                </>
            ) : null}

            {/* home root */}
            <button className="btn mr-auto mb-5 rootHome">
                <Link to="/">
                    <HiArrowNarrowLeft />
                </Link>
            </button>
            <div className="overlay"></div>
        </div>
    );
}

export default Cart;
