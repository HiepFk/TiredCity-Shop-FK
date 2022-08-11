import React from "react";
import styled from "styled-components";

function Review({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <div>Người dùng chưa có đánh giá nào</div>;
  }
  return (
    <Wrapper>
      <div className="title">All reviews : </div>
      <table>
        <tr>
          <th>STT</th>
          <th>Image</th>
          <th>Name</th>
          <th>Rating</th>
          <th>Review</th>
        </tr>
        {reviews.map((item, index) => {
          return (
            <tr>
              <td>{index + 1}</td>
              <td>
                <div>
                  <img src={item?.product?.imageCover} alt="" />
                </div>
              </td>
              <td>{item?.product?.name}</td>
              <td>{item?.rating}</td>
              <td>{item?.review}</td>
            </tr>
          );
        })}
      </table>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 2rem;
  width: 100%;
  .title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1.25rem;
  }
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  td,
  th {
    text-align: left;
    padding: 8px;
  }
  tr {
    border: 1px solid #ddd;
  }

  img {
    width: 5rem;
    transform: translateX(-1rem);
  }
`;
export default Review;
