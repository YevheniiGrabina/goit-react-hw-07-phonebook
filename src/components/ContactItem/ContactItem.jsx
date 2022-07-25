import s from './ContactItem.module.css';
import { useDeleteContactMutation } from '../../API/contactsApi';

const ContactItem = ({ contact }) => {
  const [deleteContact, { isLoading }] = useDeleteContactMutation();
  const { id, name, phone } = contact;
  return (
    <li className={s.contactItem}>
      <div className={s.contactContainer}>
        <p className={s.contactName}>{name}</p>
        <p className={s.contactPhone}>{phone}</p>
      </div>

      <button
        type="button"
        onClick={() => deleteContact(id)}
        disabled={isLoading}
      >
        {isLoading ? 'Deleting...' : 'Delete'}
      </button>
    </li>
  );
};

export default ContactItem;
