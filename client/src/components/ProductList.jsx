import React, { useEffect } from "react";
import ListView from "../components/View/ListView";
import GridView from "../components/View/GridView";
import { useSelector, useDispatch } from "react-redux";
import { filterProduct, sortProduct, setFilterProduct } from "../Api/filter";
import styled from "styled-components";

function ProductList({ products = [] }) {
  const dispatch = useDispatch();

  const listView = useSelector((state) => state.filter.listView);
  const FilterProducts = useSelector((state) => state.filter.filtered_products);
  const { text, type, price, shipping } = useSelector(
    (state) => state.filter.filters
  );
  const sort = useSelector((state) => state.filter.sort);
  useEffect(() => {
    setFilterProduct(dispatch, products);
  }, [dispatch, products]);

  useEffect(() => {
    filterProduct(dispatch);
    sortProduct(dispatch);
  }, [dispatch, sort, type, text, price, shipping]);
  if (!FilterProducts) {
    return (
      <NoProduct className="page">
        Sorry , no products can't be found 😥
      </NoProduct>
    );
  }
  if (listView) {
    return <ListView products={FilterProducts} />;
  }
  return <GridView products={FilterProducts} />;
}
const NoProduct = styled.div`
  font-weight: 600;
  font-size: 1.4rem;
  margin-top: 1rem;
`;

export default ProductList;
