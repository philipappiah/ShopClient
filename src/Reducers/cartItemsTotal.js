const INITIAL_STATE = {
    productName:''
    
  };
export default (state = [], action) => {
   
    switch(action.type){
        case "CART_ITEMS_TOTAL":
            return [...state, action.payload]
        default:
            return state;
    }
}