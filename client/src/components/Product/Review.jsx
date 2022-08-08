import React, { useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { createReivew } from "../../Api/auth";
import styled from "styled-components";
import { createAxios } from "../../Api/createInstance";
import { LoginSuccess } from "../../redux/authSlice";
function Review({ id }) {
  const dispatch = useDispatch();
  const me = useSelector((state) => state.auth.user);
  let axiosJWT = createAxios(me, dispatch, LoginSuccess);
  const arr = [1, 2, 3, 4, 5];
  const [rating, setRating] = useState(4.5);
  const [review, setReview] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      rating,
      review,
      product: id,
    };
    createReivew(data, dispatch, axiosJWT, me?.accessToken);
    setReview("");
    setRating(0);
  };
  return (
    <ReviewStyle className="review">
      <div className="review_title">Create reivew</div>
      <div className="review_star">
        {arr.map((item) => {
          return (
            <BsFillStarFill
              key={item}
              className={rating < item ? "star" : "star active"}
              onMouseEnter={() => setRating(item)}
            />
          );
        })}
      </div>
      <textarea
        className="input"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <button className="review_btn" onClick={handleSubmit}>
        Send
      </button>
    </ReviewStyle>
  );
}

const ReviewStyle = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0.5rem 1rem;
  textarea {
    width: 40rem;
    height: 10rem;
    margin-top: 1rem;
  }
  .input {
    font-family: inherit;
    font-size: 1.25rem;
    color: inherit;
    padding: 0.5rem 1rem;
    border: none;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    transition: all 0.3s;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #eee;
    margin-right: 1rem;
    :focus {
      outline: none;
      border-bottom: 3px solid #55c57a;
    }
  }
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
  @media (max-width: 768px) {
    textarea {
      width: 20rem !important;
    }
  }
`;

export default Review;
