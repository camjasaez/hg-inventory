import { useAuth0 } from '@auth0/auth0-react';
import Layout from '../components/Layout';
import LogoutButton from '../components/LogoutButton';
import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

export default function Perfil() {
  const { user } = useAuth0();
  const [userDB, setUserDB] = useState([{}]);

  const fetchUserData = async () => {
    const { data, error } = await supabase
      .from('USUARIOS')
      .select('NOMBRE_USUARIO');

    if (error) console.log(error);

    setUserDB(data);
    console.log(data);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Layout>
      <h1>*Perfil</h1>
      <br></br>
      <p>{`Correo del usuario conectado : ${user.email}`}</p>
      <p>El nombre de los usuarios: </p>
      <ul>
        {userDB.map(({ NOMBRE_USUARIO }, index) => (
          <li key={index}>{NOMBRE_USUARIO}</li>
        ))}
      </ul>
      <br></br>
      <LogoutButton />
    </Layout>
  );
}
