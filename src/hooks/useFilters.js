import { useEffect, useState } from "react";

const useFilters = () => {
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    // Fetch Projects from the database here
    setFilters([
      {
        icon: null,
        color: "orange",
        label: "Assigned to me",
      },
      {
        icon: null,
        color: "red",
        label: "Assigned to others",
      },
      {
        icon: null,
        color: "lightgreen",
        label: "View All",
      },
      {
        icon: null,
        color: "dodgerblue",
        label: "Priority 1",
      },
    ]);
  }, []);

  return [filters];
};

export default useFilters;
