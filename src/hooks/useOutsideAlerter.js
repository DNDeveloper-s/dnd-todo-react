import {useRef, useState, useEffect} from 'react';

const useOutsideAlerter = (initialValue) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(initialValue);

  function handleClickOutside(e) {
    if(ref.current && !ref.current.contains(e.target)) setVisible(false);
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    }

  }, [ref]);

  return {ref, setVisible, visible};
};

export default useOutsideAlerter;
