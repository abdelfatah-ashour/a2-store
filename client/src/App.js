import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthContext } from './Context_API/AuthContext';
import { CartContextProvider } from './Context_API/CartContext';
import { Header } from './Layout/Header/Header';
import { Main } from './Pages/Main/Main';
import { MyOrder } from './Pages/MyOrder/MyOrder';
import { PageNotFound } from './Pages/404/404';
import Login from './Pages/Login/Login';
import Register from './Pages/signup/Register';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import Cart from './Pages/Cart/Cart';
import EditCart from './Pages/EditCart/EditCart';
import UploadProduct from './Pages/UploadProduct/UploadProduct';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import './App.css';

toast.configure();
function App() {
    const { Auth } = useContext(AuthContext);
    useEffect(() => {
        if (JSON.parse(localStorage.getItem('cart')) === null) {
            localStorage.setItem('cart', JSON.stringify([]));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <CartContextProvider>
            <div className="App container">
                <Router>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={Main} />
                        <Route
                            path="/cart"
                            component={Auth.state ? Cart : Login}
                        />
                        <Route
                            path="/MyOrder"
                            component={Auth.state ? MyOrder : Login}
                        />
                        <Route
                            path="/register"
                            component={Auth.state ? Main : Register}
                        />
                        <Route
                            path="/login"
                            component={Auth.state ? Main : Login}
                        />
                        <Route
                            path="/api/upload"
                            component={Auth.state ? UploadProduct : Login}
                        />

                        <Route
                            path="/api/details/:productId"
                            component={ProductDetails}
                        />
                        <Route
                            path="/api/edit/:productId"
                            component={Auth.state ? EditCart : Login}
                        />
                        <Route component={PageNotFound} />
                    </Switch>
                </Router>
            </div>
        </CartContextProvider>
    );
}

export default App;
