import {
  Box,
  Button,
  CardActions,
  CardMedia,
  Collapse,
  Divider,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import ObjectDetector from '../ObjectDetector/ObjectDetector';
import SerpLinks from '../Serp/SerpLinks';
import './Main.css';
import './Main.scss';

const Main = () => {
  const [imageList, setImageList] = useState([]);
  const [url, setUrl] = useState('');
  const [ expand, setExpand ] = useState(false);

  const handleStartAnalysis = (event) => {
      event.preventDefault();
      setUrl(event.target.value);
      setExpand(true)
  };

  useEffect(() => {
    const getImageList = (message, sender, sendResponse) => {
      setImageList(message);
      sendResponse('OK');
    };

    chrome.runtime.onMessage.addListener(getImageList);

    return () => {
      chrome.runtime.onMessage.removeListener(getImageList);
    };
  }, []);

  return (
    <Box
      className={'App'}
      display={'grid'}
      p={2}
      m={3}
      sx={{
        height: '100vh',
        
      }}
    >
      {imageList
        ? imageList.map((img, id) => (
            <Box
              display={'flex'}
              key={`item-${id}`}
              sx={{
                height: `430px`,
                boxShadow: ' 0 0 5px 5px #F0F0F0',
                padding: '2rem',
                margin: '2rem',
              }}
            >
            <Box>
              <CardMedia>
              <ObjectDetector imageElement = {img}/>
               {/*  <Box
                  component="img"
                  key={`itemAvatar-${id}`}
                  src={img.toString()}
                  style={{ height: '200px', margin: '2rem' }}
                  alt=""
                /> */}
              </CardMedia>
              <CardActions
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Button 
                  variant={'contained'} 
                  sx={{ margin: '2rem 0' }}
                  onClick={handleStartAnalysis}
                  value={img.toString()}>
                  Analizuj
                </Button>
              </CardActions>
              </Box>
          <Divider orientation="vertical" flexItem />
              <Collapse orientation="horizontal" in={url === img.toString() && expand ? true : false}>
                  <SerpLinks imageUrl={img.toString()}/>                  
              </Collapse>
            </Box>
          ))
        : null}
    </Box>
  );
};

export default Main;
