import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <>
      <div>
        <div>
          <Link href="/">
            Megamouse CTF
          </Link>
        </div>
        <Link href="/scoreboard">
          Scoreboard
        </Link>
        <Link href="/challenges">
          Challenges
        </Link>
        <Link href="/profile">
          Profile
        </Link>
      </div>
    </>
  );
};

export default Header;
