import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";

function GridView({ Tee, Hoodie, Sweater, Bag }) {
  const data = Tee.concat(Hoodie, Sweater, Bag);
  // const data = null;
  if (!data) {
    return (
      <NoProduct className="page">
        Sorry , no products can't be found 😥
      </NoProduct>
    );
  }
  return (
    <GridStyle className="page">
      {data.map((item) => {
        return (
          <div className="product_mini" key={item.id}>
            <div className="product_container">
              <img src={item.src} alt="" className="product_img" />
              <Link className="product_wap" to={"/products/:hihi"}>
                <FaSearch className="product_icon" />
              </Link>
            </div>
            <div className="product_desc">
              <div className="product_name">{item.title}</div>
              <div className="product_price">{item.price}</div>
            </div>
          </div>
        );
      })}
    </GridStyle>
  );
}

const GridStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 40px;
`;
const NoProduct = styled.div`
  font-weight: 600;
  font-size: 1.4rem;
  margin-top: 1rem;
`;

export default GridView;
