import { useSelector } from 'react-redux';

import { getFilter } from 'redux/selectors';
import { useGetContactsQuery } from 'redux/contactsAPISlice';

import { ContactListItem } from './ContactListItem/ContactListItem';
import { ContactsList } from './ContactList.styled';


export function ContactList() {
  const { data: contactsData, error, isLoading } = useGetContactsQuery();
  const filterValue = useSelector(getFilter);
  

  const filteredContacts = (() => {
    const normalizedFilter = filterValue.toLowerCase().trim();

    if (!normalizedFilter) {
      return null;
    }
    return contactsData.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  })();

  return (
    <ContactsList>
      {isLoading && <p>Contacts are loading...</p>}
      {error && <p>Oops, something went wrong. Try again</p>}
      {contactsData &&
        (filteredContacts ?? contactsData).map(contactData => (
          <ContactListItem
            key={contactData.id}
            contactData={contactData}
          />
        ))}
    </ContactsList>
  );
}