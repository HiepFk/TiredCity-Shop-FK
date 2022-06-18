import React from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa";

function ProductAdd({ setColor, color, setAmount, amount, setSize, size }) {
  const Size = ["S", "M", "L", "XL", "XXL"];
  const Color = ["white", "black"];
  return (
    <>
      <Wrapper>
        <div className="product_colors">
          <span>Color : </span>
          <div>
            {Color.map((item, index) => {
              return (
                <div
                  className={
                    color === item ? "product_color active1" : "product_color "
                  }
                  style={{ background: `${item}` }}
                  onClick={() => setColor(item)}
                  key={index}
                >
                  {color === item ? <FaCheck /> : null}
                </div>
              );
            })}
          </div>
        </div>
        <div className="product_colors">
          <span>Size : </span>
          <div>
            {Size.map((item, index) => {
              return (
                <div
                  className={
                    size === item ? "product_size active" : "product_size"
                  }
                  onClick={() => setSize(item)}
                  key={index}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      </Wrapper>
      <Amount className="amount-btns">
        <button className="amount-btn" type="button">
          <FaMinus
            onClick={() =>
              setAmount((amount) => {
                return amount - 1;
              })
            }
          />
        </button>
        <h2 className="amount">{amount}</h2>
        <button className="amount-btn" type="button">
          <FaPlus
            onClick={() =>
              setAmount((amount) => {
                return amount + 1;
              })
            }
          />
        </button>
      </Amount>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  .product_colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .product_color {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    svg {
      font-size: 0.75rem;
      color: red;
    }
  }
  .active1 {
    opacity: 1;
  }
  .product_size {
    color: black;
    width: 2rem;
    height: 2rem;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1.5px solid black;
    opacity: 0.6;
    font-size: 0.8rem;
  }
  .active {
    border: 1.5px solid red;
    color: red;
    opacity: 1;
    font-weight: 700;
  }
`;

const Amount = styled.div`
  display: grid;
  width: 140px;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  h2 {
    margin-bottom: 0;
  }
  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h2 {
    margin-bottom: 0;
  }
`;

export default ProductAdd;
