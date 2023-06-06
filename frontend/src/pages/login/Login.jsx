import React from "react";
import "./Login.css";
import axios from "axios";
import Logout from "../../components/Logout";

function Login() {
  const handleLogin = (e) => {
    e.preventDefault();

    const form = document.querySelector("#loginForm");
    const formData = new FormData(form);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    if (data.email === "" || data.password === "") {
      alert("Please fill all the fields");
      return;
    }

    axios
      .post("http://localhost:9000/profile/login", data)
      .then((res) => {
        console.log(res.data);

        form.reset();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login">
      <div className="login-container">
        <h1>Login</h1>
        <form id="loginForm">
          <h5>Email</h5>
          <input type="email" name="email" />
          <h5>Password</h5>
          <input type="password" name="password" />
          <button
            type="submit"
            className="login-signInButton"
            onClick={handleLogin}
          >
            Sign In
          </button>
        </form>
        <p>By signing in, you agree to our Terms of Use and Privacy Policy.</p>
        <p>New to this site? Sign Up</p>
      </div>
      <Logout />
    </div>
  );
}

export default Login;
