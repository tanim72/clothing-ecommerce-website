var express = require("express");
const axios = require("axios");
var router = express.Router();

/* GET users listing. */
router.get("/mens/shirts", function (req, res, next) {
  axios
    .get("https://dummyjson.com/products/category/mens-shirts")
    .then((result) => res.json(result.data));
});

router.get("/mens/shoes", function (req, res, next) {
  axios
    .get("https://dummyjson.com/products/category/mens-shoes")
    .then((result) => res.json(result.data));
});

router.get("/mens/watches", function (req, res, next) {
  axios
    .get("https://dummyjson.com/products/category/mens-watches")
    .then((result) => res.json(result.data));
});

router.get("/womens/dresses", function (req, res, next) {
  axios
    .get("https://dummyjson.com/products/category/womens-dresses")
    .then((result) => res.json(result.data));
});

router.get("/womens/shoes", function (req, res, next) {
  axios
    .get("https://dummyjson.com/products/category/womens-shoes")
    .then((result) => res.json(result.data));
});

router.get("/womens/watches", function (req, res, next) {
  axios
    .get("https://dummyjson.com/products/category/womens-watches")
    .then((result) => res.json(result.data));
});

router.get("/womens/bags", function (req, res, next) {
  axios
    .get("https://dummyjson.com/products/category/womens-bags")
    .then((result) => res.json(result.data));
});

router.get("/womens/jewellery", function (req, res, next) {
  axios
    .get("https://dummyjson.com/products/category/womens-jewellery")
    .then((result) => res.json(result.data));
});

module.exports = router;
