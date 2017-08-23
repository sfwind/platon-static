var Router = require("express").Router;
var router = new Router();

router.get("/forum/question/load/list", (req, res) => {
  setTimeout(() =>
    res.status(200).json(
      {
        "msg": {
          "list": [ {
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
          } ], "end": true
        }, "code": 200
      }
    ), Math.random() * 1500);
});

router.get("/forum/question/load/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json(
      {
        "msg": {
          "id": 32,
          "topic": "对不喜欢的同事如何开放心态？",
          "description": "同事中有个女生是很会撒娇卖乖型，所以在公司人际关系很好，但个人不是很喜欢，工作中又偏偏经常要和她打交道，正如影响力课中所说，没好感则很难认同，我们俩的沟通常常不是很顺畅，我不知道是不是因为我的心态不够包容开放，我也经常告诉自己对事不对人，但似乎很难做到，所以想请问各位大神对不喜欢的人心态上如何做到包容开放？谢谢",
          "profileId": null,
          "followCount": 2,
          "openCount": 77,
          "answerCount": 3,
          "weight": 83,
          "addTime": 1503453033000,
          "lastModifiedTime": 1503453033000,
          "answerTips": null,
          "addTimeStr": "2017-08-23",
          "authorUserName": "小鱼",
          "authorHeadPic": "https://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ay8hWCY4rsU5ic7YX8NSbKTQ1jqib9icr5cJBexUUicYhHibyRcicc1Y9Hxmc5hFqdxgaUNjiaBH4HIahUdE/0",
          "follow": true,
          "mine": false,
          "answered": false,
          "answerList": [ {
            "id": 82,
            "answer": "<div>缘分有善缘和孽缘，有些人你就是看不惯，所谓道不同不相为谋。也曾经有过类似经历，很理解你的想法。在个人情感上，我觉得这是人之常情，可以理解，没有必要委屈自己去接纳。先按照本质问题小课套路一下：</div><div><br></div><div>1、澄清理解偏差（可能有误会）。同事在公司人际关系都很好，就是自己看不惯，是不是自己有偏见，先反思一下你们之间是否有误会，如果有，那么澄清以后会豁然开朗。</div><div><br></div><div>2、挖掘隐藏偏差（自己为什么不喜欢）。如果没有误会，问自己内心中有无隐藏诉求（比如你和同事是否存在利益冲突等），客观的回答自己的内心。</div><div><br></div><div>3、5why分析原因。为什么真的就是不喜欢她呢？分析原因到可解决的程度。</div><div><br></div><div>4、确定关键可行。这个问题关键度和可解决度怎么样，是否值得投入时间解决？</div><div><br></div><div>假设是一个关键度高解决度也高的高价值陷阱问题，问题的本质原因就是你和她天生不是一路人，以下直接给点参考，就不验证假设了（我偷懒）：</div><div><br></div><div>1、工作上就事论事。别看“就事论事”这几个字看上去简单，能克制自己的情绪真正做到的人并不是多数。相处过程中，你就在自己的脑子中把她的行为分为两个部分：一个是她做的事，一个是她做事的方式，然后有意识的忽略掉你不认可的做事方式，看她做事的结果，只要她的工作效果你认可，那么她用一些不同的方式又有什么关系呢？</div><div><br></div><div>2、私交上划清界限（自己心里知道就行了）。天生不是一路人，就去找自己那路人。人以类聚，没什么不正常的。</div><div><br></div><div>3、多看看动物世界。你会发现生物真的具有“多样性”，可能有助于你心态上更包容。</div><div><br></div><div>以上。</div>",
            "questionId": 32,
            "profileId": null,
            "approvalCount": 2,
            "publishTime": 1503474829000,
            "lastModifiedTime": 1503474829000,
            "publishTimeStr": "2017-08-23",
            "authorUserName": "chillymoon",
            "authorHeadPic": "https://wx.qlogo.cn/mmopen/hglMZuicA3iauTIlciaKXMtjEqyelLu4BN7V24o7T3l5jOqibhJghKyRU3xqZYX2F3k4cOJ589yIxCBibLUooiaPP1zb7XqCqtUxVS/0",
            "approval": false,
            "comments": null,
            "mine": false,
            "topic": null,
            "commentCount": 4
          }, {
            "id": 89,
            "answer": "1.你不喜欢她就带有主观感情色彩，主观带有排斥性，很难客观的沟通。&nbsp;<div>2.尝试发现她的优点，试着接纳她。只有看到她好的一面你才能轻松的和她交流。每个人都有优点，试着发现他人的优点吧！</div><div>3.在沟通时，可以尝试和其他同事一起进行，也可观察其他同事是如何与她沟通的。4.我在工作中也有不喜欢的同事，看不惯她的作风，但是工作沟通是必要的，只能换种心情接触，要不然真的很累。</div>",
            "questionId": 32,
            "profileId": null,
            "approvalCount": 0,
            "publishTime": 1503488181000,
            "lastModifiedTime": 1503488181000,
            "publishTimeStr": "2017-08-23",
            "authorUserName": "MIMO",
            "authorHeadPic": "https://wx.qlogo.cn/mmopen/pEmwvrI2S6bK9BjCdJImtjHb0EuU2gY7ibBvkiaOSUiaia0W2UWo6Jt2b9iamegr9QTMQKRzJzZg19HJFYmJ7W5PdAg/0",
            "approval": false,
            "comments": null,
            "mine": false,
            "topic": null,
            "commentCount": 0
          } ],
          "forumTags": [ { "id": 3, "name": "人际沟通", "del": false } ]
        }, "code": 200
      }
    ), Math.random() * 1500)
});

