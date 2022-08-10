import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../api/auth";
import { navbar } from "../utils/link";

function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  return (
    <Wrapper className="right">
      <img
        src="https://bizweb.dktcdn.net/100/396/591/themes/822056/assets/logo.png?1652709865315"
        alt=""
        className="img"
      />
      <div className="name">
        Xin chào <span>{user?.name}</span>
      </div>

      <div className="icon_wrapper">
        {navbar.map((item) => {
          return (
            <Link to={item.link} className="item" key={item.id}>
              {item.icon}
              <div className="title">{item.title}</div>
            </Link>
          );
        })}
      </div>

      <div className="btn" onClick={() => logout(dispatch)}>
        Logout
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 15rem;
  padding: 1rem;
  background-color: #fff;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
  position: relative;
  transition: all 0.25s linear;
  .name {
    margin-top: 1.5rem;
    span {
      font-size: 1.5rem;
      font-weight: bold;
      color: rgba(255, 0, 0, 0.7);
    }
  }
  .img {
    width: 8rem;
  }
  .icon_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 2rem;
  }
  .item {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
  }
  .icon {
    width: 2rem;
    color: rgba(255, 0, 0, 0.7);
    font-size: 1rem;
  }
  .title {
    color: black;
    font-weight: normal;
  }
  .btn {
    position: absolute;
    bottom: 2rem;
    border: 0;
    padding: 0.5rem 0.8rem;
    border-radius: 0.5rem;
    background-color: rgba(255, 0, 0, 0.7);
    color: white;
    font-size: 1.25rem;
    cursor: pointer;
    box-shadow: 0 10px 10px 0px rgba(255, 0, 0, 0.5);
    transition: all 0.25s linear;
    :hover {
      transform: translateX(0.5rem);
    }
  }
`;

export default Navbar;
