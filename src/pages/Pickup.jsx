import Layout from '../components/Layout';
import {
  Flex,
  Select,
  Button,
  NumberInput,
  NumberInputField,
  Text,
} from '@chakra-ui/react';
import { useInv } from '../context/InvContext';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
export default function Pickup() {
  const { pickup, workers, fetchWorkers, newPickup } = useInv();
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState({}); //Estado con datos de mi formulario

  useEffect(() => {
    fetchWorkers();
  }, []);

  const handleSubmit = () => {
    insertarRetiro();
    newPickup([]);
  };

  const handleChangeSelect = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const insertarRetiro = async () => {
    let cantidadObjetos = pickup.length;

    try {
      const { error } = await supabase.from('RETIRO').insert({
        HORA_FECHA_RETIRO: new Date().toString(),
        CANTIDAD: Number(cantidadObjetos),
        COD_USER_AUTH: Number(3), //harcodeado el usuario que autoriza en este caso el gerente.
        COD_USER_PICKUP: Number(dataForm.COD_USER_PICKUP),
      });

      if (error) throw new Error();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Text align="center">Retiro</Text>
      <br />
      <Flex w="md" direction="row" justify="space-between">
        <p>Nombre de trabajo : </p>
        <Select placeholder="Retiro sin trabajo asociado."></Select>
      </Flex>
      <br />
      <Flex w="md" direction="row" justify="space-between">
        Nombre de quien retira :
        <Select onChange={handleChangeSelect} name="COD_USER_PICKUP">
          {workers.map(({ NOMBRE_USUARIO, COD_USER }) => (
            <option key={COD_USER} value={COD_USER}>
              {NOMBRE_USUARIO}
            </option>
          ))}
        </Select>
      </Flex>
      <br />

      <Flex w="md" direction="row" justify="space-between">
        <h2>Materiales :</h2>
        <ul>
          {pickup.map(({ NOMBRE_MATERIAL, STOCK, COD_MATERIAL }, index) => (
            <li key={index}>
              {NOMBRE_MATERIAL}
              <NumberInput
                isRequired={true}
                clampValueOnBlur={false}
                min={0}
                max={STOCK}
              >
                <NumberInputField
                  name={COD_MATERIAL}
                  onChange={handleInputChange}
                  placeholder={`Cantidad maxima: ${STOCK}`}
                />
              </NumberInput>
              <br />
            </li>
          ))}
        </ul>
      </Flex>
      <Flex justify="center">
        <Link to="/pickups">
          {pickup.length > 0 ? (
            <Button isDisabled={false} onClick={handleSubmit}>
              Retirar
            </Button>
          ) : (
            <Button isDisabled={true} onClick={handleSubmit}>
              Retirar
            </Button>
          )}
        </Link>
      </Flex>

      <br />
      <Button onClick={() => navigate('/pickups')}>Ver retiros</Button>
    </Layout>
  );
}
