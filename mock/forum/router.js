var Router = require("express").Router;
var router = new Router();

router.get("/forum/question/load/*", (req, res) => {
    setTimeout(() =>
        res.status(200).json(
            {"msg":{"id":1,"topic":"问题1","description":"问题描述","profileId":null,"followCount":15,openCount:13,"answerCount":1},"code":200}
        ), Math.random() * 1500)
});

router.get("/forum/question/tag/load", (req, res) => {
    setTimeout(() =>
        res.status(200).json(
            {"msg":[{"id":"1","name":"职场"},{"id":"2","name":"思维"}],"code":200}
        ), Math.random() * 1500);
});

router.get("/forum/question/search/*", (req, res) => {
    setTimeout(() =>
        res.status(200).json(
            {"msg":{"end":false,"list":[{"id":1,"topic":"问题1","description":"问题描述","profileId":null,"followCount":15,openCount:123,"answerCount":1},
                {"id":2,"topic":"问题2","description":"问题描述2","profileId":null,"followCount":3,openCount:135,"answerCount":1}]
            },"code":200}
        ), Math.random() * 1500)
});

router.post("/forum/question/submit", (req, res) => {
    setTimeout(() =>
        res.status(200).json(
            {
                msg:"ok",
                code:200
            }
        ), Math.random() * 1500);
});

router.post("/forum/question/follow/*", (req, res) => {
    setTimeout(() =>
        res.status(200).json(
            {
                msg:"ok",
                code:200
            }
        ), Math.random() * 1500);
});

router.post("/forum/question/follow/cancel/*", (req, res) => {
    setTimeout(() =>
        res.status(200).json(
            {
                msg:"ok",
                code:200
            }
        ), Math.random() * 1500);
});


module.exports = router;
