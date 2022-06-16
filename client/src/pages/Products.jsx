import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { getAllProduct } from "../Api/product";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import ListView from "../components/View/ListView";
import GridView from "../components/View/GridView";
import Loading from "../components/Loading";

function Products() {
  const [list, setList] = useState(true);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.product?.loading);
  const products = useSelector(
    (state) => state.product?.products?.data?.products
  );

  useEffect(() => {
    getAllProduct(dispatch);
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <Filter />
      <Header>
        <Sort setList={setList} list={list} length={products.length} />
        {!list && <GridView products={products} />}
        {list && <ListView products={products} />}
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
