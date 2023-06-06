var express = require("express");
var router = express.Router();
const { db, storage } = require("./firebase");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");
const {} = require("firebase/firestore");


router.post("/sign-up", function (req, res) {
  const auth = getAuth();
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(400).send("Email and password are required.");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
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
