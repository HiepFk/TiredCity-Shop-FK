import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../Api/auth";
import styled from "styled-components";
import { FaArrowRight } from "react-icons/fa";

function ForgotPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const handeSendEmail = (e) => {
    e.preventDefault();
    forgotPassword(email, dispatch);
  };
  return (
    <Wrapper>
      <form class="form" onSubmit={handeSendEmail}>
        <div class="title">Please input your email</div>
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button>
          <FaArrowRight />
        </button>
      </form>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10rem;

  .form {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    color: black;
    background-color: white;
    border-radius: 1rem;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }
  .title {
    font-size: 1.5rem;
    color: #55c57a;
  }
  input {
    margin-top: 1.5rem;
    display: block;
    font-family: inherit;
    font-size: 1rem;
    color: inherit;
    padding: 0.25rem 0.75rem;
    border: none;
    border: 2px solid #55c57a;
    transition: all 0.3s;
    border-radius: 4px;
    box-sizing: border-box;
    width: 17.5rem;
  }
  input:focus {
    outline: none;
    border-bottom: 2px solid #55c57a;
  }
  input:focus:invalid {
    border: 2px solid #ff7730;
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
`;
export default ForgotPassword;
