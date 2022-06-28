import React, { useState } from "react";
import styled from "styled-components";

import { addUser } from "../../api/user";
import { useNavigate } from "react-router-dom";

function Add() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [adres, setAdress] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handeAddUser = (e) => {
    e.preventDefault();
    const user = {
      name,
      email,
      number,
      password,
      passwordConfirm,
      adres,
      isAdmin,
    };
    addUser(user, navigate);
  };
  return (
    <Wrapper>
      <div className="name">Khung thêm người dùng</div>

      <form action="" className="form">
        <div className="container">
          <label htmlFor="" className="title">
            Họ và tên
          </label>
          <input
            type="text"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="container">
          <label htmlFor="" className="title">
            Email
          </label>
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="container">
          <label htmlFor="" className="title">
            Nummber
          </label>
          <input
            type="text"
            className="input"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div className="container">
          <label htmlFor="" className="title">
            Address
          </label>
          <input
            type="text"
            className="input"
            value={adres}
            onChange={(e) => setAdress(e.target.value)}
          />
        </div>

        <div className="container">
          <label htmlFor="" className="title">
            Role
          </label>
          <p>
            <input
              type="radio"
              id="test1"
              name="radio-group"
              className="radio"
              onClick={() => setIsAdmin(true)}
            />
            <label for="test1">Admin</label>
          </p>
          <p>
            <input
              type="radio"
              id="test2"
              name="radio-group"
              className="radio"
              onClick={() => setIsAdmin(false)}
            />
            <label for="test2">User</label>
          </p>
        </div>
        <div className="container">
          <label htmlFor="" className="title">
            Password
          </label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="container">
          <label htmlFor="" className="title">
            Password Confirm
          </label>
          <input
            type="password"
            className="input"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
      </form>
      <div className="btn_wrapper">
        <button type="submit" className="btn" onClick={handeAddUser}>
          Thêm User
        </button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 5rem;
  width: 100%;
  padding-top: 2rem;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: flex;
  flex-direction: column;
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
    flex-direction: column;
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
    width: 15rem;
  }
  textarea {
    min-width: 50rem;
    min-height: 10rem;
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
  .img {
    width: 10rem;
    height: 10rem;
  }
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
`;

export default Add;