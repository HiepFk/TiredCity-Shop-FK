import React from "react";
import styled from "styled-components";
function Loading() {
  const Img = styled.img`
    display: block;
    margin-left: auto;
    margin-right: auto;
  `;
  return (
    <div className="body_left">
      <Img src="/image/loading.gif" alt="loading" />;
    </div>
  );
}

export default Loading;
