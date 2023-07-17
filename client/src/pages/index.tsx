import { Button, ButtonContainer, Container, Title } from '@/styles/styledComponents';
import Link from 'next/link';

const MainPage = () => {
  return (
    <Container>
      <Title>Megamouth CTF</Title>
      <ButtonContainer>
        <Link href="/login">
          <Button>Login</Button>
        </Link>
        <Link href="/signup">
          <Button>Sign Up</Button>
        </Link>
      </ButtonContainer>
    </Container>
  );
};

export default MainPage;
