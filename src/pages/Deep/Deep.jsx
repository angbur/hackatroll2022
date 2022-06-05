import { Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const Deep = ({ pageUrl, originImageUrl }) => {
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
          origin: pageUrl,
        });
      };
      image.onerror = function () {
        return reject(null);
      };
      image.src = imageUrl;
    });
  }

  useEffect(() => {
    fetch(`https://serp-api-proxy.herokuapp.com/content_images/?url=${pageUrl}`)
      .then((res) => res.json())
      .then((data) =>
        setImageUrls(data.filter((obj) => obj.src).map((obj) => obj.src))
      )
      .catch((err) => console.error(err));
  }, [pageUrl]);

  useEffect(() => {
    getImageMeta(originImageUrl)
      .then((data) => setOriginImageRatio(data))
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originImageUrl]);

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
    <Container>
      <Typography>ZDJECIE ZE STRONY</Typography>
      <Typography>{pageUrl}</Typography>
      {images.map((image, id) =>
        id < 3 ? (
          <Container key={image.url}>
            <img src={image.url} alt="" />
            <Typography paragraph>{image.ratio}</Typography>
            <Typography paragraph>{image.origin}</Typography>
          </Container>
        ) : null
      )}
    </Container>
  );
};

export default Deep;
