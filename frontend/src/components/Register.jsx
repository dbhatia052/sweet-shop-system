import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    // 🔍 HARD PROOF of what is being sent
    console.log("SENDING:", { email, password });

    // ❌ prevent empty submit
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await API.post("/auth/register", {
        email: email.trim(),
        password: password.trim(),
      });

      console.log("API RESPONSE:", res.data);
      alert("Registered successfully");
      navigate("/login");
    } catch (error) {
      console.error("REGISTER ERROR:", error);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="form">
      <h2>Register</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          console.log("EMAIL INPUT:", e.target.value);
          setEmail(e.target.value);
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          console.log("PASSWORD INPUT:", e.target.value);
          setPassword(e.target.value);
        }}
      />

      <button type="button" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}

export default Register;