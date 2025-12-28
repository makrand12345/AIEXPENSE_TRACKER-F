import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupApi } from "../api/authApi";

function Signup() {
  const navigate = useNavigate();

const [name, setName] = useState("");
const [profession, setProfession] = useState("");


  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    profession: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      await signupApi(form);
      alert("Signup successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.detail || "Signup failed");
    }
  };

  return (
    <div className="page">
      <div className="glass" style={{ maxWidth: "420px", margin: "auto" }}>
        <h2 style={{ textAlign: "center" }}>Signup</h2>


<input
  placeholder="Full Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/> 

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <input
  placeholder="Profession"
  value={profession}
  onChange={(e) => setProfession(e.target.value)}
/>

        <button onClick={handleSignup}>Signup</button>
      </div>
    </div>
  );
}

export default Signup;
