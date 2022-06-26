import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaArrowRight } from "react-icons/fa";
import { login } from "../api/auth";
import styled from "styled-components";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.auth?.user);
  useEffect(() => {
    if (userLogin && userLogin?.data?.user?.isAdmin) {
      navigate("/");
    }
  }, [userLogin, navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handeSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    login(user, dispatch, navigate);
  };
  return (
    <Wrapper
      style={{
        background: `url(${"/wrapper.webp"}) no-repeat center/cover`,
      }}
    >
      <div className="login">
        <div className="title">Login</div>
        <form className="form" onSubmit={handeSubmit}>
          <div className="login_container">
            <label>
              <FaUser />
            </label>
            <input
              type="text"
              placeholder="Username"
              className="login_input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login_container">
            <label>
              <FaLock />
            </label>
            <input
              type="password"
              className="login_input"
              minLength="8"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn" type="submit">
            <FaArrowRight />
          </button>
        </form>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  label {
    color: black;
    margin-bottom: 1rem;
    cursor: pointer;
    width: 100%;
    transform: translateX(3rem);
  }
  .login {
    width: 25rem;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 10px;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
  }
  .title {
    text-align: center;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    font-size: 2.5rem;
    font-weight: 600;
  }
  .form {
    margin-bottom: 2rem;
  }
  .login_input {
    display: block;
    font-family: inherit;
    font-size: 1.5rem;
    color: inherit;
    padding: 0.5rem 1rem;
    border: none;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    transition: all 0.3s;
    border-radius: 4px;
    box-sizing: border-box;
    :focus {
      outline: none;
      border-bottom: 3px solid #55c57a;
    }
    :focus:invalid {
      border-bottom: 3px solid #ff7730;
    }
  }
  .login_container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 1rem;
  }
  .btn {
    margin-top: 1rem;
    width: 5rem;
    height: 4rem;
    border: 0;
    border-radius: 1rem;
    background-color: rgba(255, 0, 0, 0.7);
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    margin: 0 auto;
    margin-left: 8.5rem;
    box-shadow: 0 10px 10px 0px rgba(255, 0, 0, 0.5);
    transition: all 0.5s linear;
    :hover {
      transform: translateX(1rem);
    }
  }
`;
