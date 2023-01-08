import { useSelector } from 'react-redux';

import { getContacts, getFilter } from 'redux/selectors';

import { ContactListItem } from './ContactListItem/ContactListItem';
import { ContactsList } from './ContactList.styled';


export function ContactList(){
  const filterValue = useSelector(getFilter);
  const contactsData = useSelector(getContacts);

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
      {(filteredContacts ?? contactsData).map(contactData => (
        <ContactListItem
          key={contactData.id}
          contactData={contactData}
        />
      ))}
    </ContactsList>
  );
}