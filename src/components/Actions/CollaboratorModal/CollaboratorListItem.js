import React, {useRef, useState} from 'react';
import DefaultUserImage from "../../../assets/images/def_user.png";
import CaretDownIcon from "../../../icons/CaretDownIcon";
import DropdownNew from "../../UI/DropDownNew/DropdownNew";
import classes from "../../UI/Dropdown/Dropdown.module.css";
import AppButton from "../../UI/AppButton";
import useApi from "../../../api/useApi";
import {constants} from "../../../helpers/constants";

const roleArr = [
  {id: '1', label: 'Can View'},
  {id: '2', label: 'Can Edit'},
  {id: '3', label: 'Can Change'},
];

const CollaboratorListItem = ({containerStyle, projectId, setResponse, item, isCollaborator, ...props}) => {
  const roleRef = useRef(null);
  const [role, setRole] = useState(roleArr[0]);
  const {loading, postWithAuthToken} = useApi();

  function onRoleSelect(roleData, setVisible) {
    setRole({
      id: roleData.id,
      label: roleData.label
    });
    setVisible(false);
  }

  function onInviteCollaborator(user, e) {
    // console.log('Project Id is ', projectId);
    setResponse(null);
    postWithAuthToken(constants.ENDPOINTS.INVITE_COLLABORATOR, {projectId: projectId, toUserId: user._id})
      .then(res => {
        console.log(res);
        setResponse({message: res.data.message, type: res.data.type});
      })
      .catch(e => console.log('[CollaboratorListItem.js || Line no. 34 ....]', e));
  }

  return (
    <div className="flex spaceBetween alignCenter mt-20" style={containerStyle}>
      <div className="flex">
        <div className="mr-10" style={{width: '40px', height: '40px', borderRadius: '200px'}}>
          <img src={DefaultUserImage} alt=""/>
        </div>
        <div className="flexColumn">
          <div className="bold">
            <p>{item.fullName}</p>
          </div>
          <div style={{color: 'grey'}}>
            <p>{item.email}</p>
          </div>
        </div>
      </div>
      {isCollaborator ? (
        <div className="flex">
          <div className="mr-10">
            <p style={{fontWeight: 800}}>Role: </p>
          </div>
          <div className="flex pointer" ref={roleRef}>
            <div className="flexCentered">
              <p style={{color: '#686bf0'}}>{role.label}</p>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: '10px',
              zoom: 0.55,
              paddingTop: '7px',
            }}>
              <CaretDownIcon fill="#202020" />
            </div>
          </div>
          <DropdownNew listenerRef={roleRef} >{
            (setVisible) => (
              roleArr.map(roleItem => (
                <div key={roleItem.id} className={classes["Dropdown-item"]} onClick={e => onRoleSelect(roleItem, setVisible, e)}>
                  <p>{roleItem.label || 'Nice one'}</p>
                </div>
              ))
            )
          }</DropdownNew>
        </div>
      ) : <AppButton loading={loading} orange label="Invite" onClick={(e) => onInviteCollaborator(item, e)} style={{width: '20%'}} />}
    </div>
  );
};

export default CollaboratorListItem;
