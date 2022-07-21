import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { getAllProduct } from "../Api/product";
import { clearFilter } from "../Api/filter";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import ProductList from "../components/ProductList";
import Loading from "../components/Loading";

function Products() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.product?.loading);
  const products = useSelector(
    (state) => state.product?.products?.data?.products
  );

  useEffect(() => {
    clearFilter(dispatch);
    getAllProduct(dispatch);
  }, [dispatch]);

  if (loading || !products) {
    return <Loading />;
  }
  return (
    <Wrapper>
      <Filter />
      <Header>
        <Sort />
        <ProductList products={products} />
      </Header>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  padding-top: 4rem;
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const Header = styled.div`
  flex-direction: column;
  display: flex;
  margin-left: 5rem;
  width: 100%;
  @media (max-width: 768px) {
    margin-left: 0rem;
  }
`;

export default Products;
