import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import Header from './components/Header';
import UserSignOut from './components/SignOut';
import Authenticated from './components/Authenticated';
import Public from './components/Public';
import NotFound from './components/NotFound';

import withContext from './Context';
import PrivateRoute from './PrivateRoute';

const HeaderWithContext = withContext(Header);
const AuthWithContext = withContext(Authenticated);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);


class App extends Component {
  render() {
    return (
      <Router>
    <div>
      <HeaderWithContext/>

      <Switch>
        <Route exact path="/" component={Public} />
        <PrivateRoute path="/authenticated" component={AuthWithContext} />
        <PrivateRoute path="/settings" component={AuthWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
    )
  }
}

export default App;
