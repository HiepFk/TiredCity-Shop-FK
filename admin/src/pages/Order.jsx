import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { updateOrder, deleteOrder } from "../api/order";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../api/createInstance";
import { LoginSuccess } from "../redux/authSlice";
function Order() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  let axiosJWT = createAxios(user, dispatch, LoginSuccess);
  const item = location.state;
  const [status, setStatus] = useState(item?.status);
  const handeUpdateOrder = (e) => {
    e.preventDefault();
    const data = {
      status,
    };
    updateOrder(dispatch, item.id, data, axiosJWT, user?.accessToken);
  };
  return (
    <Wrapper className="left">
      <CartStyle key={item.id}>
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
        <div className="cart_info">
          <form action="" className="form">
            <div className="container">
              <label htmlFor="" className="title">
                Trạng thái :
              </label>
              <input
                type="text"
                className="input"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
            <div className="container">
              <label htmlFor="" className="title">
                Tổng tiền
              </label>
              <input className="input" value={item.totalCost} />
            </div>
            <div className="container">
              <label htmlFor="" className="title">
                Người nhận
              </label>
              <input type="text" className="input" value={item.name} />
            </div>
            <div className="container">
              <label htmlFor="" className="title">
                Địa chỉ :
              </label>
              <input type="text" className="input" value={item.address} />
            </div>
            <div className="container">
              <label htmlFor="" className="title">
                Number
              </label>
              <input type="text" className="input" value={item.number} />
            </div>
            <div className="container">
              <label htmlFor="" className="title">
                Thời gian đặt
              </label>
              <input type="text" className="input" value={item.time} />
            </div>
            <div className="container">
              <label htmlFor="" className="title">
                Chủ tài khoản
              </label>
              <input type="text" className="input" value={item.user.name} />
            </div>
            <div className="container">
              <label htmlFor="" className="title">
                Email
              </label>
              <input type="text" className="input" value={item.user.email} />
            </div>
            <div className="btn_wrapper">
              <button className="btn" onClick={handeUpdateOrder}>
                Cập nhật
              </button>
              <button
                className="btn"
                onClick={() =>
                  deleteOrder(item.id, navigate, axiosJWT, user?.accessToken)
                }
              >
                Xóa
              </button>
            </div>
          </form>
        </div>
      </CartStyle>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  padding: 5rem;
  width: 100%;
  padding-top: 2rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  .btn {
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    border: 0;
    border-radius: 0.3rem;
    background-color: rgba(255, 0, 0, 0.7);
    color: white;
    font-size: 1.25rem;
    cursor: pointer;
    margin: 0 auto;
    margin-left: 8.5rem;
    box-shadow: 0 10px 10px 0px rgba(255, 0, 0, 0.5);
  }
  hr {
    margin-bottom: 1rem;
  }
  .name {
    font-weight: 600;
    font-size: 1.5rem;
    margin-bottom: 3rem;
  }
  span {
    font-size: 2rem;
    color: rgba(255, 0, 0, 0.7);
    margin-left: 1rem;
  }
  .form {
    display: flex;
    flex-wrap: wrap;
  }
  .container {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    margin-left: 2.5rem;
    margin-right: 3.5rem;
  }
  label {
    font-size: 1.25rem;
    font-weight: 600;
    margin-right: 1rem;
    width: 10rem;
  }
  .input {
    font-family: inherit;
    font-size: 1.25rem;
    color: inherit;
    padding: 0.5rem 1rem;
    border: none;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    transition: all 0.3s;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #eee;
    margin-right: 1rem;
    :focus {
      outline: none;
      border-bottom: 3px solid #55c57a;
    }
  }
`;

const CartStyle = styled.div`
  margin-bottom: 2rem;
  hr {
    margin-bottom: 1rem;
  }
  .cart_info {
    display: flex;
    flex-wrap: wrap;
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

export default Order;
