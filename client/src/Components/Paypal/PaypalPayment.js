/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import PaypalButton from 'react-paypal-express-checkout';
import { AuthContext } from '../../Context_API/AuthContext';
import { CartContext } from '../../Context_API/CartContext';
import API from '../../utils/utils';

export function PaypalButtonCheckout({ amount, items }) {
    const { Auth } = useContext(AuthContext);
    const { cartContext, setCartContext } = useContext(CartContext);
    const [PaymentOrder, setPaymentOrder] = useState({
        customerID: null,
    });

    useEffect(() => {
        setPaymentOrder({
            customerID: {
                id: Auth.id,
            },
        });
    }, [cartContext.countCart]);

    const client = {
        sandbox:
            'AaqjZZZuaBsnR5M7yxZ_qjpccA-EzsUunTTLkYIUjxDoRWQ2-3E1BsVvIbHK5Tmxt03lVxQFP21e_3M0',
        production: 'YOUR-PRODUCTION-APP-ID',
    };

    const style = {
        shape: 'rect',
        color: 'blue',
        size: 'medium',
    };
    const onSuccess = async data => {
        const { paymentID } = data;
        console.log('The payment was onsucceeded!');

        await API.post('/api/payment/success', {
            ...PaymentOrder,
            items,
            paymentID,
        })
            .then(() => {
                console.log('payment success');
                setCartContext(0);
                localStorage.setItem('cart', JSON.stringify([]));
                return (window.location.href = '/cart');
            })
            .catch(({ response }) => {
                console.log(response.data.message);
            });
    };

    const onCancel = data => {
        console.log('The payment was Oncancelled!', { data });
    };

    const onError = err => {
        console.log('OnError!', { err });
    };

    let env = 'sandbox';
    let currency = 'USD';
    let total = amount;

    return (
        <PaypalButton
            env={env}
            client={client}
            currency={currency}
            total={total}
            onError={onError}
            onSuccess={onSuccess}
            onCancel={onCancel}
            style={style}
        />
    );
}
