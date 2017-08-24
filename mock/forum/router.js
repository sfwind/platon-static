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
          "id": 33,
          "topic": "动不动就想看手机的坏毛病怎么破？",
          "description": "自己很难注意力集中下来，做事情效率不高。举个例子比如正在看网易公开课的视频，可仍然手欠忍不住就看手机，看微信等？除了把手机放在自己视线看不到的地方，还有别的办法吗？",
          "profileId": null,
          "followCount": 4,
          "openCount": 138,
          "answerCount": 5,
          "weight": 150,
          "addTime": 1503463900000,
          "lastModifiedTime": 1503463900000,
          "answerTips": null,
          "addTimeStr": "2017-08-23",
          "authorUserName": "随心",
          "authorHeadPic": "https://wx.qlogo.cn/mmopen/pEmwvrI2S6adoic3GoppNoA3iaicRY7xCYtNtLhyNt1HSQpeYyAU69V3SW4V4nsM2JqHNWAfeiaDniaFrkDupjMSoDlgd7VAibQVhD/0",
          "follow": false,
          "mine": false,
          "answered": false,
          "answerList": [ {
            "id": 87,
            "answer": "我来推荐两个我在用的方法~<div><br></div><div>1）培养习惯。</div><div>自己之前也深深觉得自己效率不高，而想做的事情又太多，非常苦恼。</div><div>后来学习了<a data-problemid='19' >《时间管理》</a>那门小课，讲到要记录每天的时间流水，就是按照5分钟或10分钟这样一种时间粒度，去记录你从早到晚都做了什么，用了多少时间。</div><div>然后去分析一下哪些时间是你的常态时间，比如通勤，吃饭，睡觉；哪些是动态时间，比如一些突发事件或变化；还有黄金时间，是自己可以集中注意力、不被打扰的、可以深度解决问题的时间；还有碎片时间，比如等饭。了解自己的时间习惯后，就可以把事情按照关键度和可行性，放进不同的时间段里去。</div><div>紧接着，就尽量按照这个详尽的计划去执行。慢慢培养成自己的习惯，这样就能避开那些习惯了。</div><div><br></div><div>2）上面那个是长期培养的过程。下面介绍一个工具。所谓“工欲善其事必先利其器”嘛，我们可以多利用工具帮我们达成目标。</div><div>推荐一个工具。番茄工作法。它把时间切分成25分钟，然后是5分钟休息。那25分钟会设置成倒计时，显示在屏幕上。每当拿起手机，看着时间滴滴答答地走，会促使自己把手机放下，继续工作。每完成一个番茄，自己的成就感和对自我的认同感都会增强。</div><div><br></div><div>这两个方法对我来说比较有用。希望你也能找到适合自己的方法哦</div><div><div><br></div></div>",
            "questionId": 33,
            "profileId": null,
            "approvalCount": 3,
            "publishTime": 1503484299000,
            "lastModifiedTime": 1503484299000,
            "publishTimeStr": "2017-08-23",
            "authorUserName": "Claudia\uD83C\uDF88孙雪",
            "authorHeadPic": "https://wx.qlogo.cn/mmopen/wbKdib81ny6icIK0BaTrZAQHEGlNicG6ucZIjY65zAdPsmz39B6Cc3Eib47zwsibAicbBofwLZ9giaYlG5FlJSSKovICibSd49qaEFyI/0",
            "approval": false,
            "comments": null,
            "mine": false,
            "topic": null,
            "commentCount": 1
          }, {
            "id": 83,
            "answer": "看到这个问题不禁会心一笑，很想说这个真的不只你一个人啊，现在大家都被手机绑架得很厉害。我想大约是因为人性本身是懒惰的吧～～能做到不看手机的，大约是两种人，一种是工作很忙碌，有很多重要且紧急的事情要做，一坐下就被各种邮件电话追杀忙到飞起，肯定是没有空来刷手机了；另外一种就是内心有明确的目标，动力强劲，所以可以突破惰性的吸引力（请脑补飞机起飞的场景～）<div><br></div><div>所以我觉得吧，我们要对抗的不是手机（也无法对抗，天性使然）。关键我们要想清楚，不看手机的时间，我们想干嘛。而我们想做的事，是想达成什么样的目标，对我们有多重要，能产生多大的动力来驱动我们改变自己。有了明确的目标和行动计划，然后培养习惯去执行，这样才能真正做到。具体怎么做，内容详见我们的小课<a data-problemid='12'>《如何改变自己》</a>，有非常细致的阐述和方法。</div><div><br></div><div>其实把手机放在我们看不见的地方，就是一个很好的方法，小课中《调整环境》一节会讲到。我打算开始采用。因为最近正好也在思考这个问题，想要提高自己的工作效率，打算试行一段时间看看效果:)</div>\n",
            "questionId": 33,
            "profileId": null,
            "approvalCount": 2,
            "publishTime": 1503475258000,
            "lastModifiedTime": 1503475258000,
            "publishTimeStr": "2017-08-23",
            "authorUserName": "Cindy.C",
            "authorHeadPic": "https://wx.qlogo.cn/mmopen/PiajxSqBRaEJkkL8Ou2K0edGIQdDlb7icTgXnpsHT9DCGEn1hIq5S4Gz3X4O0bpgfzlDf3iaV4O9ePniaNuaymibKgA/0",
            "approval": false,
            "comments": null,
            "mine": false,
            "topic": null,
            "commentCount": 2
          }, {
            "id": 84,
            "answer": "<a data-problemid='12'>《如何改变自何己》</a>统计记录，可以辅助控制一下。",
            "questionId": 33,
            "profileId": null,
            "approvalCount": 1,
            "publishTime": 1503475725000,
            "lastModifiedTime": 1503475725000,
            "publishTimeStr": "2017-08-23",
            "authorUserName": "chillymoon",
            "authorHeadPic": "https://wx.qlogo.cn/mmopen/hglMZuicA3iauTIlciaKXMtjEqyelLu4BN7V24o7T3l5jOqibhJghKyRU3xqZYX2F3k4cOJ589yIxCBibLUooiaPP1zb7XqCqtUxVS/0",
            "approval": false,
            "comments": null,
            "mine": false,
            "topic": null,
            "commentCount": 1
          }, {
            "id": 100,
            "answer": "喝酒不开车、开车不喝酒<div>换到手机工作学习中，这句话改成“学习工作不玩手机、玩手机不学习工作”。</div><div>当然这不是绝对的哈，最好将学习工作的时间缩短，比如半小时到1小时内不看手机。</div><div><br></div><div>看手机学【圈外同学】课程，看文章也是学习</div><div>所以主要是自己给自己一个自愿遵守的原则，从小处做起，要求自己10小时不玩手机太夸张。</div><div><br></div><div>我有个小体验，就是认识到自己长期一心二用的后果，如果可以承担，为何不可？但如果自己认识到一心二用的后果，写下来，比如：一心二用我根本不能够将眼前的工作学习做到80分，最多60分，60分甚至低于60分多了，我这个人也是给人60分的感觉；学习时候看手机，思考不深入老被打断，学了个假知识而已；看手机，什么时候看都行，再说了看了别人的生活能够给我们留下什么？而且看我之后，要知道我们脑袋就像电脑内存一样，会留下很多浏览垃圾占用我们的内存，电脑有一键缓存功能，脑袋里可不是一键这么简单，看完你可能还会潜意识中思考，做梦梦见....这里花的时间可不好计算啦。</div><div><br></div><div>所以建议1）认识到自己任何行为的后果，愿意承担；2）如不愿意承担，那就去改变，善于理性、借助感性、制作情境。受益于【圈外同学】中的<a data-problemid='14'>《如何改变自己》</a>小课。都说人生在于自律，可是纯依靠自制力的自律太流氓，借助小课总结出来的方法，让自己成为一个更自律的人吧，自“践”则无敌！</div>",
            "questionId": 33,
            "profileId": null,
            "approvalCount": 0,
            "publishTime": 1503550167000,
            "lastModifiedTime": 1503550167000,
            "publishTimeStr": "2017-08-24",
            "authorUserName": "阿一Kelly",
            "authorHeadPic": "https://wx.qlogo.cn/mmopen/ib7IQ03GF98XjoaHgicBwkEgJibkeibgt642PsCibSvvByVXQzR6OeyFcmFQoxzOSd819hD5YCXLGjqbOQ5BdsgpdyXiaoo39r4ib9r/0",
            "approval": false,
            "comments": null,
            "mine": false,
            "topic": null,
            "commentCount": 0
          }, {
            "id": 94,
            "answer": "换成诺基亚直板儿用三天，根治。",
            "questionId": 33,
            "profileId": null,
            "approvalCount": 0,
            "publishTime": 1503534890000,
            "lastModifiedTime": 1503534890000,
            "publishTimeStr": "2017-08-24",
            "authorUserName": "暖暖的阳光",
            "authorHeadPic": "https://wx.qlogo.cn/mmopen/ib7IQ03GF98XjoaHgicBwkEp4lLJAmZveFPCPMF0324mhxibm0WEicnWvnoaXc7uhEL5GLG5rsKcfJm33rRF1T9tKSUwLzRMPuWo/0",
            "approval": false,
            "comments": null,
            "mine": false,
            "topic": null,
            "commentCount": 1
          } ],
          "forumTags": [ { "id": 7, "name": "自我管理", "del": false } ]
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
