import React from "react";
import "./SignUp.css";
import axios from "axios";
import Logout from "../../components/Logout";

function SignUp() {

  const handleSignUp = (e) => {
    e.preventDefault();

    const form = document.querySelector("#signUpForm");
    const formData = new FormData(form);
    const password = formData.get("password");
    const email = formData.get("email");

    if (invalidInputs(email, password)) {
      return;
    }

    if (password !== formData.get("confirmPassword")) {
      alert("Passwords do not match");
      return;
    }

    const data = {
      email: email,
      password: password,
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
  };

  const invalidInputs = (email, password) => {
    if (email === "" || password === "") {
      alert("Please fill all the fields");
      return true;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return true;
    }

    return false;
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
          <button
            type="submit"
            className="signUp-signInButton"
            onClick={handleSignUp}
          >
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
