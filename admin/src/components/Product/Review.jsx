import React from "react";
import styled from "styled-components";

function Review({ reviews }) {
  return (
    <Wrapper>
      <div className="title">All reviews : </div>
      <table>
        <tr>
          <th>STT</th>
          <th>Name</th>
          <th>Email</th>
          <th>Rating</th>
          <th>Review</th>
        </tr>
        {reviews.map((item, index) => {
          return (
            <tr>
              <td>{index + 1}</td>
              <td>{item?.user?.name}</td>
              <td>{item?.user?.email}</td>
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
`;
export default Review;
