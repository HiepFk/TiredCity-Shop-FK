import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrder } from "../Api/cart";
function MyOrder({ data = [] }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const order = useSelector((state) => state.cart.order?.data?.order);
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    getMyOrder(dispatch);
  }, [dispatch]);

  console.log(order[0]);

  if (order === null) {
    return (
      <Empty>
        <div className="empty_title">You never order before</div>
        <Link to={"/products"}>
          <button className="empty_btn">Fill it</button>
        </Link>
      </Empty>
    );
  }
  return (
    <Wrapper>
      {order.map((item, index) => {
        return (
          <CartStyle key={index}>
            <div className="cart_info">
              <p>Ngày đặt : {new Date(item?.time).toLocaleString()}</p>
              <p>Trạng thái : {item?.status}</p>
              <p>Số lượng : {item?.totalQty}</p>
              <p>Tổng tiền : ${item?.totalCost}</p>
            </div>
            <table>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
              {item?.products.map((item) => {
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
                        </div>
                      </div>
                    </td>
                    <td className="cart_price">${price}</td>
                    <td>
                      <div className="cart_quantity">
                        <div className="cart_index">{amount}</div>
                      </div>
                    </td>
                    <td className="cart_total">${price * amount}</td>
                  </tr>
                );
              })}
            </table>
          </CartStyle>
        );
      })}
      <hr />
      <CartButton>
        <Link to={"/products"}>
          <div className="cart_back btn">Continue shopping </div>
        </Link>
      </CartButton>
    </Wrapper>
  );
}
const Empty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 10rem;
  .empty_title {
    font-weight: 700;
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  .empty_btn {
    font-size: 1rem;
    background-color: #af6153;
    border-radius: 5px;
    border: none;
    padding: 0.6rem 1.25rem;
    color: white;
    cursor: pointer;
    transition: opacity 0.25s linear;
    letter-spacing: 0.15rem;
  }
  .empty_btn:hover {
    opacity: 0.6;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  hr {
    margin-bottom: 1rem;
  }
`;

const CartStyle = styled.div`
  margin-top: 4rem;
  margin-bottom: 2rem;
  hr {
    margin-bottom: 1rem;
  }
  .cart_info {
    display: flex;
    justify-content: space-between;
    p {
      font-weight: 700;
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }
  }
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

export default MyOrder;
