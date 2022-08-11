import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../api/createInstance";
import { LoginSuccess } from "../../redux/authSlice";
import { updateUser } from "../../api/user";
import { useNavigate } from "react-router-dom";
function Detail({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.user);
  let axiosJWT = createAxios(auth, dispatch, LoginSuccess);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [number, setNumber] = useState(user.number);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [adres, setAdress] = useState(user.adress);
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      number,
      // password,
      // passwordConfirm,
      adres,
      isAdmin,
    };
    updateUser(dispatch, user._id, data, axiosJWT, auth?.accessToken);
  };
  return (
    <Wrapper>
      <div className="name">
        Thông tin người dùng : <span>{name}</span>
      </div>
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
              checked={isAdmin === true ? true : false}
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
              checked={isAdmin === false ? true : false}
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
        <button type="submit" className="btn" onClick={handleUpdateUser}>
          Cập nhật
        </button>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 2rem;
  width: 100%;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: flex;
  flex-direction: column;
  .name {
    font-weight: 600;
    font-size: 1.25rem;
    margin-bottom: 2rem;
    span {
      font-size: 1.75rem;
      color: rgba(255, 0, 0, 0.7);
      margin-left: 1rem;
    }
  }
  .form {
    display: flex;
    flex-direction: column;
  }
  .container {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
  }
  label {
    font-size: 1rem;
    font-weight: 600;
    margin-right: 1rem;
    width: 15rem;
  }
  .input {
    font-family: inherit;
    font-size: 1rem;
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
    width: 20rem;
    :focus {
      outline: none;
      border-bottom: 3px solid #55c57a;
    }
  }

  .btn {
    margin: 0 auto;
    padding: 0.5rem 1rem;
    border: 0;
    border-radius: 0.3rem;
    background-color: rgba(255, 0, 0, 0.7);
    color: white;
    font-size: 1.25rem;
    cursor: pointer;
    box-shadow: 0 10px 10px 0px rgba(255, 0, 0, 0.5);
  }
`;

export default Detail;
