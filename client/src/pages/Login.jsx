import React, { useState } from "react";
import styled from "styled-components";
import { FaArrowRight } from "react-icons/fa";

function Login() {
  const [login, setLogin] = useState(false);
  return (
    <Wrapper class="login_page page">
      <div className="login_wrapper">
        <img
          src="/image/about/login.webp"
          className={!login ? "login_img none" : "login_img "}
          alt=""
        />
        <img
          src="/image/about/signup.webp"
          className={login ? "login_img none" : "login_img "}
          alt=""
        />
      </div>
      <div class="form">
        {login ? (
          <form class="register_form ">
            <div className="title">Sign Up</div>
            <input type="text" required placeholder="Name" />
            <input type="email" required placeholder="Email" />
            <input type="password" required placeholder="Password" />
            <input type="password" required placeholder="Password Confirm" />
            <button>
              <FaArrowRight />
            </button>
            <p class="message" onClick={() => setLogin(!login)}>
              Already registered? Sign In
            </p>
          </form>
        ) : (
          <form class="login_form">
            <div class="title">Sign In</div>
            <input type="text" required placeholder="Username" />
            <input type="password" required placeholder="Password" />
            <button>
              <FaArrowRight />
            </button>
            <p class="message" onClick={() => setLogin(!login)}>
              Not registered? Create an account
            </p>
          </form>
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  .login_wrapper {
    overflow: hidden;
    width: calc(100% - 25rem);
    height: 35rem;
  }
  .login_img {
    width: 100%;
    height: 35rem;
    transition: transform 0.25s linear;
    cursor: pointer;
    transition: all 0.25s linear;
    :hover {
      transform: scale(1.05);
    }
  }
  .form {
    display: flex;
    flex-direction: row;
    overflow: hidden;
  }
  .none {
    display: none;
  }
  form {
    align-items: center;
    width: 25rem;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 35rem;
  }

  input {
    margin-top: 1.5rem;
    display: block;
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
    width: 17.5rem;
  }
  input:focus {
    outline: none;
    border-bottom: 3px solid #55c57a;
  }
  input:focus:invalid {
    border-bottom: 3px solid #ff7730;
  }
  button {
    margin-top: 1.5rem;
    width: 5rem;
    height: 4rem;
    border: 0;
    border-radius: 1rem;
    background-color: rgba(255, 0, 0, 0.7);
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    box-shadow: 0 10px 10px 0px rgba(255, 0, 0, 0.5);
    transition: all 0.5s linear;
  }
  button:hover {
    transform: translateX(1rem);
  }
  p {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    cursor: pointer;
  }
  .title {
    font-size: 2.5rem;
    font-weight: 600;
    margin-top: 1.5rem;
  }
`;

export default Login;
