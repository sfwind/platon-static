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
        "role":4,
        "avatar": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM4j579r72ltlZK0uBEz3klv57pOrqolSjZONIIlyffo4ib5p7sneIH4MgXyCKzKOKBiaCTkQUyu15XKiaeSppaJ0U3j1OBLIOrxrk/0",
        "discussTime": "2017-02-14"
      }
    }), Math.random() * 1500)
});

router.get("/rise/message/knowledge/discuss/reply/*", (req, res) => {
    setTimeout(() =>
        res.status(200).json({
            "code": 200,
            "msg": {
                "id": 23,
                "knowledgeId": 53,
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
                "role":4,
                "avatar": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM4j579r72ltlZK0uBEz3klv57pOrqolSjZONIIlyffo4ib5p7sneIH4MgXyCKzKOKBiaCTkQUyu15XKiaeSppaJ0U3j1OBLIOrxrk/0",
                "discussTime": "2017-02-14"
            }
        }), Math.random() * 1500)
});

router.get('/rise/message/old/count/load', (req, res) => {
  setTimeout(() =>
    res.status(200).json({"msg":80,"code":200}), Math.random() * 1500)
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
      "msg": {
        "end": false,
        "notifyMessageList": [
          {
            "id": 24,
            "message": "回复了我的选择题",
            "fromUser": null,
            "toUser": null,
            "isRead": true,
            "old": true,
            "readTime": 1488793898000,
            "sendTime": "2017-03-06",
            "url": "/rise/static/message/warmup/reply?commentId=67&warmupPracticeId=223",
            "fromUserName": "风之伤",
            "fromUserAvatar": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM4j579r72ltlZK0uBEz3klv57pOrqolSjZONIIlyffo4ib5p7sneIH4MgXyCKzKOKBiaCTkQUyu15XKiaeSppaJ0U3j1OBLIOrxrk/0"
          },
          {
            "id": 23,
            "message": "回复了我的知识点问题",
            "fromUser": null,
            "toUser": null,
            "isRead": true,
            "old": true,
            "readTime": 1488793897000,
            "sendTime": "2017-03-06",
            "url": "/rise/static/message/knowledge/reply?commentId=65&knowledgeId=223",
            "fromUserName": "风之伤",
            "fromUserAvatar": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM4j579r72ltlZK0uBEz3klv57pOrqolSjZONIIlyffo4ib5p7sneIH4MgXyCKzKOKBiaCTkQUyu15XKiaeSppaJ0U3j1OBLIOrxrk/0"
          },
          {
            "id": 22,
            "message": "回复了我的应用题",
            "fromUser": null,
            "toUser": null,
            "isRead": true,
            "old": true,
            "readTime": 1488793895000,
            "sendTime": "2017-03-06",
            "url": "/rise/static/message/comment/reply?commentId=64&moduleId=2&submitId=12",
            "fromUserName": "风之伤",
            "fromUserAvatar": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM4j579r72ltlZK0uBEz3klv57pOrqolSjZONIIlyffo4ib5p7sneIH4MgXyCKzKOKBiaCTkQUyu15XKiaeSppaJ0U3j1OBLIOrxrk/0"
          },
          {
              "id": 20,
              "message": "评论了我的小课分享",
              "fromUser": null,
              "toUser": null,
              "isRead": true,
              "old": true,
              "readTime": 1488793895000,
              "sendTime": "2017-03-06",
              "url": "/rise/static/message/subject/reply?submitId=64",
              "fromUserName": "风之伤",
              "fromUserAvatar": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM4j579r72ltlZK0uBEz3klv57pOrqolSjZONIIlyffo4ib5p7sneIH4MgXyCKzKOKBiaCTkQUyu15XKiaeSppaJ0U3j1OBLIOrxrk/0"
          }
        ]
      }
    }), Math.random() * 1500)
});


router.get("/rise/message/comment/reply/*", (req, res) => {
    setTimeout(() =>
        res.status(200).json({
            "code": 200,
            "msg": {
                id:1,
                topic:'练习标题',
                description:"balbal",
                planId:1,
                integerated:false,
                comments:[
                    {
                        "id": 23,
                        "knowledgeId": 53,
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
                        "role":4,
                        "avatar": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM4j579r72ltlZK0uBEz3klv57pOrqolSjZONIIlyffo4ib5p7sneIH4MgXyCKzKOKBiaCTkQUyu15XKiaeSppaJ0U3j1OBLIOrxrk/0",
                        "discussTime": "2017-02-14"
                    }

                ]
            }
        }), Math.random() * 1500)
});

module.exports = router;
