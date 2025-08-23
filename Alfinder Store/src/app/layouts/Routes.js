import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

// STYLESHEETS
// import '../../style/shop/home.css';
import '../../style/blog/blog.scss';
import '../../style/shop/style.css';
import '../../style/shop/media.css';

// Error Pages
import Page404 from './errors/404';

// Partials
import Nav from './partials/Nav';
import Footer from './partials/Footer';
import Subscribe from './partials/Subscribe';

// Shop Pages
import Profile from './views/Profile';
import Orders from './views/shop/Orders';
import Home from './views/shop/Home';
import Cart from './views/shop/Cart';
import Product from './views/shop/Product';
// import Collection from './views/shop/Collection';
import Wishlist from './views/shop/Wishlist';
import Checkout from './views/shop/Checkout';
import Collection from './views/shop/Collection';

// Info Pages
// import Faq from './views/info/Faq';
import Info from './views/info/Home';
import About from'./views/info/About';
import Terms from'./views/info/Legal/Terms';
import Haircare from'./views/blog/Haircare';
import Skincare from './views/blog/Skincare';
import Wellness from './views/blog/Wellness';
import Support from'./views/info/Form/Support';
import ContactUs from'./views/info/Form/ContactUs';
import Suggestion from'./views/info/Form/Suggestion';
import PrivacyPolicy from'./views/info/Legal/PrivacyPolicy';


function Shop() {
  return (
    <div>
      <Nav />

      <Router>
        <Switch>
          {/* SHOP */}
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/collections">
            <Collection />
          </Route>
          {/* <Route exact path="/blog">
            <Blogs />
          </Route> */}
          <Route exact path="/collection/:slug">
            {/* <Collection /> */}
          </Route>
          <Route exact path="/products/type/:type">
            {/* <Collection /> */}
          </Route>
          <Route exact path="/product/:id" component={Product} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/wishlist" component={Wishlist} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/profile/orders" component={Orders} />
          <Route exact path="/checkout" component={Checkout} />

          {/* FORMS */}
          <Route exact path="/contact-us">
            <ContactUs />
          </Route>
          <Route exact path="/support">
            <Support />
          </Route>
          <Route exact path="/suggestions">
            <Suggestion />
          </Route>

          {/* INFO */}
          <Route exact path="/info/">
            <Info />
          </Route>
          <Route exact path="/info/skincare">
            <Skincare />
          </Route>
          <Route exact path="/info/wellness">
            <Wellness />
          </Route>
          <Route exact path="/info/hair-care">
            <Haircare />
          </Route>
          {/*  <Route exact path="/info/faq">
            <Faq />
          </Route> */}
          <Route exact path="/info/about">
            <About />
          </Route>
          <Route exact path="/info/privacy-policy">
            <PrivacyPolicy />
          </Route>
          <Route exact path="/info/terms">
            <Terms />
          </Route>

          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
      </Router>

      <Subscribe />
      <Footer />
    </div>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
  {...rest}
  render={props => {
    if (props.isLoading) {
      return <h1>Loading...</h1>
    } else if (!props.isAuthenticated) {
      return <Redirect to="/profile" />;
    } else {
      return <Component {...props} />;
    }
  }}
  />
);

const mapStateToProps = state => ({
  auth: state.authReducer
});

export default connect(mapStateToProps)(Shop);
