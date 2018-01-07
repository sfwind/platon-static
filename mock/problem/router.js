var Router = require("express").Router;

var router = new Router();

router.get("/rise/problem/list/unchoose", (req, res) => {
  setTimeout(() =>
    res.status(200).json(
      {
        "msg": {
          "name": "风之伤",
          "hotList": [
            {
              "id": 15,
              "problem": "如何改变自己",
              "pic": "https://static.iqycamp.com/images/fragment/problem15_3.png",
              "length": null,
              "catalogId": 4,
              "subCatalogId": 7,
              "author": null,
              "authorDesc": null,
              "authorPic": null,
              "difficultyScore": 3,
              "usefulScore": null,
              "descPic": null,
              "audio": null,
              "who": null,
              "how": null,
              "why": null,
              "del": false,
              "newProblem": false,
              "trial": false,
              "hot": true,
              "categoryPic": null,
              "done": null,
              "status": 0,
              "hasProblemScore": null,
              "chapterList": null,
              "subCatalog": "行为管理",
              "catalog": "管理自己"
            },
            {
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
              "who": null,
              "how": null,
              "why": null,
              "del": false,
              "newProblem": false,
              "trial": false,
              "hot": true,
              "categoryPic": null,
              "done": null,
              "status": 0,
              "hasProblemScore": null,
              "chapterList": null,
              "subCatalog": "影响力",
              "catalog": "打造自己"
            },
            {
              "id": 17,
              "problem": "如何打造自己专属的时间管理系统",
              "pic": "https://static.iqycamp.com/images/fragment/problem17_1.png",
              "length": null,
              "catalogId": 4,
              "subCatalogId": 8,
              "author": null,
              "authorDesc": null,
              "authorPic": null,
              "difficultyScore": 3.5,
              "usefulScore": null,
              "descPic": null,
              "audio": null,
              "who": null,
              "how": null,
              "why": null,
              "del": false,
              "newProblem": false,
              "trial": false,
              "hot": true,
              "categoryPic": null,
              "done": null,
              "status": 0,
              "hasProblemScore": null,
              "chapterList": null,
              "subCatalog": "效率管理",
              "catalog": "管理自己"
            },
            {
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
              "who": null,
              "how": null,
              "why": null,
              "del": false,
              "newProblem": false,
              "trial": false,
              "hot": true,
              "categoryPic": null,
              "done": null,
              "status": 0,
              "hasProblemScore": null,
              "chapterList": null,
              "subCatalog": "情绪管理",
              "catalog": "管理自己"
            }
          ],
          "catalogList": [
            {
              "name": "测试分类",
              "pic": "http://www.iquanwai.com/images/fragment/problem5_1.png",
              "problemList": null
            },
            {
              "name": "测试分类2",
              "pic": "http://www.iquanwai.com/images/fragment/problem5_1.png",
              "problemList": [
                {
                  "id": 2,
                  "problem": "跟老板/家人提要求时更有说服力",
                  "pic": "http://www.iquanwai.com/images/fragment/problem2.png",
                  "length": 5,
                  "warmupCount": 10,
                  "applicationCount": 5,
                  "challengeCount": 1,
                  "description": "以情动人和以理服人是说服别人的两种方式，通过本训练，你将掌握<br/>1）提出明确的诉求<br/>2）讲好故事<br/>3）有效使用证据<br/>结合运用理性和感性，能更好说服他人。<br/><br/>对应这三个目标，你未来将要学习的知识点如下：<br/>1）明确提出诉求——概括主题<br/>2）讲好故事——SCQA<br/>3）有效使用证据——证据的效力<br/><br/>这些知识点都会以选择题和应用题的方式，来帮助你更好地掌握。",
                  "catalogId": "1",
                  "status": 2,
                  "newProblem": true,
                },
                {
                  "id": 1,
                  "problem": "与人沟通时条理更清晰",
                  "pic": "http://www.iquanwai.com/images/fragment/problem1.png",
                  "length": 5,
                  "warmupCount": 10,
                  "applicationCount": 5,
                  "challengeCount": 1,
                  "description": "以情动人和以理服人是说服别人的两种方式，通过本训练，你将掌握<br/>1）提出明确的诉求<br/>2）讲好故事<br/>3）有效使用证据<br/>结合运用理性和感性，能更好说服他人。<br/><br/>对应这三个目标，你未来将要学习的知识点如下：<br/>1）明确提出诉求——概括主题<br/>2）讲好故事——SCQA<br/>3）有效使用证据——证据的效力<br/><br/>这些知识点都会以选择题和应用题的方式，来帮助你更好地掌握。以情动人和以理服人是说服别人的两种方式，通过本训练，你将掌握<br/>1）提出明确的诉求<br/>2）讲好故事<br/>3）有效使用证据<br/>结合运用理性和感性，能更好说服他人。<br/><br/>对应这三个目标，你未来将要学习的知识点如下：<br/>1）明确提出诉求——概括主题<br/>2）讲好故事——SCQA<br/>3）有效使用证据——证据的效力<br/><br/>这些知识点都会以选择题和应用题的方式，来帮助你更好地掌握。",
                  "catalogId": "1",
                  "audio": "http://www.iquanwai.com/images/fragment/rise_p1.m4a",
                  "status": 0,
                  "trial": true,
                }
              ]
            }
          ]
        },
        "code": 200
      }
    ), Math.random() * 1500)
});

