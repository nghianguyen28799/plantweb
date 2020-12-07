import React from 'react';

import onlineIcon from '../icons/onlineIcon.png';
import closeIcon from '../icons/closeIcon.png';

import './InfoBar.css';

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>Admin</h3>
    </div>
    <div className="rightInnerContainer">
      <a>
        <label for="message">
          <img src={closeIcon} alt="close icon" className="close-message"/>
        </label>
      </a>
    </div>
  </div>
);

export default InfoBar;