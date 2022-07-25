import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import s from './containerApp.module.css';

export const App = () => {
  return (
    <div className={s.containerApp}>
      <h1>Phone Book</h1>
      <ContactForm />
      <div className={s.containerContacts}>
        <h2>Contacts</h2>
        <Filter />

        <ContactList />
      </div>
    </div>
  );
};