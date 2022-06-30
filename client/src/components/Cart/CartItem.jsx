import React from "react";
import { clearCart, deleteProduct, increase, decrease } from "../../Api/cart";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import styled from "styled-components";

function CartItem({ data = [] }) {
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <CartStyle>
        <table>
          <tr>
            <th className="hiden">Item</th>
            <th className="hiden">Price</th>
            <th className="hiden">Quantity</th>
            <th className="hiden">Subtotal</th>
          </tr>
          {data.map((item) => {
            const { id, image, name, color, price, amount, size } = item;
            return (
              <tr key={id} className="tr">
                <td>
                  <div className="cart_item">
                    <img src={image} alt="" className="cart_img" />
                    <div className="cart_desc">
                      <div className="cart_title">{name}</div>
                      <div className="cart_color">Color : {color}</div>
                      <div className="cart_color">Size : {size}</div>
                      <div className="cart_price small">${price}</div>
                    </div>
                  </div>
                </td>
                <td className="cart_price hiden">${price}</td>
                <td>
                  <div className="cart_quantity">
                    <div
                      className="cart_minus"
                      onClick={() => decrease(dispatch, id)}
                    >
                      -
                    </div>
                    <div className="cart_index">{amount}</div>
                    <div
                      className="cart_plus"
                      onClick={() => increase(dispatch, id)}
                    >
                      +
                    </div>
                  </div>
                </td>
                <td className="cart_total hiden">${price * amount}</td>
                <td>
                  <button
                    className="cart_trash"
                    onClick={() => deleteProduct(dispatch, id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </CartStyle>
      <CartButton>
        <Link to={"/products"}>
          <div className="cart_back btn">Continue shopping </div>
        </Link>
        <div className="cart_clear btn" onClick={() => clearCart(dispatch)}>
          Clear shopping cart{" "}
        </div>
      </CartButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CartStyle = styled.div`
  @media (max-width: 768px) {
    td:first-child {
      transform: translateX(1.5rem) !important;
    }
    .small {
      display: block !important;
    }
    .cart_img {
      width: 5rem !important;
      transform: translateX(1rem) !important;
    }
    .cart_desc {
      font-size: 0.75rem;
    }
    .cart_title {
      font-size: 0.75rem !important;
    }
    .hiden {
      display: none;
    }
  }
  margin-top: 4rem;
  margin-bottom: 2rem;
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    text-align: left;
    padding: 8px;
  }
  td:first-child {
    width: 25rem;
  }
  td:last-child {
    width: 5rem;
  }
  .small {
    display: none;
  }
  .cart {
    margin-top: 4rem;
    margin-bottom: 4rem;
  }
  .cart_item {
    display: flex;
    align-items: center;
    transform: translateX(-3.5rem);
  }
  .cart_img {
    width: 10rem;
    margin-right: 1rem;
  }
  .cart_title {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 0.7rem;
  }
  .cart_total,
  .cart_price {
    font-weight: bold;
    color: brown;
    letter-spacing: 0.2rem;
  }
  .cart_color {
    margin-bottom: 0.5rem;
  }
  .cart_quantity {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 1.5rem;
  }
  .cart_minus,
  .cart_plus {
    cursor: pointer;
    width: 2rem;
  }
  .cart_index {
    margin-right: 1.5rem;
  }

  .cart_trash {
    color: white;
    cursor: pointer;
    background: brown;
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    border-radius: 3px;
    border: none;
  }
`;

const CartButton = styled.div`
  @media (max-width: 768px) {
    .btn {
      font-size: 0.75rem;
    }
  }
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  .btn {
    font-weight: normal;
    color: white;
    padding: 0.5rem 0.7rem;
    cursor: pointer;
    transition: all 0.25s linear;
    letter-spacing: 0.1rem;
    :hover {
      opacity: 0.7;
    }
  }
  .cart_back {
    background-color: brown;
  }
  .cart_clear {
    background-color: black;
  }
`;

export default CartItem;
