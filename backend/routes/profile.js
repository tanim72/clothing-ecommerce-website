var express = require("express");
var router = express.Router();
const { db, storage, auth } = require("./firebase");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");
const {} = require("firebase/firestore");

// Define a route to handle sign-up requests
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

router.post("/sign-in", function (req, res) {
    const auth = getAuth();
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      res.status(400).send("Email and password are required.");
      return;
    }

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

router.post("/sign-out", function (req, res) {
    const auth = getAuth();
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

function authMiddleware(req, res, next) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    req.user = user;
  }

  next();
}

router.get("/id", authMiddleware, function (req, res) {
  if (req.user) {
    res.status(200).send(req.user.uid);
  } else {
    res.status(500).send("You are not signed in.");
  }
});

module.exports = router;
