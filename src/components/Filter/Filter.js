import React from 'react';
import PropType from 'prop-types';
import css from './Filter.module.css';

function Filter({ value, onChange }) {
  return (
    <label className={css.findZone}>
      Find contacts by name
      <input
        className={css.findInput}
        type="text"
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

Filter.propTypes = {
  value: PropType.string.isRequired,
  onChange: PropType.func.isRequired,
};

export default Filter;
