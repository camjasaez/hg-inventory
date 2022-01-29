import { useAuth0 } from '@auth0/auth0-react';
import Layout from '../components/Layout';
import LogoutButton from '../components/LogoutButton';

export default function Perfil() {
  const { user } = useAuth0();

  return (
    <Layout>
      <br></br>
      <p>{`Correo del usuario conectado : ${user.email}`}</p>
      <br></br>
      <LogoutButton />
    </Layout>
  );
}