router.post("/forum/question/search", (req, res) => {
  setTimeout(() =>
    res.status(200).json(
      {
        "msg": {
          "list": [ {
            "id": 7,
            "topic": "解锁的垃圾袋垃圾",
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
            "topic": "cm.cxmz.cm.11",
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
          } ], "end": true
        }, "code": 200
      }
    ), Math.random() * 1500);
});

router.get("/forum/question/tag/load", (req, res) => {
  setTimeout(() =>
    res.status(200).json(
      {
        "msg": [ { "id": "1", "name": "职场" }, { "id": "2", "name": "思维" }, { "id": "3", "name": "练习" }, {
          "id": "4",
          "name": "职场2"
        }, { "id": "5", "name": "思维2" } ], "code": 200
      }
    ), Math.random() * 1500);
});

router.post("/forum/question/submit", (req, res) => {
  setTimeout(() =>
    res.status(200).json(
      {
        msg: "ok",
        code: 200
      }
    ), Math.random() * 1500);
});

router.post("/forum/question/follow/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json(
      {
        msg: "ok",
        code: 200
      }
    ), Math.random() * 1500);
});

router.post("/forum/question/follow/cancel/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json(
      {
        msg: "ok",
        code: 200
      }
    ), Math.random() * 1500);
});

router.post("/forum/answer/approve/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json(
      {
        msg: "ok",
        code: 200
      }
    ), Math.random() * 1500);
});
router.post("forum/answer/approve/cancel/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json(
      {
        msg: "ok",
        code: 200
      }
    ), Math.random() * 1500);
});

router.post("/forum/answer/delete/comment/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json(
      {
        msg: "ok",
        code: 200
      }
    ), Math.random() * 1500);
});

router.post("/forum/answer/comment", (req, res) => {
  setTimeout(() => {
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
  }, Math.random() * 1500)
})

router.get("/forum/answer/load/*", (req, res) => {
  setTimeout(() => {
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
  }, Math.random() * 1500)
})

router.post("/forum/answer/submit", (req, res) => {
  setTimeout(() => {
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
  }, Math.random() * 1500)
})

module.exports = router;
