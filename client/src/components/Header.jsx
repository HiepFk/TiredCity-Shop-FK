import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiUserPlus, FiUserMinus } from "react-icons/fi";
import styled from "styled-components";
import { headerLink } from "../utils/links";
function Header() {
  const [user, setUser] = useState(false);
  const [items, setItems] = useState(10);
  return (
    <HeaderStyle>
      <Link to={"/"} className="header_logo">
        <img src="./image/logo.webp" alt="" />
      </Link>
      <ul className="header_links">
        {headerLink.map((item) => {
          return (
            <li key={item.id}>
              <Link to={item.url} className="header_link">
                {item.text}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="header_user">
        <Link to={"/cart"} className="header_icons">
          Cart
          <span>{items}</span>
          <div className="header_icon">
            <FiShoppingCart />
          </div>
        </Link>
        {user ? (
          <>
            <div className="header_icons " style={{ width: "6.5rem" }}>
              Logout
              <div className="header_icon">
                <FiUserMinus />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="header_icons" style={{ width: "6.5rem" }}>
              Login
              <div className="header_icon">
                <FiUserPlus />
              </div>
            </div>
          </>
        )}
      </div>
    </HeaderStyle>
  );
}

const HeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  /* position: sticky;
  top: 1rem; */
  .header_links {
    display: flex;
  }

  .header_link {
    font-size: 1rem;
    margin-right: 2rem;
    color: black;
    &:hover {
      border-bottom: 3px solid #ff4c4c;
    }
  }
  .header_user {
    display: flex;
  }
  .header_icons {
    display: flex;
    margin-right: 1.5rem;
    font-size: 1.5rem;
    cursor: pointer;
    color: black;
    span {
      background-color: #ff4c4c;
      color: #fff;
      position: absolute;
      width: 20px;
      height: 20px;
      top: 1.5rem;
      right: 21rem;
      text-align: center;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100%;
    }
  }
  .header_icon {
    font-weight: bold;
    margin-left: 0.3rem;
  }
`;

export default Header;
