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
export default function ModalWorkersEdit({ COD_USER, NOMBRE_USUARIO, CARGO }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [worker, setWorker] = useState({ COD_USER, NOMBRE_USUARIO, CARGO });
  const [added, setAdded] = useState(false);
  const [notAdded, setNotAdded] = useState(false);

  const updateData = async (code, name, stock) => {
    try {
      const { error } = await supabase
        .from('USUARIOS')
        .update({ NOMBRE_USUARIO: name, CARGO: stock })
        .match({ COD_USER: code });

      if (error) {
        setNotAdded(true);
        setTimeout(() => {
          setNotAdded(false);
        }, 2000);
        throw new Error();
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
    const { COD_USER, NOMBRE_USUARIO, CARGO } = worker;
    updateData(COD_USER, NOMBRE_USUARIO, CARGO);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorker({ ...worker, [name]: value });
  };
  return (
    <>
      <Button onClick={onOpen}>Editar</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Trabajadores</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Codigo</FormLabel>
              <Input
                value={worker.COD_USER}
                onChange={handleChange}
                name="COD_USER"
                placeholder="Codigo..."
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Nombre</FormLabel>
              <Input
                value={worker.NOMBRE_USUARIO}
                onChange={handleChange}
                name="NOMBRE_USUARIO"
                placeholder="Nombre..."
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Cargo</FormLabel>
              <Input
                value={worker.CARGO}
                onChange={handleChange}
                name="CARGO"
                placeholder="Cargo..."
              />
            </FormControl>
            <br></br>
            {added && (
              <Alert status="success">
                <AlertIcon />
                Trabajador editado
              </Alert>
            )}
            {notAdded && (
              <Alert status="error">
                <AlertIcon />
                Error al editar trabajador
              </Alert>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Editar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
