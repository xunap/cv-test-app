import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Experience from './Experience';
import { checkContent } from '../api';

const checkContentServiceFields = ['title', 'companyName', 'companyDescription'];

const ExperienceList = ({ setLastEdited }) => {
  const defaultItem = {
    title: 'Title',
    companyName: 'Company Name',
    datePeriod: 'Date period',
    location: 'Location',
    companyDescription: 'Company Description',
    id: uuidv4(),
  };

  const [items, setItems] = useState([defaultItem]);
  const [editIndex, setEditIndex] = useState(-1);
  const [contentErrors, setContentErrors] = useState([]);
  const minItems = 1;
  const maxItems = 7;

  const onNew = () => {
    if (items.length >= maxItems) {
      return;
    }

    setItems(arr => [...arr, defaultItem]);
  };

  const onDelete = (i) => {
    if (items.length <= minItems) {
      return;
    }

    items.splice(i, 1);
    setItems(items);
    setEditIndex(-1);
  };

  const updateContentErrors = (index, key, text) => {
    if (checkContentServiceFields.includes(key) && !text.includes('class="error"')) {
      const contentErrorsFromApi = checkContent(text);
      if (contentErrorsFromApi) {
        const newContentErrors = [];
        contentErrorsFromApi.forEach(({ id, range, message }) => {
          const contentErr = {
            id,
            index,
            key,
            text,
            range,
            message,
            ignored: false,
          };

          newContentErrors.push(contentErr);
        });

        setContentErrors([...contentErrors, ...newContentErrors]);
      }
    }
  };

  const setExpItemValue = (index, key, value) => {
    items[index][key] = value;
    if (key === 'companyName') console.log(value);
    setItems(items);
    setLastEdited();

    updateContentErrors(index, key, value);
  };

  const onMouseEnter = (index) => {
    if (editIndex !== index) {
      setEditIndex(index);
    }
  };

  const onMouseLeave = () => {
    setEditIndex(-1);
  };

  return (
    <div>
      <div className={`overlay ${editIndex >= 0 ? '' : 'hidden'}`} />
      {items.map(({ title, companyName, datePeriod, location, companyDescription, id }, i) => (
        <Experience
          key={id}
          title={title}
          companyName={companyName}
          datePeriod={datePeriod}
          location={location}
          companyDescription={companyDescription}
          isEditing={editIndex === i}
          onNew={onNew}
          onDelete={onDelete.bind(this, i)}
          onMouseEnter={onMouseEnter.bind(this, i)}
          onMouseLeave={onMouseLeave}
          setExpItemValue={setExpItemValue.bind(this, i)}
          contentErrors={contentErrors.filter(({ index }) => index === i)}
        />
      ))
    }
    </div>
  );
};

ExperienceList.propTypes = {
  setLastEdited: PropTypes.func.isRequired,
};

export default React.memo(ExperienceList);
