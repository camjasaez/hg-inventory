import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@chakra-ui/react';
const LogoutButton = () => {
  const { logout, isLoading } = useAuth0();

  if (isLoading) return <h1>Loading logout....</h1>;
  return <Button onClick={() => logout()}>Log Out</Button>;
};

export default LogoutButton;
