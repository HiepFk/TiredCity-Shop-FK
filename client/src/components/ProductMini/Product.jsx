import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import { ProductMini as data } from "../../utils/data";
import "./app.scss";
function Product() {
  return (
    <div className="product">
      <div className="product_title">Featured Products</div>
      <hr />
      <div className="product_wrapper">
        {data.map((item) => {
          return (
            <div className="product_mini" key={item.id}>
              <div className="product_container">
                <img src={item.src} alt="" className="product_img" />
                <Link to={"/products/hihi"} className="product_wap">
                  <FaSearch className="product_icon" />
                </Link>
              </div>
              <div className="product_desc">
                <div className="product_name">{item.title}</div>
                <div className="product_price">{item.price}</div>
              </div>
            </div>
          );
        })}
      </div>
      <Link to={"/products"} className="product_btn">
        All product
      </Link>
    </div>
  );
}

export default Product;
