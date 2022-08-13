import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { updateOrder } from "../api/order";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../api/createInstance";
import { LoginSuccess } from "../redux/authSlice";
function Order() {
  const location = useLocation();
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
                    <div>{name}</div>
                    <div>Color : {color}</div>
                    <div>Size : {size}</div>
                  </div>
                </div>
              </td>
              <td>${price}</td>
              <td>{amount}</td>
              <td>${price * amount}</td>
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
            <input className="input" value={item?.totalCost} />
          </div>
          <div className="container">
            <label htmlFor="" className="title">
              Người nhận
            </label>
            <input type="text" className="input" value={item?.name} />
          </div>
          <div className="container">
            <label htmlFor="" className="title">
              Địa chỉ :
            </label>
            <input type="text" className="input" value={item?.address} />
          </div>
          <div className="container">
            <label htmlFor="" className="title">
              Number
            </label>
            <input type="text" className="input" value={item?.number} />
          </div>
          <div className="container">
            <label htmlFor="" className="title">
              Thời gian đặt
            </label>
            <input
              type="text"
              className="input"
              value={new Date(item?.time).toLocaleString()}
            />
          </div>
          <div className="container">
            <label htmlFor="" className="title">
              Chủ tài khoản
            </label>
            <input type="text" className="input" value={item?.user?.name} />
          </div>
          <div className="container">
            <label htmlFor="" className="title">
              Email
            </label>
            <input type="text" className="input" value={item?.user?.email} />
          </div>
        </form>
        <button className="btn" onClick={handeUpdateOrder}>
          Cập nhật
        </button>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  padding: 2rem 5rem;

  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    margin: 0 auto;
    border: 1px dotted black;
    margin-bottom: 2rem;
  }
  td,
  th {
    text-align: left;
    padding: 8px;
  }
  tr {
    border: 1px solid #ddd;
  }
  td {
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
  }
  th {
    border-right: 1px solid #ddd;
  }

  .cart_item {
    display: flex;
    align-items: center;
    .cart_img {
      width: 5rem;
      margin-right: 2rem;
    }
  }
  .btn {
    padding: 0.5rem 1rem;
    border: 0;
    border-radius: 0.3rem;
    background-color: rgba(255, 0, 0, 0.7);
    color: white;
    font-size: 1.25rem;
    cursor: pointer;
    margin: 0 auto;
    box-shadow: 0 10px 10px 0px rgba(255, 0, 0, 0.5);
  }

  .form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .container {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  label {
    font-size: 1rem;
    font-weight: 600;
    margin-right: 1rem;
    width: 10rem;
  }
  .input {
    font-family: inherit;
    font-size: 1rem;
    color: inherit;
    padding: 0.25rem 0.5rem;
    border: none;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    transition: all 0.3s;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #eee;
    margin-right: 1rem;
    width: 20rem;
    :focus {
      outline: none;
      border-bottom: 3px solid #55c57a;
    }
  }
`;

export default Order;
