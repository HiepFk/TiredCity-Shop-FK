import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
function MyOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);
  return <div>MyOrder</div>;
}

export default MyOrder;
