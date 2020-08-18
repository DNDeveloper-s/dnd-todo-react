import { useEffect, useState } from "react";

const useLabels = () => {
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    // Fetch Projects from the database here
    setLabels([
      {
        color: "orange",
        label: "5 mins",
      },
      {
        color: "red",
        label: "School",
      },
      {
        color: "lightgreen",
        label: "Working",
      },
      {
        color: "dodgerblue",
        label: "Upcoming",
      },
    ]);
  }, []);

  return [labels];
};

export default useLabels;
