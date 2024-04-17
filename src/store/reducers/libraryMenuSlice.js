import {createSlice} from "@reduxjs/toolkit";

const initialState = {show: true, panelTitle: "Mockup", childProps: ""};

export const libraryPanelSlice = createSlice({
  name: "libraryPanel",
  initialState,
  reducers: {
    toggleLibraryPanel: (state, action) => {
      state.show = action.payload.show;
      state.panelTitle = action.payload.panelTitle;
      state.subChild = action.payload.subChild || "";
    }
  }
});

// Action creators are generated for each case reducer function
export const {toggleLibraryPanel} = libraryPanelSlice.actions;

export default libraryPanelSlice.reducer;
