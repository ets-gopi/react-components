import React, { useEffect, useReducer, useRef, useState } from "react";
import style from "./timetable.module.css";
import Button from "../button";
import DisplayTimeTable from "./displayimeable";

import Modal from "../modal/modal";
import FormGroup from "./formgroup";
import CalendarView from "./calendarView";
import { initialState, reducer } from "./reducer";
const TimeTable = () => {
  const [isModal, setIsModal] = useState(false);
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tt")) || []
  );
  const [state, dispatch] = useReducer(reducer, initialState);
  const [userSelectId, setUserSelectId] = useState(0);
  //console.log(state,tasks);
  //console.log(userSelectId);

  useEffect(() => {
    localStorage.setItem("tt", JSON.stringify(tasks));
  }, [tasks]);
  const handleShow = () => {
    setIsModal(true);
  };
  const handleClose = () => {
    setIsModal(false);
  };
  const handleTT = (event) => {
    //console.log(event.target.id);
    switch (event.target.id) {
      case "start-date":
        dispatch({ type: "startDate", payload: event.target.value });
        break;
      case "purpose":
        dispatch({ type: "purpose", payload: event.target.value });
        break;
      case "duration":
        dispatch({ type: "duration", payload: event.target.value });
        break;
      default:
        console.log("Unknown input.");
    }
  };
  const handleCreateTT = () => {
    //console.log(state);
    const { startDate, purpose, duration } = state;
    if (!startDate || !purpose || !duration) {
      alert(`fields are required.`);
      return;
    }
    handleClose();
    setTasks([...tasks, { id: Date.now(), ...state }]);
    dispatch({ type: "reset" });
  };
  const handleDeleteTT = (id) => {
    //console.log(id);
    const filterTT = tasks?.filter((task, ind) => task.id !== id);
    setTasks(filterTT);
    setUserSelectId(0);
  };
  return (
    <React.Fragment>
      <div className={`${style.time_table_container}`}>
        {/* Button for creating the time table */}
        <div className={`${style.button_container}`}>
          <button className={`${style.create_button}`} onClick={handleShow}>
            create
          </button>
        </div>
        {/* Group container */}
        <div className={`${style.group_container}`}>
          {/* Displaying the tasks */}
          <div className={`${style.display_tasks}`}>
            {tasks?.map((task, ind) => {
              return (
                <DisplayTimeTable
                  key={task.id}
                  task={task}
                  label={task.purpose}
                  handleDelete={handleDeleteTT}
                  selected={userSelectId}
                  taskId={ind}
                  handleUserSelectedId={setUserSelectId}
                />
              );
            })}
          </div>
          {/* Displaying the time table */}
          <div className={`${style.time_table}`}>
            <h2 className={style.task_heading}>
              {tasks[userSelectId]?.purpose}
            </h2>
            {tasks.length > 0 && (
              <CalendarView
                date={tasks[userSelectId]?.startDate}
                duration={tasks[userSelectId]?.duration}
              />
            )}
          </div>
        </div>
      </div>
      <Modal show={isModal} onHide={handleClose}>
        <Modal.Header closeButton onHide={handleClose}>
          <Modal.Title>TimeTable</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <FormGroup
              type={"date"}
              name={"start-date"}
              label={"StartDate"}
              handleTT={handleTT}
              value={state.startDate}
            />
            <FormGroup
              type={"text"}
              name={"purpose"}
              label={"Purpose"}
              handleTT={handleTT}
              value={state.purpose}
            />
            <FormGroup
              type={"number"}
              name={"duration"}
              label={"Duration"}
              handleTT={handleTT}
              value={state.duration}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type={"button"}
            style={{
              backgroundColor: "#5C636A",
              color: "white",
              marginRight: "5px",
            }}
            onClick={handleClose}
          >
            close
          </Button>
          <Button
            type={"button"}
            style={{ backgroundColor: "#0B5ED7", color: "white" }}
            onClick={handleCreateTT}
          >
            create
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default TimeTable;
