var Router = require("express").Router;

var router = new Router();

router.post("/rise/plan/choose/problem/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": 12 //planId
    }), Math.random() * 1500)
});

router.get("/rise/plan/load/studyline/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "msg": {
        "preview": [
          {
            "id": 740115,
            "planId": 29989,
            "type": 21,
            "practiceId": "25",
            "unlocked": true,
            "series": 0,
            "sequence": 5,
            "knowledgeId": null,
            "status": 0,
            "summary": null
          }
        ],
        "chapters": [
          {
            "chapter": 1,
            "sections": [
              {
                "section": 1,
                "knowledgeId": 133,
                "name": "你真的知道压力是什么吗",
                "series": 1,
                "chapter": 1,
                "integrated": false,
                "chapterName": "认识压力",
                "practices": [],
                "status": 0,
                "type": 31,
                "practicePlanId": 740079
              },
              {
                "section": 2,
                "knowledgeId": 135,
                "name": "为什么我们会感觉到压力",
                "series": 2,
                "chapter": 1,
                "integrated": false,
                "chapterName": "认识压力",
                "practices": [],
                "status": 0,
                "type": 31,
                "practicePlanId": 740080
              },
              {
                "section": 3,
                "knowledgeId": 136,
                "name": "为什么有的人总在说压力山大",
                "series": 3,
                "chapter": 1,
                "integrated": false,
                "chapterName": "认识压力",
                "practices": [],
                "status": 0,
                "type": 31,
                "practicePlanId": 740081
              }
            ],
            "name": "认识压力",
            "myWarmScore": null,
            "totalWarmScore": null,
            "integrated": false
          },
          {
            "chapter": 2,
            "sections": [
              {
                "section": 1,
                "knowledgeId": 138,
                "name": "揭开你的压力真面目",
                "series": 4,
                "chapter": 2,
                "integrated": false,
                "chapterName": "识别压力",
                "practices": [],
                "status": 0,
                "type": 31,
                "practicePlanId": 740079
              }
            ],
            "name": "识别压力",
            "myWarmScore": null,
            "totalWarmScore": null,
            "integrated": false
          },
          {
            "chapter": 3,
            "sections": [
              {
                "section": 1,
                "knowledgeId": 140,
                "name": "方法一：调整行为方式",
                "series": 5,
                "chapter": 3,
                "integrated": false,
                "chapterName": "应对压力",
                "practices": [],
                "status": -1,
                "type": 31,
                "practicePlanId": 740079
              },
              {
                "section": 2,
                "knowledgeId": 142,
                "name": "方法二：改变认知方式",
                "series": 6,
                "chapter": 3,
                "integrated": false,
                "chapterName": "应对压力",
                "practices": [],
                "status": -1,
                "type": 31,
                "practicePlanId": 740080
              },
              {
                "section": 3,
                "knowledgeId": 144,
                "name": "方法三：增加应对资源",
                "series": 7,
                "chapter": 3,
                "integrated": false,
                "chapterName": "应对压力",
                "practices": [],
                "status": -1,
                "type": 31,
                "practicePlanId": 740081
              },
              {
                "section": 4,
                "knowledgeId": 145,
                "name": "方法四：提升应对能力",
                "series": 8,
                "chapter": 3,
                "integrated": false,
                "chapterName": "应对压力",
                "practices": [],
                "status": -1,
                "type": 31,
                "practicePlanId": 740082
              }
            ],
            "name": "应对压力",
            "myWarmScore": null,
            "totalWarmScore": null,
            "integrated": false
          },
          {
            "chapter": 4,
            "sections": [
              {
                "section": 1,
                "knowledgeId": 59,
                "name": "内容回顾 & 综合练习",
                "series": 9,
                "chapter": 4,
                "integrated": true,
                "chapterName": "综合案例",
                "practices": [],
                "status": -1,
                "type": 31,
                "practicePlanId": 740079
              }
            ],
            "name": "综合案例",
            "myWarmScore": null,
            "totalWarmScore": null,
            "integrated": true
          }
        ],
        "review": [
          {
            "type": 101,
            "status": -1
          },
          {
            "type": 102,
            "status": -1
          }
        ],
        "problemId": 25,
        "problemName": "掌控压力：让我们不焦虑也不懒散",
        "headPic": null,
        "problemType": "minor"
      },
      "code": 200
    }), Math.random() * 1500)
});

