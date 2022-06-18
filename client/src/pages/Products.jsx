import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { getAllProduct } from "../Api/product";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import ListView from "../components/View/ListView";
import GridView from "../components/View/GridView";
import Loading from "../components/Loading";
import { SetFilterProduct } from "../redux/filterSlice";

import { filterProduct, sortProduct, clearFilter } from "../Api/filter";

function Products() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.product?.loading);
  const listView = useSelector((state) => state.filter.listView);
  const products = useSelector(
    (state) => state.product?.products?.data?.products
  );
  const FilterProducts = useSelector((state) => state.filter.filtered_products);

  const { text, type, price, shipping } = useSelector(
    (state) => state.filter.filters
  );
  const sort = useSelector((state) => state.filter.sort);

  useEffect(() => {
    clearFilter(dispatch);
    getAllProduct(dispatch);
    dispatch(SetFilterProduct(products));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    filterProduct(dispatch);
    sortProduct(dispatch);
  }, [dispatch, sort, type, text, price, shipping]);

  if (loading || !products) {
    return <Loading />;
  }
  return (
    <Wrapper>
      <Filter />
      <Header>
        <Sort length={FilterProducts.length} />
        {!listView && <GridView products={FilterProducts} />}
        {listView && <ListView products={FilterProducts} />}
      </Header>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  padding-top: 4rem;
  display: flex;
`;
const Header = styled.div`
  flex-direction: column;
  display: flex;
  margin-left: 5rem;
`;

export default Products;
