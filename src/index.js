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
import { AuthProvider } from "./Hotel/context/authContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PropertyProvider } from "./Hotel/context/propertyContext";
import Rooms from "./Hotel/components/rooms";
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
    element: (
      <AuthProvider>
        <Hotel />
      </AuthProvider>
    ),
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
        element: (
          <PropertyProvider>
            <Property />
          </PropertyProvider>
        ),
      },
      {
        path: "properties/:propertyId/rooms",
        element: (
          <>
            <Rooms />
          </>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>
);
