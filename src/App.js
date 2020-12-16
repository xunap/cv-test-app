import React from 'react';
import Resume from './components/Resume';
import './App.css';

const App = () => (
  <div className="container">
    <div className="grid-row">
      <div className="content-left">
        <ul className="navbar-left">
          <li className="nav-item active">
            <a className="nav-link" href="/">
              <img src={`${process.env.PUBLIC_URL}/logo.png`} className="logo" alt="logo" />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Dashboard</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Help</a>
          </li>
        </ul>
      </div>
      <div className="content-right">
        <ul className="navbar-right">
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="far fa-bell" />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="fas fa-user-circle" />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="fas fa-caret-down" />
            </a>
          </li>
        </ul>
      </div>
      <Resume />
    </div>
  </div>
);

export default App;
