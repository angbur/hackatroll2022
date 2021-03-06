import React, { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import './Popup.css';

const Popup = () => {
  const grabImages = () => {
    const images = document.querySelectorAll('img');
    return Array.from(images).map((image) => image.src);
  };

  const openImagesPage = (urls) => {
    chrome.tabs.create({ url: 'main.html', selected: false }, (tab) => {
      setTimeout(() => {
        chrome.tabs.sendMessage(tab.id, urls, (resp) => {
          chrome.tabs.update(tab.id, { active: true });
        });
      }, 100);
    });
  };

  const onResult = (frames) => {
    if (!frames || !frames.length) {
      alert('Could not retrieve images from specified page');
      return;
    }

    const imageUrls = frames
      .map((frame) => frame.result)
      .reduce((r1, r2) => r1.concat(r2));
    openImagesPage(imageUrls);
  };

  const execScript = (tab) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id, allFrames: true },
        func: grabImages,
      },
      onResult
    );
  };

  const handleClick = () => {
    chrome.tabs.query({ active: true }, function (tabs) {
      const tab = tabs[0];
      if (tab) {
        execScript(tab);
      } else {
        alert('There are no active tabs');
      }
    });
  };


  function injectedFunction() {
    const images = document.querySelectorAll('img');
    const mySvg = document.createElement('img');
    mySvg.style.position = 'absolute';
    mySvg.src = 'https://cdn.glitch.global/3e314939-5f7d-44fb-905d-2d8c3bda3995/troll.svg?v=1654385849937';
    Array.from(images).map((img,id)=>{
      img.style.position = 'relative';
      //img.style.setProperty()
      return img
  });
    
  }

  

  useEffect(()=> {
    chrome.tabs.query({active:true}, function (tabs){
      const tab = tabs[0];
      if (tab) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: injectedFunction
        });
      } else {
        alert('There are no active tabs');
      }
    })
  },[]);

  return (
    <div className="App">
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Button
          variant="contained"
          onClick={handleClick}
          sx={{ margin: '2rem' }}
        >
          Wyszukaj zdj??cia
        </Button>
      </Box>
    </div>
  );
};

export default Popup;
