var Router = require("express").Router;

var router = new Router();

router.get("/rise/bible/load/article/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "msg": {
        list: [{
          date: '09月19日 星期三',
          articleList: [{
            id: 1,
            title: "标题标题标题",
            url: "https://m.baidu.com",
            tag: "1,2",
            source: "张良计",
            wordCount: 100,
            upTime: "2017-08-12",
            acknowledged: false,// 是否已读
            disfavor: 0,// 1-不喜欢，0-喜欢
            tagName: ["社会", "情感"]
          }, {
            id: 2,
            title: "射雕英雄传速读第一章",
            url: "https://m.baidu.com",
            tag: "1,3",
            source: "爱奇艺",
            wordCount: 1300,
            upTime: "2017-10-12",
            acknowledged: true,// 是否已读
            disfavor: 0,// 1-不喜欢，0-喜欢
            tagName: ["社会", "武侠"]
          }],
          isPageEnd: true,
        }],
        firstOpen: true,
        isDateEnd: true,
      }, "code": 200
    }), Math.random() * 1500);
});

router.get("/rise/bible/load/article/certain/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "msg": {
        list: [{
          date: '09月19日 星期三',
          articleList: [{
            id: 1,
            title: "标题标题标题",
            url: "url",
            tag: "1,2",
            source: "张良计",
            wordCount: 100,
            upTime: "2017-08-12",
            acknowledged: false,// 是否已读
            disfavor: 0,// 1-不喜欢，0-喜欢
            tagName: ["社会", "情感"]
          }, {
            id: 2,
            title: "射雕英雄传速读第一章",
            url: "url",
            tag: "1,3",
            source: "爱奇艺",
            wordCount: 1300,
            upTime: "2017-10-12",
            acknowledged: true,// 是否已读
            disfavor: 0,// 1-不喜欢，0-喜欢
            tagName: ["社会", "武侠"]
          }],
          isPageEnd: true,
        }],
        firstOpen: true,
        isDateEnd: true,
        editTag: false,
      }, "code": 200
    }), Math.random() * 1500);
});

router.post("/rise/bible/favor/article/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json({ "msg": "ok", "code": 200 }), Math.random() * 1500)
});

router.post("/rise/bible/disfavor/article/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json({ "msg": "ok", "code": 200 }), Math.random() * 1500)
});

router.post("/rise/bible/open/article/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json({ "msg": "ok", "code": 200 }), Math.random() * 1500)
});

router.get("/rise/bible/load/score", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "msg": {
        "compareGroup": [{
          tagId: 1,
          tagName: "社会",
          yesterdayPoint: 1.3,
          todayPoint: 2,
          totalPoint: 3.3,
          today: '2017-09-01'
        }, {
          tagId: 2,
          tagName: "新闻",
          yesterdayPoint: 1.3,
          todayPoint: 3,
          totalPoint: 3.3,
          today: '2017-09-01'
        }, {
          tagId: 3,
          tagName: "体育",
          yesterdayPoint: 1.3,
          todayPoint: 8,
          totalPoint: 3.3,
          today: '2017-09-01'
        }, {
          tagId: 4,
          tagName: "娱乐",
          yesterdayPoint: 1.3,
          todayPoint: 12,
          totalPoint: 3.3,
          today: '2017-09-01'
        }, {
          tagId: 5,
          tagName: "笑话",
          yesterdayPoint: 1.3,
          todayPoint: 13,
          totalPoint: 3.3,
          today: '2017-09-01'
        }],
        "riseId": "of8voz9",
        "totalWords": 1003,
        "totalScore": 13.1,
        "nickName": "宋金虎",
        "headImage": "https://wx.qlogo.cn/mmopen/EH7IlM7dhSMyu4wcAplO0jBAYgShwBWM4PGrQMtt7ibmQwORy6Z2sxiaibDI09ib125YeEqsRWFX3z3JVDSRsCS9gOyFSnuvWSU6/0",
        "qrCode": "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQGB7zwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAycGRQdXNKVWJjU2wxVXNScHhwY3AAAgQcKLJZAwQAjScA"
      }, "code": 200
    }), Math.random() * 1500);
});

router.get("/rise/bible/guest/load/score", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "msg": {
        "compareGroup": [{
          tagId: 1,
          tagName: "社会",
          yesterdayPoint: 1.3,
          todayPoint: 2,
          totalPoint: 3.3,
          today: '2017-09-01'
        }, {
          tagId: 2,
          tagName: "新闻",
          yesterdayPoint: 1.3,
          todayPoint: 3,
          totalPoint: 3.3,
          today: '2017-09-01'
        }, {
          tagId: 3,
          tagName: "体育",
          yesterdayPoint: 1.3,
          todayPoint: 8,
          totalPoint: 3.3,
          today: '2017-09-01'
        }, {
          tagId: 4,
          tagName: "娱乐",
          yesterdayPoint: 1.3,
          todayPoint: 12,
          totalPoint: 3.3,
          today: '2017-09-01'
        }, {
          tagId: 5,
          tagName: "笑话",
          yesterdayPoint: 1.3,
          todayPoint: 13,
          totalPoint: 3.3,
          today: '2017-09-01'
        }],
        "riseId": "of8voz9",
        "totalWords": 1003,
        "nickName": "宋金虎",
        "totalScore": 13.1,
        "headImage": "https://wx.qlogo.cn/mmopen/EH7IlM7dhSMyu4wcAplO0jBAYgShwBWM4PGrQMtt7ibmQwORy6Z2sxiaibDI09ib125YeEqsRWFX3z3JVDSRsCS9gOyFSnuvWSU6/0",
        "qrCode": "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQGB7zwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAycGRQdXNKVWJjU2wxVXNScHhwY3AAAgQcKLJZAwQAjScA"
      }, "code": 200
    }), Math.random() * 1500);
});

router.post("/rise/bible/open/bible", (req, res) => {
  setTimeout(() =>
    res.status(200).json({ "msg": "ok", "code": 200 }), Math.random() * 1500)
});

module.exports = router;
