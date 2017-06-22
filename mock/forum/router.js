var Router = require("express").Router;
var router = new Router();


router.get("/forum/question/load/list", (req, res) => {
  setTimeout(() =>
    res.status(200).json(
      {
        "msg": {
          "list": [{
            "id": 7,
            "topic": "测22222试",
            "description": "描述up2222date",
            "profileId": null,
            "followCount": 2,
            "openCount": 118,
            "answerCount": 4,
            "weight": 124,
            "addTime": 1497957893000,
            "answerTips": "查看三十文、薛定谔的猫等2人的回答",
            "addTimeStr": "2017-06-20",
            "authorUserName": "薛定谔的猫",
            "authorHeadPic": "https://wx.qlogo.cn/mmopen/Q3auHgzwzM7wkhob9zgicD3IJxG1tLVSSe9qdzR1qUGXz6BwPv73sr67iaTEibcA1sNic3Roib4DgXCVG4IWe0zPAKJnlo5r4NibezssS6naic6dkM/0",
            "follow": true,
            "mine": true,
            "answerList": null,
            "questionTagList": null
          }, {
            "id": 2,
            "topic": "如何成为没有一点用的人",
            "description": "你不能巴拉巴拉巴拉巴拉巴拉这么做。。。你不能巴拉巴拉巴拉巴拉巴拉这么做。。。你要巴拉巴拉巴拉巴拉巴拉这么做。。。",
            "profileId": null,
            "followCount": 0,
            "openCount": 37,
            "answerCount": 2,
            "weight": 37,
            "addTime": 1497926416000,
            "answerTips": "查看薛定谔的猫、三十文等2人的回答",
            "addTimeStr": "2017-06-20",
            "authorUserName": "?雷立风行",
            "authorHeadPic": "https://wx.qlogo.cn/mmopen/PiajxSqBRaEI6Ett47SE95j62d8rLN0FIcgAFdUXpBqosmXDpZzDOQ8TMNX92DP3icZqEXQtcoicnezvvFINTIlaw/0",
            "follow": false,
            "mine": false,
            "answerList": null,
            "questionTagList": null
          }, {
            "id": 1,
            "topic": "如何成为有用的人",
            "description": "你要巴拉巴拉巴拉巴拉巴拉这么做。。。你要巴拉巴拉巴拉巴拉巴拉这么做。。。你要巴拉巴拉巴拉巴拉巴拉这么做。。。",
            "profileId": null,
            "followCount": 2,
            "openCount": 9,
            "answerCount": 1,
            "weight": 15,
            "addTime": 1497926353000,
            "answerTips": "查看三十文的回答",
            "addTimeStr": "2017-06-20",
            "authorUserName": "缪能达",
            "authorHeadPic": "https://wx.qlogo.cn/mmopen/ajNVdqHZLLDAbh37MBYIQNJfT256gPjftKiaQYu3QFGqgEGS3UBGcJAZMz784z5Fo7iapkUsMMJMicaASlsOqM7ibm6iaz4vO1VzAkibNrjrwqKJ0/0",
            "follow": true,
            "mine": false,
            "answerList": null,
            "questionTagList": null
          }, {
            "id": 6,
            "topic": "这个是标题",
            "description": "这个是内容",
            "profileId": null,
            "followCount": 22,
            "openCount": 11,
            "answerCount": 2333,
            "weight": 9,
            "addTime": 1497953740000,
            "answerTips": "成为第一个回答者",
            "addTimeStr": "2017-06-20",
            "authorUserName": "薛定谔的猫",
            "authorHeadPic": "https://wx.qlogo.cn/mmopen/Q3auHgzwzM7wkhob9zgicD3IJxG1tLVSSe9qdzR1qUGXz6BwPv73sr67iaTEibcA1sNic3Roib4DgXCVG4IWe0zPAKJnlo5r4NibezssS6naic6dkM/0",
            "follow": false,
            "mine": true,
            "answerList": null,
            "questionTagList": null
          }, {
            "id": 4,
            "topic": "思维问题",
            "description": "思维问题描述",
            "profileId": null,
            "followCount": 1,
            "openCount": 3,
            "answerCount": 0,
            "weight": 6,
            "addTime": 1497944430000,
            "answerTips": "成为第一个回答者",
            "addTimeStr": "2017-06-20",
            "authorUserName": "风之伤",
            "authorHeadPic": "https://wx.qlogo.cn/mmopen/Q3auHgzwzM4j579r72ltlZK0uBEz3klv57pOrqolSjZONIIlyffo4ib5p7sneIH4MgXyCKzKOKBiaCTkQUyu15XKiaeSppaJ0U3j1OBLIOrxrk/0",
            "follow": false,
            "mine": false,
            "answerList": null,
            "questionTagList": null
          }], "end": true
        }, "code": 200
      }
    ), Math.random() * 1500);
});

