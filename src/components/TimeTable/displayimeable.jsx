import React from "react";
import { MdDelete } from "react-icons/md";
import style from "./timetable.module.css";
const DisplayTimeTable = ({
  label,
  handleDelete,
  task,
  selected,
  taskId,
  handleUserSelectedId,
}) => {
  //console.log(selected);

  return (
    <React.Fragment>
      <div
        className={`${style.display_tt} ${
          taskId === selected ? style.selected : null
        }`}
        onClick={() => {
          handleUserSelectedId(taskId);
        }}
      >
        <span>{label}</span>
        <MdDelete
          style={{ color: "#f44336" }}
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(task.id);
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default DisplayTimeTable;
