import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import allDogs from "./components/allDogs";
import Dog from "./components/Dog";
import editDog from "./components/editDog";
import Cart from "./components/Cart";
import editUser from "./components/editUser";
import users from "./components/users";
import SingleUser from "./components/SingleUser";
import AboutUs from "./components/AboutUs";
import Checkout from "./components/Checkout";
import Confirmation from "./components/Confirmation";
import auth from "./store/auth";
import Faq from "./components/Faq";
import Order from "./components/Order";
import Breed from "./components/Breed";
import SelectedBreed from "./components/SelectedBreed";
import CreateUser from "./components/CreateUser";
import AddDog from "./components/AddDog";

let tempUserId = 1;
//Grab a local storage session
const retrieveId = JSON.parse(localStorage.getItem("guest"));

//let it come into existence
let uuid;

//If session's not there, create a new session
if (!retrieveId) {
  const testId = {
    id: self.crypto.randomUUID(),
  };
  localStorage.setItem("guest", JSON.stringify(testId));
  uuid = testId.id;
}
//If session IS there, set session's id to uuid
else {
  uuid = retrieveId.id;
}

// console.log(uuid, "THIS IS UUID");

//

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, authId, auth } = this.props;
    console.log(auth, "56, Routes.js, auth");
    return (
      <div>
        {!isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/dogs" exact component={allDogs} />
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path={"/users"} component={users} />
            <Route path={`/dogs/:id`} component={Dog} />
            <Route path={"/AboutUs"} component={AboutUs} />
            <Route path={`/cart/guest`} component={Cart} />
            <Route path="/FAQ" component={Faq} />
            <Route path="/create" component={CreateUser} />
            <Route path={`/checkout/guest`} component={Checkout} />
            <Route path={`/confirmation`} component={Confirmation} />
            <Route exact path={"/breed"} component={Breed} />
            <Route path={`/breed/:id`} component={SelectedBreed} />
          </Switch>
        ) : auth === "user" ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/dogs" exact component={allDogs} />
            <Route path={`/users/:id`} component={SingleUser} />
            <Route path="/dogs/:id" component={Dog} />
            <Route path={"/AboutUs"} component={AboutUs} />
            <Route path={`/account/orders/:id`} component={Order} />
            <Route path={`/cart/${authId}`} component={Cart} />
            <Route path={`/checkout/${authId}`} component={Checkout} />
            <Route path="/FAQ" component={Faq} />
            <Route path={`/confirmation`} component={Confirmation} />
            <Route path={`/user/edit/`} component={editUser} />
            <Route exact path={"/breed"} component={Breed} />
            <Route path={`/breed/:id`} component={SelectedBreed} />
            <Route path="/addDog" component={AddDog} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/dogs" exact component={allDogs} />
            <Route exact path={"/users"} component={users} />
            <Route path={`/users/:id`} component={SingleUser} />
            <Route path="/dogs/:id" component={Dog} />
            <Route path={"/AboutUs"} component={AboutUs} />
            <Route path={`/account/orders/:id`} component={Order} />
            <Route path={`/cart/${authId}`} component={Cart} />
            <Route path={`/checkout/${authId}`} component={Checkout} />
            <Route path={`/dog/edit/:id`} component={editDog} />
            <Route path="/FAQ" component={Faq} />
            <Route path={`/dog/edit/:id`} component={editDog} />
            <Route path={`/confirmation`} component={Confirmation} />
            <Route path={"/user/edit/:id"} component={editUser} />
            <Route exact path={"/breed"} component={Breed} />
            <Route path={`/breed/:id`} component={SelectedBreed} />
            <Route path="/addDog" component={AddDog} />
            <Redirect to="/home" />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    authId: state.auth.id,
    auth: state.auth.role,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
