import React, { useState } from "react";
import Dropdown from "../../../UI/Dropdown/Dropdown";
import HorizontalSelect from "../../../UI/HorizontalSelect/HorizontalSelect";
import ProjectsIcon from "../../../../icons/ProjectsIcon";
import CaretDownFillIcon from "../../../../icons/CaretDownFillIcon";
import classes from "./AddTask.module.css";
import useProjects from "../../../../hooks/useProjects";

const AddTaskOptions = ({
  onPrioritySelect,
  onProjectSelect,
  priority,
  priorities,
  selectedProject,
}) => {
  const { curProject, fetchAllProjectIds } = useProjects();

  function projectsArr() {
    return fetchAllProjectIds(true).map((projectId) => {
      const project = curProject(projectId);
      return {
        id: projectId,
        label: project.content,
        color: project.color,
      };
    });
  }

  function onItemSelect(setWholeVisible, item, setVisible, e) {
    setVisible(false);
    setWholeVisible(false);
    onProjectSelect(item.id);
  }

  function onHorizontalSelect(item, e) {
    onPrioritySelect(item);
  }

  function itemHeader() {
    return (
      <HorizontalSelect
        items={priorities}
        headerText="Priority"
        activeItem={priority}
        onItemSelect={onHorizontalSelect}
      />
    );
  }

  return (
    <Dropdown
      items={[]}
      ItemHeader={itemHeader}
      ItemComponent={(setVisible) => {
        return (
          <Dropdown
            onItemSelect={(...e) => onItemSelect(setVisible, ...e)}
            handle={
              <div className={classes.AddTask_project_dropdown_handle}>
                <div className={classes.AddTask_project_dropdown_handle_icon}>
                  <ProjectsIcon />
                </div>
                <div className={classes.AddTask_project_dropdown_handle_label}>
                  <p>
                    <span>Add to </span>
                    <span
                      className={
                        classes.AddTask_project_dropdown_handle_label_highlighted_span
                      }
                    >
                      {curProject(selectedProject)
                        ? curProject(selectedProject).label ||
                          curProject(selectedProject).content
                        : "Select Project"}
                    </span>
                  </p>
                </div>
              </div>
            }
            items={projectsArr()}
          />
        );
      }}
      handle={<CaretDownFillIcon />}
    />
  );
};

export default AddTaskOptions;
