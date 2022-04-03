import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Checkout from "../views/Checkout/Checkout";
import Home from "../views/Home/Home.view";
import Login from "../views/Login/Login.view";
import Orders from "../views/Orders/Orders";
import { FoodsContext } from "../context/context";

const Navigation = () => {
  const foodContext = useContext(FoodsContext);

  console.log(foodContext.prueba);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="my-orders" element={<Orders />} />
          <Route path="login" element={<Login />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
};

export default Navigation;
