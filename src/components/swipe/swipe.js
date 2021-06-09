import React from 'react'

import './swipe.scss'

import swipe from '../../assets/icons/swipe.png'

function Swipe() {

  return (
    <div className="swipe__wrapper">
      <img src={swipe} alt="swipe" draggable="false" />
    </div>
  );
}

export default Swipe;
