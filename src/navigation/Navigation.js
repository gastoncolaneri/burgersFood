import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Checkout from '../views/Checkout/Checkout';
import Home from '../views/Home/Home.view';
import Login from '../views/Login/Login.view';
import Orders from '../views/Orders/Orders';

const Navigation = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="my-orders" element={<Orders />} />
                <Route path="login" element={<Login />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default Navigation