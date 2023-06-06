var express = require("express");
var router = express.Router();
const { db, storage, auth } = require("./firebase");
const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} = require("firebase/auth");
const {} = require("firebase/firestore");

// listens to the state of the user
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User logged in:", user);
  } else {
    console.log("User logged out");
  }
});

// sign-up
router.post("/sign-up", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  // Create a new user with the given email and password
  createUserWithEmailAndPassword(auth, email, password)
    .then(function (userCredential) {
      // Extract the user object from the UserCredential object
      const user = userCredential.user;

      // Send the user object as a response
      res.status(200).json(user);
    })
    .catch(function (error) {
      console.log("Error creating new user:", error);
      res.status(500).send("Error creating new user.");
    });
});

router.post("/login", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      res.status(200).send(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      res.status(errorCode).send(errorMessage);
    });
});

router.post("/logout", function (req, res) {
  signOut(auth)
    .then(() => {
      res.status(200).send("Signed out");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      res.status(errorCode).send(errorMessage);
    });
});

module.exports = router;