router.post("/rise/problem/select", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": "ok"
    }), Math.random() * 1500)
});

router.get("/rise/problem/load/mine", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": {
        "problemList": [
          {
            "problemId": 1, //问题id
            "problem": "问题描述", //问题描述
            "status": 0 //0-待解决，1-解决中，2-已解决
          },
          {
            "problemId": 2, //问题id
            "problem": "问题描述", //问题描述
            "status": 0 //0-待解决，1-解决中，2-已解决
          }
        ]
      }
    }), Math.random() * 1500)
});

router.get("/rise/problem/get/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "msg": {
        "id": 1,
        "problem": "与人沟通时条理更清晰",
        "pic": "https://www.iqycamp.com/images/fragment/problem1_3.png",
        "length": 9,
        "description": "为什么有些人的文章思路特别清晰，令人读后印象深刻，而有些人的文章却让人不知所云？<br/><br/>为什么有些人即兴发言也能侃侃而谈，而有些人一开口却大脑一片空白？<br/><br/>如果做到以下四点，你的沟通就能更有条理，更容易被理解。<br/>1）表达时主题先行<br/>2）将同类信息归在一组<br/>3）确保信息归类不重叠不遗漏<br/>4）按逻辑顺序组织每组信息",
        "catalogId": 1,
        "subCatalogId": 1,
        "author": "孙圈圈",
        "authorDesc": "孙圈圈，原名孙园媛，移动学习品牌“圈外” （iquanwai）创始人&CEO，前外资管理咨询公司咨询总监，曾为6大行业、50多家大型企业设计过人才发展战略。著有职场干货畅销书《请停止无效努力：如何用正确的方法快速进阶》，豆瓣评分8.7。",
        "difficultyScore": 3.2542,
        "subjectDesc": "学习是为了更好地实践。不妨跟大家分享一下，你的沟通条理。好的分享能有机会获得圈外教练的点评，其他童鞋的点赞，以及被收录为精华！",
        "descPic": "https://www.iqycamp.com/images/problem_desc_1_2.jpeg",
        "audio": "https://www.iqycamp.com/audio/rise_p1.m4a",
        "who": "希望提升沟通表达条理性的学生或职场人士",
        "what": "对应4个要点，以下是课程表：",
        "how": "如果做到以下4点，你的沟通就能更有条理，更容易被理解。\n1）先抛主题\n2）将同类信息/内容归在一组\n3）确保信息/内容归类不重叠不遗漏\n4）按逻辑顺序组织每组信息/内容",
        "why": "为什么有些人即兴发言也能侃侃而谈，而有些人一开口却大脑一片空白？\n\n为什么有些人写的报告思路特别清晰，令人读后印象深刻，而有些人的报告却让人不知所云？\n",
        "del": false,
        "trial": false,
        "categoryPic": "https://www.iqycamp.com/images/fragment/category2_4.jpeg",
        "done": null,
        "status": null,
        "hasProblemScore": false,
        "problemType":1,
        "chapterList": [{
          "chapter": 1,
          "sections": [{
            "section": 1,
            "knowledgeId": 1,
            "name": "将信息归类分组",
            "series": 1,
            "chapter": 1,
            "integrated": false,
            "chapterName": "结构清晰",
            "practices": []
          }, {
            "section": 2,
            "knowledgeId": 6,
            "name": "确保归类不重不漏",
            "series": 2,
            "chapter": 1,
            "integrated": false,
            "chapterName": "结构清晰",
            "practices": []
          }],
          "name": "结构清晰",
          "integrated": false
        }, {
          "chapter": 2,
          "sections": [{
            "section": 1,
            "knowledgeId": 2,
            "name": "用时间顺序组织表达",
            "series": 3,
            "chapter": 2,
            "integrated": false,
            "chapterName": "有序递进",
            "practices": []
          }, {
            "section": 2,
            "knowledgeId": 3,
            "name": "用空间顺序组织表达",
            "series": 4,
            "chapter": 2,
            "integrated": false,
            "chapterName": "有序递进",
            "practices": []
          }, {
            "section": 3,
            "knowledgeId": 4,
            "name": "用程度顺序组织表达",
            "series": 5,
            "chapter": 2,
            "integrated": false,
            "chapterName": "有序递进",
            "practices": []
          }, {
            "section": 4,
            "knowledgeId": 5,
            "name": "用三种顺序组织表达",
            "series": 6,
            "chapter": 2,
            "integrated": false,
            "chapterName": "有序递进",
            "practices": []
          }],
          "name": "有序递进",
          "integrated": false
        }, {
          "chapter": 3,
          "sections": [{
            "section": 1,
            "knowledgeId": 7,
            "name": "表达时主题先行",
            "series": 7,
            "chapter": 3,
            "integrated": false,
            "chapterName": "主题鲜明",
            "practices": []
          }],
          "name": "主题鲜明",
          "integrated": false
        }, {
          "chapter": 4,
          "sections": [{
            "section": 1,
            "knowledgeId": 57,
            "name": "内容回顾 & 综合练习1",
            "series": 8,
            "chapter": 4,
            "integrated": true,
            "chapterName": "复习",
            "practices": []
          }, {
            "section": 2,
            "knowledgeId": 58,
            "name": "内容回顾 & 综合练习2",
            "series": 9,
            "chapter": 4,
            "integrated": true,
            "chapterName": "复习",
            "practices": []
          }],
          "name": "复习",
          "integrated": true
        }]
      }, "code": 200
    }), Math.random() * 1500)
});

