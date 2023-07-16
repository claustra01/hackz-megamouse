import Link from 'next/link';
import Header from './components/header';

const Signup = () => {
  return (
    <div>
      <Header />

      <h2>Signup</h2>
      <form>
        <div>
          <label>Username:</label>
          <input type="text" />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" />
        </div>
        <button type="submit">signup</button>
      </form>
    </div>
  );
};

export default Signup;
