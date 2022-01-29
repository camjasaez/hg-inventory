import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormLabel,
  FormControl,
  Input,
  Button,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { supabase } from '../services/supabaseClient';
import { useState } from 'react';
export default function ModalInput({ isDisabled }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [item, setItem] = useState({});
  const [added, setAdded] = useState(false);
  const [notAdded, setNotAdded] = useState(false);

  const createData = async (code, name, stock) => {
    try {
      const { error } = await supabase
        .from('MATERIALES')
        .insert([{ COD_MATERIAL: code, NOMBRE_MATERIAL: name, STOCK: stock }]);

      if (error) {
        setNotAdded(true);
        setTimeout(() => {
          setNotAdded(false);
        }, 2000);
        throw new Error(error);
      }

      setAdded(true);
      setTimeout(() => {
        setAdded(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    const { codigo, nombre, cantidad } = item;
    createData(codigo, nombre, cantidad);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  return (
    <>
      <Button isDisabled={isDisabled} onClick={onOpen}>
        Agrega materiales
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agrega un material</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Codigo</FormLabel>
              <Input
                onChange={handleChange}
                name="codigo"
                placeholder="Codigo..."
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Nombre</FormLabel>
              <Input
                onChange={handleChange}
                name="nombre"
                placeholder="Nombre..."
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Cantidad</FormLabel>
              <Input
                onChange={handleChange}
                name="cantidad"
                placeholder="Cantidad..."
              />
            </FormControl>
            <br></br>
            {added && (
              <Alert status="success">
                <AlertIcon />
                Material agregado al inventario
              </Alert>
            )}
            {notAdded && (
              <Alert status="error">
                <AlertIcon />
                Error al agregar item al inventario
              </Alert>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Agregar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
