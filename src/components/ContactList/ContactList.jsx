import { useSelector } from 'react-redux';
import ContactItem from '../ContactItem/ContactItem';
import { getFilter } from '../../redux/selectors';
import { useGetContactsQuery } from '../../API/contactsApi';
import s from './ContactList.module.css';

const ContactList = () => {
  const filter = useSelector(getFilter);
  const { data: contacts = [], error, isLoading } = useGetContactsQuery();

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts
      .filter(contact => {
        return contact.name.toLowerCase().includes(normalizedFilter);
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  const filteredContacts = getFilteredContacts();

  return (
    <ul className={s.contactList}>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error!</p>}

      {filteredContacts.map(({ id, name, phone }) => {
        return <ContactItem key={id} contact={{ id, name, phone }} />;
      })}
    </ul>
  );
};


export default ContactList;
