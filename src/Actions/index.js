
import axios from 'axios';
import { async } from 'q';


var currentUser;
export const fetchUser = () => async dispatch => {
    const response = await axios({
        method:"GET",
        url:'http://localhost:9000',
        withCredentials:true
    })

    if(response.data.user){
        currentUser = response.data.user.id
    }
  



  

    dispatch({
        type: "FETCH_USER",
        payload:response.data.user
    })
}

async function getCurrentUser(){
    const response = await axios({
        method:"GET",
        url:'http://localhost:9000',
        withCredentials:true
    })

    

    if(response.data.user){
    
        return response.data.user.id;
    }
    
   
   


}


async function checkProduct(productId, userId){
    const product = await axios({
        method:"POST",
        url:'http://localhost:9000/api/v1/user/shopCart/product',
        data:{
            productId,
            userId

        },
       
        withCredentials:true
    })
   

    return product;

}

async function addItemToUserCart(product){
    try{
        const productIn = await axios({
            method:"POST",
            url:'http://localhost:9000/api/v1/user/shopCart/',
            data:product,
           
            withCredentials:true
        })
        
    }catch(err){
        console.log(err.response)
    }

}

async function updateCartItemQuantity(productId,quantity, userId){
    try{
        const productIn = await axios({
            method:"PATCH",
            url:`http://localhost:9000/api/v1/user/shopCart/${productId}`,
            data:{
                quantity,
                userId
            },
           
            withCredentials:true
        })
       
    }catch(err){
        console.log(err.response)
    }

}

//get total cart items of the user
export const getTotalCartItems = () => async dispatch =>{
    const currentUser = await getCurrentUser();
  
  
    let totalCart;
    
        totalCart = await axios({
            method:"GET",
            url:`http://localhost:9000/api/v1/user/shopCart/cart/${currentUser}`,
           
           
            withCredentials:true
        })
        
        
   
    dispatch({
        type: "CART_ITEMS_TOTAL",
        payload: totalCart.data.results.shopCart
    })

}

export const getCartItemsList = () => async dispatch =>{
    const currentUser = await getCurrentUser();
  
  
    let totalCart;
    
        totalCart = await axios({
            method:"GET",
            url:`http://localhost:9000/api/v1/user/shopCart/cart/${currentUser}`,
           
           
            withCredentials:true
        })
        
        
   
    dispatch({
        type: "CART_ITEMS_LIST",
        payload: totalCart.data.results.shopCart
    })

}



export const addToCart = (cartItem) => async dispatch => {
    const productId = cartItem.product;
    let quantity = cartItem.quantity;
    const userId = cartItem.user;
    
    
    const alreadyAdded = await checkProduct(productId, userId)
    await getTotalCartItems();
    

    

    if(alreadyAdded.data.result.shopCart != null){
     
        if(alreadyAdded.data.result.shopCart.quantity <= 0 && quantity < 0){
            quantity = 0;
        }
      await updateCartItemQuantity(productId,quantity, userId )
      window.location.reload()

    }else{
        await addItemToUserCart(cartItem);
        window.location.reload()
    }

    await getTotalCartItems();
   
    dispatch({
        type: "PRODUCT_CART",
        payload:'product added to cart'
    })

}
