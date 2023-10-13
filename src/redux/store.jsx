import { configureStore } from '@reduxjs/toolkit'
import currentuser from "../redux/currentuser"


export default configureStore({
    reducer: {

     currentUser: currentuser,
   

    }
})