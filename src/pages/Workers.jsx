import { useEffect } from 'react';
import Layout from '../components/Layout';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Icon,
  Button,
  useBoolean,
  Flex,
  Box,
  Divider,
} from '@chakra-ui/react';
import { MdRefresh, MdClose } from 'react-icons/md';

import { useInv } from '../context/InvContext';
import { supabase } from '../services/supabaseClient';
import ModalWorkers from '../components/ModalWorkers';
import ModalWorkersEdit from '../components/ModalWorkersEdit';

export default function Workers() {
  const [flag, setFlag] = useBoolean();

  const { workers, fetchWorkers } = useInv();

  useEffect(() => {
    fetchWorkers();
  }, []);

  const deleteWorkers = async (codigo) => {
    try {
      const { error } = await supabase
        .from('USUARIOS')
        .delete()
        .match({ COD_USER: codigo });

      if (error) throw new Error();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Flex justify="space-evenly">
        <Box>
          <ModalWorkers />
        </Box>
        <Box>
          <Button onClick={fetchWorkers}>
            <Icon as={MdRefresh} />
          </Button>
        </Box>
      </Flex>
      <br />
      <Divider />
      <br />
      <Table variant="simple">
        <TableCaption>Lista de Trabajadores</TableCaption>
        <Thead>
          <Tr>
            <Th>Codigo</Th>
            <Th>Nombre</Th>
            <Th>Cargo</Th>
          </Tr>
        </Thead>
        <Tbody>
          {workers.map(({ COD_USER, NOMBRE_USUARIO, CARGO }, index) => (
            <Tr key={index}>
              <Td>{COD_USER}</Td>
              <Td>{NOMBRE_USUARIO}</Td>
              <Td isNumeric>{CARGO}</Td>

              <Td>
                <ModalWorkersEdit
                  isDisabled={flag}
                  COD_USER={COD_USER}
                  NOMBRE_USUARIO={NOMBRE_USUARIO}
                  CARGO={CARGO}
                />
              </Td>
              <Td>
                <Button
                  isDisabled={flag}
                  onClick={() => deleteWorkers(COD_USER)}
                >
                  <Icon as={MdClose} />
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Layout>
  );
}
