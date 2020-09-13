import { useEffect } from "react";
import useGlobalState from "./useGlobalState";
import useTasks from "./useTasks";

const useTriggers = (props) => {
  const { fetchGlobalState } = useGlobalState();
  const { triggerReminder } = useTasks();
  const globalState = fetchGlobalState();

  useEffect(() => {
    // console.log("Minute changed");
    triggerReminder();
  }, [globalState.minute]);
};

export default useTriggers;
