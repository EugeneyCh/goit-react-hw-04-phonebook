import React from 'react';
import PropTypes from 'prop-types';

import css from './ListContacts.module.css';

function ListContacts({ children }) {
  return <ul className={css.contactList}>{children}</ul>;
}

ListContacts.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ListContacts;
