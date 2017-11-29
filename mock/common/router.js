var Router = require("express").Router;

var router = new Router();

router.post("/rise/b/log", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "msg": {
        "mobileNo": "13712345678",
        "email": "aaa@mail.com",
        "industry": "IT",
        "function": "软件开发",
        "workingLife": "10"
      },
      "code": 200
    }), Math.random() * 1500)
});

router.get("/wx/js/signature", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": {
        appId: '', // 必填，公众号的唯一标识
        timestamp: '', // 必填，生成签名的时间戳
        nonceStr: '', // 必填，生成签名的随机串
        signature: '',// 必填，签名，见附录1
      }
    }), Math.random() * 1500)
});

router.post("/rise/b/mark", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "msg": "ok",
      "code": 200
    }), Math.random() * 1500)
});

router.get("/rise/index/msg", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "msg": {
        "message": null,
        "url": null
      },
      "code": 200
    }), Math.random() * 1500)
});

router.get("/rise/schedule/count/down", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "msg": {
        days: 32,
        hasSchedule: true
      },
      "code": 200
    }), Math.random() * 1000)
});

router.get("/rise/customer/notify/expire",(req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "msg": {
        "id": null,
        "profileId": null,
        "orderId": null,
        "openId": null,
        "memberTypeId": null,
        "openDate": null,
        "expireDate": null,
        "expired": false,
        "addTime": null,
        "startTime": null,
        "endTime": null,
        "name": null,
        "expiredInSevenDays": false
      }, "code": 200
    }), Math.random() * 1000);
});

module.exports = router;
