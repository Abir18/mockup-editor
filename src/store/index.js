import { configureStore } from "@reduxjs/toolkit";
import activeObjectReducer from "./reducers/activeObjectSlice";
import libraryPanelReducer from "./reducers/libraryMenuSlice";
export const store = configureStore({
  reducer: {
    activeObject: activeObjectReducer,
    libraryPanel: libraryPanelReducer,
  },
});
