import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user : null,
    address : null

}
 export const userSlice = createSlice({
   name : 'userSlice',
     initialState,
     reducers : {
        addUser: (state, action) => {
           state.user = action.payload
          },
        removeUser : (state,action) => {
            state.user = null
        },
        addAddress : (state,action) => {
          state.address = action.payload
        }
        
      
     }
 })
 export const  {addUser,removeUser,addAddress} = userSlice.actions
 export default userSlice.reducer

