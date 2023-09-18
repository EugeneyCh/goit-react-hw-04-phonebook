import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

function ContactForm({ onSubmit }) {
  const [user, setUser] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setUser(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };
  const handleFormSubmit = e => {
    e.preventDefault();
    console.log('New data = ', user, number);
    onSubmit(user, number);
    reset();
  };

  const reset = () => {
    setUser('');
    setNumber('');
  };

  return (
    <form className={css.formEditor} onSubmit={handleFormSubmit}>
      <label>
        Name
        <input
          className={css.inputArea}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={user}
          onChange={handleChange}
        />
      </label>
      <label>
        Phone
        <input
          className={css.inputArea}
          type="tel"
          name="number"
          pattern="\+?[0-9\s-()]+"
          // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
        />
      </label>
      <button className={css.contactButton} type="submit">
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  // handleFormSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  // handleChange: PropTypes.func.isRequired,
};

export default ContactForm;
