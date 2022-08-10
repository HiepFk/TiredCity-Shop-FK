import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../api/user";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../components/Loading";
import Detail from "../components/User/Detail";
import { createAxios } from "../api/createInstance";
import { LoginSuccess } from "../redux/authSlice";
function User() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.user);
  let axiosJWT = createAxios(auth, dispatch, LoginSuccess);
  const loading = useSelector((state) => state.user?.loading);
  const user = useSelector((state) => state.user?.user?.data?.user);
  useEffect(() => {
    getUser(dispatch, id, axiosJWT, auth?.accessToken);
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
  return <Detail user={user} />;
}

export default User;
