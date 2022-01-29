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
export default function ModalWorkers() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [worker, setWorker] = useState({});
  const [added, setAdded] = useState(false);
  const [notAdded, setNotAdded] = useState(false);

  const createData = async (code, name, charge) => {
    try {
      const { error } = await supabase
        .from('USUARIOS')
        .insert([{ COD_USER: code, NOMBRE_USUARIO: name, CARGO: charge }]);

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
    const { codigo, nombre, cargo } = worker;
    createData(codigo, nombre, cargo);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorker({ ...worker, [name]: value });
  };

  return (
    <>
      <Button onClick={onOpen}>Agrega Trabajadores</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agrega Trabajadores</ModalHeader>
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
              <FormLabel>Cargo</FormLabel>
              <Input
                onChange={handleChange}
                name="cargo"
                placeholder="Cargo..."
              />
            </FormControl>
            <br></br>
            {added && (
              <Alert status="success">
                <AlertIcon />
                Trabajador agregado
              </Alert>
            )}
            {notAdded && (
              <Alert status="error">
                <AlertIcon />
                Error al agregar trabajador
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
