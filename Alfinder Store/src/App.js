import React, { Component } from 'react';
import {
  Route,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import store from './app/core/store';
import { Provider } from 'react-redux';
import { authLoad } from './app/core/actions/auth';
import Notification from './app/layouts/partials/Notification';

import Routes from './app/layouts/Routes';
import Page404 from './app/layouts/errors/404';

class App extends Component {
  componentDidMount() {
    store.dispatch(authLoad());
    // notification({
    //   text: this.props.errors.message,
    // });
  }
  render() {
    return (
      <Provider store={store}>
        <div>
          <Router>
            <Switch>
              <Route exact path='/download' component={() => {
                  window.location.href = 'https://apps.apple.com/us/app/alfinder-shop-wellness/id1505168467';
                  return null;
              }}/>

              <Routes />

              <Route path="*">
                <Page404 />
              </Route>

            </Switch>
          </Router>
          <Notification />
        </div>
      </Provider>
    );
  }
}

export default App;
