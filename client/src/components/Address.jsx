import React, { useState } from "react";
import styled from "styled-components";
import { MdOutlineClose } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addOrder, clearCart } from "../Api/cart";
import { createAxios } from "../Api/createInstance";
import { LoginSuccess } from "../redux/authSlice";
function Address({ setHideAddress, products }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { totalCost, totalQty } = useSelector((state) => state.cart);
  const me = useSelector((state) => state.auth.user);
  let axiosJWT = createAxios(me, dispatch, LoginSuccess);
  const [name, setName] = useState(me?.name);
  const [number, setNumber] = useState(me?.number);
  const [address, setAddress] = useState(me?.adress);

  const Order = (e) => {
    e.preventDefault();
    const data = {
      products,
      totalQty,
      totalCost,
      address,
      name,
      number,
    };
    addOrder(dispatch, navigate, data, axiosJWT, me?.accessToken);
    clearCart(dispatch);
  };
  return (
    <Wrapper>
      <div className="form_close" onClick={() => setHideAddress(false)}>
        <MdOutlineClose />
      </div>
      <form action="" className="address_form">
        <div className="form_item">
          <label for="fistname">Người nhận</label>
          <input
            type="text"
            name="firstname"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form_item">
          <label for="number">Số điện thoại</label>
          <input
            type="text"
            name="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>

        <div className="form_item">
          <label for="address">Địa chỉ</label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button type="button" className="btn" onClick={Order}>
          Đặt hàng
        </button>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  @media (max-width: 768px) {
    .form_item {
      flex-direction: column;
    }
    input {
      width: 20rem !important;
    }
  }
  background: #ccc;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  border: 3px solid transparent;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  z-index: 1000;
  .address_form {
    display: flex;
    flex-direction: column;
  }
  .form_close {
    font-size: 2.5rem;
    position: absolute;
    right: 2rem;
    color: red;
    font-weight: bold;
    cursor: pointer;
    transition: color 0.15s linear;
    :hover {
      color: rgb(255, 0, 0, 0.5);
    }
  }
  .form_item {
    display: flex;
    align-items: center;
    padding: 1rem 1.5rem;
    margin-top: 2rem;
  }
  label {
    width: 10rem;
    font-size: 1.25rem;
  }
  input {
    display: block;
    font-family: inherit;
    font-size: 1rem;
    color: inherit;
    padding: 0.5rem 1rem;
    border: none;
    border: 3px solid transparent;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    transition: all 0.3s;
    border-radius: 4px;
    box-sizing: border-box;
    width: 30rem;
    :focus {
      outline: none;
      border: 3px solid #55c57a;
    }
    :focus:invalid {
      border: 3px solid #ff7730;
    }
  }
  .btn {
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
    height: 2.5rem;
    background-color: brown;
    border: none;
    color: white;
    font-size: 1rem;
    letter-spacing: 0.1rem;
    transition: opacity 0.25s linear;
    margin: 0 auto;
    width: 20%;
    margin-bottom: 0.5rem;
    cursor: pointer;
    :hover {
      opacity: 0.7;
    }
  }
`;

export default Address;
