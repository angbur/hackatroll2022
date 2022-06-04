import React from 'react';
import logo from '../../assets/img/logo.svg';
import './Newtab.css';
import './Newtab.scss';

const Newtab = () => {
  
  chrome.runtime.onMessage
    .addListener(function(message,sender,sendResponse) { 
        addImagesToContainer(message);               
        sendResponse("OK");
    });


    
    const addImagesToContainer = (urls) => {
      document.write(JSON.stringify(urls));
      console.log(JSON.stringify(urls))
  }

  
  return (
    <div className="App">
      {addImagesToContainer()}
    </div>
  );
};

export default Newtab;
