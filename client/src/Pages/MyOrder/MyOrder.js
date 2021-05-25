import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../Context_API/AuthContext';
import './MyOrder.css';
import API from '../../utils/utils';

export function MyOrder() {
    const { Auth } = useContext(AuthContext);
    const [Orders, setOrders] = useState(null);

    useEffect(() => {
        if (window !== 'undefined') {
            if (Auth.state && Auth.id !== null) {
                const fetchDat = async () => {
                    await API.get(`/api/get/order/${Auth.id}`)
                        .then(({ data }) => {
                            const result = data.message;
                            setOrders({ items: result });
                        })
                        .catch(({ response }) => {
                            console.log(response.data.message);
                        });
                };
                fetchDat();
            }
        }
    }, [Auth.id, Auth.state]);

    return (
        <>
            {Orders !== null && Orders.items.length > 0 ? (
                <>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">NAME</th>
                                <th scope="col">QTY</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Orders.items.map((order, i) => {
                                return order.items.map(item => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{order._id}</th>
                                                <td>{item.name}</td>
                                                <td>{item.quantity}</td>
                                            </tr>
                                        </>
                                    );
                                });
                            })}
                        </tbody>
                    </table>
                </>
            ) : (
                <div className="alert alert-warning">
                    you don't have any order
                </div>
            )}
        </>
    );
}
