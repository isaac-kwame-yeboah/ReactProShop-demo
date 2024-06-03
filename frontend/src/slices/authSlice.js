            // Set User Credentials To Local Storage And Remove them // 

import { createSlice } from "@reduxjs/toolkit"; 


     // Create InitialState || Global State //  
     const initialState = {
          // check if userInfo exist in local storage // 
          userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
     }  


            // Create authReducer state //
     const authSlice = createSlice({
        name: "auth",
        initialState,
        reducers: {
             /* Any Functions that have to do with the auth */  
           // Note: Reducer Function takes in State && Action // 

              /* set credentials Function for local storage */ 
            setCredentials: (state, action) => {
      // set userInfo state to the payload of data - (name, email, id)  //
                state.userInfo = action.payload; 

                 // store userInfo in localStorage // 
                 localStorage.setItem("userInfo", JSON.stringify(action.payload));
            }, 


             // clear credentials from local storage // 
             logout: (state, action) => {
                    state.userInfo = null;
                    localStorage.removeItem("userInfo");
             }


        }
     }); 


     export  const {setCredentials, logout} = authSlice.actions;

     export default authSlice.reducer;