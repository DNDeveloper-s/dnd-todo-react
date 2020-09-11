import { useRef, useState, useEffect } from "react";

const useOutsideAlerter = (initialValue, onClose) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(initialValue || false);

  useEffect(() => {
    if (!visible) onClose && onClose();
  }, [visible]);

  function handleClickOutside(e) {
    if (ref.current && !ref.current.contains(e.target)) {
      // onClose && onClose();
      setVisible(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [ref]);

  return { ref, setVisible, visible };
};

export default useOutsideAlerter;
