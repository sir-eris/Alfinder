import React from 'react';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../src/css/shop/app.css';
// import '../src/css/shop/media.css';
// import './css/Media.css';

import {
  Route,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";

import Header from './app/layouts/partials/Header2';
import Footer from './app/layouts/partials/footer2';

import Info from './app/layouts/views/info/Home'
import Solutions from'./app/layouts/views/info/Solutions'
import About from'./app/layouts/views/info/About'
import Terms from'./app/layouts/views/info/Legal/Terms'
import Support from'./app/layouts/views/info/Form/Support'
import ContactUs from'./app/layouts/views/info/Form/ContactUs'
import Suggestion from'./app/layouts/views/info/Form/Suggestion'
import PrivacyPolicy from'./app/layouts/views/info/Legal/PrivacyPolicy'

import Page404 from './app/layouts/errors/404'


function App() {

  return (
    <div>
    <Header />
    <Router>
      <Switch>

        <Route exact path="/contact-us">
          <ContactUs />
        </Route>
        <Route exact path="/support">
          <Support />
        </Route>
        <Route exact path="/suggestions">
          <Suggestion />
        </Route>

        <Route exact path="/solutions">
          <Solutions />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/privacy-policy">
          <PrivacyPolicy />
        </Route>
        <Route exact path="/terms">
          <Terms />
        </Route>

        <Route exact path="/">
          <Info />
        </Route>
        <Route>
          <Page404 />
        </Route>
      </Switch>
    </Router>
    <Footer />
    </div>
  );
}

export default App;
