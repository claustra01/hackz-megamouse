import Link from 'next/link';

const MainPage = () => {
  return (
    <div>
      <h2>Main Page</h2>
      <Link href="/login">
        <button>Login</button>
      </Link>
      <br />
      <Link href="/signup">
        <button>Sign In</button>
      </Link>
    </div>
  );
};

export default MainPage;
