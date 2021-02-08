import {useState} from 'react';

const useInfo = () => {
  const [info, setInfo] = useState({key: null, message: null, type: null});

  return [info, setInfo];
};

export default useInfo;
