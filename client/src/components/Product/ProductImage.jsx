import React, { useState } from "react";
import styled from "styled-components";
function ProductImage({ imgs }) {
  const [main, setMain] = useState(0);

  return (
    <Wrapper>
      <img src={imgs[main]} alt="" className="img_main" />
      <div className="img_wrapper">
        {imgs.map((item, index) => {
          return (
            <img
              src={item}
              alt=""
              className={index === main ? "img_item active" : "img_item"}
              key={index}
              onClick={() => setMain(index)}
            />
          );
        })}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 25rem;
  margin-right: 4rem;
  .img_main {
    border: 3px solid #e0d9d7;
    margin-bottom: 0.5rem;
    border-radius: 5px;
  }
  .img_wrapper {
    max-width: 25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .img_item {
    width: 23%;
    border-radius: 5px;
    cursor: pointer;
  }
  .active {
    border: 1px solid black;
  }
`;

export default ProductImage;
