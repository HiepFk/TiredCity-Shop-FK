import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTotal } from "../Api/cart";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CartItem from "../components/Cart/CartItem";
import CartTotal from "../components/Cart/CartTotal";
function Cart() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);

  useEffect(() => {
    getTotal(dispatch);
  }, [dispatch, products]);

  if (products.length === 0) {
    return (
      <Empty className="page">
        <div className="empty_title">Your cart is empty</div>
        <Link to={"/products"}>
          <button className="empty_btn">Fill it</button>
        </Link>
      </Empty>
    );
  }

  return (
    <div className="page">
      <CartItem data={products} />
      <CartTotal />
    </div>
  );
}
const Empty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 7.3rem;
  .empty_title {
    font-weight: 700;
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  .empty_btn {
    font-size: 1rem;
    background-color: #af6153;
    border-radius: 5px;
    border: none;
    padding: 0.6rem 1.25rem;
    color: white;
    cursor: pointer;
    transition: opacity 0.25s linear;
    letter-spacing: 0.15rem;
  }
  .empty_btn:hover {
    opacity: 0.6;
  }
`;
export default Cart;
