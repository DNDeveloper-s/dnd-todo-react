import React from 'react';
import LabelItem from "./LabelItem";
import AddLabel from "./AddLabel";

const LabelsWrapper = ({labels}) => {

  return (
    <>
      <LabelItem />
      <LabelItem />
      <LabelItem />
      <LabelItem />
      <LabelItem />
      <LabelItem />
      <AddLabel labels={labels} />
    </>
  );
};

export default LabelsWrapper;
