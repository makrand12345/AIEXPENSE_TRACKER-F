import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../api/authApi";
import { getProfileApi } from "../api/profileApi";
import { checkFinanceProfileApi } from "../api/financeApi";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    const res = await loginApi({ email, password });
    localStorage.setItem("token", res.data.access_token);

    window.dispatchEvent(new Event("auth-change"));

    const financeCheck = await checkFinanceProfileApi();

    if (financeCheck.data.exists) {
      navigate("/dashboard");
    } else {
      navigate("/finance-setup");
    }
  } catch {
    alert("Invalid credentials");
  }
};


  return (
    <div className="page">
      <div className="glass" style={{ maxWidth: "420px", margin: "auto" }}>
        <h2 style={{ textAlign: "center" }}>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
