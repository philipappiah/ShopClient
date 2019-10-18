import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import React from "react";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";

import { Home } from "./Home";
import { SendMoney } from "./pages/sendMoney";
import {Account} from './pages/account';

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './Reducers';


const store = createStore(reducers, applyMiddleware(thunk));




const routing = (
   
  
  <Router> 
      

    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signIn" component={SignIn} />
      <Route path="/signUp" component={SignUp} />
      <Route path="/send" component={SendMoney} />
      <Route path="/account" component={Account} />
    </Switch>
  </Router>
  
);

export default routing;
