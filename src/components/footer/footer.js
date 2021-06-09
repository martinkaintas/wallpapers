import React from 'react'

import './footer.scss'

const url = 'https://martinkaintas.github.io/'

function Footer() {

  return (
    <div className="footer__wrapper">
      <div className="footer__content">
        made with ❤ by <a href={url} target="_blank" rel="noreferrer">@martinkaintas</a>
      </div>
    </div>
  );
}

export default Footer;
