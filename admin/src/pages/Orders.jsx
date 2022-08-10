import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrder } from "../api/order";
import Loading from "../components/Loading";
import styled from "styled-components";
import { createAxios } from "../api/createInstance";
import { LoginSuccess } from "../redux/authSlice";

function Orders() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  let axiosJWT = createAxios(user, dispatch, LoginSuccess);
  const loading = useSelector((state) => state.product?.loading);
  const orders = useSelector((state) => state.order?.orders?.data?.orders);
  useEffect(() => {
    getAllOrder(dispatch, axiosJWT, user?.accessToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }
  if (!orders || orders.length === 0) {
    return <div>Chưa có đơn đặt hàng nào</div>;
  }
  return (
    <Wrapper>
      {orders.map((item) => {
        return (
          <Link
            to={`/orders/${item.id}`}
            state={item}
            className="container"
            key={item.id}
          >
            <div className=" desc">
              Người nhận : <span className="name">{item?.name}</span>
            </div>

            <div className="desc">
              Ngày đặt :
              <span className="name">
                {new Date(item?.time).toLocaleString()}
              </span>
            </div>

            <div className="desc">
              Trạng thái : <span className="name">{item?.status}</span>
            </div>
          </Link>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 5rem;
  width: 100%;
  padding-top: 2rem;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
  .container {
    color: black;
    padding: 2rem;
    height: 8rem;
    width: 20rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  .name {
    color: #ff4c4c;
  }
`;

export default Orders;
