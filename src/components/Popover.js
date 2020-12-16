import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'react-tooltip-lite';
import { checkContent } from '../api';

const checkContentServiceFields = ['title', 'companyName', 'companyDescription'];

const Popover = ({ key, value }) => {
  console.log('rendering value');

  if (checkContentServiceFields.includes(key)) {
    const contentErrors = checkContent(value);
    if (contentErrors) {
      return (
        <Tooltip tagName="span" direction="bottom" content="First Tooltip">
          <span className="error" contentEditable="false">ERROR 1</span>
          <Tooltip tagName="span" direction="bottom" content="Second Tooltip">
            <span className="error" contentEditable="false">ERROR 2</span>
          </Tooltip>
        </Tooltip>
      );
    }
  }
  return value;
};

Popover.propTypes = {
  key: PropTypes.string,
  value: PropTypes.string,
};

export default React.memo(Popover);
