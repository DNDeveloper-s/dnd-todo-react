import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router";
import NavBar from "./components/Dashboard/NavBar/NavBar";
import Dashboard from "./components/Dashboard/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_STATE, getAuthState } from "./features/authSlice";
import { constants } from "./helpers/constants";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";

import "./components/Authentication/Auhentication.scss";
import useApi from "./api/useApi";

const Home = (props) => {
  const { isLoggedIn } = useSelector(getAuthState);
  const [isReady, setIsReady] = useState();
  const dispatch = useDispatch();
  const { post } = useApi();

  useEffect(() => {
    const checkAuthStateToServer = () => {
      const token = window.localStorage.getItem("bearer");
      if (!token) {
        setIsReady(true);
        return dispatch(
          AUTH_STATE({
            isLoggedIn: false,
            token: null,
            user: {},
          })
        );
      }

      console.log(token);

      post(constants.ENDPOINTS.VALIDATE_TOKEN, { token: token })
        .then((res) => {
          console.log('Log in info', res);

          // Handling the error response
          if (res.data.type !== "success") {
            setIsReady(true);
            return dispatch(
              AUTH_STATE({
                isLoggedIn: false,
                token: null,
                user: {},
              })
            );
          }

          // Handling the success response
          dispatch(
            AUTH_STATE({
              isLoggedIn: true,
              token: token,
              user: res.data.info,
            })
          );
          setIsReady(true);
        })
        .catch((e) => console.log("[Home.js || Line no. 34 ....]", e));
    };
    checkAuthStateToServer();
  }, []);

  return isReady ? (
    isLoggedIn ? (
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
    ) : (
      <>
        <div className="auth_modal">
          <Route path={constants.ROUTES.LOGIN} component={Login} />
          <Route path={constants.ROUTES.SIGNUP} component={Signup} />
        </div>
        <Redirect to={constants.ROUTES.LOGIN} />
      </>
    )
  ) : <div className="flexCentered flexColumn" style={{width: '100vw', height: '100vh', backgroundColor: 'rgb(242 242 242)'}}>
    <p className="heading_2 black-60">Welcome to DND-Todo App</p>
    <p className="heading_4 mt-10 black-40">Hang on, till we are checking your auth status</p>
  </div>;
};

export default Home;
