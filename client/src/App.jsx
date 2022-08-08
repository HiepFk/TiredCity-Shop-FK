import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Alert from "./components/Alert";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Choise from "./components/Choise";
import {
  About,
  Cart,
  Home,
  Products,
  Product,
  Error,
  Login,
  MyInfo,
  MyOrder,
  ActivationEmail,
  ForgotPassword,
  ResetPassword,
} from "./pages";
function App() {
  const alert = useSelector((state) => state.alert);

  return (
    <>
      <div className="app page">
        {alert.show && <Alert type={`alert--${alert.type}`} msg={alert.msg} />}
        <Header />
        <Choise />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="About" element={<About />} />
          <Route exact path="Cart" element={<Cart />} />
          <Route exact path="Products" element={<Products />} />
          <Route exact path="Products/:id" element={<Product />} />
          <Route exact path="Login" element={<Login />} />
          <Route exact path="Me" element={<MyInfo />} />
          <Route exact path="Myorder" element={<MyOrder />} />
          <Route
            exact
            path="user/activate/:activation_token"
            element={<ActivationEmail />}
          />
          <Route
            exact
            path="user/reset/:activation_token"
            element={<ResetPassword />}
          />
          <Route exact path="forgot" element={<ForgotPassword />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
