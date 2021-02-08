import React from 'react';
import AppLoader from "./AppLoader/AppLoader";

const AppLoadingPage = (props) => {

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgb(242 242 242)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2000,
      position: 'absolute',
      top: 0,
      left: 0
    }}>
      <AppLoader noBg size={1} containerStyle={{width: '180px', height: '180px'}} />
      <p className="mt-20" style={{color: 'rgb(129 122 122)'}}>Hang on! We are preparing the app for you.</p>
    </div>
  );
};

export default AppLoadingPage;