router.get("/forum/question/load/*", (req, res) => {
    setTimeout(() =>
        res.status(200).json(
          {
            "msg": {
              "id": 7,
              "topic": "测22222试",
              "description": "描述up2222date",
              "profileId": null,
              "followCount": 2,
              "openCount": 118,
              "answerCount": 4,
              "weight": 124,
              "addTime": 1497957893000,
              "answerTips": null,
              "addTimeStr": "2017-06-20",
              "authorUserName": "薛定谔的猫",
              "authorHeadPic": "https://wx.qlogo.cn/mmopen/Q3auHgzwzM7wkhob9zgicD3IJxG1tLVSSe9qdzR1qUGXz6BwPv73sr67iaTEibcA1sNic3Roib4DgXCVG4IWe0zPAKJnlo5r4NibezssS6naic6dkM/0",
              "follow": true,
              "mine": true,
              "answerList": [
                {
                  "id": 8,
                  "answer": "kkkk",
                  "questionId": 7,
                  "profileId": null,
                  "approvalCount": 1,
                  "publishTime": 1498028543000,
                  "lastModifiedTime": 1498028543000,
                  "publishTimeStr": "2017-06-21",
                  "authorUserName": "三十文",
                  "authorHeadPic": "https://wx.qlogo.cn/mmopen/bj9JGugn6UeXic2b4fpoXTsSC2qwW9WYLVQmx3Xs99RXQGZ7FV8J2NwUKjhGM06n0hQMXWr7icxdHpHTFxoqedzaIIicNwmz3cD/0",
                  "approval": false,
                  "comments": null,
                  "mine": false,
                  "topic": null
                },
                {
                  "id": 7,
                  "answer": "gmhmhj",
                  "questionId": 7,
                  "profileId": null,
                  "approvalCount": 0,
                  "publishTime": 1498028427000,
                  "lastModifiedTime": 1498028427000,
                  "publishTimeStr": "2017-06-21",
                  "authorUserName": "三十文",
                  "authorHeadPic": "https://wx.qlogo.cn/mmopen/bj9JGugn6UeXic2b4fpoXTsSC2qwW9WYLVQmx3Xs99RXQGZ7FV8J2NwUKjhGM06n0hQMXWr7icxdHpHTFxoqedzaIIicNwmz3cD/0",
                  "approval": false,
                  "comments": null,
                  "mine": false,
                  "topic": null
                },
                {
                  "id": 2,
                  "answer": "这是一个问题的答案 答案 答案",
                  "questionId": 7,
                  "profileId": null,
                  "approvalCount": -7,
                  "publishTime": 1498008103000,
                  "lastModifiedTime": 1498008405000,
                  "publishTimeStr": "2017-06-21",
                  "authorUserName": "薛定谔的猫",
                  "authorHeadPic": "https://wx.qlogo.cn/mmopen/Q3auHgzwzM7wkhob9zgicD3IJxG1tLVSSe9qdzR1qUGXz6BwPv73sr67iaTEibcA1sNic3Roib4DgXCVG4IWe0zPAKJnlo5r4NibezssS6naic6dkM/0",
                  "approval": true,
                  "comments": null,
                  "mine": true,
                  "topic": null
                },
                {
                  "id": 3,
                  "answer": "fff3飞飞飞飞333fff",
                  "questionId": 7,
                  "profileId": null,
                  "approvalCount": -22,
                  "publishTime": 1498008466000,
                  "lastModifiedTime": 1498031316000,
                  "publishTimeStr": "2017-06-21",
                  "authorUserName": "薛定谔的猫",
                  "authorHeadPic": "https://wx.qlogo.cn/mmopen/Q3auHgzwzM7wkhob9zgicD3IJxG1tLVSSe9qdzR1qUGXz6BwPv73sr67iaTEibcA1sNic3Roib4DgXCVG4IWe0zPAKJnlo5r4NibezssS6naic6dkM/0",
                  "approval": true,
                  "comments": null,
                  "mine": true,
                  "topic": null
                }
              ],
              "questionTagList": [
                {
                  "id": 8,
                  "questionId": 7,
                  "tagId": 1,
                  "del": false
                },
                {
                  "id": 10,
                  "questionId": 7,
                  "tagId": 3,
                  "del": false
                },
                {
                  "id": 15,
                  "questionId": 7,
                  "tagId": 7,
                  "del": false
                }
              ]
            },
            "code": 200
          }
        ), Math.random() * 1500)
});

