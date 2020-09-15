import React from "react";
import NavBar from "./components/Dashboard/NavBar/NavBar";
import "./styles/helpers/main.scss";
import Dashboard from "./components/Dashboard/Dashboard";
import store from "./store/store";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <Switch>
            <Route
              path="/app"
              render={(props) => (
                <>
                  <NavBar {...props} />
                  <Dashboard {...props} />
                </>
              )}
            />
            <Redirect to="/app/inbox/tasks" />
          </Switch>
        </DndProvider>
      </Provider>
    </Router>
  );
}

export default App;
