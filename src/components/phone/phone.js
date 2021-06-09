import React from 'react';
import Swipe from '../swipe/swipe'
import './phone.scss'


function Phone(props) {
  return (
    <div className="phone__wrapper">
      <div className="phone__loader"></div>
      <div className="phone__phone">
        {props.children}
      </div>
      <Swipe/>
    </div>
  );
}

export default Phone;
