import React from "react";
// import CalendarPicker from "./components/CalendarPicker/CalendarPicker";
import NavBar from "./components/Dashboard/NavBar/NavBar";
import "./styles/helpers/main.css";
import Dashboard from "./components/Dashboard/Dashboard";
import store from "./store/store";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Switch>
          <Route path="/app" render={(props) => (
            <>
              <NavBar {...props} />
              <Dashboard {...props} />
            </>
          )} />
        </Switch>
      </Provider>
    </Router>
  );
}

export default App;
