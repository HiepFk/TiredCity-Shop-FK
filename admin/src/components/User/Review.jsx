import React from "react";
import styled from "styled-components";

function Review({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <div>Người dùng chưa có đánh giá nào</div>;
  }
  return (
    <Wrapper>
      {reviews.map((item) => {
        return (
          <div className="container" key={item.id}>
            <div className=" desc">
              Name: <span className="name">{item?.product?.name}</span>{" "}
            </div>

            <div className="desc">
              Rating : <span>{item.rating}</span>{" "}
            </div>

            <div className="desc">
              Review : <span>{item.review}</span>
            </div>
          </div>
        );
      })}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  padding: 5rem;
  padding-top: 2rem;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: flex;
  flex-wrap: wrap;
  .container {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    padding: 0.5rem 1rem;
  }
`;
export default Review;
