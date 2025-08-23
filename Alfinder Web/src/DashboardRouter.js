import React from 'react'
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom"
import { connect } from 'react-redux'
import { redirect } from './app/core/actions/utils'
import store from './app/core/store'

import Dashboard from './app/layouts/views/Dashboard/Home'
import Pending from './app/layouts/views/Dashboard/Pending'
import Request from './app/layouts/views/Dashboard/Request'
import Login from './app/layouts/views/Dashboard/Auth/Login'
import Complete from './app/layouts/views/Dashboard/Complete'
import Settings from './app/layouts/views/Dashboard/Settings'
import Result from './app/layouts/views/Dashboard/Result'
import CreateClient from './app/layouts/views/Dashboard/CreateClient'

import Page404 from './app/layouts/errors/404'


function DashboardRouter({ isLoading, username, isAuthenticated }) {
    if (isAuthenticated !== null) {
        return (
            <Router>
                <Switch>
                    <Route exact path="/partners">
                        <Redirect to="/partners/login" />
                    </Route>
                    <PublicRoute exact path="/partners/login" auth={{'isLoading': isLoading, 'isAuthenticated': isAuthenticated, 'username': username}}>
                        <Login />
                    </PublicRoute>

                    <PublicRoute exact path={"/partners/:username"} auth={{'isLoading': isLoading, 'isAuthenticated': isAuthenticated, 'username': username}}>
                        <Dashboard />
                    </PublicRoute>
                    <PublicRoute exact path={"/partners/:username/submit-analysis"} auth={{'isLoading': isLoading, 'isAuthenticated': isAuthenticated, 'username': username}}>
                        <Request />
                    </PublicRoute>
                    <PublicRoute exact path={"/partners/:username/pending-requests"} auth={{'isLoading': isLoading, 'isAuthenticated': isAuthenticated, 'username': username}}>
                        <Pending />
                    </PublicRoute>
                    <PublicRoute exact path={"/partners/:username/analysis"} auth={{'isLoading': isLoading, 'isAuthenticated': isAuthenticated, 'username': username}}>
                        <Complete />
                    </PublicRoute>
                    <PublicRoute exact path={"/partners/:username/analysis/:id"} auth={{'isLoading': isLoading, 'isAuthenticated': isAuthenticated, 'username': username}}>
                        <Result />
                    </PublicRoute>
                    <PublicRoute exact path={"/partners/:username/client/create"} auth={{'isLoading': isLoading, 'isAuthenticated': isAuthenticated, 'username': username}}>
                        <CreateClient />
                    </PublicRoute>
                    <PublicRoute exact path={"/partners/:username/settings"} auth={{'isLoading': isLoading, 'isAuthenticated': isAuthenticated, 'username': username}}>
                        <Settings />
                    </PublicRoute>

                    <Route>
                        <Page404 />
                    </Route>
                </Switch>
            </Router>
        )
    } else 
    {
        return null
    }
}

function PrivateRoute({ auth, children, ...rest }) {
    if (auth !== undefined) {
        return (
            <Route
              {...rest}
              render={({ location }) =>
                auth.isAuthenticated === true ? (
                    auth.username === rest.computedMatch.params.username ?
                          children
                      :
                         <Page404 />
                      
                ) : (
                  <Redirect
                    to={{
                      pathname: "/partners/login",
                      state: { from: location }
                    }}
                  />
                )
              }
            />
        )
    } else {
        return null
    }
}

function PublicRoute({ auth, children, ...rest }) {
    if (auth !== undefined) {
        return (
            <Route
              {...rest}
              render={({ location }) =>
                auth.isAuthenticated === true ? (
                    <Redirect
                    to={{
                      pathname: "/partners/" + auth.username,
                    }}
                  />
                ) : (
                    children
                )
              }
            />
        )
    } else {
        return null
    }
}


const mapStateToProps = state => ({
    isLoading: store.getState().authReducer.isLoading,
    username: store.getState().authReducer.username,
    isAuthenticated: store.getState().authReducer.isAuthenticated,
})

export default connect(mapStateToProps, {
    redirect
})(DashboardRouter)