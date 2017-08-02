var Router = require("express").Router;

var router = new Router();

router.get("/rise/problem/list/unchoose", (req, res) => {
	setTimeout(() =>
		res.status(200).json(
      {
        "msg": {
          "name": "风之伤",
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
                  "newProblem":true,
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
		res.status(200).json({"msg":{"id":1,"problem":"与人沟通时条理更清晰","pic":"https://www.iqycamp.com/images/fragment/problem1_3.png","length":9,"description":"为什么有些人的文章思路特别清晰，令人读后印象深刻，而有些人的文章却让人不知所云？<br/><br/>为什么有些人即兴发言也能侃侃而谈，而有些人一开口却大脑一片空白？<br/><br/>如果做到以下四点，你的沟通就能更有条理，更容易被理解。<br/>1）表达时主题先行<br/>2）将同类信息归在一组<br/>3）确保信息归类不重叠不遗漏<br/>4）按逻辑顺序组织每组信息","catalogId":1,"subCatalogId":1,"author":"孙圈圈","authorDesc":"孙圈圈，原名孙园媛，移动学习品牌“圈外” （iquanwai）创始人&CEO，前外资管理咨询公司咨询总监，曾为6大行业、50多家大型企业设计过人才发展战略。著有职场干货畅销书《请停止无效努力：如何用正确的方法快速进阶》，豆瓣评分8.7。","difficultyScore":3.2542,"subjectDesc":"学习是为了更好地实践。不妨跟大家分享一下，你的沟通条理。好的分享能有机会获得圈外教练的点评，其他童鞋的点赞，以及被收录为精华！","descPic":"https://www.iqycamp.com/images/problem_desc_1_2.jpeg","audio":"https://www.iqycamp.com/audio/rise_p1.m4a","who":"希望提升沟通表达条理性的学生或职场人士","what":"对应4个要点，以下是课程表：","how":"如果做到以下4点，你的沟通就能更有条理，更容易被理解。\n1）先抛主题\n2）将同类信息/内容归在一组\n3）确保信息/内容归类不重叠不遗漏\n4）按逻辑顺序组织每组信息/内容","why":"为什么有些人即兴发言也能侃侃而谈，而有些人一开口却大脑一片空白？\n\n为什么有些人写的报告思路特别清晰，令人读后印象深刻，而有些人的报告却让人不知所云？\n","del":false,"trial":false,"categoryPic":"https://www.iqycamp.com/images/fragment/category2_4.jpeg","done":null,"status":null,"hasProblemScore":false,"chapterList":[{"chapter":1,"sections":[{"section":1,"knowledgeId":1,"name":"将信息归类分组","series":1,"chapter":1,"integrated":false,"chapterName":"结构清晰","practices":[]},{"section":2,"knowledgeId":6,"name":"确保归类不重不漏","series":2,"chapter":1,"integrated":false,"chapterName":"结构清晰","practices":[]}],"name":"结构清晰","integrated":false},{"chapter":2,"sections":[{"section":1,"knowledgeId":2,"name":"用时间顺序组织表达","series":3,"chapter":2,"integrated":false,"chapterName":"有序递进","practices":[]},{"section":2,"knowledgeId":3,"name":"用空间顺序组织表达","series":4,"chapter":2,"integrated":false,"chapterName":"有序递进","practices":[]},{"section":3,"knowledgeId":4,"name":"用程度顺序组织表达","series":5,"chapter":2,"integrated":false,"chapterName":"有序递进","practices":[]},{"section":4,"knowledgeId":5,"name":"用三种顺序组织表达","series":6,"chapter":2,"integrated":false,"chapterName":"有序递进","practices":[]}],"name":"有序递进","integrated":false},{"chapter":3,"sections":[{"section":1,"knowledgeId":7,"name":"表达时主题先行","series":7,"chapter":3,"integrated":false,"chapterName":"主题鲜明","practices":[]}],"name":"主题鲜明","integrated":false},{"chapter":4,"sections":[{"section":1,"knowledgeId":57,"name":"内容回顾 & 综合练习1","series":8,"chapter":4,"integrated":true,"chapterName":"复习","practices":[]},{"section":2,"knowledgeId":58,"name":"内容回顾 & 综合练习2","series":9,"chapter":4,"integrated":true,"chapterName":"复习","practices":[]}],"name":"复习","integrated":true}]},"code":200}), Math.random() * 1500)
});

router.post("/rise/problem/grade/*", (req, res) => {
    setTimeout(() =>
        res.status(200).json({
            "code": 200,
            "msg":"ok"
        }), Math.random() * 1500)
});

router.get("/rise/problem/open/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json(
      {
        "msg": {
          "problem": {
            "id": 9,
            "problem": "找到本质问题，减少无效努力",
            "pic": "https://static.iqycamp.com/images/problem9_4.jpg",
            "length": 6,
            "description": null,
            "catalogId": 1,
            "subCatalogId": 3,
            "author": "孙圈圈",
            "authorDesc": null,
            "authorPic": "https://static.iqycamp.com/images/rise_problem_author_pic_sunquanquanV2.png?imageslim",
            "difficultyScore": 3.0208,
            "subjectDesc": null,
            "descPic": "https://static.iqycamp.com/images/problem_desc_9.png",
            "audio": "https://www.iqycamp.com/audio/rise_p9_2.m4a",
            "who": "希望提升洞察力，看穿问题本质的人;想要提高工作和学习效率的人",
            "what": null,
            "how": "通过以下4个步骤，就可以发现问题本质，从而不做无效努力：\n\n1、首先，针对这个问题，搞清楚问题中关键词的概念、定义。\n2、当问题与他人有关时，判断对方是否隐瞒了真实意图，挖掘他真实诉求。\n3、确定了真实需求之后，通过不断提问，找到造成这个问题的根本原因。\n4、最后，即便找到了根本原因，也不要急着去解决；而是要确定，问题是关键且可被解决的。因为，并非所有问题都是有答案的，在一些无法改变的问题上面花费时间来困扰，也是浪费精力的表现",
            "why": "爱因斯坦说：如果给我1个小时解答一道决定我生死的问题，我会花55分钟来弄清楚这道题到底是在问什么。一旦清楚了它到底在问什么，剩下的5分钟足够回答这个问题。\n\n即便是在咨询行业，刚入行的分析师，70%的时间可能做得都是无用功。因为他们关注于完成任务，而没有把主要精力集中在找到本质问题上。",
            "del": false,
            "newProblem": false,
            "trial": false,
            "categoryPic": "https://static.iqycamp.com/images/fragment/category2_2.jpeg",
            "done": null,
            "status": null,
            "hasProblemScore": false,
            "chapterList": [{
              "chapter": 1,
              "sections": [{
                "section": 1,
                "knowledgeId": 44,
                "name": "澄清问题的理解偏差",
                "series": 1,
                "chapter": 1,
                "integrated": false,
                "chapterName": "澄清问题描述",
                "practices": [{
                  "type": 31,
                  "status": 1,
                  "unlocked": true,
                  "practiceIdList": [44],
                  "series": 1,
                  "sequence": 1,
                  "practicePlanId": 309348,
                  "optional": false,
                  "planId": 10490
                }, {
                  "type": 1,
                  "status": 0,
                  "unlocked": true,
                  "practiceIdList": [394, 395, 396, 397, 398, 399, 968],
                  "series": 1,
                  "sequence": 2,
                  "practicePlanId": 309354,
                  "optional": false,
                  "planId": 10490
                }, {
                  "type": 11,
                  "status": 0,
                  "unlocked": true,
                  "practiceIdList": [125],
                  "series": 1,
                  "sequence": 3,
                  "practicePlanId": 309360,
                  "optional": true,
                  "planId": 10490
                }, {
                  "type": 11,
                  "status": 0,
                  "unlocked": true,
                  "practiceIdList": [126],
                  "series": 1,
                  "sequence": 4,
                  "practicePlanId": 309361,
                  "optional": true,
                  "planId": 10490
                }, {
                  "type": 21,
                  "status": 0,
                  "unlocked": true,
                  "practiceIdList": [9],
                  "series": 0,
                  "sequence": 5,
                  "practicePlanId": 309370,
                  "optional": true,
                  "planId": 10490
                }]
              }],
              "name": "澄清问题描述",
              "myWarmScore": null,
              "totalWarmScore": null,
              "integrated": false
            }, {
              "chapter": 2,
              "sections": [{
                "section": 1,
                "knowledgeId": 45,
                "name": "澄清背后的隐藏偏差",
                "series": 2,
                "chapter": 2,
                "integrated": false,
                "chapterName": "挖掘背后诉求",
                "practices": [{
                  "type": 31,
                  "status": 0,
                  "unlocked": false,
                  "practiceIdList": [45],
                  "series": 2,
                  "sequence": 1,
                  "practicePlanId": 309349,
                  "optional": false,
                  "planId": 10490
                }, {
                  "type": 1,
                  "status": 0,
                  "unlocked": false,
                  "practiceIdList": [408, 409, 410, 412, 414, 415, 416],
                  "series": 2,
                  "sequence": 2,
                  "practicePlanId": 309355,
                  "optional": false,
                  "planId": 10490
                }, {
                  "type": 11,
                  "status": 0,
                  "unlocked": false,
                  "practiceIdList": [128],
                  "series": 2,
                  "sequence": 3,
                  "practicePlanId": 309362,
                  "optional": true,
                  "planId": 10490
                }, {
                  "type": 11,
                  "status": 0,
                  "unlocked": false,
                  "practiceIdList": [129],
                  "series": 2,
                  "sequence": 4,
                  "practicePlanId": 309363,
                  "optional": true,
                  "planId": 10490
                }]
              }],
              "name": "挖掘背后诉求",
              "myWarmScore": null,
              "totalWarmScore": null,
              "integrated": false
            }, {
              "chapter": 3,
              "sections": [{
                "section": 1,
                "knowledgeId": 46,
                "name": "用5个为什么找原因",
                "series": 3,
                "chapter": 3,
                "integrated": false,
                "chapterName": "找到根本原因",
                "practices": [{
                  "type": 31,
                  "status": 0,
                  "unlocked": false,
                  "practiceIdList": [46],
                  "series": 3,
                  "sequence": 1,
                  "practicePlanId": 309350,
                  "optional": false,
                  "planId": 10490
                }, {
                  "type": 1,
                  "status": 0,
                  "unlocked": false,
                  "practiceIdList": [422, 423, 424, 428, 969, 970],
                  "series": 3,
                  "sequence": 2,
                  "practicePlanId": 309356,
                  "optional": false,
                  "planId": 10490
                }, {
                  "type": 11,
                  "status": 0,
                  "unlocked": false,
                  "practiceIdList": [131],
                  "series": 3,
                  "sequence": 3,
                  "practicePlanId": 309364,
                  "optional": true,
                  "planId": 10490
                }, {
                  "type": 11,
                  "status": 0,
                  "unlocked": false,
                  "practiceIdList": [132],
                  "series": 3,
                  "sequence": 4,
                  "practicePlanId": 309365,
                  "optional": true,
                  "planId": 10490
                }]
              }],
              "name": "找到根本原因",
              "myWarmScore": null,
              "totalWarmScore": null,
              "integrated": false
            }, {
              "chapter": 4,
              "sections": [{
                "section": 1,
                "knowledgeId": 47,
                "name": "用矩阵确定关键-可行",
                "series": 4,
                "chapter": 4,
                "integrated": false,
                "chapterName": "确定关键可行",
                "practices": [{
                  "type": 31,
                  "status": 0,
                  "unlocked": false,
                  "practiceIdList": [47],
                  "series": 4,
                  "sequence": 1,
                  "practicePlanId": 309351,
                  "optional": false,
                  "planId": 10490
                }, {
                  "type": 1,
                  "status": 0,
                  "unlocked": false,
                  "practiceIdList": [435, 436, 437, 438, 440, 443, 445],
                  "series": 4,
                  "sequence": 2,
                  "practicePlanId": 309357,
                  "optional": false,
                  "planId": 10490
                }, {
                  "type": 11,
                  "status": 0,
                  "unlocked": false,
                  "practiceIdList": [134],
                  "series": 4,
                  "sequence": 3,
                  "practicePlanId": 309366,
                  "optional": true,
                  "planId": 10490
                }, {
                  "type": 11,
                  "status": 0,
                  "unlocked": false,
                  "practiceIdList": [135],
                  "series": 4,
                  "sequence": 4,
                  "practicePlanId": 309367,
                  "optional": true,
                  "planId": 10490
                }]
              }],
              "name": "确定关键可行",
              "myWarmScore": null,
              "totalWarmScore": null,
              "integrated": false
            }, {
              "chapter": 5,
              "sections": [{
                "section": 1,
                "knowledgeId": 57,
                "name": "内容回顾 & 案例应用1",
                "series": 5,
                "chapter": 5,
                "integrated": true,
                "chapterName": "综合案例",
                "practices": [{
                  "type": 32,
                  "status": 0,
                  "unlocked": false,
                  "practiceIdList": [57],
                  "series": 5,
                  "sequence": 1,
                  "practicePlanId": 309352,
                  "optional": false,
                  "planId": 10490
                }, {
                  "type": 2,
                  "status": 0,
                  "unlocked": false,
                  "practiceIdList": [405, 406, 417, 432, 441, 971],
                  "series": 5,
                  "sequence": 2,
                  "practicePlanId": 309358,
                  "optional": false,
                  "planId": 10490
                }, {
                  "type": 12,
                  "status": 0,
                  "unlocked": false,
                  "practiceIdList": [224],
                  "series": 5,
                  "sequence": 3,
                  "practicePlanId": 309368,
                  "optional": true,
                  "planId": 10490
                }]
              }, {
                "section": 2,
                "knowledgeId": 58,
                "name": "内容回顾 & 案例应用2",
                "series": 6,
                "chapter": 5,
                "integrated": true,
                "chapterName": "综合案例",
                "practices": [{
                  "type": 32,
                  "status": 0,
                  "unlocked": false,
                  "practiceIdList": [58],
                  "series": 6,
                  "sequence": 1,
                  "practicePlanId": 309353,
                  "optional": false,
                  "planId": 10490
                }, {
                  "type": 2,
                  "status": 0,
                  "unlocked": false,
                  "practiceIdList": [407, 419, 433, 442, 444, 972, 973],
                  "series": 6,
                  "sequence": 2,
                  "practicePlanId": 309359,
                  "optional": false,
                  "planId": 10490
                }, {
                  "type": 12,
                  "status": 0,
                  "unlocked": false,
                  "practiceIdList": [136],
                  "series": 6,
                  "sequence": 3,
                  "practicePlanId": 309369,
                  "optional": true,
                  "planId": 10490
                }]
              }],
              "name": "综合案例",
              "myWarmScore": null,
              "totalWarmScore": null,
              "integrated": true
            }],
            "subCatalog": "思考能力",
            "catalog": "打造自己"
          }, "fee": 0.01, "buttonStatus": 1, "planId": 10496, "bindMobile": true, "isFull": true
        }, "code": 200
      }
    ), Math.random() * 1500);
});

router.get("/signup/coupon/list", (req, res) => {
  setTimeout(() =>
    res.status(200).json(
      {"msg":[{"id":325,"openid":"o-Es21bZakuqjBfVr7a-_j90WQuI","profileId":18830,"amount":20.0,"used":0,"cost":null,"orderId":null,"expiredDate":"2017-07-31","category":null,"description":null,"expired":"2017.07.31"}],"code":200}
    ), Math.random() * 1500)
});


router.post("/signup/coupon/course/calculate", (req, res) => {
  setTimeout(() =>
    res.status(200).json(
      {"msg":0.0,"code":200}
    ), Math.random() * 1500)
});

router.get("/operation/free/choose/problem/msg", (req, res) => {
    setTimeout(() =>
        res.status(200).json(
            {"msg":"ok","code":200}
        ), Math.random() * 1500)
});
module.exports = router;
