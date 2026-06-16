import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 mx-auto" style={{ width: "400px" }}>
        <h2 className="text-center">Login</h2>

        <input
          className="form-control my-2"
          placeholder="Username"
        />

        <input
          className="form-control my-2"
          type="password"
          placeholder="Password"
        />

        <button
          className="btn btn-primary"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;