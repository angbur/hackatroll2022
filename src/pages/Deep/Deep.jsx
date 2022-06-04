import { Button } from '@mui/material';
import React from 'react';

const Deep = () => {
  const getMeta = (imageUrl) => {
    let props = '';
    const image = new Image();
    image.onload = function () {
      console.log(this);
      props = this.width;
    };
    image.src = imageUrl;
    return props;
  };

  return (
    <Button
      onClick={() => {
        const data = getMeta(
          'https://cdn.glitch.global/3e314939-5f7d-44fb-905d-2d8c3bda3995/marmot_wolf_hedgehog_edited.jpg?v=1654343910802'
        );
        console.log('late', data);
      }}
    >
      CLICK ME
    </Button>
  );
};

export default Deep;
