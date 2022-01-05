import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import Phone from './components/phone/phone'
import Title from './components/title/title'
import Footer from './components/footer/footer'
import { CookiesProvider } from 'react-cookie';
import Background from './components/background/background'

ReactDOM.render(
  <React.StrictMode>
    <Background/>
    <Title />
    <CookiesProvider>
      <Phone>
        <App />
      </Phone>
    </CookiesProvider>
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);