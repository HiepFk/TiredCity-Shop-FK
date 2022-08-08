import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { FiUserMinus } from "react-icons/fi";
import { logOutUser } from "../Api/auth";
function User({ setHide }) {
  const dispatch = useDispatch();

  return (
    <Wrapper onMouseLeave={() => setHide(false)}>
      <Link className="container" to={"/me"}>
        My account
      </Link>
      <Link className="container" to={"/myorder"}>
        My order
      </Link>
      <div className="container" onClick={() => logOutUser(dispatch)}>
        <FiUserMinus className="icon" />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: rgba(255, 255, 255);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 0rem 1rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  .container {
    color: black;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.2s linear;
    :hover {
      color: brown;
      transform: scale(1.1);
    }
  }
  .icon {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

export default User;
