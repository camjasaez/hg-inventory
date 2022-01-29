import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  Checkbox,
  useBoolean,
  Box,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { MdRefresh, MdClose } from 'react-icons/md';

import { useInv } from '../context/InvContext';
import { supabase } from '../services/supabaseClient';
import ModalInput from '../components/ModalInput';
import ModalEdit from '../components/ModalEdit';

export default function Inventory() {
  const [flag, setFlag] = useBoolean();
  const [checkedList, setCheckedList] = useState({});

  const { newPickup, items, fetchItems } = useInv();

  useEffect(() => {
    fetchItems();
  }, []);

  const deleteInventoryItem = async (codigo) => {
    try {
      const { error } = await supabase
        .from('MATERIALES')
        .delete()
        .match({ COD_MATERIAL: codigo });

      if (error) throw new Error();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChecked = (e) => {
    const { name, checked } = e.target;
    setCheckedList({ ...checkedList, [name]: checked });
  };

  const handlePickup = () => {
    //creamos un nuevo arreglo para guardar solo el indice de los elementos que seran retirados.
    let newArray = [];
    for (const [clave, valor] of Object.entries(checkedList)) {
      if (valor !== false) newArray.push(Number(clave));
    }

    //filtramos la lista con los items que si van a ir al retiro
    let pickup = [];
    newArray.forEach((item) => pickup.push(items[item]));

    console.log(pickup);
    newPickup(pickup);
  };

  console.log(items);
  return (
    <Layout>
      <br></br>
      <Flex justify="space-evenly">
        <ModalInput isDisabled={flag} />

        <Box align="center" onClick={setFlag.toggle}>
          {!flag ? (
            <Button>Crear retiro</Button>
          ) : (
            <Button onClick={handlePickup}>
              <Link to="/pickup">Continuar con retiro</Link>
            </Button>
          )}
        </Box>

        <Box align="center">
          <Button isDisabled={flag} onClick={fetchItems}>
            <Icon as={MdRefresh} />
          </Button>
        </Box>
        <Box align="center">
          <Button isDisabled={!flag} onClick={setFlag.toggle}>
            Cancelar retiro
          </Button>
        </Box>
      </Flex>
      <br />
      <Divider />
      <br />

      <Table variant="simple">
        <TableCaption>Lista de materiales</TableCaption>
        <Thead>
          <Tr>
            <Th>Checkbox</Th>
            <Th>Codigo</Th>
            <Th>Nombre</Th>
            <Th isNumeric>Cantidad</Th>
            <Th>Cantidad minima</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map(
            ({ COD_MATERIAL, NOMBRE_MATERIAL, STOCK, STOCK_MIN }, index) => (
              <Tr key={COD_MATERIAL}>
                <Td>
                  <Checkbox
                    isDisabled={!flag}
                    onChange={handleChecked}
                    name={index}
                  ></Checkbox>
                </Td>
                <Td>{COD_MATERIAL}</Td>
                <Td>{NOMBRE_MATERIAL}</Td>
                <Td isNumeric>{STOCK}</Td>
                <Td isNumeric>{STOCK_MIN}</Td>
                <Td>
                  <ModalEdit
                    isDisabled={flag}
                    COD_MATERIAL={COD_MATERIAL}
                    NOMBRE_MATERIAL={NOMBRE_MATERIAL}
                    STOCK={STOCK}
                  />
                </Td>
                <Td>
                  <Button
                    isDisabled={flag}
                    onClick={() => deleteInventoryItem(COD_MATERIAL)}
                  >
                    <Icon as={MdClose} />
                  </Button>
                </Td>
              </Tr>
            )
          )}
        </Tbody>
      </Table>
    </Layout>
  );
}
