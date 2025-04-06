import { Link } from "react-router";

const Home = () => {
  const id = 10;
  return (
    <div className="Home">
      <h1>Welcome to Aevum</h1>

      <Link to={`/login/${id}`}>Login</Link>

      <p>Your one-stop solution for all your needs.</p>
    </div>
  );
};

export default Home;
