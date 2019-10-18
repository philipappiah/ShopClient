import ReactDOM from "react-dom";

import Account from "./pages/account";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./Reducers";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import {ErrorPage} from "./errorPage";
import { Home } from "./Home";
import { SendMoney } from "./pages/sendMoney";
import {AddProduct} from './admin/addProduct';
import BasicPaginationTable from './admin/Data/mainCategory';
import DetailPage from './Shop/productdetail';
import ShopCart from './Shop/shopCart';
import MainShop from './Shop/mainShop';
import CheckOut from './Shop/checkout';
import NavBar from "./navbar";
import { LastLocationProvider } from "react-router-last-location";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
const store = createStore(reducers, applyMiddleware(thunk));

const routes = {
  


   
};
  


ReactDOM.render(
  <Provider store={store}>
    
    <Router>
   
    
    <NavBar />

    
      <Switch>
      <LastLocationProvider>
        
        
        <Route exact path="/" component={Home} />
        <Route exact path="/signIn" component={SignIn} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/send" component={SendMoney} />
        <Route path="/account" component={Account} />
        <Route path="/admin/addProduct" component={AddProduct} />
        <Route path="/shop/product" component={DetailPage} />
        <Route path="/shop/cart" component={ShopCart} />
        <Route path="/admin/mainCategory" component={BasicPaginationTable} />
        <Route path="/shop/MainShop" component={MainShop} />
        <Route path="/shop/checkout" component={CheckOut} />
      
        <Route path="/error" component={ErrorPage} />
        </LastLocationProvider>
      </Switch>
    </Router>
   
  </Provider>,
 
 document.querySelector("#root")
);