router.get("/rise/plan/load", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "msg": {
        "id": 2,
        "openid": null,
        "problemId": 2,
        "startDate": "2016-12-24",
        "endDate": "2016-12-31",
        "closeDate": "2017-01-07",
        "currentSeries": 1, //当前题组
        "completeSeries": 1, //完成题组
        "totalSeries": 2,  //总题组
        "warmupComplete": 3, //结束的热身训练
        "applicationComplete": 2, //结束的应用训练
        "total": 14, //总共的训练
        "point": 0,
        "complete": 0,
        "status": 1,
        "hasProblemScore": false,
        "lockedStatus": -1,
        "problem": {
          "id": 2,
          "problem": "跟老板",
          "pic": "http://www.iquanwai.com/images/fragment/problem1.png",
          "catalogId": 1,
          "length": 5,
          "warmupCount": 10,
          "applicationCount": 5,
          "challengeCount": 1,
          "description": "以情动人和以理服人是说服别人的两种方式，通过本训练，你将掌握提出明确的诉求、讲好故事、以及有效使用证据的方法。结合运用理性和感性，更好说服他人。"
        },
        "sections": [{
          "name": "第一节",
          "chapterName": "第一章",
          "section": 1,
          "chapter": 1,
          "series": 1,
          "practices": [{
            "type": 31,
            "status": 0,
            "unlocked": true,
            "practiceIdList": [49],
            "series": 1,
            "sequence": 1,
            "practicePlanId": 1,
            "planId": 3,
          }, {
            "type": 1,
            "status": 0,
            "unlocked": true,
            "practiceIdList": [52, 56, 52],
            "series": 1,
            "sequence": 2,
            "planId": 3,
            "practicePlanId": 1
          }, {
            "type": 11,
            "status": 1,
            "unlocked": true,
            "practiceIdList": [27],
            "series": 1,
            "sequence": 3,
            "planId": 3,
            "practicePlanId": 1,
            "optional": true
          }, {
            "knowledge": null,
            "type": 21,
            "status": 1,
            "unlocked": true,
            "practiceIdList": [2],
            "practicePlanId": 2,
            "series": 0,
            "sequence": 4,
            "planId": 3,
            "optional": true
          }]
        },
          {
            "name": "第二节",
            "chapterName": "第一章",
            "section": 2,
            "chapter": 1,
            "practices": [{
              "type": 32,
              "status": 0,
              "unlocked": true,
              "practiceIdList": [1],
              "series": 2,
              "sequence": 1,
              "practicePlanId": 1,
              "planId": 3,
              "optional": true
            }, {
              "type": 1,
              "status": 0,
              "unlocked": true,
              "practiceIdList": [52, 56, 52],
              "series": 2,
              "sequence": 2,
              "planId": 3,
              "practicePlanId": 1
            }, {
              "type": 11,
              "status": 1,
              "unlocked": true,
              "practiceIdList": [27],
              "series": 2,
              "sequence": 3,
              "planId": 3,
              "practicePlanId": 1
            }, {
              "knowledge": null,
              "type": 21,
              "status": 1,
              "unlocked": true,
              "practiceIdList": [2],
              "series": 2,
              "sequence": 4,
              "optional": true
            }]
          }
        ],
        "openRise": true,
        "openConsolidation": true,
        "openApplication": true,
        "deadline": 7,
      }, "code": 200
    }), Math.random() * 1500)
});

router.get("/rise/plan/knowledge/load/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": {
        "id": 1,
        "knowledge": "知识点描述", //知识点
        "voice": "http://someurl", //语音链接
        "pic": "http://someurl", //图片链接
        "analysis": "balbalbal", //作用
        "means": "方法", //方法
        "keynote": "要点" //要点
      }
    }), Math.random() * 1500)
});

router.post("/rise/plan/complete", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": {
        "iscomplete": true,
        "percent": 15,
        "mustStudyDays": 7,
      }
    }), Math.random() * 1500)
});

router.post("/rise/plan/close", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": "ok"
    }), Math.random() * 1500)
});

