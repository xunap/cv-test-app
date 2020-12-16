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
    location: 'New York, NY',
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
    if (checkContentServiceFields.includes(key)) {
      const contentErrorsFromApi = checkContent(text);

      if (contentErrorsFromApi.length) {
        const newContentErrors = [];
        contentErrorsFromApi.forEach(({ id, range, message }) => {
          const contentError = {
            id,
            index,
            key,
            text,
            range,
            message,
            ignored: false,
          };

          if (!contentErrors.some(contentErr => contentErr.message === message)) {
            newContentErrors.push(contentError);
          }
        });

        setContentErrors([...contentErrors, ...newContentErrors]);
      }
    }
  };

  const setExpItemValue = (index, key, value) => {
    items[index][key] = value;
    setItems(items);

    setLastEdited();

    updateContentErrors(index, key, value);
  };

  const ignoreContentError = (id) => {
    const updatedContentErrors = contentErrors
      .map((contentErr) =>
        contentErr.id === id ? {
          ...contentErr,
          ignored: true,
        } : contentErr);

    setContentErrors(updatedContentErrors);

    setLastEdited();

    console.log('Content mistake ', id, ' was ignored.');
  };

  const updateTextWithContentError = (index, id, key, value) => {
    const updatedContentErrors = contentErrors.filter((contentErr) => contentErr.id !== id);
    setContentErrors(updatedContentErrors);

    const contentErr = contentErrors.find((contentErr) => contentErr.id === id);

    const { text, range } = contentErr;
    const badText = text.substring(range[0], range[1]);
    const newText = items[index][key].replace(badText, value);

    items[index][key] = newText;
    setItems(items);

    setLastEdited();

    console.log('Content mistake ', id, ' was corrected.');
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
          defaultItem={defaultItem}
          onNew={onNew}
          onDelete={onDelete.bind(this, i)}
          onMouseEnter={onMouseEnter.bind(this, i)}
          onMouseLeave={onMouseLeave}
          setExpItemValue={setExpItemValue.bind(this, i)}
          contentErrors={contentErrors.filter(({ index, ignored }) => index === i && !ignored)}
          ignoreContentError={ignoreContentError}
          updateTextWithContentError={updateTextWithContentError.bind(this, i)}
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
