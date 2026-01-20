import React from "react";
import { Link } from "react-router-dom";
import buitemsLogo from "./images/buitems logo.png";

export default function Signup() {
  return (
    <>
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
            <form>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
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
