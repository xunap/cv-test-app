import React from 'react';
import { Link } from 'react-router-dom';
import covidImage from '../images/covid.png';

const HeaderComponent = () => (
  <div className="header">
    <Link to="/">
      <img className="header-image" src={covidImage} alt="COVID-19" />
      <br />
      <span><b>Most accurate Coronavirus information system</b></span>
    </Link>
    <br />
    <br />
    <Link to="/countries">
      <span className="button">
        <span className="button-label">Fetch covid data</span>
        <i className="fas fa-cloud-download-alt" />
      </span>
    </Link>
  </div>
);

export default HeaderComponent;
