import React, { useState } from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";
import styled from "styled-components";

function Sort({ setList, list }) {
  const [sort, setSort] = useState("");
  const updateSort = (e) => {
    e.preventDefault();
    setSort(e.target.value);
  };
  return (
    <SortStyle>
      <div className="sort_wrapper">
        <div className="sort_icons">
          <BsFillGridFill
            className={list ? "sort_icon " : "sort_icon active"}
            onClick={() => setList(false)}
          />
          <BsList
            className={!list ? "sort_icon " : "sort_icon active"}
            onClick={() => setList(true)}
          />
        </div>
        <hr />
        <p>15 products found.</p>
        <hr />
        <form className="sort_form">
          <label htmlFor="sort">Sort by</label>
          <select
            name="sort"
            id="sort"
            className="sort_input"
            value={sort}
            onChange={updateSort}
          >
            <option value="price-lowest">price (lowest)</option>
            <option value="price-highest">price (highest)</option>
            <option value="name-a">name (a-z)</option>
            <option value="name-z">name (z-a)</option>
          </select>
        </form>
      </div>
    </SortStyle>
  );
}

const SortStyle = styled.div`
  margin-bottom: 1rem;
  min-width: 50rem;
  .sort_wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
  label {
    margin-right: 0.5rem;
    width: 4rem;
    transform: translateY(0.25rem);
  }
  p {
    width: 10rem;
    font-weight: 600;
  }
  hr {
    height: 0.1rem;
    width: 20rem;
    margin-right: 2.25rem;
    margin-left: 2.25rem;
  }
  .sort_icons {
    display: flex;
    width: 5rem;
  }
  .sort_icon {
    font-size: 1.5rem;
    padding: 0.2rem;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid black;
    margin-right: 0.5rem;
  }
  .sort_input {
    font-size: 1rem;
    padding: 0.2rem 0.8rem;
    border: none;
    border: 3px solid transparent;
    border-radius: 4px;
  }
  .sort_form {
    display: flex;
  }
  .active {
    color: white;
    background-color: black;
  }
`;

export default Sort;
