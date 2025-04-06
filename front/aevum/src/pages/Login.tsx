import { useNavigate, useParams } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div>
      <button onClick={() => navigate("/")}>Home</button>
      Login - ID {id}
    </div>
  );
};

export default Login;
