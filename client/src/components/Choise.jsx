import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  FiShoppingCart,
  FiUserPlus,
  FiUser,
  FiUserMinus,
} from "react-icons/fi";
import { FaTimes, FaBars } from "react-icons/fa";
import styled from "styled-components";
import { headerLink } from "../utils/links";
import { getTotal } from "../Api/cart";
import { logOutUser } from "../Api/auth";

function Choise() {
  const dispatch = useDispatch();
  const { totalQty } = useSelector((state) => state.cart);
  const products = useSelector((state) => state.cart.products);
  const user = useSelector((state) => state.auth.user);

  const [choise, setChoise] = useState(false);

  useEffect(() => {
    getTotal(dispatch);
  }, [dispatch, products]);
  return (
    <Wrapper>
      <div className="header">
        <Link to={"/"} className="header_logo">
          <img src="/image/logo.webp" alt="" />
        </Link>
        <div className="btn_open" onClick={() => setChoise(true)}>
          <FaBars />
        </div>
      </div>

      <div className={!choise ? "choise" : "choise show"}>
        <div className="btn_open" onClick={() => setChoise(false)}>
          <FaTimes />
        </div>
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
          <Link to={"/cart"} className="header_icons ">
            Cart
            <div className="header_icon header_cart" totalqty={totalQty}>
              <FiShoppingCart />
            </div>
          </Link>
        </ul>
        <div className="header_user">
          {user ? (
            <div className="header_icons user_container">
              <Link className="container" to={"/me"}>
                <FiUser />
              </Link>
              <Link className="container" to={"/myorder"}>
                My order
              </Link>
              <div className="container" onClick={() => logOutUser(dispatch)}>
                <FiUserMinus />
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
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 90vw;
  li {
    margin-bottom: 1.5rem;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  .header_links {
    display: flex;
    flex-direction: column;
  }
  .header_cart {
    position: relative;
  }
  .header_cart::before {
    content: attr(totalqty);
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
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: black;
    &:hover {
      border-bottom: 3px solid #ff4c4c;
    }
  }
  .header_user {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
  }
  .container {
    color: black;
    margin-right: 1rem;
    margin-left: 1rem;
  }
  .header_icons {
    display: flex;
    align-items: center;
    margin-right: 1.5rem;
    font-size: 1.5rem;
    cursor: pointer;
    color: black;
  }
  .header_icon {
    font-weight: bold;
  }
  .btn_open {
    font-size: 2rem;
    cursor: pointer;
    color: #ff4c4c;
  }
  .choise {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    transition: all 0.25s linear;
    transform: translate(-100%);
    z-index: -1;
    padding: 2rem;
  }
  .show {
    transform: translate(0);
    z-index: 999;
  }
  @media (min-width: 992px) {
    display: none;
  }
`;
export default Choise;
