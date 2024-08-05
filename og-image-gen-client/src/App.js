import { ChakraProvider } from '@chakra-ui/react';
import Post from './Pages/Post';

function App() {
  return (
    <ChakraProvider>
      <div className='App'>
        <Post />
      </div>
    </ChakraProvider>
  );
}

export default App;
