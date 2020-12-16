import React, { useState, useEffect } from 'react';
import moment from 'moment';
import ContentEditable from 'react-contenteditable';
// import { checkContent } from '../api';
import ExperienceList from './ExperienceList';

const Resume = () => {
  const [title, setTitle] = useState('Your resume');
  const [name, setName] = useState('Your Name');
  const [role, setRole] = useState('Your next desired role?');
  const [phone, setPhone] = useState('Phone');
  const [email, setEmail] = useState('Email');
  const [website, setWebsite] = useState('Website/Link');
  const [location, setLocation] = useState('Location');

  const [lastEdited, setLastEdited] = useState(moment());
  const [lastEditedDisplayValue, setLastEditedDisplayValue] = useState('just now');

  const updateTitle = value => {
    setName(value);
    setTitle(`${value}'s resume`);
  };

  const updateLastEditedDisplayValue = (last) => {
    const now = moment();
    const difference = now.diff(last, 'minutes');

    if (difference >= 1 && difference < 60) {
      setLastEditedDisplayValue(`${difference} minutes ago`);
    } else if (difference >= 60) {
      setLastEditedDisplayValue(last.format('hh:mm'));
    } else {
      return setLastEditedDisplayValue('just now');
    }
  };

  useEffect(() => {
    setLastEditedDisplayValue('just now');
    const oneMinuteAgo = moment().subtract(1, 'minutes');
    const interval = setInterval(() => updateLastEditedDisplayValue(oneMinuteAgo), 60000);

    return () => clearInterval(interval);
  }, [lastEdited]);

  useEffect(() => {
    setLastEdited(moment());
  }, [name, role, phone, email, website, location]);

  return (
    <div className="content-mid">
      <div className="row navbar-mid" />
      <div className="row header">
        <div className="col resume-name-wrapper">
          <span className="resume-name">Resume name:</span>
          <span className="your-resume">{title}</span>
        </div>
        <div className="col last-edited-wrapper">
          <span className="saved">Saved</span>
          <i className="fas fa-check" />
          <span className="last-edited-text">Last edited </span>
          <span className="last-edited-date">{lastEditedDisplayValue}</span>
        </div>
      </div>
      <div className="row main-page">
        <div className="col">
          <div className="row">
            <div className="name">
              <ContentEditable html={name} onChange={e => updateTitle(e.target.value)} />
            </div>
          </div>
          <div className="row">
            <div className="your-next-desired-role">
              <ContentEditable html={role} onChange={e => setRole(e.target.value)} />
            </div>
          </div>
          <div className="row user-details-wrapper">
            <div className="col phone-wrapper">
              <div className="phone-icon">
                <i className="fas fa-phone-alt" />
              </div>
              <ContentEditable html={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <div className="col email-wrapper">
              <div className="email-icon">
                <i className="fas fa-at" />
              </div>
              <ContentEditable html={email} onChange={e => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="row user-details-wrapper">
            <div className="col website-link-wrapper">
              <div className="website-link-icon">
                <i className="fas fa-link" />
              </div>
              <ContentEditable html={website} onChange={e => setWebsite(e.target.value)} />
            </div>
            <div className="col location-wrapper">
              <div className="location-icon">
                <i className="fas fa-map-marker-alt" />
              </div>
              <ContentEditable html={location} onChange={e => setLocation(e.target.value)} />
            </div>
          </div>
          <div className="row experience">
            <div>
              <span>EXPERIENCE</span>
            </div>
          </div>
          <ExperienceList setLastEdited={setLastEdited.bind(moment())} />
        </div>
        <div className="col">
          <div className="main-user-image">
            <i className="fas fa-user-circle" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
