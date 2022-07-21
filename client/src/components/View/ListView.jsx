import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function ListView({ products = [""] }) {
  return (
    <ListStyle className="list">
      {products.map((item) => {
        return (
          <div className="list_wrapper" key={item.id}>
            <img src={item.imageCover} alt="" className="list_img" />

            <div className="list_container">
              <div className="list_title">{item.name}</div>
              <div className="list_price">${item.price}</div>
              <div className="list_desc">{item.description}</div>
              <Link to={`/products/${item.slug}`}>
                <button className="list_btn">Detail</button>
              </Link>
            </div>
          </div>
        );
      })}
    </ListStyle>
  );
}
const ListStyle = styled.div`
  display: flex;
  flex-direction: column;
  .list_wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2rem;
  }
  .list_img {
    width: 15rem;
    transform: translateX(-3rem);
  }
  .list_title {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }
  .list_price {
    font-size: 1.25rem;
    color: brown;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  .list_btn {
    font-size: 0.7rem;
    color: white;
    background-color: #a74939;
    padding: 0.5rem 0.65rem;
    border: none;
    margin-top: 1rem;
    border-radius: 5px;
    letter-spacing: 0.2rem;
    cursor: pointer;
    transition: opacity 0.25s linear;
  }
  .list_btn:hover {
    opacity: 0.6;
  }
  @media (max-width: 992px) {
    .list_wrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin: 2rem;
    }
  }
`;

export default ListView;
