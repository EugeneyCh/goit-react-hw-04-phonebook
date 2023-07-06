import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ListContacts from './ListContacts/ListContacts';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import Contact from './Contact/Contact';
import css from './App.module.css';

function App() {
  const [state, setState] = useState({
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
  });
  const [filter, setFilter] = useState('');
  // state = {
  //   contacts: [
  //     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ],
  //   filter: '',
  // };

  useEffect(() => {
    console.log('App componentDidMount');
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      setState({ contacts: parsedContacts });
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(state.contacts));
  }, [state.contacts]);

  const formSubmitHandler = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    checkNameToSame(name)
      ? alert(`${name} is already in contacts`)
      : addNewContact(newContact);
  };

  const checkNameToSame = name => {
    const lowerCaseNewName = name.toLowerCase();
    return state.contacts.some(
      contact => contact.name.toLowerCase() === lowerCaseNewName
    );
  };

  const addNewContact = newContact => {
    setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));
  };

  const changeFilter = e => {
    setFilter: e.currentTarget.value;
  };

  const getVisibleContacts = () => {
    // const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setState(prevState => ({
      contacts: state.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  // const { filter } = this.state;

  const visibleContacts = getVisibleContacts();

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />
      <div className={css.contactList}>
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ListContacts
          children={
            <Contact
              contacts={visibleContacts}
              onDeleteContact={deleteContact}
            />
          }
        />
      </div>
    </div>
  );
}

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default App;
