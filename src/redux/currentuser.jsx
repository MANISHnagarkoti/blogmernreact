import { createSlice } from "@reduxjs/toolkit";

export const dataStore = createSlice({
  name: "user",

  initialState: {
    userLogin: false,
    userData: {},
    editBlogId: "",
  },

  reducers: {
    setuser(state, action) {
      return {
        ...state,
        userLogin: true,
        userData: action.payload,
      };
    },

    removeuser(state, action) {
      return {
        ...state,
        userLogin: false,
        userData: {},
      };
    },

    editBlogIdFunction(state, action) {
      return {
        ...state,
        editBlogId: action.payload,
      };
    },

    profilePicUpdateFunction(state, action) {
      return {
        ...state,
        userData: { ...state.userData, profilepic: action.payload },
      }
    },
    profileNameUpdateFunction(state, action) {
      return {
        ...state,
        userData: { ...state.userData, username : action.payload },
      }
    },

  },
});

export const { removeuser, setuser, editBlogIdFunction , profilePicUpdateFunction  , profileNameUpdateFunction} = dataStore.actions;

export default dataStore.reducer;

// thunk

// export function fetchProduct() {

//   return async function fetchProductThunk(dispatch) {

//     try {

//       let data = await fetch(`https://api.pujakaitem.com/api/products`)

//       let fetchdata = await data.json()

//       dispatch(totaldata(fetchdata))

//       dispatch(add(fetchdata))

//       dispatch(isloading(false))

//     } catch (eror) {

//       // console.log(eror)

//       // dispatch(errors())

//     }

//   }

// }
