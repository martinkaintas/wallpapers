import React, { useEffect } from 'react';
import Swipe from '../swipe/swipe'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';

import './phone.scss'


function Phone(props) {
  const notify = () => toast.info('👆 Click on the download button to save your selected image in full resolution 🐠', {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const [cookies, setCookie] = useCookies(['downloadInfo']);

  useEffect(() => {
    if (cookies.downloadInfo) {
      return
    } else {
      setCookie('downloadInfo', true, { path: '/' });
      notify()
    }
  }, [cookies, setCookie]);

  return (
    <div className="phone__wrapper">
      <ToastContainer />
      <div className="phone__loader"></div>
      <div className="phone__phone">
        {props.children}
      </div>
      <Swipe />
    </div>
  );
}

export default Phone;
