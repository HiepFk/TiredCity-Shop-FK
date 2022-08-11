import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllUser, deleteUser } from "../api/user";
import Loading from "../components/Loading";
import styled from "styled-components";
import Input from "../components/User/Input";
import Add from "../components/User/Add";
import { createAxios } from "../api/createInstance";
import { LoginSuccess } from "../redux/authSlice";
function Users() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  let axiosJWT = createAxios(user, dispatch, LoginSuccess);
  const loading = useSelector((state) => state.user?.loading);
  const users = useSelector((state) => state.user?.users?.data?.users);
  const [add, setAdd] = useState(false);
  useEffect(() => {
    getAllUser(dispatch, axiosJWT, user?.accessToken);
  }, [dispatch]);

  if (loading || !users) {
    return <Loading />;
  }

  return (
    <div className="left">
      <Input />
      <Wrapper>
        <div className="title">
          <div className="name">Customers</div>
          {add ? (
            <div className="btn_close" onClick={() => setAdd(!add)}>
              Close
            </div>
          ) : (
            <div className="btn_add" onClick={() => setAdd(!add)}>
              Add new
            </div>
          )}
        </div>
        <table>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>Email</th>
            <th>Number</th>
            <th>Role</th>
            <th>Action</th>
          </tr>

          {users.map((item, index) => {
            const { name, email, isAdmin, number, id } = item;
            return (
              <tr key={id}>
                <td>{index + 1}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{number}</td>
                <td>{isAdmin ? "Admin" : "User"}</td>
                <td>
                  <div className="btns">
                    <Link to={`/users/${id}`}>
                      <div className="btn btn_view">View</div>
                    </Link>
                    <div
                      className="btn btn_delete"
                      onClick={() =>
                        deleteUser(id, navigate, axiosJWT, user?.accessToken)
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
        {add && (
          <div className="add">
            <Add />
          </div>
        )}
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  padding: 2rem 5rem;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  .add {
    position: absolute;
    top: 2rem;
  }
  .title {
    margin-bottom: 2rem;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }
  .name {
    font-size: 2rem;
    opacity: 0.5;
    font-weight: bold;
  }
  .btn_add {
    padding: 0.25rem 0.5rem;
    color: green;
    font-size: 1.25rem;
    font-weight: bold;
    border: 2px dotted green;
    border-radius: 0.4rem;
    cursor: pointer;
  }
  .btn_close {
    padding: 0.25rem 0.5rem;
    color: red;
    font-size: 1.25rem;
    font-weight: bold;
    border: 2px dotted red;
    border-radius: 0.4rem;
    cursor: pointer;
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

export default Users;
