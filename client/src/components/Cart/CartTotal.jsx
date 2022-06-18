import React from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";
import { Link } from "react-router-dom";

function CartTotal() {
  const { totalCost } = useSelector((state) => state.cart);
  const me = useSelector((state) => state.auth.me);

  return (
    <Wrapper>
      <div>
        <article>
          <h5>
            Subtotal :<span>${totalCost}</span>
          </h5>
          <p>
            Shipping fee : <span>$5</span>
          </p>
          <hr />
          <h4>
            Order total :<span>${5 + totalCost}</span>
          </h4>
        </article>
        {!me ? (
          <button type="button" className="btn">
            Đặt hàng
          </button>
        ) : (
          <Link to={"/login"}>
            <button className="btn" type="button">
              Login
            </button>
          </Link>
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid black;
    border-radius: 5px;
    padding: 1.5rem 3rem;
  }
  hr {
    margin-top: 1rem;
    width: 100%;
    height: 0.1rem;
  }
  h5 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
  h4 {
    font-size: 1.5rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
    height: 2.5rem;
    background-color: brown;
    border: none;
    color: white;
    font-size: 1rem;
    letter-spacing: 0.1rem;
    transition: opacity 0.25s linear;
    cursor: pointer;
    :hover {
      opacity: 0.7;
    }
  }
`;
export default CartTotal;
