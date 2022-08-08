import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signUp, loginUser } from "../Api/auth";
import Google from "../components/Google";
import styled from "styled-components";
import { FaArrowRight } from "react-icons/fa";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user?.data?.user);

  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const Login = (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    loginUser(data, dispatch, navigate);
    setEmail("");
    setPassword("");
  };
  const Sinup = (e) => {
    e.preventDefault();
    const newUser = {
      name: newName,
      email: newEmail,
      password: newPassword,
      passwordConfirm,
    };
    signUp(newUser, dispatch, navigate);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

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
          <form class="register_form" onSubmit={Sinup}>
            <div className="title">Sign Up</div>
            <input
              type="text"
              required
              placeholder="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <input
              type="email"
              required
              placeholder="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              required
              placeholder="Password Confirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <button>
              <FaArrowRight />
            </button>
            <p class="message" onClick={() => setLogin(!login)}>
              Already registered? Sign In
            </p>
            <Google title="Sign up with" />
          </form>
        ) : (
          <form class="login_form" onSubmit={Login}>
            <div class="title">Login</div>
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>
              <FaArrowRight />
            </button>
            <p class="message" onClick={() => setLogin(!login)}>
              Not registered? Create an account
            </p>
            <Google title="Login with" />

            <Link to="/forgot">
              <p class="message">Forgot password? Click here</p>
            </Link>
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
  overflow: hidden;
  .login_wrapper {
    overflow: hidden;
    width: calc(100% - 25rem);
    height: 35rem;
  }
  .login_img {
    width: 100%;
    height: 100%;
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
    width: 25rem;
    height: 35rem;
  }
  .none {
    display: none;
  }
  form {
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  input {
    margin-top: 1.5rem;
    display: block;
    font-family: inherit;
    font-size: 1rem;
    color: inherit;
    padding: 0.25rem 0.75rem;
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
    margin-top: 1.25rem;
    width: 4rem;
    height: 3rem;
    border: 0;
    border-radius: 1rem;
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
  p {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    cursor: pointer;
  }
  .title {
    font-size: 2rem;
    font-weight: 600;
    /* margin-top: 1.5rem; */
  }
  .message {
    color: black;
  }
  @media (max-width: 768px) {
    .login_wrapper {
      display: none;
    }
    .form {
      width: 100%;
    }
  }
`;

export default Login;
