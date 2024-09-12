import React from "react";
import years from "../../utils/displayYears";
import style from "./datepicker.module.css";
const DisplayYears = ({
  selected_year,
  current_year,
  onHandleYear,
  onHandleToggleButton,
}) => {
  return (
    <React.Fragment>
      <div className={style.display_year_container}>
        {years.map((year, ind) => {
          return (
            <button
              type="button"
              key={ind}
              className={`${style.button} ${
                year === current_year ? style.current : ""
              } ${year === selected_year ? style.selected : style.unselected}`}
              onClick={() => {
                onHandleYear(year);
                onHandleToggleButton(false);
              }}
            >
              {year}
            </button>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default DisplayYears;
