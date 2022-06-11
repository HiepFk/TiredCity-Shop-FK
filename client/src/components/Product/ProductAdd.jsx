import React, { useState } from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa";

function ProductAdd({ color }) {
  const [mainColor, setMainColor] = useState(0);
  return (
    <>
      <Wrapper>
        <div className="product_colors">
          <span>Color : </span>
          <div>
            {color.map((item, index) => {
              return (
                <div
                  className={
                    mainColor === index
                      ? "product_color"
                      : "product_color active"
                  }
                  style={{ background: `${item}` }}
                  onClick={() => setMainColor(index)}
                >
                  {mainColor === index ? <FaCheck /> : null}
                </div>
              );
            })}
          </div>
        </div>
      </Wrapper>
      <Amount className="amount-btns">
        <button className="amount-btn" type="button">
          <FaMinus />
        </button>
        <h2 className="amount">1</h2>
        <button className="amount-btn" type="button">
          <FaPlus />
        </button>
      </Amount>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
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
    background: #222;
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
