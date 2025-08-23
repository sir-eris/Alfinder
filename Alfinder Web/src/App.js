import React from 'react'
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom"
import store from './app/core/store'
import { Provider } from 'react-redux'

import { authLoad } from './app/core/actions/auth'

// import Notification from './app/layouts/partials/Notification'


// STYLES
import './App.scss'

// PARTIALS
import Header from './app/layouts/partials/Header'
import Footer from './app/layouts/partials/footer'

// ERROR
import Page404 from './app/layouts/errors/404'

// LANDING
import Info from './app/layouts/views/Info/Home'
import Demo from './app/layouts/views/Info/Demo'
import About from'./app/layouts/views/Info/About'
import Terms from'./app/layouts/views/Info/Legal/Terms'
import Solutions from'./app/layouts/views/Info/Solutions'
import Support from'./app/layouts/views/Info/Form/Support'
import ContactUs from'./app/layouts/views/Info/Form/ContactUs'
import Suggestion from'./app/layouts/views/Info/Form/Suggestion'
import PrivacyPolicy from'./app/layouts/views/Info/Legal/PrivacyPolicy'

// DASHBOARD ROUTER
import DashboardRouter from './DashboardRouter'
import Login from './app/layouts/views/Dashboard/Auth/Login'


class App extends React.Component {

  componentDidMount() {
    store.dispatch(authLoad())
    
    // notification({
    //   text: this.props.errors.message,
    // });
  }

  render () {
  return (
    <div>
      <Provider store={store}>
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

          <Route exact path="/request-demo">
            <Demo />
          </Route>
          <Route exact path="/">
            <Info />
          </Route>

          <DashboardRouter />
          
          <Route>
            <Page404 />
          </Route>

        </Switch>
      </Router>
      <Footer />
      </Provider>
    </div>
  )
  }
}

export default App
