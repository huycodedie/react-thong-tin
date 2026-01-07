import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: '',
  name: '',
  email: '',
  image_user: '',
  access_token: '',
  sex: '',
  date: '',
  sdt: '',
  roles: ''
}

export const userSlide = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { _id, name , email, image_user, access_token, sex, date, phone, roles} = action.payload
      state.id = _id
      state.name = name;
      state.email = email;
      state.image_user = image_user;
      state.access_token = access_token;
      state.sex = sex;
      state.date = date;
      state.sdt = phone;
      state.roles = roles;
    },

    resetUser: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.image_user = "";
      state.access_token = "";
      state.sex = "";
      state.date = "";
      state.sdt = "";
      state.roles = ""
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer