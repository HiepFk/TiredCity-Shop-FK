import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { FiShoppingCart, FiUserPlus, FiUser } from "react-icons/fi";
import styled from "styled-components";
import { headerLink } from "../utils/links";
import { getTotal } from "../Api/cart";
import User from "./User";

function Header() {
  const dispatch = useDispatch();
  const { totalQty } = useSelector((state) => state.cart);
  const products = useSelector((state) => state.cart.products);
  const user = useSelector((state) => state.auth.user);

  const [hide, setHide] = useState(false);

  useEffect(() => {
    getTotal(dispatch);
  }, [dispatch, products]);

  return (
    <HeaderStyle className="header">
      <Link to={"/"} className="header_logo">
        <img src="/image/logo.webp" alt="" />
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
        <Link to={"/cart"} className="header_icons ">
          Cart
          {/* <span>{totalQty}</span> */}
          <div className="header_icon header_cart" totalQty={totalQty}>
            <FiShoppingCart />
          </div>
        </Link>
        {hide && <User setHide={setHide} />}

        {user ? (
          <div className="header_icons" style={{ width: "6.5rem" }}>
            <div
              className="header_icon"
              onClick={() => {
                setHide(!hide);
              }}
            >
              <FiUser />
            </div>
          </div>
        ) : (
          <Link
            to={"/login"}
            className="header_icons"
            style={{ width: "6.5rem" }}
          >
            Login
            <div className="header_icon">
              <FiUserPlus />
            </div>
          </Link>
        )}
      </div>
    </HeaderStyle>
  );
}

const HeaderStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  .header_links {
    display: flex;
  }
  .header_cart {
    position: relative;
  }
  .header_cart::before {
    content: attr(totalQty);
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    width: 1.25rem;
    height: 1.25rem;
    font-size: 0.85rem;
    font-weight: normal;
    background-color: #ff4c4c;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1.25rem;
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
  }
  .header_icon {
    font-weight: bold;
    margin-left: 0.3rem;
  }
  @media (max-width: 992px) {
    display: none;
  }
`;

export default Header;
