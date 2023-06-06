var express = require("express");
const axios = require("axios");
var router = express.Router();

/* GET users listing. */
router.get("/mens/shirts", function (req, res, next) {
  axios
    .get("https://dummyjson.com/products/category/mens-shirts")
    .then((result) => res.json(result.data));
});

module.exports = router;
