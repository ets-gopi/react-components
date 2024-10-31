import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  DatePicker,
  VideoPlayer,
  TimeTable,
  DataGrid,
  CountDown,
  Musicplayer,
  Bookkeeper,
  Daterangepicker,
} from "./components";
import App from "./App";
import Hotel from "./Hotel/hotel";
import Register from "./Hotel/components/register";
import Login from "./Hotel/components/login";
import GetStarted from "./Hotel/components/getStarted";
import Property from "./Hotel/components/property";
// Create the router here
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/videoplayer",
    element: <VideoPlayer />,
  },
  {
    path: "/bookkeeper",
    element: <Bookkeeper />,
  },
  {
    path: "/countdown",
    element: <CountDown />,
  },
  {
    path: "/musicplayer",
    element: <Musicplayer />,
  },
  {
    path: "/hotel-management",
    element: <Hotel />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "get-started",
        element: <GetStarted />,
      },
      {
        path: "properties",
        element: <Property />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
