import { createSlice } from "@reduxjs/toolkit";  
import { updateCart }  from "../utils/cartUtils.js";


      /* InitialState &&  [Adding shippingAddress && Paypal to our InitialState] */ 
         // Note: Items are stored in local Storage // 
 // Check local Storage Item => localStorage.getItem("cart") && If There Is Something There Then JSON.parse whatever is in there // 
          // Else we want initialState To Be An Object{} That Has cartItems Which is an Empty Array[] //
      const initialState = localStorage.getItem("cart") ? JSON.parse 
      (localStorage.getItem("cart")) : {
            cartItems: [], 
            shippingAddress: {},
            paymentMethod: "Paypal"
      };


      
  // Create cartReducer State //   
  const cartSlice = createSlice({
      name: "cart",
      initialState,
      reducers: {
        /* Any Functions that have to do with the cart */  
        // Note: Reducer Function takes in State && Action // 
              // Add to cart Function (Add New Item To Cart)  //
         addToCart: (state, action) => {
            const item = action.payload;
              // check if item exist in the cart //
     const existItem = state.cartItems.find((x) => x._id === item._id); 
           
            if (existItem) {
            state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x)
            } else { 
                  // add new item //
            state.cartItems = [...state.cartItems, item]
            }

              // update local storage //
              return updateCart(state);
      },
 
       
         // Remove from cart (Remove Item From Cart)  // 
            removeFromCart: (state, action) => {
             state.cartItems = state.cartItems.filter((x) => x._id !== action.payload); 

                  // update local storage //
                return updateCart(state);
            }, 
 
 
               // Save Shipping Address // 
               saveShippingAddress: (state, action) => {
                  state.shippingAddress = action.payload;  

                   // update local storage //
                    return updateCart(state);
               },  


                
                 // save Payment Method //
                savePaymentMethod: (state, action) => {
                   state.paymentMethod = action.payload; 

                       // update local storage //
                    return updateCart(state);
                },
                
                

                   //  clear CartItems //
            clearCartItems: (state) => {
               state.cartItems = []; 
               
                   // update local storage //
               return updateCart(state);
             }


            
    }
  });   

  export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems} = cartSlice.actions;
  export default cartSlice.reducer; 
  

  /* 
  state: refers to current state of the cart
  action: will include any data inside payload
 acc: accumulator
 default acc: 0
  */