import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ColorPicker from "../ColorPicker/ColorPicker";
import AppButton from "../UI/AppButton";
import AppModal from "../UI/AppModal/AppModal";
import AppInput from "../UI/AppInput";

const ProjectModal = ({
  initialData = {},
  onCancel,
  onSave,
  showModal,
  setShowModal,
}) => {
  const { name: initialName, color: initialColor } = initialData;
  const [name, setName] = useState(initialName || "");
  const [color, setColor] = useState(initialColor || null);

  useEffect(() => {
    setName(initialData.name);
    setColor(initialData.color);
  }, [initialData]);

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
            <p>Add Project</p>
          </div>
          <AppInput
            onChange={setName}
            value={name || ""}
            containerClassNames={["lightFont", "mv-20"]}
            placeholder="Project Name"
            handleReturn={handleSave}
          />
          <ColorPicker activeColor={color} setActiveColor={setColor} />
          <div className="flex mt-40 relative">
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

ProjectModal.propTypes = {
  initialData: PropTypes.shape({
    name: PropTypes.string,
    color: PropTypes.string,
  }),
  onCancel: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
};

export default ProjectModal;