router.post('/rise/open/rise', (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": "ok"
    }), Math.random() * 1500)
});

router.post('/rise/open/navigator', (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": "ok"
    }), Math.random() * 1500)
});

router.post('/rise/open/welcome', (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": "ok"
    }), Math.random() * 1500)
});

router.get("/rise/plan/knowledge/example/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": {
        "id": 1, //题目id
        "question": "题干", //问题题干
        "analysis": "balbal", //问题分析
        "voice": "http://someurl", //语音分析链接
        "type": 1, //1-单选题，2-多选题
        "difficulty": 1, //1-简单，2-普通，3-困难
        "knowledgeId": 2, //知识点
        "choiceList": [
          {
            "id": 1,
            "questionId": 1, //问题id
            "subject": "选项1", //选项题干
            "sequence": 1, //选项顺序
            "isRight": false,  //是否是正确选项
            "selected": false //用户是否选择
          },
          {
            "id": 2,
            "questionId": 1,
            "subject": "选项2",
            "sequence": 2,
            "isRight": true,
            "selected": true
          },
          {
            "id": 3,
            "questionId": 1,
            "subject": "选项2",
            "sequence": 2,
            "isRight": true,
            "selected": false
          },
          {
            "id": 4,
            "questionId": 1,
            "subject": "选项2",
            "sequence": 2,
            "isRight": false,
            "selected": true
          }
        ],
      }
    }), Math.random() * 1500)
});

router.post('/rise/plan/roadmap', (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "msg": [
        {
          "intro": "故事的三种作用",
          "series": 1
        },
        {
          "intro": "故事的套路:故事的基本要素 & 故事的附加要素",
          "series": 2
        },
        {
          "intro": "故事的套路:故事的附加要素",
          "series": 3
        },
        {
          "intro": "商业故事的要点",
          "series": 4
        },
        {
          "intro": "综合练习1",
          "series": 5
        },
        {
          "intro": "综合练习2",
          "series": 6
        }
      ],
      "code": 200
    }), Math.random() * 1500)
});

router.post("/rise/plan/welcome", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": true
    }), Math.random() * 1500)
});

router.post("/rise/plan/mark/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": "ok"
    }), Math.random() * 1500)
});

router.get("/rise/plan/risemember", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": false
    }), Math.random() * 1500)
});

router.get("/rise/plan/member/description", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": true
    }), Math.random() * 1500)
});

router.get("/rise/plan/promote", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": 'ok'
    }), Math.random() * 1500)
});

router.get('/rise/open/status', (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": {
        openRise: true,
        openApplication: true,
        openConsolidation: true,
      }
    }), Math.random() * 1500)
});

router.post("/rise/plan/check/*", (req, res) => {
  setTimeout(() => {
    res.status(200).json(
      { "msg": "ok", "code": 200 }
    );
  }, Math.random() * 1500);
});

router.get("/rise/plan/chapter/list", (req, res) => {
  setTimeout(() => {
    res.status(200).json(
      {
        "msg": [{
          "chapterId": 1,
          "chapter": "结构清晰",
          "sectionList": [{ "sectionId": 1, "section": "将信息归类分组", "series": 1 }, {
            "sectionId": 2,
            "section": "确保归类不重不漏",
            "series": 2
          }]
        }, {
          "chapterId": 2,
          "chapter": "有序递进",
          "sectionList": [{ "sectionId": 1, "section": "用时间顺序组织表达", "series": 3 }, {
            "sectionId": 2,
            "section": "用空间顺序组织表达",
            "series": 4
          }, { "sectionId": 3, "section": "用程度顺序组织表达", "series": 5 }, {
            "sectionId": 4,
            "section": "用三种顺序组织表达",
            "series": 6
          }]
        }, {
          "chapterId": 3,
          "chapter": "主题鲜明",
          "sectionList": [{ "sectionId": 1, "section": "表达时主题先行", "series": 7 }]
        }, {
          "chapterId": 4,
          "chapter": "复习",
          "sectionList": [{ "sectionId": 1, "section": "内容回顾 & 综合练习1", "series": 8 }, {
            "sectionId": 2,
            "section": "内容回顾 & 综合练习2",
            "series": 9
          }]
        }], "code": 200
      }
    );
  }, Math.random() * 1500);
})

