import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import buitemsLogo from "./images/buitems logo.png";

export default function Login() {
  const navigate = useNavigate();
  const [laoding, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [credential, setCredential] = useState({
    Email: "",
    CMS: "",
  });

    const HOST_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { Email, CMS } = credential;
      const response = await fetch(`${HOST_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email, CMS }),
      });

      const json = await response.json();
      if (json.success) {
        localStorage.setItem("token", json.token);
        navigate("/portal");
      } else {
        setError(json.error || "failed to login");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <>
          <title>BUITEMS Portal - Login</title>
      <div className="split-form " style={{ marginTop: "9rem" }}>
        <div className="image-side">
          <img src={buitemsLogo} alt="" />
          <h2>Welcome Back!</h2>
          <p>Enter your details to access your account</p>
        </div>
        <div className="form-side">
          <h2
            style={{
              color: "#2157e0",
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            Login <i className="ri-login-box-line"></i>
          </h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              name="Email"
              value={credential.Email}
              onChange={onChange}
            />
            <input
              type="text"
              placeholder="CMS"
              name="CMS"
              value={credential.CMS}
              onChange={onChange}
            />

            {error && (
              <div
                style={{
                  color: "red",
                  backgroundColor: "#ffebee",
                  padding: "9px",
                  borderRadius: "5px",
                  marginBottom: "-14px",
                  textAlign: "center",
                }}
              >
                {error}
              </div>
            )}

            <button type="submit">Login</button>
          </form>
          <hr />
          <p>
            Dont have an accout? <Link to="/signup">SingUp</Link>
          </p>
        </div>
      </div>
    </>
  );
}
