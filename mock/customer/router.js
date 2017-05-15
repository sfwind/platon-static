var Router = require("express").Router;
var router = new Router();

router.get("/rise/customer/profile", (req, res) => {
    setTimeout(() =>
        res.status(200).json(
            {"msg":{"industry":null,"function":null,"workingLife":null,"city":"","cityId":null,"province":"","provinceId":null,"isFull":false},"code":200}
        ), Math.random() * 1500)
});

router.get("/rise/customer/region", (req, res) => {
    setTimeout(() =>
        res.status(200).json(
            {"msg":{"provinceList":[{"id":"1","value":"北京市","parentId":"1000000"},{"id":"2","value":"上海市","parentId":"1000000"}]},"code":200}
        ), Math.random() * 1500);
})

router.post("/rise/customer/profile/region", (req, res) => {
    setTimeout(() =>
        res.status(200).json(
            {
                msg:"ok",
                code:200
            }

        ), Math.random() * 1500);
})

router.post("/rise/customer/profile/industry", (req, res) => {
    setTimeout(() =>
        res.status(200).json(
            {
                msg:"ok",
                code:200
            }

        ), Math.random() * 1500);
})

router.post("/rise/customer/profile/workinglife", (req, res) => {
    setTimeout(() =>
        res.status(200).json(
            {
                msg:"ok",
                code:200
            }

        ), Math.random() * 1500);
})
router.get("/rise/customer/rise", (req, res) => {
    setTimeout(() =>
        res.status(200).json(
            {"msg":{"point":144},"code":200}
        ), Math.random() * 1500);
})



router.get("/rise/customer/plans", (req, res) => {
    setTimeout(() =>
        res.status(200).json(
            {"msg":{"runningPlans":[{"name":"与人沟通时条理更清晰","point":0}],"donePlans":[{"name":"面对前所未有的新问题时撬开脑洞","point":814},{"name":"临场发言也能掷地有声","point":124}], "point":2000},"code":200}
        ), Math.random() * 1500);
})


router.post("/rise/customer/profile", (req, res) => {
    setTimeout(() =>
        res.status(200).json(
            {"msg": "ok", "code": 200}
        ), Math.random() * 1500);
})



router.get("/rise/customer/account", (req, res) => {
    setTimeout(() =>
        res.status(200).json(
            {"msg": {
                "riseId":"dsiv91",
                "memberType": "专业版（一年）",
            }, "code": 200}
        ), Math.random() * 1500);
})

router.get("/rise/customer/member", (req, res) => {
    setTimeout(() =>
        res.status(200).json(
            {
                "msg": {
                    "id": 47,
                    "orderId": "iy1q66nes0jtsxkz",
                    "openId": "o5h6ywlXxHLmoGrLzH9Nt7uyoHbM",
                    "memberTypeId": 3,
                    "expireDate": "2018-04-19",
                    "expired": false,
                    "addTime": 1492573781000,
                    "startTime": "2017.04.19",
                    "endTime": "2018.04.18",
                    "name": "精英版（一年）"
                },
                "code": 200
            }
        ), Math.random() * 1500);
})

module.exports = router;
