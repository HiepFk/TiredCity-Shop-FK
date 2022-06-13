import React from "react";
import styled from "styled-components";

export default function Form() {
  return (
    <FormStyle>
      <div className="form_left">
        <div className="left_title">Newsletter</div>
        <div className="left_desc">
          Subscribe to our newsletter and get 20% off your first purchase
        </div>
      </div>
      <form className="form_right">
        <input
          type="email"
          required
          className="form_input"
          placeholder="Your email"
        />
        <button className="form_btn">Send</button>
      </form>
    </FormStyle>
  );
}

const FormStyle = styled.div`
  margin-top: 4rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: aliceblue;
  height: 10rem;
  width: 100%;
  .left_title {
    font-size: 2rem;
    width: 50%;
  }
  .form_input {
    width: 18rem;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    border: 2px solid transparent;
    transition: all 0.3s;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: white;
    &:focus {
      outline: none;
      border: 2px solid #55c57a;
    }
    &:focus:invalid {
      border: 2px solid #ff7730;
    }
  }
  .form_btn {
    width: 3rem;
    height: 2rem;
    border: 0;
    border-radius: 3px;
    background-color: rgba(255, 0, 0, 0.7);
    color: white;
    font-size: 1rem;
    cursor: pointer;
    box-shadow: 0 10px 10px 0px rgba(255, 0, 0, 0.5);
    margin-left: 1rem;
    transition: all 0.5s linear;
    &:hover {
      transform: translateX(0.5rem);
    }
  }
`;
