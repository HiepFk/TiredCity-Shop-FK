import React from "react";
import styled from "styled-components";

function Footer() {
  return (
    <Wrapper>
      <h5>
        &copy;{new Date().getFullYear()} by
        <span>HiepFK </span>
      </h5>
      <h5>All rights reserved</h5>
    </Wrapper>
  );
}
const Wrapper = styled.footer`
  position: absolute;
  left: 0;
  /* margin-top: 5rem; */
  height: 5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  text-align: center;
  font-size: 1.25rem;
  span {
    color: white;
    margin-left: 0.5rem;
    font-weight: bold;
  }
  h5 {
    color: white;
    margin: 0.1rem;
    font-weight: 400;
    text-transform: none;
    line-height: 1.25;
    margin-right: 0.5rem;
  }
  @media (min-width: 776px) {
    flex-direction: row;
  }
`;

export default Footer;
