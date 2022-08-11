import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";

function GridView({ products = [""] }) {
  return (
    <GridStyle>
      {products.map((item) => {
        return (
          <div className="product_mini" key={item.id}>
            <div className="product_container">
              <img src={item.imageCover} alt="" className="product_img" />
              <Link className="product_wap" to={`/products/${item.slug}`}>
                <FaSearch className="product_icon" />
              </Link>
            </div>
            <div className="product_desc">
              <div className="product_name">{item.name}</div>
              <div className="product_price">${item.price}</div>
            </div>
          </div>
        );
      })}
    </GridStyle>
  );
}

const GridStyle = styled.div`
  display: flex;
  /* align-items: center; */
  justify-content: center;

  flex-wrap: wrap;
  .product_wrapper {
    display: flex;
    justify-content: space-around;
    margin-top: 3rem;
  }
  .product_mini {
    margin: 1.5rem;
  }
  .product_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    &:hover {
      .product_wap {
        display: flex;
      }
      .product_img {
        opacity: 0.5;
      }
    }
  }
  .product_img {
    width: 15rem;
  }
  .product_desc {
    display: flex;
    justify-content: space-around;
    font-weight: 600;
  }
  .product_price {
    color: brown;
  }
  .product_btn {
    background-color: brown;
    border-radius: 0.2rem;
    width: 7rem;
    margin-top: 3rem;
    color: white;
    font-size: 1rem;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.25s linear;
    &:hover {
      opacity: 0.5;
      color: black;
    }
  }
  .product_icon {
    color: white;
    font-size: 1rem;
    font-weight: bold;
  }
  .product_wap {
    background-color: rgb(165, 42, 42);
    position: absolute;
    top: 7rem;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    display: none;
    cursor: pointer;
  }
`;

export default GridView;
