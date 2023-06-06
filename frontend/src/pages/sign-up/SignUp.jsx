import React from "react";
import "./SignUp.css";
import axios from "axios";
import Logout from "../../components/Logout";

function SignUp() {

  const handleSignUp = (e) => {
    e.preventDefault();

    const form = document.querySelector("#signUpForm");
    const formData = new FormData(form);
    if (formData.get("password") !== formData.get("confirmPassword")) {
      alert("Passwords do not match");
      return;
    } else {
      const data = {
        email: formData.get("email"),
        password: formData.get("password"),
      };
      axios
        .post("http://localhost:9000/profile/sign-up", data)
        .then((res) => {
          console.log(res.data);

          form.reset();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="signUp">
      <div className="signUp-container">
        <h1>Sign Up</h1>
        <form id="signUpForm">
          <h5>Email</h5>
          <input type="email" name="email" />
          <h5>Password</h5>
          <input type="password" name="password" />
          <h5>Confirm Password</h5>
          <input type="password" name="confirmPassword" />
          <button type="submit" className="signUp-signInButton" onClick={handleSignUp}>
            Sign Up
          </button>
        </form>
        <p>By signing up, you agree to our Terms of Use and Privacy Policy.</p>
        <p>Already have an account? Sign In</p>
      </div>
      <Logout />
    </div>
  );
}

export default SignUp;