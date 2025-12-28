import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import "./Navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const loadUser = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      return;
    }

    api
      .get("/profile/me")
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
      });
  };

  useEffect(() => {
  const loadUser = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      return;
    }

    api
      .get("/profile/me")
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      });
  };

  loadUser();
  window.addEventListener("auth-change", loadUser);

  return () => {
    window.removeEventListener("auth-change", loadUser);
  };
}, []);


  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/expenses">Expenses</Link>
        <Link to="/summary">Summary</Link>
      </div>

      <div className="nav-right">
        {user ? (
          <Link to="/profile" className="nav-profile">
            <img
              src={
                user.avatar ||
                "https://ui-avatars.com/api/?name=User"
              }
              alt="avatar"
              className="nav-avatar"
            />
            <span className="nav-name">
              {user.name || "User"}
            </span>
          </Link>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
