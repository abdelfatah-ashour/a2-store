import React from 'react';
import Card from '../../Components/CardModel/CardModel';
import './Product.css';

function Products({ products }) {
    return (
        <div className="row products">
            {products.map((product, i) => {
                return <Card product={product} key={i} />;
            })}
        </div>
    );
}

export default Products;
