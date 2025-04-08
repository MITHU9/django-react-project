import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from "../api";
import "../styles/Form.css";

const Form = ({ route, method }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { username, password };
    try {
      const response = await api.post(route, data);

      if (method === "login") {
        const { access, refresh } = response.data;
        localStorage.setItem(ACCESS_TOKEN, access);
        localStorage.setItem(REFRESH_TOKEN, refresh);
        navigate("/");
      } else {
        alert("User registered successfully. Please login.");
        navigate("/login");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input
          type="text"
          className="form-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Loading..." : name}
        </button>
        <p>
          {method === "login" ? (
            <span>
              Don't have an account?{" "}
              <Link to="/register" className="link">
                Register
              </Link>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <Link to="/login" className="link">
                Login
              </Link>
            </span>
          )}
        </p>
      </form>
    </div>
  );
};
export default Form;
