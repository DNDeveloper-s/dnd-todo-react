import { useEffect } from "react";
import { SET_MINUTE } from "../features/globalSlice";
import { useDispatch } from "react-redux";

const useInitMinutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SET_MINUTE());
    setInterval(() => {
      dispatch(SET_MINUTE());
    }, 1000 * 20);
  }, []);
};

export default useInitMinutes;
