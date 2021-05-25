import React, { useEffect, useState } from 'react';
import API from '../../utils/utils';
import Products from '../../Layout/products/Products';
import _ from 'lodash';
import Spinner from '../../Components/spinner/Spinner';

export function Main() {
    const [product, setProduct] = useState([]);
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        // fetch data of products on client side
        API.get(`/api/product`)
            .then(({ data }) => {
                const { message, success } = data;
                const products = _.map(
                    message,
                    _.partialRight(_.pick, [
                        '_id',
                        'name',
                        'title',
                        'company',
                        'category',
                        'price',
                        'description',
                        'photo',
                        'quantity',
                    ])
                );
                setProduct([...products]);
                setSuccess(success);
            })
            .catch(error => {
                console.log(error.message);
            });
    }, []);

    useEffect(() => {
        // set products id localStorage to get filter item on page details of products
        localStorage.setItem('products', JSON.stringify(product));
    }, [product]);

    return (
        <>
            {!success || product.length <= 0 ? (
                <Spinner />
            ) : (
                <Products products={product} />
            )}
        </>
    );
}
