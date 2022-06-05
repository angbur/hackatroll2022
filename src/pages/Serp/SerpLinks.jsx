import { Box, Link, ListItemButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import secrets from '../../../utils/secrets.development';
import Deep from '../Deep/Deep';

const SerpLinks = (props) => {
  const [similar, setSimilar] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(
        `https://serp-api-proxy.glitch.me/?engine=google_reverse_image&image_url=${props.imageUrl}&api_key=${secrets.serpApiKey}`
      );
      const data = await res.json();
      setLoading(false);
      setSimilar(data.inline_images.slice(0, 3));
      setResults(data.image_results.slice(2, 7));
    };
    fetchData();
  
  },[props.imageUrl]);

  return (
    <Box display={'flex'} sx={{width: '600px'}}>
        <Box m={2}>
          <Typography>Podobne zdjęcia:</Typography>
          {similar.slice(0, 5).map((image) => (
                <Box
                  component={'img'} 
                  src={image.thumbnail} 
                  alt="" 
                  key={image.thumbnail}
                  sx={{
                    height: '120px',
                    margin: '3px ',
                  }} />
            ))}
        </Box>

        <Box m={2}>
          <Typography >Najbardziej podobne:</Typography>
            {results.map((image) => (
              <>
              <ListItemButton>
                <Box component={'img'} src={image.thumbnail} alt="" />
                  <Link variant="body2" sx={{margin:'0 1rem'}} target="_blank" rel="noopener" href={`${image.link}`}>link</Link>
              </ListItemButton>             
              </>
              ))}
              <Deep pageUrl={results[0]} originImageUrl={props.imageUrl}/>
          </Box>
        </Box>

  );
};

export default SerpLinks;
