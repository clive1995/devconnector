import React, { useEffect } from "react";
import "./App.css";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import CustomAlert from "./components/layout/alert";
import Dashboard from "./components/dashboard/dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-form/CreateProfile";
import EditProfile from "./components/profile-form/EditProfile";
import AddExperience from "./components/profile-form/AddExperience";
import AddEducation from "./components/profile-form/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/post/Posts";
import Post from "./components/post/Post";

import { Route, Switch } from "react-router-dom";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import { LoadUser } from "./action/auth";
import serAuthToken from "./utils/setAuthTokens";
//Redux
if (localStorage.token) {
  serAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(LoadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <CustomAlert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/Dashboard" component={Dashboard} />
            <PrivateRoute
              exact
              path="/create-profile"
              component={CreateProfile}
            />
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            <PrivateRoute
              exact
              path="/add-experience"
              component={AddExperience}
            />
            <PrivateRoute
              exact
              path="/add-education"
              component={AddEducation}
            />

            <PrivateRoute exact path="/posts" component={Posts} />
            <PrivateRoute exact path="/posts/:id" component={Post} />
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/Profile/:id" component={Profile} />
          </Switch>
        </section>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
