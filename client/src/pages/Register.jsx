import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input type="text" placeholder="username" />
        <input type={"email"} placeholder="Email" />
        <input type="password" placeholder="password" />
        <button>Register</button>
        <p>This is an error!</p>
        <span>
          Already a user? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
