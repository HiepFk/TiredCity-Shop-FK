import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Title() {
  return (
    <Wrapper className="title">
      <div className="title_left">
        <div className="title_title">Design Your Comfort Zone</div>
        <div className="title_desc">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at
          sed omnis corporis doloremque possimus velit! Repudiandae nisi odit,
          aperiam odio ducimus, obcaecati libero et quia tempora excepturi quis
          alias?
        </div>
        <Link to={"/products"} className="title_btn">
          Shop now
        </Link>
      </div>
      <div className="title_right">
        <img src="/image/about/4.webp" alt="" className="title_img small" />
        <img src="/image/about/5.webp" alt="" className="title_img big" />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 4rem;
  .title_right,
  .title_left {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .title_left {
    margin-right: 10rem;
  }
  .title_title {
    font-weight: bold;
    font-size: 3rem;
    margin-bottom: 2rem;
    width: 20rem;
  }
  .title_desc {
    font-weight: normal;
    margin-bottom: 2rem;
    line-height: 2;
    font-size: 1.25rem;
    opacity: 0.7;
    /* max-width: 45rem; */
  }
  .title_btn {
    background-color: brown;
    border-radius: 0.2rem;
    width: 9rem;
    color: white;
    font-size: 1.5rem;
    padding: 0.8rem;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    transition: all 0.25s linear;
    &:hover {
      opacity: 0.5;
      color: black;
    }
  }
  .title_right {
    position: relative;
  }
  .title_right:before {
    content: "";
    position: absolute;
    bottom: 0%;
    left: -8%;
    width: 10%;
    height: 80%;
    background-color: brown;
    z-index: 0;
    border-radius: 5px;
  }
  .title_img {
    border-radius: 5px;
  }
  .small {
    position: absolute;
    z-index: 2;
    width: 15rem;
    bottom: 0;
    left: 0;
    transform: translateX(-50%);
  }
  .big {
    width: 25rem;
    height: 30rem;
    z-index: 1;
    position: relative;
  }
  @media (max-width: 992px) {
    .title_right {
      display: none;
    }
    .title_title {
      font-size: 2.5rem;
    }

    .title_desc {
      font-size: 1rem;
      max-width: 35rem;
    }
    .title_btn {
      font-size: 1rem;
      width: 7rem;
    }
  }
`;

export default Title;
