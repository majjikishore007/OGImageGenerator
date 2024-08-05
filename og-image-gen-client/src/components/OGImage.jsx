// OGImage.js
import React, { useRef, useEffect, useState } from 'react';
import { toPng } from 'html-to-image';
import { Box, Text, Image } from '@chakra-ui/react';

const OGImage = ({ title, content, imageUrl }) => {
  const ref = useRef(null);
  const [ogImage, setOgImage] = useState('');

  useEffect(() => {
    if (ref.current === null) return;

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        setOgImage(dataUrl);
        console.log('Image generated:', dataUrl);
      })
      .catch((err) => console.error('oops, something went wrong!', err));
  }, [ref, title, content, imageUrl]); // Depend on inputs to regenerate image as needed

  return (
    <>
      <Box
        ref={ref}
        width='1200px'
        height='630px'
        bg='white'
        p='20'
        border='1px solid #ccc'
      >
        <Text fontSize='24px' fontWeight='bold'>
          {title}
        </Text>
        <Text fontSize='16px'>{content}</Text>
        {imageUrl && <Image src={imageUrl} alt='Post Image' />}
      </Box>
      {ogImage && <img src={ogImage} alt='Generated OG Image' />}
    </>
  );
};

export default OGImage;
