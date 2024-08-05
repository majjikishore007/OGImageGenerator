import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Image } from '@chakra-ui/react';

const ImageUpload = ({ setImage }) => {
  const [imageUrl, setImageUrl] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setImage(file);
    }
  };

  return (
    <FormControl>
      <FormLabel htmlFor='image'>Image</FormLabel>
      <Input
        type='file'
        id='image'
        accept='image/*'
        onChange={handleImageChange}
      />
      {imageUrl && (
        <Image
          src={imageUrl}
          alt='Post Image'
          mt={4}
          boxSize='100px'
          objectFit='cover'
        />
      )}
    </FormControl>
  );
};

export default ImageUpload;
