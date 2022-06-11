import React from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import styled from "styled-components";

function CartItem() {
  const data = [
    {
      id: 1,
      src: "/image/tee/2/ba-trieu-3.1.webp",
      title: "Áo bà Triệu",
      color: "black",
      price: "$30",
      quantity: 5,
      total: "$150",
    },
    {
      id: 2,
      src: "/image/tee/1/3.1.webp",
      title: "Áo gà trống",
      color: "black",
      price: "$30",
      quantity: 5,
      total: "$150",
    },
  ];
  return (
    <Wrapper>
      <CartStyle>
        <table>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
          {data.map((item) => {
            const { id, src, title, color, price, quantity, total } = item;
            return (
              <tr key={id} className="tr">
                <td>
                  <div className="cart_item">
                    <img src={src} alt="" className="cart_img" />
                    <div className="cart_desc">
                      <div className="cart_title">{title}</div>
                      <div className="cart_color">Color : {color}</div>
                    </div>
                  </div>
                </td>
                <td className="cart_price">{price}</td>
                <td>
                  <div className="cart_quantity">
                    <div className="cart_minus">-</div>
                    <div className="cart_index">{quantity}</div>
                    <div className="cart_plus">+</div>
                  </div>
                </td>
                <td className="cart_total">{total}</td>
                <td>
                  <div className="cart_trash">
                    <FaTrash />
                  </div>
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
        <div className="cart_clear btn">Clear shopping cart </div>
      </CartButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CartStyle = styled.div`
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
  }
`;

const CartButton = styled.div`
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
