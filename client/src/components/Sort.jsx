import React from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { updateSort, setListView, setGridView } from "../Api/filter";
import styled from "styled-components";

function Sort() {
  const dispatch = useDispatch();
  const FilterProducts = useSelector((state) => state.filter.filtered_products);

  const listView = useSelector((state) => state.filter.listView);
  const sort = useSelector((state) => state.filter.sort);

  return (
    <SortStyle>
      <div className="sort_wrapper">
        <div className="sort_icons">
          <BsFillGridFill
            className={listView ? "sort_icon " : "sort_icon active"}
            onClick={() => setGridView(dispatch)}
          />
          <BsList
            className={!listView ? "sort_icon " : "sort_icon active"}
            onClick={() => setListView(dispatch)}
          />
        </div>
        <hr />
        <p>{FilterProducts.length} products found.</p>
        <hr />
        <form className="sort_form">
          <label htmlFor="sort">Sort by</label>
          <select
            name="sort"
            id="sort"
            className="sort_input"
            value={sort}
            onChange={(e) => updateSort(dispatch, e.target.value)}
          >
            <option value="price-lowest">price ( lowest )</option>
            <option value="price-highest">price ( highest )</option>
            <option value="name-a">name ( a-z )</option>
            <option value="name-z">name ( z-a )</option>
          </select>
        </form>
      </div>
    </SortStyle>
  );
}

const SortStyle = styled.div`
  margin-bottom: 1rem;
  width: 60rem;
  min-width: 53rem;
  @media (max-width: 768px) {
    margin-top: 2rem;
    width: 10rem !important;
    min-width: 5rem !important;
    hr {
      display: none;
    }
    .sort_wrapper {
      flex-direction: column;
      align-items: start !important;
    }
    .sort_icons,
    p {
      margin-bottom: 1rem;
    }
    .sort_icon {
      display: none;
    }
  }
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
  select {
    font-size: 1.25rem;
    font-weight: 550;
    text-transform: capitalize;
  }
  p {
    max-width: 10rem;
    font-weight: 600;
  }
  hr {
    height: 0.1rem;
    /* max-width: 20rem; */
    width: 7rem;
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
