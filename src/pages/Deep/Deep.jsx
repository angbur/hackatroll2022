import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';

const Deep = (props) => {
  const [images, setImages] = useState([]); // array ze zdjeciami thumbnail!!!
  const [imageUrls, setImageUrls] = useState([]);
  const [originImageRatio, setOriginImageRatio] = useState({});
  const ratioHesitance = 0.1;

  function getImageMeta(imageUrl) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = function () {
        return resolve({
          url: imageUrl,
          width: this.width,
          height: this.height,
          ratio: this.width / this.height,
          origin: props.pageUrl,
        });
      };
      image.onerror = function () {
        return reject(null);
      };
      image.src = imageUrl;
    });
  }

  useEffect(() => {
    fetch(`https://serp-api-proxy.herokuapp.com/content_images/?url=${props.pageUrl}`)
      .then((res) => res.json())
      .then((data) =>
        setImageUrls(data.filter((obj) => obj.src).map((obj) => obj.src))
      )
      .catch((err) => console.error(err));
  }, [props.pageUrl]);

  useEffect(() => {
    getImageMeta(props.originImageUrl)
      .then((data) => setOriginImageRatio(data))
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.originImageUrl]);

  useEffect(() => {
    const imagePromises = imageUrls.map((url) =>
      getImageMeta(url).then((data) => data)
    );
    Promise.all(imagePromises).then((data) => {
      setImages(
        data.filter(
          (image) =>
            image.ratio > (1 - ratioHesitance) * originImageRatio.ratio &&
            image.ratio < (1 + ratioHesitance) * originImageRatio.ratio
        )
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrls]);

  return (
    <>  
      {images.filter((elem, id) => id < 3).map((image) =>
        (
          <Box key={image.url} m={2}>
            <img src={image.url} alt="" height='80px' />
          </Box>
        )
      )}
    </>
  );
};

export default Deep;
