import React from "react";
import { Link } from "react-router-dom";
import buitemsLogo from "./images/buitems logo.png";

export default function Signup() {
  return (
    <>
      <div class="split-form">
        <div class="image-side">
          <img src={buitemsLogo} alt="" />
          <h2>Welcome!</h2>
          <p>Enter your details and make your portal</p>
        </div>
        <div class="form-side">
          <h2
            style={{ color: "#2157e0", fontWeight: "700", textAlign: "center" }}
          >
            Sign Up <i className="ri-user-add-line"></i>
          </h2>
          <form>
            <input type="text" placeholder="Full Name" />
            <input type="number" placeholder="Current Semester" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit">Create Account</button>
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
