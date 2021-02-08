import {useState} from 'react';
import axios from "axios";
import {constants} from "../helpers/constants";
import {wait} from "../helpers/utils";
import {useSelector} from "react-redux";
import {getAuthState} from "../features/authSlice";

const useApi = (props) => {
  const [loading, setLoading] = useState();
  const authState = useSelector(getAuthState);

  const post = async (endPoint, data, config) => {
    setLoading(true);
    await wait(500);
    const res = await axios.post(constants.BASE_URL + endPoint, data, {
      timeout: 10000,
      timeoutErrorMessage: 'Server is not listening right now, Try again after sometime.',
      ...config
    });
    setLoading(false);
    return res;
  };

  const getWithAuthToken = async (endPoint, config) => {
    setLoading(true);
    await wait(500);
    const res = await axios.get(constants.BASE_URL + endPoint, {
      timeout: 10000,
      timeoutErrorMessage: 'Server is not listening right now, Try again after sometime.',
      headers: {
        'Authorization': 'Bearer ' + authState.token
      },
      ...config
    });
    setLoading(false);
    return res;
  };

  const postWithAuthToken = async (endPoint, data, config) => {
    setLoading(true);
    await wait(500);
    const res = await axios.post(constants.BASE_URL + endPoint, data, {
      timeout: 10000,
      timeoutErrorMessage: 'Server is not listening right now, Try again after sometime.',
      headers: {
        'Authorization': 'Bearer ' + authState.token
      },
      ...config
    });
    setLoading(false);
    return res;
  };

  const get = async (endPoint, config) => {
    setLoading(true);
    await wait(500);
    const res = await axios.get(constants.BASE_URL + endPoint, {
      timeout: 10000,
      timeoutErrorMessage: 'Server is not listening right now, Try again after sometime.',
      ...config
    });
    setLoading(false);
    return res;
  };

  return {get, getWithAuthToken, post, postWithAuthToken, loading};
};

export default useApi;
