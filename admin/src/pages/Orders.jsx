import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrder, deleteOrder } from "../api/order";
import Loading from "../components/Loading";
import styled from "styled-components";
import { createAxios } from "../api/createInstance";
import { LoginSuccess } from "../redux/authSlice";

function Orders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <Wrapper className="left">
      <div className="name">Orders</div>
      <table>
        <tr>
          <th>STT</th>
          <th>Người Đặt</th>
          <th>Email</th>
          <th>Time</th>
          <th>Status</th>
          <th>Action</th>
        </tr>

        {orders.map((item, index) => {
          return (
            <tr key={item?.id}>
              <td>{index + 1}</td>
              <td>{item?.user?.name}</td>
              <td>{item?.user?.email}</td>
              <td>{new Date(item?.time).toLocaleString()}</td>
              <td>{item?.status}</td>
              <td>
                <div className="btns">
                  <Link to={`/orders/${item.id}`} state={item}>
                    <div className="btn btn_view">View</div>
                  </Link>
                  <div
                    className="btn btn_delete"
                    onClick={() =>
                      deleteOrder(
                        item.id,
                        navigate,
                        axiosJWT,
                        user?.accessToken
                      )
                    }
                  >
                    Delete
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
      </table>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 2rem 5rem;
  .name {
    font-size: 2rem;
    opacity: 0.5;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    margin: 0 auto;
    border: 1px dotted black;
  }
  td,
  th {
    text-align: left;
    padding: 8px;
  }
  tr {
    border: 1px solid #ddd;
  }
  td {
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
  }
  th {
    border-right: 1px solid #ddd;
  }
  .btns {
    display: flex;
    align-items: center;
    margin-right: -0.5rem;
    .btn {
      padding: 0.5rem 0.75rem;
      margin-right: 0.5rem;
      border-radius: 0.4rem;
      cursor: pointer;
    }
    .btn_view {
      border: 1.5px dotted green;
      color: green;
    }
    .btn_delete {
      color: red;
      border: 1.5px dotted red;
    }
  }
`;

export default Orders;
