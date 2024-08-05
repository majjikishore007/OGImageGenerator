import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import ImageUpload from './ImageUpload';
import OGImage from './OGImage'; // Import OGImage component

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [ogImageUrl, setOgImageUrl] = useState(''); // State to store the OG image URL
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate OG Image upon submission
    generateOgImage();
    toast({
      title: 'Post Created.',
      description: 'Your post has been successfully created.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  // Function to update the OG image URL state
  const generateOgImage = () => {
    if (title && content) {
      const ogImageProps = { title, content, imageUrl: image };
      <OGImage {...ogImageProps} setOgImageUrl={setOgImageUrl} />;
    }
  };

  return (
    <Box
      maxW='500px'
      mx='auto'
      bg='white'
      boxShadow='rgba(0, 0, 0, 0.35) 0px 5px 15px'
      padding={'30px'}
      borderRadius='lg'
    >
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel fontSize={'medium'} htmlFor='title'>
              Title
            </FormLabel>
            <Input
              id='title'
              placeholder='Enter title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor='content'>Content</FormLabel>
            <Textarea
              id='content'
              placeholder='Enter content'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </FormControl>
          <ImageUpload setImage={setImage} />
          <Button type='submit' colorScheme='brand' width='full'>
            Create Post
          </Button>
        </VStack>
      </form>
      {/* Optionally display the OG image URL */}
      {ogImageUrl && <img src={ogImageUrl} alt='Generated OG Image' />}
    </Box>
  );
};

export default PostForm;
