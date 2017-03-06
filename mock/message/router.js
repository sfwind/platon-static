var Router = require("express").Router;

var router = new Router();

router.get("/rise/message/warmup/discuss/reply/*", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
      "code": 200,
      "msg": {
        "id": 23,
        "warmupPracticeId": 53,
        "repliedId": null,
        "comment": "提意见",
        "openid": "o5h6ywlXxHLmoGrLzH9Nt7uyoHbM",
        "addTime": 1487060182000,
        "priority": 0,
        "repliedOpenid": null,
        "repliedComment": "回复内容",
        "del": 0,
        "repliedName": "Diane",
        "name": "风之伤",
        "avatar": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM4j579r72ltlZK0uBEz3klv57pOrqolSjZONIIlyffo4ib5p7sneIH4MgXyCKzKOKBiaCTkQUyu15XKiaeSppaJ0U3j1OBLIOrxrk/0",
        "discussTime": "2017-02-14"
      }
    }), Math.random() * 1500)
});


router.post("/rise/message/read/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": "ok"
    }), Math.random() * 1500)
});

router.get("/rise/message/load", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": []
    }), Math.random() * 1500)
});


module.exports = router;
