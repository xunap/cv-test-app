import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'react-tooltip-lite';
// import { v4 as uuidv4 } from 'uuid';
import reactHtmlReplace from 'react-html-replace';
// import { checkContent } from '../api';

// const checkContentServiceFields = ['title', 'companyName', 'companyDescription'];

const Experience = ({
  title,
  companyName,
  datePeriod,
  location,
  companyDescription,
  onNew,
  onDelete,
  isEditing,
  setExpItemValue,
  contentErrors,
  ...moreProps
}) => {
  const renderText = (key, text) => {
    const contentErrorsForCurKey = contentErrors.filter(({ key: contentErrorKey }) => contentErrorKey === key);
    if (!contentErrorsForCurKey.length) {
      return (
        <span suppressContentEditableWarning contentEditable onBlur={e => setExpItemValue(key, e.target.innerHTML)} dangerouslySetInnerHTML={{ __html: text }} />
      );
    }

    const transformSpansToTooltips = text.split('');

    contentErrorsForCurKey.forEach(({ id, range, message }) => {
      transformSpansToTooltips[range[0]] = `<span data-id="${id}">`.concat(transformSpansToTooltips[range[0]]);
      transformSpansToTooltips[range[1]] = '</span>'.concat(transformSpansToTooltips[range[1]]);
    });

    const transformedHtml = transformSpansToTooltips.join('');

    return (
      <span suppressContentEditableWarning contentEditable onBlur={e => setExpItemValue(key, e.target.innerHTML)}>
        {reactHtmlReplace(transformedHtml, (tag, attr) => {
          debugger;
          if (tag === 'span') {
            const curContentError = contentErrorsForCurKey.find(({ id }) => id === attr['data-id']);
            const { text, message, range } = curContentError;

            const contentImprovement = (
              <div className="content-improvement">
                <div className="row">
                  <div className="col">
                    <i className="fas fa-list-alt" />
                    <span className="content-improvement-text">Content Improvement</span>
                  </div>
                  <div className="col" style={{ textAlign: 'end' }}>
                    <input type="checkbox" className="content-message-ignore-checkbox" onChange={() => {}} />
                    <span className="content-message-ignore-text">Ignore</span>
                  </div>
                </div>
                <div className="row">
                  <span className="content-message-text">{attr.message}</span>
                </div>
              </div>
            );

            return (
              <Tooltip tagName="span" className="error" direction="bottom" content={contentImprovement}>
                <span onInput={() => { console.log('A correction was made'); }}>{attr.value}</span>
              </Tooltip>
            );
          }
          debugger;
        })}
      </span>
    );
  };

  return (
    <div className={`experience-item ${isEditing ? 'hover' : ''}`} {...moreProps}>
      <div className={`experience-new-entry-wrapper ${isEditing ? '' : 'hidden'}`}>
        <button className="experience-new-entry-plus" onClick={onNew}>
          <i className="fas fa-plus" />
        </button>
        <span className="experience-new-entry-text">New entry</span>
        <button className="experience-new-entry-delete" onClick={onDelete}>
          <i className="fas fa-trash-alt" />
        </button>
      </div>
      <div className="experience-item-details-wrapper">
        <div className="row">
          <div className="title">
            {renderText('title', title)}
          </div>
        </div>
        <div className="row company-name">
          {renderText('companyName', companyName)}
        </div>
        <div className="row company-date-place-wrapper">
          <div className="date-wrapper">
            <div className="date-icon">
              <i className="fas fa-calendar" />
            </div>
            {renderText('datePeriod', datePeriod)}
          </div>
          <div className="location-wrapper">
            <div className="location-icon">
              <i className="fas fa-map-marker-alt" />
            </div>
            {renderText('location', location)}
          </div>
        </div>
        <div className="row company-description">
          {renderText('companyDescription', companyDescription)}
        </div>
      </div>
    </div>
  );
};

Experience.propTypes = {
  title: PropTypes.string,
  companyName: PropTypes.string,
  datePeriod: PropTypes.string,
  location: PropTypes.string,
  companyDescription: PropTypes.string,
  default: PropTypes.bool,
  isEditing: PropTypes.bool,
  onNew: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  setExpItemValue: PropTypes.func.isRequired,
  contentErrors: PropTypes.array.isRequired,
};

export default React.memo(Experience);
