import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  images: [],
}

export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setImage: (state, action) => {
      state = action.payload;
      console.log(state);
    },
  },
})

export const { setImage } = imageSlice.actions

export default imageSlice.reducer