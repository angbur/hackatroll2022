import { Button, Container, Typography } from '@mui/material';
import React, { useState } from 'react';
import secrets from '../../../utils/secrets.development';

const SerpLinks = ({ imageUrl }) => {
  const [similar, setSimilar] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const res = await fetch(
      `https://serp-api-proxy.glitch.me/?engine=google_reverse_image&image_url=${imageUrl}&api_key=${secrets.serpApiKey}`
    );
    const data = await res.json();
    setLoading(false);
    console.log(data);
    setSimilar(data.inline_images.slice(0, 3));
    setResults(data.image_results.slice(2, 7));
  };

  return (
    <>
      <Button onClick={() => handleClick()}>
        {loading ? 'Loading...' : 'Get Info'}
      </Button>
      <Typography>{'Similar images'}</Typography>
      <Container>
        {similar.slice(0, 5).map((image) => (
          <img src={image.thumbnail} alt="" key={image.thumbnail} />
        ))}
      </Container>
      <Typography>{'Results images'}</Typography>
      <Container>
        {results.map((image) => (
          <Container key={image.position}>
            <img src={image.thumbnail} alt="" />
            <Typography paragraph>{image.link}</Typography>
          </Container>
        ))}
      </Container>
    </>
  );
};

export default SerpLinks;
