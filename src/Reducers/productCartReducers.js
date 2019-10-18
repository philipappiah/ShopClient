const INITIAL_STATE = {
    productName:''
    
  };
export default (state = [], action) => {
   
    switch(action.type){
        case "PRODUCT_CART":
            return [...state, action.payload]
       
        default:
            return state;
    }
}