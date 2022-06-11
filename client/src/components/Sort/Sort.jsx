import React, { useState } from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";

import "./app.scss";
function Sort({ setList, list }) {
  //   const [list, setList] = useState(true);
  const [sort, setSort] = useState("");
  const updateSort = (e) => {
    e.preventDefault();
    setSort(e.target.value);
  };
  return (
    <div className="sort">
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
    </div>
  );
}

export default Sort;
