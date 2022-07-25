import { useState, useEffect } from 'react';
import {
  useGetContactsQuery,
  useAddContactMutation,
} from '../../API/contactsApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import s from './ContactForm.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const { data: contacts } = useGetContactsQuery();
  const [addContact, { isSuccess }] = useAddContactMutation();

  useEffect(() => {
    if (isSuccess) {
      setName('');
      setNumber('');
    }
  }, [isSuccess]);

  const handleInputNameChange = e => {
    const { value } = e.currentTarget;
    setName(value);
  };

  const handleInputNumberChange = e => {
    const { value } = e.currentTarget;
    setNumber(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const isContactExist = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isContactExist) {
      toast.warn(`${name} is already in contact`, {
        theme: 'colored',
        autoClose: 4000,
        pauseOnHover: true,
        closeOnClick: true,
      });
    } else {
      addContact({ name, number });
    }
  };

  return (
    <>
      <form className={s.form} action="submit" onSubmit={handleSubmit}>
        <label className={s.form__label}>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={handleInputNameChange}
          />
        </label>
        <label className={s.form__label}>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleInputNumberChange}
          />
        </label>
        <button className={s.submitBtn} type="submit">
          Add contact
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default ContactForm;
