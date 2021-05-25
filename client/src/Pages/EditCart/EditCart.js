import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaOpencart } from 'react-icons/fa';
import { AiOutlineCheckCircle, AiFillCheckCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';
import './EditCart.css';

function EditCart(props) {
    const [checked, setChecked] = useState(false);

    // product ID
    const productId = props.match.params.productId;
    let [quantity, setQuantity] = useState('');
    // cart clone
    const cloneCart = JSON.parse(localStorage.getItem('cart'));

    // product info
    const [product, setProduct] = useState([]);

    const handleIncrement = () => {
        if (quantity === 1) {
            toast('must be more than 0 product', {
                autoClose: 2000,
                style: {
                    textAlign: 'center',
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                },
            });
            setQuantity(1);
            return;
        }
        setChecked(false);
        setQuantity(quantity - 1);
    };

    const handleDecrement = () => {
        setChecked(false);
        setQuantity(quantity + 1);
    };

    const handleEdit = () => {
        // create new cart
        let cart = [];
        // get clone cart
        // clone product want edit it
        let product = cloneCart.filter(item => {
            return item._id === productId;
        });
        // delete it
        const newCart = cloneCart.filter(item => {
            // return all product from old cart don't matching this product
            return item._id !== productId;
        });
        // override it
        product[0].quantity = quantity;
        // destructed clone cart again
        cart = [...newCart, ...product];
        // localStorage  cart again
        setChecked(true);
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    useEffect(() => {
        if (cloneCart === null) {
            return;
        }
        const product = cloneCart.filter(item => {
            return item._id === productId;
        });
        setProduct(product);
        setQuantity(product[0].quantity);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="editCart">
            {product.length === 0 ? (
                <>
                    <div className="alert">
                        "please select one product to edit it"
                    </div>
                </>
            ) : (
                product.map((item, i) => {
                    return (
                        <React.Fragment key={item._id}>
                            <div className="row justify-content-around">
                                <div className="col-md-5 col-sm-9">
                                    <div className="contentImg">
                                        <img
                                            src={'/' + item.photo}
                                            alt={item.name}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-5 col-sm-9 editContent">
                                    <div>
                                        <h6>{item.name}</h6>
                                        <span>$ {item.price * quantity}</span>
                                    </div>
                                    <div className="row">
                                        <div
                                            className="btn"
                                            onClick={handleIncrement}
                                            disabled={
                                                quantity === 1 ? true : false
                                            }
                                            style={{
                                                fontSize: '2rem',
                                            }}>
                                            -
                                        </div>
                                        <div className="quantity">
                                            {quantity}
                                        </div>
                                        <div
                                            className="btn"
                                            onClick={handleDecrement}
                                            style={{
                                                fontSize: '2rem',
                                            }}>
                                            +
                                        </div>
                                    </div>
                                    <div
                                        className={`btn col-4`}
                                        onClick={handleEdit}
                                        disabled={checked ? true : false}
                                        style={{
                                            color: checked ? 'green' : '#888',
                                            fontSize: '1.5rem',
                                        }}>
                                        {checked ? (
                                            <AiFillCheckCircle />
                                        ) : (
                                            <AiOutlineCheckCircle />
                                        )}
                                    </div>
                                    <div className="col-12 manageQuantity">
                                        <button className="btn mr-auto editRootCart">
                                            <Link to="/cart">
                                                back to cart <FaOpencart />
                                            </Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    );
                })
            )}
        </div>
    );
}

export default EditCart;
