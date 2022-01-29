import { useEffect } from 'react';
import Layout from '../components/Layout';
import { useInv } from '../context/InvContext';

export default function Pickups() {
  const { pickups, fetchPickups } = useInv();

  useEffect(() => {
    fetchPickups();
  }, [fetchPickups]);

  return (
    <Layout>
      <h1>Retiros:</h1>
      <div>
        {pickups.map(({ HORA_FECHA_RETIRO, CANTIDAD }, index) => (
          <>
            <p key={index}>
              Fecha: {HORA_FECHA_RETIRO}
              <br />
              Cantidad de objetos distintos: {CANTIDAD}
            </p>
            <br />
          </>
        ))}
      </div>
    </Layout>
  );
}
