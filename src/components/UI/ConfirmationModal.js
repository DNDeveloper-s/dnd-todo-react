import React from 'react';
import AppButton from "./AppButton";
import AppModal from "./AppModal/AppModal";

const ConfirmationModal = ({showModal, setShowModal, message, heading, handleYes, handleNo}) => {

  return (
    <AppModal setShowIt={setShowModal} onClose={() => console.log('Closed')} showIt={showModal} children={(setVisible) => (
      <div>
        <div className="heading_4 mb-20" style={{color: '#676af0'}}>
          <p>{heading || 'Confirmation!'}</p>
        </div>
        <div className="mb-30" style={{color: 'rgba(0,0,0,0.8)'}}>
          <p>{message || 'Are you sure? This cannot be undone!'}</p>
        </div>
        <div className="flex">
          <AppButton onClick={() => handleYes(setVisible)} style={{marginRight: '20px'}} label="Yes, Do it" primary />
          <AppButton onClick={() => handleNo(setVisible)} label="No, Cancel it" />
        </div>
      </div>
    )}/>
  );
};

export default ConfirmationModal;
