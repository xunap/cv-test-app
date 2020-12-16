import React, { useState, useEffect } from 'react';
import moment from 'moment';
import ContentEditable from 'react-contenteditable';
import ExperienceList from './ExperienceList';

const Resume = () => {
  const yourResumeDefault = 'Your resume';
  const yourNameDefault = 'Your Name';
  const yourRoleDefault = 'Your next desired role?';
  const phoneDefault = 'Phone';
  const emailDefault = 'Email';
  const websiteLinkDefault = 'Website/Link';
  const locationDefault = 'Location';

  const [title, setTitle] = useState(yourResumeDefault);
  const [name, setName] = useState(yourNameDefault);
  const [role, setRole] = useState(yourRoleDefault);
  const [phone, setPhone] = useState(phoneDefault);
  const [email, setEmail] = useState(emailDefault);
  const [websiteLink, setWebsiteLink] = useState(websiteLinkDefault);
  const [location, setLocation] = useState(locationDefault);

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
  }, [name, role, phone, email, websiteLink, location]);

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
            <div className={`name ${name === yourNameDefault ? 'opaque' : ''}`}>
              <ContentEditable className="name-text" html={name} onChange={e => updateTitle(e.target.value)} />
            </div>
          </div>
          <div className="row">
            <div className={`role ${role === yourRoleDefault ? 'opaque' : ''}`}>
              <ContentEditable html={role} onChange={e => setRole(e.target.value)} />
            </div>
          </div>
          <div className="row user-details-wrapper">
            <div className={`col phone-wrapper ${phone === phoneDefault ? 'opaque' : ''}`}>
              <div className="phone-icon">
                <i className="fas fa-phone-alt" />
              </div>
              <ContentEditable html={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <div className={`col email-wrapper ${email === emailDefault ? 'opaque' : ''}`}>
              <div className="email-icon">
                <i className="fas fa-at" />
              </div>
              <ContentEditable html={email} onChange={e => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="row user-details-wrapper">
            <div className={`col website-link-wrapper ${websiteLink === websiteLinkDefault ? 'opaque' : ''}`}>
              <div className="website-link-icon">
                <i className="fas fa-link" />
              </div>
              <ContentEditable html={websiteLink} onChange={e => setWebsiteLink(e.target.value)} />
            </div>
            <div className={`col location-wrapper ${location === locationDefault ? 'opaque' : ''}`}>
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
