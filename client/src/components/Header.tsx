import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useAuth } from './AuthContext';

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #333;
  color: #fff;
  padding: 10px;

  & a {
    color: #fff;
    text-decoration: none;
    margin-left: 20px;
    transition: color 0.3s ease;

    &:hover {
      color: #ffac00; /* ホバー時の色指定 */
    }
  }
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;

  & > :not(:last-child) {
    margin-right: 20px;
  }
`;

const Header = () => {
  const { isAdmin, isLoggedIn } = useAuth();

  return (
    <HeaderWrapper>
      <Logo>
        <Link href="/">Megamouth CTF</Link>
      </Logo>
      <NavLinks>
        {isAdmin && <Link href="/challenges/new">＋Add Challenge</Link>}
        <Link href="/scoreboard">Scoreboard</Link>
        {isLoggedIn ? (
          <>
            <Link href="/challenges">Challenges</Link>
            <Link href="/profile">Profile</Link>
            <Link href="/logout">Logout</Link>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </NavLinks>
    </HeaderWrapper>
  );
};

export default Header;
