import React, { useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import styled from "styled-components";

function Review() {
  const arr = [1, 2, 3, 4, 5];
  const [index, setIndex] = useState(0);
  return (
    <ReviewStyle className="review">
      <div className="review_title">Create reivew</div>
      <div className="review_star">
        {arr.map((item) => {
          return (
            <BsFillStarFill
              key={item}
              className={index < item ? "star" : "star active"}
              onMouseEnter={() => setIndex(item)}
              //   onMouseOut={() => setIndex(0)}
              //   onMouseLeave={() => setIndex(0)}
              //   onClick={() => {
              //     setIndex(item);
              //     window.removeEventListener("onMouseLeave");
              //   }}
            />
          );
        })}
      </div>
      <button className="review_btn">Send</button>
    </ReviewStyle>
  );
}

const ReviewStyle = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  .review_title {
    font-weight: 600;
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  .review_star {
    display: flex;
  }
  .star {
    font-size: 1.5rem;
    margin-right: 0.5rem;
    cursor: pointer;
    color: gray;
  }
  .active {
    color: orange;
  }
  .review_btn {
    width: 5rem;
    margin-top: 1rem;
    background-color: brown;
    color: white;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    letter-spacing: 0.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 0.2rem;
    cursor: pointer;
    transition: opacity 0.25s linear;
    :hover {
      opacity: 0.6;
    }
  }
`;

export default Review;
