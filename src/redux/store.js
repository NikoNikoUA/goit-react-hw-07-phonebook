import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from '../../src/redux/contactsSlice';
import { filterReducer } from '../../src/redux/filterSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
  },
});
