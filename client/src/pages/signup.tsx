
const Signup = () => {
  return (
    <div>
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
