
export default (state = [], action) => {
   
    switch(action.type){
        case "CART_ITEMS_LIST":
            return [...state, action.payload]
        default:
            return state;
    }
}