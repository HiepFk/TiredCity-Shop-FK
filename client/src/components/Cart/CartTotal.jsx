import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { addOrder, clearCart } from "../../Api/cart";
function CartTotal({ products }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { totalCost, totalQty } = useSelector((state) => state.cart);
  const me = useSelector((state) => state.auth.user);
  const Order = (e) => {
    e.preventDefault();
    // const orders = [];
    // products.forEach((item) => {
    //   let order = { id: "", amount: "", size: "", color: "" };
    //   let _id = item.id;
    //   _id = _id.replace(item.color, "");
    //   _id = _id.replace(item.size, "");
    //   order = {
    //     product: _id,
    //     amount: item.amount,
    //     size: item.size,
    //     color: item.color,
    //   };
    //   orders.push(order);
    // });
    // console.log(orders);
    const data = {
      products,
      totalQty,
      totalCost,
      address: me?.data?.user?.adress,
    };
    // console.log(data);
    addOrder(dispatch, navigate, data);
    clearCart(dispatch);
  };

  return (
    <Wrapper>
      <div>
        <article>
          <h5>
            Subtotal :<span>${totalCost}</span>
          </h5>
          {totalCost >= 100 ? (
            <>
              <p>
                Shipping fee : <span>free</span>
              </p>
            </>
          ) : (
            <>
              <p>
                Shipping fee : <span>$5</span>
              </p>
            </>
          )}
          <hr />
          <h4>
            Order total :<span>${5 + totalCost}</span>
          </h4>
        </article>
        {me ? (
          <button type="button" className="btn" onClick={Order}>
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
  div {
    width: 25rem;
  }
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