router.post("/rise/plan/mark/*", (req, res) => {
  setTimeout(() => {
    res.status(200).json(
      { "msg": "ok", "code": 200 }
    );
  }, Math.random() * 1500);
});

router.get("/rise/plan/list", (req, res) => {
  setTimeout(() => {
    res.status(200).json(
      {
        "msg": {
          "runningPlans": [{
            "name": "写出令HR过目难忘的简历",
            "point": 0,
            "problemId": 6,
            "planId": 19880,
            "pic": "https://static.iqycamp.com/images/fragment/problem6_3.png",
            "completeSeries": 0,
            "totalSeries": 6,
            "deadline": 27,
            "startDate": "2017-09-10",
            "closeTime": null,
            "learnable":true,
            "problem": {
              "id": 6,
              "problem": "写出令HR过目难忘的简历",
              "pic": "https://static.iqycamp.com/images/fragment/problem6_3.png",
              "length": null,
              "catalogId": 2,
              "subCatalogId": 4,
              "author": null,
              "authorDesc": null,
              "authorPic": null,
              "difficultyScore": 2.82,
              "usefulScore": null,
              "descPic": null,
              "audio": null,
              "audioId": null,
              "audioWords": null,
              "who": null,
              "how": null,
              "why": null,
              "del": false,
              "newProblem": false,
              "trial": false,
              "hot": false,
              "categoryPic": null,
              "abbreviation": "简历",
              "done": null,
              "status": null,
              "hasProblemScore": false,
              "chapterList": null,
              "subCatalog": "求职能力",
              "catalog": "营销自己",
              "chosenPersonCount": 0,
              "monthlyCampMonth": null
            }
          }, {
            "name": "在面试中脱颖而出",
            "point": 0,
            "problemId": 7,
            "planId": 20155,
            "pic": "https://static.iqycamp.com/images/problem7_4.jpg",
            "completeSeries": 0,
            "totalSeries": 8,
            "deadline": 29,
            "startDate": "2017-09-12",
            "closeTime": null,
            "learnable":true,
            "problem": {
              "id": 7,
              "problem": "在面试中脱颖而出",
              "pic": "https://static.iqycamp.com/images/problem7_4.jpg",
              "length": null,
              "catalogId": 2,
              "subCatalogId": 4,
              "author": null,
              "authorDesc": null,
              "authorPic": null,
              "difficultyScore": 2.7627,
              "usefulScore": null,
              "descPic": null,
              "audio": null,
              "audioId": null,
              "audioWords": null,
              "who": null,
              "how": null,
              "why": null,
              "del": false,
              "newProblem": false,
              "trial": false,
              "hot": false,
              "categoryPic": null,
              "abbreviation": "面试",
              "done": null,
              "status": null,
              "hasProblemScore": false,
              "chapterList": null,
              "subCatalog": "求职能力",
              "catalog": "营销自己",
              "chosenPersonCount": 0,
              "monthlyCampMonth": null
            }
          }],
          "completedPlans": [{
            "name": "如何高效学习",
            "point": 0,
            "problemId": 23,
            "planId": 16256,
            "pic": "https://static.iqycamp.com/images/problem23_3.png",
            "completeSeries": 0,
            "totalSeries": 9,
            "deadline": 0,
            "startDate": "2017-08-09",
            "closeTime": "2017-09-09",
            "learnable":true,
            "problem": {
              "id": 23,
              "problem": "如何高效学习",
              "pic": "https://static.iqycamp.com/images/problem23_3.png",
              "length": null,
              "catalogId": 1,
              "subCatalogId": 18,
              "author": null,
              "authorDesc": null,
              "authorPic": null,
              "difficultyScore": 3.5,
              "usefulScore": null,
              "descPic": null,
              "audio": null,
              "audioId": null,
              "audioWords": null,
              "who": null,
              "how": null,
              "why": null,
              "del": false,
              "newProblem": true,
              "trial": false,
              "hot": false,
              "categoryPic": null,
              "abbreviation": "高效学习",
              "done": null,
              "status": null,
              "hasProblemScore": false,
              "chapterList": null,
              "subCatalog": "学习能力",
              "catalog": "打造自己",
              "chosenPersonCount": 0,
              "monthlyCampMonth": null
            }
          }, {
            "name": "双赢谈判：不撕逼也能得到你想要的",
            "point": 90,
            "problemId": 21,
            "planId": 16098,
            "pic": "https://static.iqycamp.com/images/problem21_1.jpg",
            "completeSeries": 3,
            "totalSeries": 7,
            "deadline": 0,
            "startDate": "2017-08-08",
            "closeTime": "2017-09-08",
            "learnable":true,
            "problem": {
              "id": 21,
              "problem": "双赢谈判：不撕逼也能得到你想要的",
              "pic": "https://static.iqycamp.com/images/problem21_1.jpg",
              "length": null,
              "catalogId": 1,
              "subCatalogId": 6,
              "author": null,
              "authorDesc": null,
              "authorPic": null,
              "difficultyScore": 3.5,
              "usefulScore": null,
              "descPic": null,
              "audio": null,
              "audioId": null,
              "audioWords": null,
              "who": null,
              "how": null,
              "why": null,
              "del": false,
              "newProblem": false,
              "trial": false,
              "hot": false,
              "categoryPic": null,
              "abbreviation": "双赢谈判",
              "done": null,
              "status": null,
              "hasProblemScore": false,
              "chapterList": null,
              "subCatalog": "影响力",
              "catalog": "打造自己",
              "chosenPersonCount": 0,
              "monthlyCampMonth": null
            }
          }, {
            "name": "如何用故事说服别人",
            "point": 810,
            "problemId": 14,
            "planId": 4693,
            "pic": "https://static.iqycamp.com/images/problem14_4.jpg",
            "completeSeries": 6,
            "totalSeries": 6,
            "deadline": 0,
            "startDate": "2017-05-20",
            "closeTime": "2017-06-20",
            "learnable":true,
            "problem": {
              "id": 14,
              "problem": "如何用故事说服别人",
              "pic": "https://static.iqycamp.com/images/problem14_4.jpg",
              "length": null,
              "catalogId": 1,
              "subCatalogId": 6,
              "author": null,
              "authorDesc": null,
              "authorPic": null,
              "difficultyScore": 3.5,
              "usefulScore": null,
              "descPic": null,
              "audio": null,
              "audioId": null,
              "audioWords": null,
              "who": null,
              "how": null,
              "why": null,
              "del": false,
              "newProblem": false,
              "trial": false,
              "hot": false,
              "categoryPic": null,
              "abbreviation": "说服力",
              "done": null,
              "status": null,
              "hasProblemScore": false,
              "chapterList": null,
              "subCatalog": "影响力",
              "catalog": "打造自己",
              "chosenPersonCount": 0,
              "monthlyCampMonth": null
            }
          }],
          "recommendations": [{
            "id": 16,
            "problem": "影响力：让他人不再对我们说不",
            "pic": "https://static.iqycamp.com/images/fragment/problem16_1.png",
            "length": null,
            "catalogId": 1,
            "subCatalogId": 6,
            "author": null,
            "authorDesc": null,
            "authorPic": null,
            "difficultyScore": 3.5,
            "usefulScore": null,
            "descPic": null,
            "audio": null,
            "audioId": null,
            "audioWords": null,
            "who": null,
            "how": null,
            "why": null,
            "del": false,
            "newProblem": false,
            "trial": false,
            "hot": true,
            "categoryPic": null,
            "abbreviation": "影响力",
            "done": null,
            "status": null,
            "hasProblemScore": null,
            "chapterList": null,
            "subCatalog": "影响力",
            "catalog": null,
            "chosenPersonCount": 0,
            "monthlyCampMonth": null
          }, {
            "id": 1,
            "problem": "与人沟通时条理更清晰",
            "pic": "https://static.iqycamp.com/images/problem1_4.jpg",
            "length": null,
            "catalogId": 1,
            "subCatalogId": 1,
            "author": null,
            "authorDesc": null,
            "authorPic": null,
            "difficultyScore": 3.2542,
            "usefulScore": null,
            "descPic": null,
            "audio": null,
            "audioId": null,
            "audioWords": null,
            "who": null,
            "how": null,
            "why": null,
            "del": false,
            "newProblem": false,
            "trial": false,
            "hot": false,
            "categoryPic": null,
            "abbreviation": "清晰沟通",
            "done": null,
            "status": null,
            "hasProblemScore": null,
            "chapterList": null,
            "subCatalog": "表达能力",
            "catalog": null,
            "chosenPersonCount": 0,
            "monthlyCampMonth": null
          }, {
            "id": 8,
            "problem": "给自己的未来定个发展策略",
            "pic": "https://static.iqycamp.com/images/fragment/problem8_3.png",
            "length": null,
            "catalogId": 3,
            "subCatalogId": 5,
            "author": null,
            "authorDesc": null,
            "authorPic": null,
            "difficultyScore": 3.2857,
            "usefulScore": null,
            "descPic": null,
            "audio": null,
            "audioId": null,
            "audioWords": null,
            "who": null,
            "how": null,
            "why": null,
            "del": false,
            "newProblem": false,
            "trial": false,
            "hot": false,
            "categoryPic": null,
            "abbreviation": "发展策略",
            "done": null,
            "status": null,
            "hasProblemScore": null,
            "chapterList": null,
            "subCatalog": "个人规划",
            "catalog": null,
            "chosenPersonCount": 0,
            "monthlyCampMonth": null
          }, {
            "id": 15,
            "problem": "如何改变自己",
            "pic": "https://static.iqycamp.com/images/fragment/problem15_3.png",
            "length": null,
            "catalogId": 4,
            "subCatalogId": 7,
            "author": null,
            "authorDesc": null,
            "authorPic": null,
            "difficultyScore": 3.0,
            "usefulScore": null,
            "descPic": null,
            "audio": null,
            "audioId": null,
            "audioWords": null,
            "who": null,
            "how": null,
            "why": null,
            "del": false,
            "newProblem": false,
            "trial": false,
            "hot": true,
            "categoryPic": null,
            "abbreviation": "改变自己",
            "done": null,
            "status": null,
            "hasProblemScore": null,
            "chapterList": null,
            "subCatalog": "行为管理",
            "catalog": null,
            "chosenPersonCount": 0,
            "monthlyCampMonth": null
          }, {
            "id": 18,
            "problem": "别让情绪打败你",
            "pic": "https://static.iqycamp.com/images/fragment/problem18_1.png",
            "length": null,
            "catalogId": 4,
            "subCatalogId": 9,
            "author": null,
            "authorDesc": null,
            "authorPic": null,
            "difficultyScore": 3.5,
            "usefulScore": null,
            "descPic": null,
            "audio": null,
            "audioId": null,
            "audioWords": null,
            "who": null,
            "how": null,
            "why": null,
            "del": false,
            "newProblem": false,
            "trial": false,
            "hot": true,
            "categoryPic": null,
            "abbreviation": "情绪管理",
            "done": null,
            "status": null,
            "hasProblemScore": null,
            "chapterList": null,
            "subCatalog": "情绪管理",
            "catalog": null,
            "chosenPersonCount": 0,
            "monthlyCampMonth": null
          }, {
            "id": 11,
            "problem": "洞察他人行为背后的真相",
            "pic": "https://static.iqycamp.com/images/fragment/problem11_3.png",
            "length": null,
            "catalogId": 1,
            "subCatalogId": 3,
            "author": null,
            "authorDesc": null,
            "authorPic": null,
            "difficultyScore": 3.0877,
            "usefulScore": null,
            "descPic": null,
            "audio": null,
            "audioId": null,
            "audioWords": null,
            "who": null,
            "how": null,
            "why": null,
            "del": false,
            "newProblem": false,
            "trial": false,
            "hot": false,
            "categoryPic": null,
            "abbreviation": "看透他人",
            "done": null,
            "status": null,
            "hasProblemScore": null,
            "chapterList": null,
            "subCatalog": "思考能力",
            "catalog": null,
            "chosenPersonCount": 0,
            "monthlyCampMonth": null
          }],
          "riseMember": null,
          "openNavigator": true,
          "openWelcome": true
        }, "code": 200
      }
    );
  }, Math.random() * 1500)
});



module.exports = router;
