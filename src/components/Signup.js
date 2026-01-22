import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import buitemsLogo from "./images/buitems logo.png";

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [credential, setCredential] = useState({
    Fullname: "",
    Semester: "",
    Email: "",
    department: "",
    CMS: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { Fullname, Semester, Email, department, CMS } = credential;
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Fullname, Semester, Email, department, CMS }),
        },
      );

      const json = await response.json();
      if (json.success) {
        localStorage.setItem("token", json.token);
        navigate("/portal");
      } else {
        setError(json.error || "Failed to create account");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="split-form">
        <div className="image-side">
          <img src={buitemsLogo} alt="" />
          <h2>Welcome!</h2>
          <p>Enter your details and make your portal</p>
        </div>
        <div className="form-side">
          <h2
            style={{ color: "#2157e0", fontWeight: "700", textAlign: "center" }}
          >
            Sign Up <i className="ri-user-add-line"></i>
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              name="Fullname"
              value={credential.Fullname}
              onChange={onChange}
            />
            <input
              type="number"
              placeholder="Current Semester"
              name="Semester"
              value={credential.Semester}
              onChange={onChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="Email"
              value={credential.Email}
              onChange={onChange}
            />
            <input
              type="text"
              placeholder="Department"
              name="department"
              value={credential.department}
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
            <button type="submit">
              {loading ? "Creating Account" : "Create Account"}
            </button>
          </form>
          <hr />
          <p>
            Already have an account? <Link to="/Login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}
