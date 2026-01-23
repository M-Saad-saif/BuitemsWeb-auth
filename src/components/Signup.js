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

  const HOST_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const { Fullname, Semester, Email, department, CMS } = credential;

    // validations
    if (!Fullname.trim()) {
      setError("Full name is required");
      return;
    }

    if (Fullname.trim().length < 2) {
      setError("Full name must be at least 2 characters");
      return;
    }

    if (!Email.trim()) {
      setError("Email is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(Email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!CMS.trim()) {
      setError("CMS ID is required");
      return;
    }

    if (!CMS.match(/^\d+$/)) {
      setError("CMS ID must be numeric");
      return;
    }

    if (!Semester) {
      setError("Semester is required");
      return;
    }

    if (!department.trim()) {
      setError("Department is required");
      return;
    }

    if (parseInt(Semester) < 1 || parseInt(Semester) > 12) {
      setError("Semester must be between 1 and 12");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${HOST_URL}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Fullname: Fullname.trim(),
          Semester: parseInt(Semester),
          Email: Email.trim(),
          department: department.trim(),
          CMS: CMS.trim(),
        }),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(
          json.error || `Error ${response.status}: Failed to create account`,
        );
        setLoading(false);
        return;
      }

      if (json.success) {
        localStorage.setItem("token", json.token);
        setError(
          "success: Account created successfully! Redirecting... Wait...",
        );
        setTimeout(() => {
          navigate("/portal");
        }, 1500);
      } else {
        setError(json.error || "Failed to create account");
        setLoading(false);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError(
        "Signup failed. Please check your internet connection and try again.",
      );
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  if (error.startsWith("success:")) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <h3 className="loading-text">{error.replace("success: ", "")}</h3>
      </div>
    );
  }

  return (
    <>
      <title>BUITEMS Portal - Sign Up</title>
      <div className="split-form">
        <div className="image-side">
          <img src={buitemsLogo} alt="BUITEMS Logo" />
          <h2>Welcome!</h2>
          <p>Enter your details and make your portal</p>
        </div>
        <div className="form-side">
          <h2 className="form-title">
            Sign Up <i className="ri-user-add-line"></i>
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name *"
              name="Fullname"
              value={credential.Fullname}
              onChange={onChange}
              required
            />
            <input
              type="number"
              placeholder="Current Semester *"
              name="Semester"
              value={credential.Semester}
              onChange={onChange}
              min="1"
              max="12"
              required
            />
            <input
              type="email"
              placeholder="Email *"
              name="Email"
              value={credential.Email}
              onChange={onChange}
              required
            />
            <input
              type="text"
              placeholder="Department *"
              name="department"
              value={credential.department}
              onChange={onChange}
              required
            />
            <input
              type="text"
              placeholder="CMS *"
              name="CMS"
              value={credential.CMS}
              onChange={onChange}
              maxLength="6"
              pattern="\d*"
              required
            />

            {error && (
              <div
                className={`error-message ${error.startsWith("success:") ? "success" : ""}`}
              >
                {error.startsWith("success:")
                  ? error.replace("success: ", "")
                  : error}
              </div>
            )}

            <button type="submit" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
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
