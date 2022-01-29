import LoginButton from '../components/LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../components/LogoutButton';
import { Center, Flex, Container, Progress } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <Progress size="xl" isIndeterminate />;
  return (
    <Container>
      <Center h="100vh">
        <Flex direction="column">
          <p>
            {!isAuthenticated ? (
              'Bienvenido'
            ) : (
              <Navigate to="/perfil" replace />
            )}
          </p>

          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </Flex>
      </Center>
    </Container>
  );
}
