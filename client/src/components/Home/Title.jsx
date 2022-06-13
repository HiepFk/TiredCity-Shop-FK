import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Title() {
  return (
    <Wrapper className="title">
      <div className="title_right">
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
        <div className="title_mo"></div>
        <img src="/image/about/4.webp" alt="" className="title_img small" />
        <img src="/image/about/5.webp" alt="" className="title_img big" />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 4rem;
  .title_right {
    // width: 100rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
  }
  .title_btn {
    background-color: brown;
    border-radius: 0.2rem;
    width: 9rem;
    color: white;
    font-size: 1.5rem;
    padding: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.25s linear;
    &:hover {
      opacity: 0.5;
      color: black;
    }
  }
  .title_right {
    width: 30rem;
  }
  .title_img {
    border-radius: 5px;
  }
  .title_mo {
    position: absolute;
    top: 15rem;
    right: 34.5rem;
    width: 10rem;
    height: 20rem;
    background-color: brown;
    z-index: 0;
    border-radius: 5px;
  }
  .small {
    position: absolute;
    z-index: 2;
    width: 15rem;
    top: 28.7rem;
    right: 35rem;
  }
  .big {
    width: 25rem;
    height: 30rem;
    z-index: 1;
  }
`;

export default Title;
