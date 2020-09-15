import React, { createRef, useRef, useState } from "react";
import PropTypes from "prop-types";
import ColorPicker from "../ColorPicker/ColorPicker";
import AppButton from "../UI/AppButton";
import AppModal from "../UI/AppModal/AppModal";
import AppInput from "../UI/AppInput";

const LabelModal = ({
  initialData: { name: initialName, color: initialColor } = {},
  onCancel,
  onSave,
  showModal,
  setShowModal,
}) => {
  const inputRef = createRef();
  const [name, setName] = useState(initialName || "");
  const [color, setColor] = useState(initialColor || null);

  function handleSave() {
    onSave({ name, color });
  }

  function handleCancel() {
    onCancel ? onCancel() : setShowModal(false);
  }

  return (
    <AppModal showIt={showModal} setShowIt={setShowModal} onClose={() => null}>
      {() => (
        <div className="nothing but modal">
          <div className="heading_4">
            <p>Add Label</p>
          </div>
          <AppInput
            onChange={setName}
            value={name}
            containerClassNames={["lightFont", "mv-20"]}
            placeholder="Label Name"
          />
          <ColorPicker activeColor={color} setActiveColor={setColor} />
          <div className="flex mt-40">
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

LabelModal.propTypes = {
  initialData: PropTypes.shape({
    name: PropTypes.string,
    color: PropTypes.string,
  }),
  onCancel: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
};

export default LabelModal;
