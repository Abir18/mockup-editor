import { createSlice } from "@reduxjs/toolkit";

const initialState = { type: null, id: "" };

export const activeObjectSlice = createSlice({
  name: "activeObject",
  initialState,
  reducers: {
    changeActiveObject: (state, action) => {
      state.type = action.payload.type;
      state.id = action.payload.id;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeActiveObject } = activeObjectSlice.actions;

export default activeObjectSlice.reducer;
