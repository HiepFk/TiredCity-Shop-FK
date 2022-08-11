import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../api/user";
import { getUserOrder } from "../api/order";

import { useSelector, useDispatch } from "react-redux";
import Loading from "../components/Loading";
import Detail from "../components/User/Detail";
import { createAxios } from "../api/createInstance";
import { LoginSuccess } from "../redux/authSlice";
import Order from "../components/User/Order";
import Review from "../components/User/Review";
import styled from "styled-components";
function User() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.user);
  let axiosJWT = createAxios(auth, dispatch, LoginSuccess);
  const loading = useSelector((state) => state.user?.loading);
  const user = useSelector((state) => state.user?.user?.data?.user);
  const orders = useSelector((state) => state.order?.orders?.data?.orders);
  useEffect(() => {
    getUser(dispatch, id, axiosJWT, auth?.accessToken);
  }, [dispatch, id]);
  useEffect(() => {
    getUserOrder(dispatch, id, axiosJWT, auth?.accessToken);
  }, [dispatch, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return <div>Ko có người dùng này</div>;
  }
  return (
    <Wrapper>
      <div className="top">
        <Detail user={user} className="detail" />
        <div className="review">
          <Review reviews={user?.reviews} />
        </div>
      </div>
      <Order orders={orders} />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  padding: 2rem 5rem;
  width: 100%;
  .top {
    display: flex;
    width: 100%;
  }
  .review {
    margin-left: 5rem;
    width: 60%;
  }
`;
export default User;
