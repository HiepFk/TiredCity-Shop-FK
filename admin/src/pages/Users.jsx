import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { getAllUser } from "../api/user";
import Loading from "../components/Loading";
import styled from "styled-components";
import Input from "../components/User/Input";
import Add from "../components/User/Add";
function Users() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user?.loading);
  const users = useSelector((state) => state.user?.users.data.users);
  useEffect(() => {
    getAllUser(dispatch);
  }, [dispatch]);

  if (loading || !users) {
    return <Loading />;
  }

  return (
    <div className="left">
      <div className="check">
        <Input />
        <Wrapper className="right">
          {users.map((item) => {
            return (
              <Link
                to={`/users/${item.name}`}
                className="container"
                key={item._id}
              >
                <div className=" desc">
                  Name: <span className="name">{item.name}</span>{" "}
                </div>
                <div className="desc">
                  Id : <span>{item._id}</span>{" "}
                </div>
                <div className="desc">
                  Number : <span>{item.number}</span>
                </div>
                <div className="desc">
                  Role : <span>{item.isAdmin ? "Admin" : "User"}</span>
                </div>
              </Link>
            );
          })}
        </Wrapper>
      </div>
      <Add />
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2rem;
  .container {
    padding: 2rem;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin-right: 2rem;
    margin-left: 2rem;
    margin-bottom: 2rem;
    color: black;
    opacity: 0.8;
  }
  .desc {
    margin-bottom: 1rem;
    font-size: 1.25rem;
    font-weight: 600;
  }
  span {
    color: rgba(255, 0, 0, 0.7);
  }
`;

export default Users;
