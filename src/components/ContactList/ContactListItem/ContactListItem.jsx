import { PropTypes } from 'prop-types';

import { Box } from 'components/Box/Box.styled';
import { theme } from 'components/utils/Theme.styled';

import { useDeleteContactMutation } from 'redux/contactsAPISlice';
import { ContactInfo, DeleteButton } from './ContactListItem.styled';

export function ContactListItem(
  { contactData: { name, number, id } }) {
  const [deleteContactById, { isLoading, isSuccess }] = useDeleteContactMutation();

  return (
    <Box
      mb={[2]}
      p={[2]}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      border="small"
      borderRadius="big"
      borderColor="#00000039"
      style={{
        boxShadow: theme.shadows.inputInset,
      }}
      transition="box-shadow normal"
      as="li"
    >
      <ContactInfo>
        {name}: {number}
      </ContactInfo>
      <DeleteButton
        disabled={isLoading || isSuccess}
        onClick={() => deleteContactById(id)}
        isDelete={true}
      >
        {isLoading || isSuccess ? 'Deleting' : 'Delete'}
      </DeleteButton>
    </Box>
  );
}

ContactListItem.propTypes = {
  contactsData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
};