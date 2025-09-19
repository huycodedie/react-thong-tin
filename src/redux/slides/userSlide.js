import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  email: '',
  image_user: '',
  access_token: ''
}

export const userSlide = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {name , email, image_user, access_token} = action.payload
      // console.log('action',action)
      state.name = name || email;
      state.email = email;
      state.image_user = image_user;
      state.access_token = access_token
    },
    resetUser: (state) => {
      state.name = "";
      state.email = "";
      state.image_user = "";
      state.access_token = ""
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer