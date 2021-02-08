import React, {useState} from "react";
import * as PropTypes from "prop-types";
import AppButton from "../../UI/AppButton";
import AppModal from "../../UI/AppModal/AppModal";
import AppInput from "../../UI/AppInput";
import CollaboratorListItem from "./CollaboratorListItem";
import useApi from "../../../api/useApi";
import {constants} from "../../../helpers/constants";

const CollaboratorModal = ({
  projectId,
  onCancel,
  onSave,
  showModal,
  setShowModal,
}) => {
  // const { name: initialName, color: initialColor } = initialData;
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const {loading, postWithAuthToken} = useApi();
  const [response, setResponse] = useState(null);

  // useEffect(() => {
  //   setName(initialData.name);
  //   setColor(initialData.color);
  // }, [initialData]);

  function handleSave() {
    onSave({ message: 'Inviting Collaborator' });
  }

  function onChange(value, e) {
    setResponse(null);
    setName(value);
    postWithAuthToken(constants.ENDPOINTS.USER_SEARCH, {value})
      .then(res => {
        console.log('[CollaboratorModal.js || Line no. 34 ....]', res);
        if(res.data.type !== 'error') {
          setUsers(res.data.users);
        }
      })
      .catch(e => console.log('[CollaboratorModal.js || Line no. 35 ....]', e));
  }

  function handleCancel() {
    onCancel ? onCancel() : setShowModal(false);
  }

  return (
    <AppModal showIt={showModal} setShowIt={setShowModal} onClose={() => null}>
      {() => (
        <div className="nothing but modal">
          <div className="heading_4">
            <p>Add Collaborator</p>
          </div>
          <AppInput
            onChange={onChange}
            value={name || ''}
            containerClassNames={["lightFont", "mv-20"]}
            placeholder="Enter email, username or mobile number..."
            handleReturn={handleSave}
            loading={loading}
          />
          <div style={{
            maxHeight: '40vh',
            overflow: 'auto'
          }}>
            {users.map(user => (
              <CollaboratorListItem setResponse={setResponse} projectId={projectId} key={user._id} item={user} />
            ))}
          </div>
          {response && (
            <div className="textCenter mt-20" style={{color: response.type === 'error' ? '#ce2a10' : '#30a500', fontSize: '14px'}}>
              <p>{response.message}</p>
            </div>
          )}
          <div className="flex mt-30">
            <AppButton
              label="Cancel"
              style={{ marginRight: "10px" }}
              onClick={handleCancel}
            />
            <AppButton primary label="Save" onClick={handleSave} />
          </div>
        </div>
      )}
    </AppModal>
  );
};

CollaboratorModal.propTypes = {
  initialData: PropTypes.shape({
    name: PropTypes.string,
    color: PropTypes.string,
  }),
  onCancel: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
};

export default CollaboratorModal;
