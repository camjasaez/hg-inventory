import MenuItem from './MenuItem';

import { Box, Stack, Button } from '@chakra-ui/react';

export default function MenuLinks({ isOpen }) {
  return (
    <Box
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'row', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        {/* <MenuItem to="/">HOME</MenuItem> */}
        <MenuItem to="/inventory">INVENTARIO </MenuItem>
        {/* <MenuItem to="/jobs">TRABAJOS </MenuItem> */}
        <MenuItem to="/workers">TRABAJADORES </MenuItem>
        <MenuItem to="/pickup">RETIROS </MenuItem>
        <MenuItem to="/profile" isLast>
          <Button
            size="sm"
            rounded="md"
            color={['primary.500', 'primary.500', 'white', 'white']}
            bg={['teal', 'teal', 'primary.500', 'primary.500']}
            _hover={{
              bg: ['primary.100', 'primary.100', 'primary.600', 'primary.600'],
            }}
          >
            PERFIL
          </Button>
        </MenuItem>
      </Stack>
    </Box>
  );
}
