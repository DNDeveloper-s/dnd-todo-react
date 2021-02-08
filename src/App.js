import React, {useEffect} from "react";
import "./styles/helpers/main.scss";
import store from "./store/store";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  BrowserRouter as Router,
  // Switch,
  // Route,
  // Redirect,
} from "react-router-dom";
// import { PersistGate } from "redux-persist/integration/react";
// import AuthenticationPage from "./components/Authentication/AuthenticationPage";
import Home from "./Home";

function App() {
  return (
    <Router>
      <Provider store={store}>
        {/*<PersistGate loading={null} persistor={persistor}>*/}
        <DndProvider backend={HTML5Backend}>
          <Home />
        </DndProvider>
        {/*</PersistGate>*/}
      </Provider>
    </Router>
  );
}

export default App;
