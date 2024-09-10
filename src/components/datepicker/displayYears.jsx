import React from "react";
import years from "../../utils/displayYears";
import "./style.css";
const DisplayYears = ({
  selected_year,
  current_year,
  onHandleYear,
  onHandleToggleButton,
}) => {
  return (
    <React.Fragment>
      <div className="display_year_container">
        {years.map((year, ind) => {
          return (
            <button
              type="button"
              key={ind}
              className={`button ${
                year === current_year ? "current" : ""
              } ${year === selected_year ? "selected" : "unselected"}`}
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