router.post("/rise/problem/grade/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": "ok"
    }), Math.random() * 1500)
});

router.get("/rise/problem/open/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json(
      {
        "msg": {
          "problem": {
            "id": 15,
            "problem": "如何改变自己",
            "pic": "https://static.iqycamp.com/images/fragment/problem15_3.png",
            "length": 9,
            "catalogId": 4,
            "subCatalogId": 7,
            "author": "孙圈圈",
            "authorDesc": null,
            "authorPic": "https://static.iqycamp.com/images/rise_problem_author_pic_sunquanquanV2.png?imageslim",
            "difficultyScore": 3,
            "usefulScore": 4.2784,
            "descPic": "https://static.iqycamp.com/images/problem_desc_15_1.jpg",
            "audio": "https://www.iqycamp.com/audio/rise_p15.m4a",
            "audioId": 178,
            "audioWords": "改变不能单单依靠意志力，因为意志力是会被耗尽的。心理学家罗伊·鲍迈斯特的研究表明——意志力是一种有限的生理资源：当意志力消耗越多时，被压抑的欲望反弹得也更强烈。\n\n真正让改变发生的，是三个关键因素：理性、感性和情境。我们可以把改变自己看做是骑马奔向目标的过程，你想达到的最终状态就是那个目标。理性就好比骑手，感性是骑手驾驭的野马，而情境则是骑手驾马驰骋的草原。要想到达终点，需要骑手、野马和草原的共同作用。\n\n理性的力量为我们指引改变的方向、寻找解决办法；感性的力量让我们在改变的过程中，更愿意坚持；理性和感性都是我们自身拥有的资源，除此之外，合适的外部情境能让改变更容易发生。\n\n需要注意的是，在进行改变的时候，我们并不一定要动用所有的方法。有的情况下，调动情感最有效，而有的情况下可能调整环境最有效。\n\n接下来，我们将会用9小节，依次学习这些知识，其中，最后1节是对前期所学内容的综合复习和应用。一起行动起来，让改变真正发生。",
            "who": "曾经想要改变却找不到方向的人;想要改变却无法坚持的人;想要改变却始终不能成功的人",
            "how": "<p>真正让改变发生有三个关键因素：理性、感性和情境。只要我们能善用理性、借助感性、制造情境，就能让改变更轻松。</p>",
            "why": "<p>想要早起、少玩手机、坚持运动、不对家人发脾气、工作更有效率……每个想改变自己的努力，似乎都是一场反人性的斗争，需要极强的意志力，才能真正改变。</p><p></p><p>事实上，改变也可以来的更轻松。通过学习这门课程，你将掌握改变自己的科学方法，轻松改变自己；也可以借助这些方法，引导别人向你想要的方向改变。</p>",
            "del": false,
            "newProblem": false,
            "trial": false,
            "hot": null,
            "categoryPic": "https://static.iqycamp.com/images/fragment/category3_3.jpeg",
            "abbreviation": "改变自己",
            "done": null,
            "status": null,
            "hasProblemScore": false,
            "chapterList": [
              {
                "chapter": 1,
                "sections": [
                  {
                    "section": 1,
                    "knowledgeId": 73,
                    "name": "设定目标",
                    "series": 1,
                    "chapter": 1,
                    "integrated": false,
                    "chapterName": "善用理性",
                    "practices": []
                  },
                  {
                    "section": 2,
                    "knowledgeId": 74,
                    "name": "分析关键因素",
                    "series": 2,
                    "chapter": 1,
                    "integrated": false,
                    "chapterName": "善用理性",
                    "practices": []
                  }
                ],
                "name": "善用理性",
                "myWarmScore": null,
                "totalWarmScore": null,
                "integrated": false
              },
              {
                "chapter": 2,
                "sections": [
                  {
                    "section": 1,
                    "knowledgeId": 76,
                    "name": "调动情感",
                    "series": 3,
                    "chapter": 2,
                    "integrated": false,
                    "chapterName": "借助感性",
                    "practices": []
                  },
                  {
                    "section": 2,
                    "knowledgeId": 75,
                    "name": "小处做起",
                    "series": 4,
                    "chapter": 2,
                    "integrated": false,
                    "chapterName": "借助感性",
                    "practices": []
                  },
                  {
                    "section": 3,
                    "knowledgeId": 77,
                    "name": "获得认同",
                    "series": 5,
                    "chapter": 2,
                    "integrated": false,
                    "chapterName": "借助感性",
                    "practices": []
                  }
                ],
                "name": "借助感性",
                "myWarmScore": null,
                "totalWarmScore": null,
                "integrated": false
              },
              {
                "chapter": 3,
                "sections": [
                  {
                    "section": 1,
                    "knowledgeId": 78,
                    "name": "调整环境",
                    "series": 6,
                    "chapter": 3,
                    "integrated": false,
                    "chapterName": "制造情境",
                    "practices": []
                  },
                  {
                    "section": 2,
                    "knowledgeId": 79,
                    "name": "培养习惯",
                    "series": 7,
                    "chapter": 3,
                    "integrated": false,
                    "chapterName": "制造情境",
                    "practices": []
                  },
                  {
                    "section": 3,
                    "knowledgeId": 80,
                    "name": "找到同伴",
                    "series": 8,
                    "chapter": 3,
                    "integrated": false,
                    "chapterName": "制造情境",
                    "practices": []
                  }
                ],
                "name": "制造情境",
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
                    "practices": []
                  }
                ],
                "name": "综合案例",
                "myWarmScore": null,
                "totalWarmScore": null,
                "integrated": true
              }
            ],
            "subCatalog": "行为管理",
            "catalog": "管理自己",
            "chosenPersonCount": 0,
            "monthlyCampMonth": null
          },
          "fee": 0.01,
          "buttonStatus": 1,
          "planId": null,
          "bindMobile": false,
          "isFull": false,
          "togetherClassMonth": null,
          "problemCollected": false
        },
        "code": 200
      }
    ), Math.random() * 1500);
});

router.get("/signup/coupon/list", (req, res) => {
  setTimeout(() =>
    res.status(200).json(
      {
        "msg": [{
          "id": 325,
          "openid": "o-Es21bZakuqjBfVr7a-_j90WQuI",
          "profileId": 18830,
          "amount": 20.0,
          "used": 0,
          "cost": null,
          "orderId": null,
          "expiredDate": "2017-07-31",
          "category": null,
          "description": null,
          "expired": "2017.07.31"
        }], "code": 200
      }
    ), Math.random() * 1500)
});

router.post("/signup/coupon/course/calculate", (req, res) => {
  setTimeout(() =>
    res.status(200).json(
      { "msg": 0.0, "code": 200 }
    ), Math.random() * 1500)
});

module.exports = router;
