import React, { useContext, useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Navbar from "../components/Navbar/Navbar";
import Checkout from "../views/Checkout/Checkout";
import Home from "../views/Home/Home.view";
import Login from "../views/Login/Login.view";
import Orders from "../views/Orders/Orders";
import { FoodsContext } from "../context/context";
import { app } from "../utils/Firebase";
import { ProgressSpinner } from "primereact/progressspinner";

import "./navigation.css";

const Navigation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth(app);
  const [userLogin, setUserLogin] = useState(false);
  const foodContext = useContext(FoodsContext);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setUserLogin(true) : setUserLogin(false);
      setIsLoading(false);
    });
  }, [auth, userLogin]);

  const commonPaths = useMemo(() => {
    return (
      <>
        <Route exact path="/" element={<Home />} />
        <Route exact path="*" element={<Home />} />
      </>
    );
  }, []);

  return isLoading ? (
    <div className="spinner__container">
      <ProgressSpinner />
    </div>
  ) : (
    <Router>
      <Navbar />
      {userLogin ? (
        <Routes>
          {commonPaths}
          <Route exact path="my-orders" element={<Orders />} />
          <Route exact path="checkout" element={<Checkout />} />
        </Routes>
      ) : (
        <Routes>
          {commonPaths}
          <Route exact path="login" element={<Login />} />
        </Routes>
      )}
    </Router>
  );
};

export default Navigation;
