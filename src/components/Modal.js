import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const Modal = ({ children, title, history }) => (
  <div className="overlay">
    <div className="modal-dial">
      <h2>{title}</h2>
      <div className="content">{children}</div>
      <div className="close-button-container">
        <button onClick={() => history.goBack()} className="close-button">
          <i className="fas fa-times" />
        </button>
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};

export default withRouter(Modal);
