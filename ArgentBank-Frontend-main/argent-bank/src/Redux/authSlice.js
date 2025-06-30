import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
  user: null, 
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token
    },
    logout: (state) => {
      state.token = null
      state.user = null
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    updateUsernameSuccess: (state, action) => {
      if (state.user) {
        state.user.userName = action.payload
      }
    },
  },
})

export const { loginSuccess, logout, setUser, updateUsernameSuccess } = authSlice.actions
export default authSlice.reducer
