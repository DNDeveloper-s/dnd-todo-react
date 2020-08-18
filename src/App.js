import React from "react";
// import CalendarPicker from "./components/CalendarPicker/CalendarPicker";
import NavBar from "./components/Dashboard/NavBar/NavBar";
import "./styles/helpers/main.css";
import Dashboard from "./components/Dashboard/Dashboard";
import ColorPicker from "./components/ColorPicker/ColorPicker";

function App() {
  return (
    <>
      <NavBar />
      <Dashboard />
    </>
  );
}

export default App;
