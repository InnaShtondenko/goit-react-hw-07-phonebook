import { Notify } from 'notiflix';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { store } from 'redux/store.js';
import { addContact } from 'redux/contactsSlice';

import {
    AddContactButton,
    AddContactForm,
    InputInfoLabel,
    ContactInput,
} from './Form.styled'; 

export function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const stateMethods = {
    [name]: setName,
    [number]: setNumber,
  };
  const dispatch = useDispatch();

  function isContactWithNameExist(searchName) {
    const {
      contacts: { contacts: contactsData },
    } = store.getState();

    if (!contactsData) return;

    const searchNameNormalized = searchName.trim().toLowerCase();

    return contactsData.some(
      ({ name }) => name.toLowerCase() === searchNameNormalized
    );
  }

  const onSubmit = e => {
    e.preventDefault();

    if (isContactWithNameExist(name)) {
      Notify.warning("Can't add already existing contact");
      return;
    }

    dispatch(addContact({ name, number }));
    setName('');
    setNumber('');
  };

  const onInput = e => {
    const { name: inputName, value: inputValue } = e.target;

    stateMethods[inputName](inputValue);
  };

    return (
      <AddContactForm onSubmit={onSubmit}>
        <InputInfoLabel>
          Name
          <ContactInput
            type="text"
            name={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            autoFocus
            onInput={onInput}
            value={name}
          ></ContactInput>
        </InputInfoLabel>
        <InputInfoLabel>
          Number
          <ContactInput
            type="tel"
            name={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={onInput}
            value={number}
          ></ContactInput>
        </InputInfoLabel>
        <AddContactButton type="submit" cursor="cross">
          Add contact
        </AddContactButton>
      </AddContactForm>
    );
  }