import React, {useEffect, useState} from 'react';
import produce from 'immer';

const useForm = (initialData) => {
  const [data, setData] = useState();

  useEffect(() => {
    setData({...initialData, serverErr: {}, successInfo: {}});
  }, []);


  function handleValue(key, value) {
    const myData = produce(data, draftData => {
      draftData[key].value = value;
    });
    setData(myData);
  }

  function setInfoByKey(key, errorValue) {
    console.log('[useForm.js || Line no. 19 ....]', key, errorValue);
    const myData = produce(data, draftData => {
      draftData[key].error = {key: key, message: errorValue};
    });
    setData(myData);
  }


  function clearError() {
    const myData = produce(data, draftData => {
      draftData.successInfo = {};
      draftData.serverErr = {};
      for(let key in draftData) {
        if(draftData.hasOwnProperty(key))
          draftData[key].error = {key: null, message: null};
      }
    });
    console.log('[useForm.js || Line no. 37 ....]', myData);
    setData(myData);
  }

  function info() {
    let msg = null;
    for(let key in data) {
      if(data.hasOwnProperty(key) && data[key].error) {
        msg = data[key].error;
      }
    }
    return msg;
  }

  function getKeyData(key) {
    return data[key];
  }

  function getData() {
    const res = {};
    for(let key in data) {
      if(data.hasOwnProperty(key) && key !== 'serverErr')
        res[key] = data[key];
    }
    return res;
  }

  return {handleValue, data, info, setInfoByKey, clearError};
};

export default useForm;
