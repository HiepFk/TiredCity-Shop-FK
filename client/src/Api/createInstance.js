import axios from "axios";
import jwt_decode from "jwt-decode";
import { ShowAlert, HideAlert } from "../redux/alertSlice";
const link = process.env.REACT_APP_API_LINK;

const ErrorMessage = (dispatch, error) => {
  if (error.response.data) {
    dispatch(ShowAlert(error.response.data));
    const timeoutID = window.setTimeout(() => {
      dispatch(HideAlert());
    }, 3000);
    return () => window.clearTimeout(timeoutID);
  }
};

const refreshToken = async (dispatch) => {
  try {
    const res = await axios.post(`${link}/v1/user/refresh`, {
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    ErrorMessage(dispatch, err);
  }
};

export const createAxios = (user, dispatch, stateSuccess) => {
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();

      const decodedToken = jwt_decode(user.accessToken);

      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken(dispatch);

        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
        };
        dispatch(stateSuccess(refreshUser));
        config.headers["token"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};
