import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";

import { ProductMini as data } from "../../utils/data";
function ProductAd() {
  return (
    <Wrapper>
      <div className="productAd_title">Featured Products</div>
      <hr />
      <div className="productAd_wrapper">
        {data.map((item) => {
          return (
            <div className="productAd_mini" key={item.id}>
              <div className="productAd_container">
                <img src={item.src} alt="" className="productAd_img" />
                <Link to={`/products/${item.id}`} className="productAd_wap">
                  <FaSearch className="productAd_icon" />
                </Link>
              </div>
              <div className="productAd_desc">
                <div className="productAd_name">{item.title}</div>
                <div className="productAd_price">{item.price}</div>
              </div>
            </div>
          );
        })}
      </div>
      <Link to={"/products"} className="productAd_btn">
        All product
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 7rem;
  align-items: center;
  .productAd_title {
    text-align: center;
    font-weight: bold;
    font-size: 3rem;
  }
  hr {
    width: 10rem;
    height: 0.25rem;
    background-color: brown;
    margin-top: 0.5rem;
  }
  .productAd_wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    grid-gap: 2rem;
    margin-top: 3rem;
  }
  .productAd_mini {
    margin-right: 2.5rem;
    margin-left: 2.5rem;
  }
  .productAd_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    &:hover {
      .productAd_wap {
        display: flex;
      }
      .productAd_img {
        opacity: 0.5;
      }
    }
  }
  .productAd_img {
    width: 15rem;
  }
  .productAd_desc {
    display: flex;
    justify-content: space-around;
    font-weight: 600;
  }
  .productAd_price {
    color: brown;
  }
  .productAd_btn {
    background-color: brown;
    border-radius: 0.2rem;
    width: 7rem;
    margin-top: 3rem;
    color: white;
    font-size: 1rem;
    padding: 0.5rem;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    transition: all 0.25s linear;
    &:hover {
      opacity: 0.5;
      color: black;
    }
  }
  .productAd_icon {
    color: white;
    font-size: 1rem;
    font-weight: bold;
  }
  .productAd_wap {
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
  @media (max-width: 768px) {
    .productAd_title {
      font-size: 1.5rem;
    }
    hr {
      height: 0.15rem;
    }
  }
`;

export default ProductAd;
