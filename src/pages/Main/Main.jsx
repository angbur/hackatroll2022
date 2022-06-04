import React from 'react';
import SerpLinks from '../Serp/SerpLinks';
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

  return (
    <div className="App">
      {addImagesToContainer()}
      <SerpLinks imageUrl="https://cdn.glitch.global/3e314939-5f7d-44fb-905d-2d8c3bda3995/marmot_wolf_hedgehog_edited.jpg?v=1654343910802" />
    </div>
  );
};

export default Main;
