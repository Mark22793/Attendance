import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      const response = await fetch("https://localhost:7133/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("userRole", data.role);
        navigate("/dashboard");
      } else {
        setError(data.message || "Maling username o password!");
      }
    } catch (err) {
      setError("Hindi makakonekta sa backend server.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 mx-auto" style={{ width: "400px" }}>
        <h2 className="text-center">Login</h2>
        
        {error && <div className="alert alert-danger p-2 text-center">{error}</div>}

        <input
          className="form-control my-2"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="form-control my-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100 mt-2" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;