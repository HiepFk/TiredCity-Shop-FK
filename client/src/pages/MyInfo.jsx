import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UpdateMe } from "../Api/auth";

function MyInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const currentUser = user?.data?.user;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [adress, setAdress] = useState("");
  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handeUpdateInfo = async (e) => {
    e.preventDefault();
    const user = {
      name,
      email,
      adress,
      number,
    };
    console.log(user);
    UpdateMe(dispatch, user, "info");
  };

  const handeUpdatePassword = (e) => {
    e.preventDefault();
    const data = {
      passwordCurrent,
      password,
      passwordConfirm,
    };
    console.log(data);
    UpdateMe(dispatch, data, "password", navigate);
    setPassword("");
    setPasswordConfirm("");
    setPasswordCurrent("");
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    setName(currentUser?.name);
    setEmail(currentUser?.email);
    setNumber(currentUser?.number);
    setAdress(currentUser?.adress);
  }, [currentUser]);
  return (
    <Wrapper>
      <form action="" onSubmit={handeUpdateInfo}>
        <div className="form_title">Thông tin cá nhân :</div>
        <div className="form_wrapper">
          <div className="form_desc">Name :</div>
          <input
            type="text"
            className="form_input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form_wrapper">
          <div className="form_desc">Email :</div>
          <input
            type="email"
            className="form_input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form_wrapper">
          <div className="form_desc">Số điện thoại :</div>
          <input
            type="text"
            className="form_input"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div className="form_wrapper">
          <div className="form_desc">Địa chỉ : </div>
          <input
            type="text"
            className="form_input"
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
          />
        </div>
        <button className="btn">Cập nhập thông tin</button>
      </form>
      <form action="" onSubmit={handeUpdatePassword}>
        <div className="form_title">Thay đổi mật khẩu :</div>
        <div className="form_wrapper">
          <div className="form_desc">Mật khẩu hiện tại :</div>
          <input
            type="password"
            className="form_input"
            onChange={(e) => setPasswordCurrent(e.target.value)}
          />
        </div>
        <div className="form_wrapper">
          <div className="form_desc">Mật khẩu mới :</div>
          <input
            type="password"
            className="form_input"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form_wrapper">
          <div className="form_desc">Mật khẩu xác nhận:</div>
          <input
            type="password"
            className="form_input"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <button className="btn">Cập nhập mật khẩu</button>
      </form>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  /* flex-direction: column; */
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  form {
    display: flex;
    flex-direction: column;
  }
  .form_title {
    margin-top: 1rem;
    margin-left: 2.5rem;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  .form_wrapper {
    display: flex;
    margin-left: 3.5rem;
    margin-bottom: 1.5rem;
    align-items: center;
  }
  .form_desc {
    width: 10rem;
    font-size: 1rem;
    font-weight: 600;
  }
  .form_input {
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
    width: 20rem;
    :focus {
      outline: none;
      border: 3px solid #55c57a;
    }
    :focus:invalid {
      border: 3px solid #ff7730;
    }
  }
  button {
    margin-bottom: 1.5rem;
    width: 40%;
    margin-left: 8rem;
    padding: 0.5rem 1rem;
    height: 3rem;
    border: 0;
    border-radius: 0.5rem;
    background-color: rgba(255, 0, 0, 0.7);
    color: white;
    font-size: 1.25rem;
    cursor: pointer;
    box-shadow: 0 10px 10px 0px rgba(255, 0, 0, 0.5);
    transition: all 0.5s linear;
  }
  button:hover {
    transform: translateX(1rem);
  }
`;
export default MyInfo;
