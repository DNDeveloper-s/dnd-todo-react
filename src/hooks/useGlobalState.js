import { useSelector } from "react-redux";
import { getGlobalState } from "../features/globalSlice";
import { constants } from "../helpers/constants";

const useGlobalState = (props) => {
  const globalState = useSelector(getGlobalState);

  const fetchGlobalState = () => globalState;

  const fetchToggleCollapse = (dragFrom, taskId) =>
    globalState.toggleCollapse[dragFrom + constants.SEPARATOR + taskId];

  return {
    fetchGlobalState,
    fetchToggleCollapse,
  };
};

export default useGlobalState;
