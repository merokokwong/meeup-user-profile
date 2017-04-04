import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { Scene, Router } from 'react-native-router-flux';
import Login from './scenes/Authentication/Login';
import Register from './scenes/Authentication/Register';
import Profile from './scenes/Profile';
import EditProfile from './scenes/EditProfile';
import * as reducers from './reducers';

const store = createStore(
      combineReducers(reducers),
      compose(
        applyMiddleware(thunk),
      ),
    );

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key="root">
            <Scene key="login" component={Login} title="Login" hideNavBar={false} hideBackImage />
            <Scene key="register" component={Register} title="Register" />
            <Scene
              key="profile"
              component={Profile}
              title="Profile"
              hideNavBar={false}
              hideBackImage
            />
            <Scene key="editProfile" component={EditProfile} title="Edit Your Profile" />
          </Scene>
        </Router>
      </Provider>
    );
  }
}
