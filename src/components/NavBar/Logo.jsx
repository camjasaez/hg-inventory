import { Box, Text } from '@chakra-ui/react';

export default function Logo(props) {
  return (
    <Box {...props}>
      <Text fontSize="lg" fontWeight="bold" mr={2}>
        <img src="/logoHG.jpeg" alt="Logo" />
      </Text>
    </Box>
  );
}
