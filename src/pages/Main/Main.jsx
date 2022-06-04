import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logo.svg';
import './Main.css';
import './Main.scss';

const Main = () => {
  const [imageList, setImageList] = useState([]);
  const [status, setStatus] = useState('idle');

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
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      }}
    >
      {imageList
        ? imageList.map((img, id) => (
            <Card
              key={`item-${id}`}
              sx={{
                height: '400px',
                boxShadow: ' 0 0 5px 5px #F0F0F0',
                padding: '2rem',
                margin: '2rem',
              }}
            >
              <CardMedia>
                <Box
                  component="img"
                  key={`itemAvatar-${id}`}
                  src={img.toString()}
                  style={{ height: '200px' }}
                  alt=""
                />
              </CardMedia>
              <CardActions
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Button variant={'contained'} sx={{ margin: '2rem 0' }}>
                  Analizuj
                </Button>
              </CardActions>
            </Card>
          ))
        : null}
    </Box>
  );
};

export default Main;
