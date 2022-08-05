import React from "react";
import styled from "styled-components";
import { signInWithGoogle } from "../Api/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function Google({ title }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div
        className="btn_gg"
        onClick={() => signInWithGoogle(dispatch, navigate)}
      >
        <div className="title_mini">{title}</div>
        <img src="/image/google.png" alt="" className="img" />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .btn_gg {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    padding: 1rem;
    border-radius: 1rem;
    cursor: pointer;
    .title_mini {
      font-size: 1rem;

      margin-right: 0.5rem;
    }
    img {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
`;

export default Google;
