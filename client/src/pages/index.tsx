import { Button, ButtonContainer, Container, Title } from '@/styles/styledComponents';
import Link from 'next/link';
import styled, { keyframes } from 'styled-components';

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnimatedTitle = styled(Title)`
  font-size: 72px;
  animation: ${fadeInAnimation} 1s ease-in-out;
`;

const MainPage = () => {
  return (
    <Container>
      <AnimatedTitle>Megamouth CTF</AnimatedTitle>
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
