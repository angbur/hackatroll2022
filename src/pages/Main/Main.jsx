import React from 'react';
import './Main.css';
import './Main.scss';

const Main = () => {
  chrome.runtime.onMessage.addListener(function (
    message,
    sender,
    sendResponse
  ) {
    addImagesToContainer(message);
    sendResponse('OK');
  });

  const addImagesToContainer = (urls) => {
    document.write(JSON.stringify(urls));
    console.log(JSON.stringify(urls));
  };

  return <div className="App">{addImagesToContainer()}</div>;
};

export default Main;
