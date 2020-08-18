import { useEffect, useState } from "react";

const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch Projects from the database here
    setProjects([
      {
        label: "Cymatic",
      },
      {
        label: "TODO's",
      },
      {
        label: "SocioTrobe",
      },
      {
        label: "TickTick",
      },
    ]);
  }, []);

  return [projects];
};

export default useProjects;
