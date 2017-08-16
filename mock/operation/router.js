var Router = require("express").Router;

var router = new Router();

router.get("/rise/operation/free/choose/problem/msg", (req, res) => {
  setTimeout(() =>
    res.status(200).json(
      { "msg": "ok", "code": 200 }
    ), Math.random() * 1500)
});

router.post("/rise/operation/free/submit/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json(
      { "msg": "ok", "code": 200 }
    ), 4000)
});

router.get("/rise/operation/free/init", (req, res) => {
  setTimeout(() =>
    res.status(200).json(
      { "msg": "ok", "code": 200 }
    ), Math.random() * 1500)
});

module.exports = router;
