import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import Phone from './components/phone/phone'
import Title from './components/title/title'
import Footer from './components/footer/footer'

ReactDOM.render(
  <React.StrictMode>
    <Title/>
    <Phone>
      <App/>
    </Phone>
    <Footer/>
  </React.StrictMode>,
  document.getElementById('root')
);