import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function ListView({ Tee, Hoodie, Sweater, Bag }) {
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
    <ListStyle className="list">
      {data.map((item) => {
        return (
          <div className="list_wrapper">
            <img src={item.src} alt="" className="list_img" />
            <div className="list_container">
              <div className="list_title">{item.title}</div>
              <div className="list_price">{item.price}</div>
              <div className="list_desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Incidunt, optio dolorum est Incidunt, optio dolorum est
                Incidunt, optio dolorum est
              </div>
              <Link to={"/products/hihi"}>
                <button className="list_btn">Detail</button>
              </Link>
            </div>
          </div>
        );
      })}
    </ListStyle>
  );
}
const ListStyle = styled.div`
  display: flex;
  flex-direction: column;
  .list_wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2rem;
  }
  .list_img {
    width: 15rem;
    transform: translateX(-3rem);
  }
  .list_title {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }
  .list_price {
    font-size: 1.25rem;
    color: brown;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  .list_btn {
    font-size: 0.7rem;
    color: white;
    background-color: #a74939;
    padding: 0.5rem 0.65rem;
    border: none;
    margin-top: 1rem;
    border-radius: 5px;
    letter-spacing: 0.2rem;
    cursor: pointer;
    transition: opacity 0.25s linear;
  }
  .list_btn:hover {
    opacity: 0.6;
  }
`;
const NoProduct = styled.div`
  font-weight: 600;
  font-size: 1.4rem;
  margin-top: 1rem;
`;

export default ListView;
