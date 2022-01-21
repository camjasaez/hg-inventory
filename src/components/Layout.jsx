import NavBar from './NavBar/NavBar.jsx';
import { Center, Flex } from '@chakra-ui/react';

export default function Layout({ children }) {
  return (
    <>
      <Center>
        <NavBar />
      </Center>
      <main>
        <Center>
          <Flex direction="column">{children}</Flex>
        </Center>
      </main>
    </>
  );
}
