import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'contacts',
  storage,
}
const contactsInitialState = { contacts: [] };

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    addContact(state, { payload }) {
      state.contacts.push(payload);
    },
    removeContact(state, { payload: idToDelete }) {
      return {
        contacts: state.contacts.filter(({ id }) => id !== idToDelete),
      };
    },
  },
});

export const { addContact, removeContact } = contactsSlice.actions;
export const persistedContactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);