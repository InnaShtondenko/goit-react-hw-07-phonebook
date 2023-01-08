import { Box } from './Box/Box.styled'; 
import { ContactForm } from './Form/Form';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';


export function App() {
    return (
        <Box
          width="wide"
          m={[3]}
          p={[3]}
          textAlign="center"
          borderRadius="small"
          boxShadow="medium"
        >
          <Box margin="0 auto" color="textColor">
            <h1>Phonebook</h1>
            <ContactForm />

            <Box
              width={0.85}
              margin="0 auto"
              mt={[4]}
              borderColor="accentSecondary"
              color="textColorSecondary"
            >
              <h2>Contacts</h2>
              <Filter />
              <ContactList />
            </Box>
          </Box>
        </Box>
    );
  }