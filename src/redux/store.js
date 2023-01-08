import { configureStore } from "@reduxjs/toolkit";
import { phonebookAPI } from "./contactsAPISlice";

import { filterReducer } from "./filterSlice"; 


export const store = configureStore({
  reducer: {
    [phonebookAPI.reducerPath]: phonebookAPI.reducer,
    filter: filterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(phonebookAPI.middleware),
});