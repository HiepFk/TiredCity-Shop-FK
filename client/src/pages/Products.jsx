import React, { useState } from "react";
import Filter from "../components/Filter";
import Sort from "../components/Sort/Sort";
import ListView from "../components/View/ListView";
import GridView from "../components/View/GridView";
import styled from "styled-components";
import { Tee, Hoodie, Sweater, Bag } from "../utils/data";

function Products() {
  const [list, setList] = useState(true);

  return (
    <Wrapper>
      <Filter />
      <Header>
        <Sort setList={setList} list={list} />
        {!list && (
          <GridView Tee={Tee} Hoodie={Hoodie} Sweater={Sweater} Bag={Bag} />
        )}
        {list && (
          <ListView Tee={Tee} Hoodie={Hoodie} Sweater={Sweater} Bag={Bag} />
        )}
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
