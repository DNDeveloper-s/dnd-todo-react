import React, { useEffect, useRef, useState } from "react";
import CheckListItem from "./CheckListItem";
import {ObjectId} from "bson";

const CheckListItemHandle = (props) => {
  const [items, setItems] = useState([
    {
      id: "1",
      title: "Take the dogs out 🐶",
    },
  ]);
  const [focusedItem, setFocusedItem] = useState(items[items.length - 1]);
  const [returnedItem, setReturnedItem] = useState(null);
  const resettingRef = useRef("initial");

  useEffect(() => {
    if (resettingRef.current === "returned") {
      resettingRef.current = "initial";
      const indexOfItem = items.findIndex((c) => c.id === returnedItem.id);
      setReturnedItem(null);
      setFocusedItem(items[indexOfItem + 1]);
    } else if (resettingRef.current === "backspaced") {
      resettingRef.current = "initial";
      setFocusedItem(items[returnedItem]);
    }
  }, [items]);

  function handleReturn(item) {
    setReturnedItem(item);
    resettingRef.current = "returned";

    const newItems = [...items];
    const indexOfItem = newItems.findIndex((c) => c.id === item.id);
    newItems.splice(indexOfItem + 1, 0, {
      id: new ObjectId().toString(),
      title: "",
    });
    setItems(newItems);
  }

  function handleBackspace(item) {
    resettingRef.current = "backspaced";

    const newItems = [...items];
    const indexOfItem = newItems.findIndex((c) => c.id === item.id);
    newItems.splice(indexOfItem, 1);
    setItems(newItems);
    setReturnedItem(indexOfItem - 1);
  }

  return (
    <>
      {items.map((item) => (
        <CheckListItem
          key={item.id}
          item={item}
          focusIt={focusedItem.id === item.id}
          handleReturn={handleReturn}
          handleBackspace={handleBackspace}
        />
      ))}
    </>
  );
};

export default CheckListItemHandle;
