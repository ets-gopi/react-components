import React from "react";
import "./App.css";
import { DatePicker, VideoPlayer, TimeTable,DataGrid ,CountDown,Musicplayer,Bookkeeper,Daterangepicker} from "./components";
function App() {
  return (<React.Fragment>
    {/* <div style={{width:"600px",position:"relative",border:"1px solid green",height:"500px"}}> 
      <DataGrid />
    </div> */}
    <Daterangepicker />
    
  </React.Fragment>
  );
};
export default App;
