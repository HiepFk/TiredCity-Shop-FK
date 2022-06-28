import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Order,
  Products,
  User,
  Users,
  Product,
  Orders,
  CheckOut,
} from "./index";
import Navbar from "../components/Navbar";
import Error from "../components/Error";
import Add from "../components/Product/Add";

function Main() {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.auth?.user);
  useEffect(() => {
    if (!userLogin) {
      navigate("/login");
    }
  }, [userLogin, navigate]);
  return (
    <div className="app">
      <Navbar />
      <Routes className="left">
        <Route exact path="/Users" element={<Users />} />
        <Route exact path="/Users/:id" element={<User />} />
        <Route exact path="/Products" element={<Products />} />
        <Route exact path="/Products/:id" element={<Product />} />
        <Route exact path="/AddProduct" element={<Add />} />
        <Route exact path="/Orders" element={<Orders />} />
        <Route exact path="/Orders/:id" element={<Order />} />
        <Route exact path="/" element={<CheckOut />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default Main;