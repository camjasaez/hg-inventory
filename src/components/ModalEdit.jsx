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
export default function ModalEdit({
  isDisabled,
  COD_MATERIAL,
  NOMBRE_MATERIAL,
  STOCK,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [item, setItem] = useState({ COD_MATERIAL, NOMBRE_MATERIAL, STOCK });
  const [added, setAdded] = useState(false);
  const [notAdded, setNotAdded] = useState(false);

  const updateData = async (code, name, stock) => {
    try {
      const { error } = await supabase
        .from('MATERIALES')
        .update({ NOMBRE_MATERIAL: name, STOCK: stock })
        .match({ COD_MATERIAL: code });

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
    const { COD_MATERIAL, NOMBRE_MATERIAL, STOCK } = item;
    updateData(COD_MATERIAL, NOMBRE_MATERIAL, STOCK);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  return (
    <>
      <Button isDisabled={isDisabled} onClick={onOpen}>
        Editar
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar item</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Codigo</FormLabel>
              <Input
                value={item.COD_MATERIAL}
                onChange={handleChange}
                name="COD_MATERIAL"
                placeholder="Codigo..."
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Nombre</FormLabel>
              <Input
                onChange={handleChange}
                name="NOMBRE_MATERIAL"
                placeholder="Nombre..."
                value={item.NOMBRE_MATERIAL}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Cantidad</FormLabel>
              <Input
                onChange={handleChange}
                name="STOCK"
                placeholder="Cantidad..."
                value={item.STOCK}
              />
            </FormControl>
            <br></br>
            {added && (
              <Alert status="success">
                <AlertIcon />
                Item editado exitosamente
              </Alert>
            )}
            {notAdded && (
              <Alert status="error">
                <AlertIcon />
                Error al editar item del inventario
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