router.get("/forum/question/tag/load", (req, res) => {
    setTimeout(() =>
        res.status(200).json(
            {"msg":[{"id":"1","name":"职场"},{"id":"2","name":"思维"},{"id":"3","name":"练习"},{"id":"4","name":"职场2"},{"id":"5","name":"思维2"}],"code":200}
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

router.post("/forum/answer/approve/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json(
      {
        msg:"ok",
        code:200
      }
    ), Math.random() * 1500);
});
router.post("forum/answer/approve/cancel/*",(req, res) => {
  setTimeout(() =>
    res.status(200).json(
      {
        msg:"ok",
        code:200
      }
    ), Math.random() * 1500);
});

router.post("/forum/answer/delete/comment/*",(req, res) => {
  setTimeout(() =>
    res.status(200).json(
      {
        msg:"ok",
        code:200
      }
    ), Math.random() * 1500);
});

router.post("/forum/answer/comment",(req,res)=>{
  setTimeout(()=>{
    res.status(200).json(
      {
        "msg": {
          "id": 0,
          "answerId": 3,
          "commentProfileId": 16443,
          "comment": "fff3飞飞飞飞333fff",
          "del": false,
          "repliedId": 3,
          "repliedProfileId": 30,
          "repliedDel": false,
          "addTime": null,
          "publishTimeStr": "2017-06-21",
          "authorUserName": "风之伤",
          "authorHeadPic": "https://www.iqycamp.com/images/default_avatar.png",
          "repliedComment": "11111",
          "repliedName": "三十文",
          "mine": true
        },
        "code": 200
      }
    )
  },Math.random()*1500)
})

router.get("/forum/answer/load/*",(req,res)=>{
  setTimeout(()=>{
    res.status(200).json(
      {
        "msg": {
          "id": 2,
          "answer": "这是一个问题的答案 答案 答案",
          "questionId": 7,
          "profileId": null,
          "approvalCount": -7,
          "publishTime": 1498008103000,
          "lastModifiedTime": 1498008405000,
          "publishTimeStr": "2017-06-21",
          "authorUserName": "薛定谔的猫",
          "authorHeadPic": "https://wx.qlogo.cn/mmopen/Q3auHgzwzM7wkhob9zgicD3IJxG1tLVSSe9qdzR1qUGXz6BwPv73sr67iaTEibcA1sNic3Roib4DgXCVG4IWe0zPAKJnlo5r4NibezssS6naic6dkM/0",
          "approval": true,
          "comments": [
            {
              "id": 2,
              "answerId": 2,
              "commentProfileId": null,
              "comment": "fff3333fff",
              "del": false,
              "repliedId": 1,
              "repliedProfileId": null,
              "repliedDel": true,
              "addTime": 1498009753000,
              "publishTimeStr": "2017-06-21",
              "authorUserName": "薛定谔的猫",
              "authorHeadPic": "https://wx.qlogo.cn/mmopen/Q3auHgzwzM7wkhob9zgicD3IJxG1tLVSSe9qdzR1qUGXz6BwPv73sr67iaTEibcA1sNic3Roib4DgXCVG4IWe0zPAKJnlo5r4NibezssS6naic6dkM/0",
              "repliedComment": "该评论已删除",
              "repliedName": "薛定谔的猫",
              "mine": true
            },
            {
              "id": 16,
              "answerId": 2,
              "commentProfileId": null,
              "comment": "dsfdsf",
              "del": false,
              "repliedId": 2,
              "repliedProfileId": null,
              "repliedDel": false,
              "addTime": 1498035861000,
              "publishTimeStr": "2017-06-21",
              "authorUserName": "三十文",
              "authorHeadPic": "https://wx.qlogo.cn/mmopen/bj9JGugn6UeXic2b4fpoXTsSC2qwW9WYLVQmx3Xs99RXQGZ7FV8J2NwUKjhGM06n0hQMXWr7icxdHpHTFxoqedzaIIicNwmz3cD/0",
              "repliedComment": "fff3333fff",
              "repliedName": "薛定谔的猫",
              "mine": false
            },
            {
              "id": 17,
              "answerId": 2,
              "commentProfileId": null,
              "comment": "hnhnhnhn",
              "del": false,
              "repliedId": null,
              "repliedProfileId": null,
              "repliedDel": null,
              "addTime": 1498035927000,
              "publishTimeStr": "2017-06-21",
              "authorUserName": "三十文",
              "authorHeadPic": "https://wx.qlogo.cn/mmopen/bj9JGugn6UeXic2b4fpoXTsSC2qwW9WYLVQmx3Xs99RXQGZ7FV8J2NwUKjhGM06n0hQMXWr7icxdHpHTFxoqedzaIIicNwmz3cD/0",
              "repliedComment": null,
              "repliedName": null,
              "mine": false
            }
          ],
          "mine": true,
          "topic": "测22222试"
        },
        "code": 200
      }
    )
  },Math.random()*1500)
})


router.post("/forum/answer/submit",(req,res)=>{
  setTimeout(()=>{
    res.status(200).json(
      {
        "msg": {
          "id": 0,
          "answer": "fff3飞飞飞飞333fff",
          "questionId": 1,
          "profileId": 16443,
          "approvalCount": 0,
          "publishTime": null,
          "lastModifiedTime": null,
          "publishTimeStr": "2017-06-21",
          "authorUserName": "风之伤",
          "authorHeadPic": "https://www.iqycamp.com/images/default_avatar.png",
          "approval": null,
          "comments": null,
          "mine": null,
          "topic": null
        },
        "code": 200
      }
    );
  },Math.random()*1500)
})





module.exports = router;
