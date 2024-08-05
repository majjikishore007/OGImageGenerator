import { Box, Container, Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import PostForm from '../components/PostForm';

const Post = () => {
  return (
    <VStack textAlign={'center'}>
      <Container maxW='container.md'>
        <Box padding='8' margin={'auto'}>
          <Heading
            sx={{
              fontFamily: 'inherit',
              fontWeight: '1000',
              fontSize: '2.5rem',
            }}
          >
            Open Graph Image Generator
          </Heading>
        </Box>
      </Container>
      <Container maxW='container.sm'>
        <PostForm />
      </Container>
    </VStack>
  );
};

export default Post;
