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
      "msg": [{
        "id": 22,
        "message": "回复了我的热身训练",
        "fromUser": null,
        "toUser": null,
        "isRead": 0,
        "readTime": "2017-2-18",
        "sendTime": "2017-2-18",
        "url": "/rise/static/practice/challenge?id=3",
        "fromUserName": "小猴几",
        "fromUserAvatar": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM4j579r72ltlZK0uBEz3klv57pOrqolSjZONIIlyffo4ib5p7sneIH4MgXyCKzKOKBiaCTkQUyu15XKiaeSppaJ0U3j1OBLIOrxrk/0",
      },{
        "id": 23,
        "message": "回复了我的热身训练",
        "fromUser": null,
        "toUser": null,
        "isRead": 0,
        "readTime": "2017-2-16",
        "sendTime": "2017-2-16",
        "url": "/rise/static/practice/application?id=3",
        "fromUserName": "小猴几",
        "fromUserAvatar": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM4j579r72ltlZK0uBEz3klv57pOrqolSjZONIIlyffo4ib5p7sneIH4MgXyCKzKOKBiaCTkQUyu15XKiaeSppaJ0U3j1OBLIOrxrk/0",
      },{
        "id": 24,
        "message": "回复了我的热身训练",
        "fromUser": null,
        "toUser": null,
        "isRead": 1,
        "readTime": "2017-2-16",
        "sendTime": "2017-2-16",
        "url": "/rise/static/message/warmup/reply?commentId=13&warmupPracticeId=13",
        "fromUserName": "小猴几",
        "fromUserAvatar": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM4j579r72ltlZK0uBEz3klv57pOrqolSjZONIIlyffo4ib5p7sneIH4MgXyCKzKOKBiaCTkQUyu15XKiaeSppaJ0U3j1OBLIOrxrk/0",
      }]
    }), Math.random() * 1500)
});


module.exports = router;
