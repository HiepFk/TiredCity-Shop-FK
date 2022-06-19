import React from "react";
import { Routes, Route } from "react-router-dom";

// import Alert from "./components/Alert";
import Footer from "./components/Footer";
import Header from "./components/Header";
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
} from "./pages";
function App() {
  return (
    <>
      <div className="app page">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="About" element={<About />} />
          <Route exact path="Cart" element={<Cart />} />
          <Route exact path="Products" element={<Products />} />
          <Route exact path="Products/:id" element={<Product />} />
          <Route exact path="Login" element={<Login />} />
          <Route exact path="Me" element={<MyInfo />} />
          <Route exact path="Myorder" element={<MyOrder />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
