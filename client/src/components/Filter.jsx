import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { updateFilter, clearFilter } from "../Api/filter";
const Filters = () => {
  const dispatch = useDispatch();
  const { text, type, min_price, max_price, price, shipping } = useSelector(
    (state) => state.filter.filters
  );

  const products = useSelector(
    (state) => state.product?.products?.data?.products
  );

  let types = [...new Set(products.map((item) => item.type))];
  types.push("all");
  types.reverse();

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="Search"
              className="search-input"
              value={text}
              onChange={(e) => updateFilter(dispatch, e)}
            />
          </div>

          <div className="form-control">
            <h5>Type</h5>
            <div>
              {types.map((c, index) => {
                return (
                  <button
                    key={index}
                    type="button"
                    name="type"
                    className={`${c === type ? "active" : null}`}
                    onClick={(e) => updateFilter(dispatch, e)}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-control">
            <h5>Price</h5>
            <p className="price">${price}</p>
            <input
              type="range"
              name="price"
              onChange={(e) => updateFilter(dispatch, e)}
              min={min_price}
              max={max_price}
              value={price}
            />
          </div>

          <div className="form-control shipping">
            <label htmlFor="shipping">Free shipping</label>
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              onChange={(e) => updateFilter(dispatch, e)}
              checked={shipping}
            />
          </div>
        </form>

        <button
          type="button"
          className="clear-btn"
          onClick={() => clearFilter(dispatch)}
        >
          Clear filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
      font-size: 1.25rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background-color: #f1f5f8;
    border-radius: 5px;
    border-color: transparent;
    &:focus {
      outline: none;
      border: 2px solid #55c57a;
    }
  }
  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    letter-spacing: 1px;
    color: black;
    cursor: pointer;
    font-size: 1rem;
    text-transform: capitalize;
  }
  .active {
    border-color: rgba(255, 0, 0, 0.7);
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    width: 10rem;
  }
  .clear-btn {
    padding: 0.5rem 1rem;
    border: 0;
    border-radius: 3px;
    background-color: rgba(255, 0, 0, 0.7);
    color: white;
    font-size: 1rem;
    cursor: pointer;
    box-shadow: 0 10px 10px 0px rgba(255, 0, 0, 0.5);
    transition: all 0.5s linear;
    &:hover {
      transform: translateX(0.5rem);
    }
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
