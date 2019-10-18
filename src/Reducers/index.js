import {combineReducers} from 'redux';

import userReducers from './userReducers';
import productCartReducers from './productCartReducers';
import cartItemsTotal from './cartItemsTotal';
import cartItemsList from './cartItemsList';

export default combineReducers({
   
    users:userReducers,
    carts:productCartReducers,
    cartItemsTotal,
    cartList:cartItemsList


})