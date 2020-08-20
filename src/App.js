import React from "react";
// import CalendarPicker from "./components/CalendarPicker/CalendarPicker";
import NavBar from "./components/Dashboard/NavBar/NavBar";
import "./styles/helpers/main.css";
import Dashboard from "./components/Dashboard/Dashboard";
import ColorPicker from "./components/ColorPicker/ColorPicker";
import store from "./store/store";
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <NavBar />
      <Dashboard />
    </Provider>
  );
}

export default App;
