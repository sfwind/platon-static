var Router = require("express").Router;

var router = new Router();

router.post("/rise/plan/choose/problem/*", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": 12 //planId
		}), Math.random() * 1500)
});

router.get("/rise/plan/play/*", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": {
				"length": 14, //持续天数
				"endDate": "12月18日", //结束日期
        "totalSeries":7, //题目总数
				"pic": "http://www.iquanwai.com/images/cintro1.png" //问题头图
			}
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
                "hasProblemScore":false,
                "lockedStatus":-1,
                "problem": {
                    "id": 2,
                    "problem": "跟老板",
                    "pic": "http://www.iquanwai.com/images/fragment/problem1.png",
                    "length": 5,
                    "warmupCount": 10,
                    "applicationCount": 5,
                    "challengeCount": 1,
                    "description": "以情动人和以理服人是说服别人的两种方式，通过本训练，你将掌握提出明确的诉求、讲好故事、以及有效使用证据的方法。结合运用理性和感性，更好说服他人。"
                },
				"sections":[{
                    "name":"第一节",
                    "chapterName":"第一章",
                    "section":1,
                    "chapter":1,
                    "series":1,
                    "practices": [{
                        "type": 31,
                        "status": 0,
                        "unlocked": true,
                        "practiceIdList": [49],
                        "series": 1,
                        "sequence": 1,
                        "practicePlanId": 1,
                        "planId":3,
                    }, {
                        "type": 1,
                        "status": 0,
                        "unlocked": true,
                        "practiceIdList": [52, 56, 52],
                        "series": 1,
                        "sequence": 2,
                        "planId":3,
                        "practicePlanId": 1
                    }, {
                        "type": 11,
                        "status": 1,
                        "unlocked": true,
                        "practiceIdList": [27],
                        "series": 1,
                        "sequence": 3,
                        "planId":3,
                        "practicePlanId": 1,
                        "optional":true
                    }, {
                        "knowledge": null,
                        "type": 21,
                        "status": 1,
                        "unlocked": true,
                        "practiceIdList": [2],
                        "practicePlanId":2,
                        "series": 0,
                        "sequence": 4,
                        "planId":3,
                        "optional":true
                    }]
				},
                    {
                        "name":"第二节",
                        "chapterName":"第一章",
                        "section":2,
                        "chapter":1,
                        "practices": [{
                            "type": 32,
                            "status": 0,
                            "unlocked": true,
                            "practiceIdList": [1],
                            "series": 2,
                            "sequence": 1,
                            "practicePlanId": 1,
                            "planId":3,
                            "optional":true
                        }, {
                            "type": 1,
                            "status": 0,
                            "unlocked": true,
                            "practiceIdList": [52, 56, 52],
                            "series": 2,
                            "sequence": 2,
                            "planId":3,
                            "practicePlanId": 1
                        }, {
                            "type": 11,
                            "status": 1,
                            "unlocked": true,
                            "practiceIdList": [27],
                            "series": 2,
                            "sequence": 3,
                            "planId":3,
                            "practicePlanId": 1
                        }, {
                            "knowledge": null,
                            "type": 21,
                            "status": 1,
                            "unlocked": true,
                            "practiceIdList": [2],
                            "series": 2,
                            "sequence": 4,
                            "optional":true
                        }]
                    }
				],
        		"openRise":false,
                "openConsolidation":true,
                "openApplication":true,
				"deadline":7,
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
				"iscomplete":true,
				"percent":15,
                "mustStudyDays":7,
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

router.post('/rise/plan/openrise',(req,res)=>{
  setTimeout(()=>
    res.status(200).json({
      "code":200,
      "msg":"ok"
    }),Math.random() * 1500)
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
        "knowledgeId":2, //知识点
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

router.post('/rise/plan/roadmap',(req,res)=>{
    setTimeout(()=>
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
        }),Math.random() * 1500)
});

router.post("/rise/plan/welcome", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg":true
    }), Math.random() * 1500)
});

router.post("/rise/plan/mark/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg":"ok"
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

router.get('/rise/plan/open/status', (req, res) => {
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

router.post("/rise/plan/check/*",(req,res)=>{
    setTimeout(()=>{
        res.status(200).json(
            {"msg":"ok","code":200}
        );
    },Math.random()*1500);
});

router.get("/rise/plan/chapter/list", (req, res)=>{
    setTimeout(()=>{
        res.status(200).json(
            {"msg":[{"chapterId":1,"chapter":"结构清晰","sectionList":[{"sectionId":1,"section":"将信息归类分组","series":1},{"sectionId":2,"section":"确保归类不重不漏","series":2}]},{"chapterId":2,"chapter":"有序递进","sectionList":[{"sectionId":1,"section":"用时间顺序组织表达","series":3},{"sectionId":2,"section":"用空间顺序组织表达","series":4},{"sectionId":3,"section":"用程度顺序组织表达","series":5},{"sectionId":4,"section":"用三种顺序组织表达","series":6}]},{"chapterId":3,"chapter":"主题鲜明","sectionList":[{"sectionId":1,"section":"表达时主题先行","series":7}]},{"chapterId":4,"chapter":"复习","sectionList":[{"sectionId":1,"section":"内容回顾 & 综合练习1","series":8},{"sectionId":2,"section":"内容回顾 & 综合练习2","series":9}]}],"code":200}
        );
    },Math.random()*1500);
})

router.post("/rise/plan/mark/*",(req,res)=>{
    setTimeout(()=>{
        res.status(200).json(
            {"msg":"ok","code":200}
        );
    },Math.random()*1500);
});

router.get("/rise/plan/list", (req, res)=>{
    setTimeout(()=>{
        res.status(200).json(
            {"msg":{"runningPlans":[{"id":6995,"openid":null,"problemId":10,"startDate":"2017-07-11","endDate":"2017-07-18","closeDate":"2017-08-10","completeTime":null,"closeTime":null,"status":1,"point":120,"warmupComplete":2,"applicationComplete":0,"total":null,"keycnt":0,"currentSeries":1,"completeSeries":2,"totalSeries":7,"riseMember":true,"requestCommentCount":1,"profileId":null,"problem":{"id":10,"problem":"普通人的第一堂营销课","pic":"https://www.iqycamp.com/images/fragment/problem10_3.png","length":7,"description":"我们生活的世界就是一个巨大的市场，你可能要卖出产品或服务，可能要推销自己获得一个工作机会，可能想要赢得另一半的心……所以，无论你是否从事营销工作，都要懂点营销知识。<br/><br/>接下去的训练会带你了解营销的一些关键环节：","catalogId":5,"subCatalogId":null,"author":"孙圈圈","authorDesc":"孙圈圈，原名孙园媛，移动学习品牌“圈外” （iquanwai）创始人&CEO，前外资管理咨询公司咨询总监，曾为6大行业、50多家大型企业设计过人才发展战略。著有职场干货畅销书《请停止无效努力：如何用正确的方法快速进阶》，豆瓣评分8.7。","authorPic":"https://static.iqycamp.com/images/rise_problem_author_pic_sunquanquanV2.png?imageslim","difficultyScore":3.2121,"subjectDesc":"学习是为了更好地实践。不妨跟大家分享一下，你会如何实践这些营销理论和方法。好的分享能有机会获得圈外教练的点评，其他童鞋的点赞，以及被收录为精华！","descPic":"https://www.iqycamp.com/images/problem_desc_10_2.jpeg","audio":"https://www.iqycamp.com/audio/rise_p10_2.m4a","who":"任何想要学习营销学入门知识的人;希望利用营销模型提升销售能力的人;希望向公司和另一半推销自己的人","what":"对应这个闭环体系，以下是课程表：","how":"营销的关键步骤可以看成是一个闭环体系：\n\n1、选择目标市场，明确市场定位\n2、了解目标消费者的需求\n3、根据需求开发产品或服务，并推向市场\n4、进行产品或服务的销售\n5、依据客户的购买行为，对不同客户群体采取有针对性的营销策略\n6、再次回到了解需求这一步。也就是，基于消费者需求和满意度，建立改进产品和服务的循环。","why":"我们生活的世界就是一个巨大的市场，你可能要卖出产品或服务，可能要推销自己获得一个工作机会，可能想要赢得另一半的心……所以，无论你是否从事营销工作，都要懂点营销知识。\n","del":false,"newProblem":false,"trial":false,"categoryPic":"https://www.iqycamp.com/images/fragment/category6_1.jpeg","done":null,"status":null,"hasProblemScore":null,"chapterList":[{"chapter":1,"sections":[{"section":1,"knowledgeId":49,"name":"用STP进行定位","series":1,"chapter":1,"integrated":false,"chapterName":"产品市场定位","practices":[]}],"name":"产品市场定位","myWarmScore":null,"totalWarmScore":null,"integrated":false},{"chapter":2,"sections":[{"section":1,"knowledgeId":48,"name":"用KANO模型分析需求","series":2,"chapter":2,"integrated":false,"chapterName":"用户需求分析","practices":[]}],"name":"用户需求分析","myWarmScore":null,"totalWarmScore":null,"integrated":false},{"chapter":3,"sections":[{"section":1,"knowledgeId":50,"name":"用4P制定市场策略","series":3,"chapter":3,"integrated":false,"chapterName":"产品推向市场","practices":[]}],"name":"产品推向市场","myWarmScore":null,"totalWarmScore":null,"integrated":false},{"chapter":4,"sections":[{"section":1,"knowledgeId":51,"name":"用3C模型优化销售","series":4,"chapter":4,"integrated":false,"chapterName":"产品销售","practices":[]}],"name":"产品销售","myWarmScore":null,"totalWarmScore":null,"integrated":false},{"chapter":5,"sections":[{"section":1,"knowledgeId":52,"name":"用RFM模型分析用户","series":5,"chapter":5,"integrated":false,"chapterName":"用户购买行为分析","practices":[]}],"name":"用户购买行为分析","myWarmScore":null,"totalWarmScore":null,"integrated":false},{"chapter":6,"sections":[{"section":1,"knowledgeId":57,"name":"内容回顾 & 综合练习1","series":6,"chapter":6,"integrated":true,"chapterName":"复习","practices":[]},{"section":2,"knowledgeId":58,"name":"内容回顾 & 综合练习2","series":7,"chapter":6,"integrated":true,"chapterName":"复习","practices":[]}],"name":"复习","myWarmScore":null,"totalWarmScore":null,"integrated":true}],"subCatalog":null,"catalog":"通用知识"},"sections":null,"openRise":null,"deadline":24,"hasProblemScore":null,"doneAllIntegrated":null,"lockedStatus":-1,"reportStatus":null,"mustStudyDays":null},{"id":7006,"openid":null,"problemId":12,"startDate":"2017-07-16","endDate":"2017-07-24","closeDate":"2017-08-15","completeTime":null,"closeTime":null,"status":1,"point":90,"warmupComplete":1,"applicationComplete":0,"total":null,"keycnt":0,"currentSeries":1,"completeSeries":1,"totalSeries":8,"riseMember":true,"requestCommentCount":1,"profileId":null,"problem":{"id":12,"problem":"面对热点事件保持独立思考","pic":"https://www.iqycamp.com/images/problem12_4.jpg","length":8,"description":"时事热点层出不穷，翻转打脸时有发生。面对热点事件，你想不想摆脱人云亦云，做一个有主见的独立思考者？<br/><br/>有能力检验论证的质量，是迈向独立思考的必由之路。本训练将教你如何进行理性判断。<br/><br/>在检验论证时，我们可以遵循以下步骤：<br/>1）找出作者的论题和结论<br/>2）找出支持结论的理由是什么<br/>3）从理由推导出结论的逻辑是否成立<br/>4）理由能支撑结论的前提假设是否是可接受的（隐藏的假设）<br/>5）使用的证据是否有效力","catalogId":1,"subCatalogId":3,"author":"孙圈圈","authorDesc":"孙圈圈，原名孙园媛，移动学习品牌“圈外” （iquanwai）创始人&CEO，前外资管理咨询公司咨询总监，曾为6大行业、50多家大型企业设计过人才发展战略。著有职场干货畅销书《请停止无效努力：如何用正确的方法快速进阶》，豆瓣评分8.7。","authorPic":"https://static.iqycamp.com/images/rise_problem_author_pic_sunquanquanV2.png?imageslim","difficultyScore":3.2985,"subjectDesc":"学习是为了更好地实践。不妨跟大家分享一下，你对某一热点事件评论文章的剖析和思考吧。好的分享能有机会获得圈外教练的点评，其他童鞋的点赞，以及被收录为精华！","descPic":"https://www.iqycamp.com/images/problem_desc_12_3.png","audio":"https://www.iqycamp.com/audio/rise_p12.m4a","who":"任何希望不会被舆论牵着鼻子走的人","what":"对应这5步，课程表如下：","how":"在检验论证时，我们可以遵循以下步骤：\n\n1、找出作者的论题和结论\n2、找出支持结论的理由是什么\n3、从理由推导出结论的逻辑是否成立\n4、理由能支撑结论的前提假设是否是可接受的\n5、使用的证据是否有效力","why":"时事热点层出不穷，翻转打脸时有发生。面对热点事件，你想不想摆脱人云亦云，做一个有主见的独立思考者？\n\n有能力检验论证的质量，是迈向独立思考的必由之路。本训练将教你如何进行理性判断。","del":false,"newProblem":false,"trial":false,"categoryPic":"https://www.iqycamp.com/images/fragment/category2_2.jpeg","done":null,"status":null,"hasProblemScore":null,"chapterList":[{"chapter":1,"sections":[{"section":1,"knowledgeId":26,"name":"找出论题和结论","series":1,"chapter":1,"integrated":false,"chapterName":"找到论证的基本要素","practices":[]},{"section":2,"knowledgeId":27,"name":"找出理由","series":2,"chapter":1,"integrated":false,"chapterName":"找到论证的基本要素","practices":[]}],"name":"找到论证的基本要素","myWarmScore":null,"totalWarmScore":null,"integrated":false},{"chapter":2,"sections":[{"section":1,"knowledgeId":60,"name":"检验论证逻辑（错误诉诸）","series":3,"chapter":2,"integrated":false,"chapterName":"检验论证的质量","practices":[]},{"section":2,"knowledgeId":61,"name":"检验论证逻辑（转移话题谬误）","series":4,"chapter":2,"integrated":false,"chapterName":"检验论证的质量","practices":[]},{"section":3,"knowledgeId":28,"name":"检验前提假设","series":5,"chapter":2,"integrated":false,"chapterName":"检验论证的质量","practices":[]},{"section":4,"knowledgeId":11,"name":"检验证据的效力","series":6,"chapter":2,"integrated":false,"chapterName":"检验论证的质量","practices":[]}],"name":"检验论证的质量","myWarmScore":null,"totalWarmScore":null,"integrated":false},{"chapter":3,"sections":[{"section":1,"knowledgeId":57,"name":"内容回顾 & 综合练习1","series":7,"chapter":3,"integrated":true,"chapterName":"复习","practices":[]},{"section":2,"knowledgeId":58,"name":"内容回顾 & 综合练习2","series":8,"chapter":3,"integrated":true,"chapterName":"复习","practices":[]}],"name":"复习","myWarmScore":null,"totalWarmScore":null,"integrated":true}],"subCatalog":"思考能力","catalog":"打造自己"},"sections":null,"openRise":null,"deadline":29,"hasProblemScore":null,"doneAllIntegrated":null,"lockedStatus":-1,"reportStatus":null,"mustStudyDays":null}],"completedPlans":[{"id":6976,"openid":null,"problemId":7,"startDate":"2017-07-06","endDate":"2017-07-14","closeDate":"2017-08-05","completeTime":"2017-07-06","closeTime":"2017-07-11","status":3,"point":540,"warmupComplete":8,"applicationComplete":0,"total":null,"keycnt":0,"currentSeries":5,"completeSeries":8,"totalSeries":8,"riseMember":true,"requestCommentCount":1,"profileId":null,"problem":{"id":7,"problem":"在面试中脱颖而出","pic":"https://www.iqycamp.com/images/problem7_4.jpg","length":8,"description":"面试是一场对手戏，你要换位思考、把握主动，在有限时间内展现自己。如果你能做到以下几点，那你离offer又进了一步。","catalogId":2,"subCatalogId":4,"author":"孙圈圈","authorDesc":"孙圈圈，原名孙园媛，移动学习品牌“圈外” （iquanwai）创始人&CEO，前外资管理咨询公司咨询总监，曾为6大行业、50多家大型企业设计过人才发展战略。著有职场干货畅销书《请停止无效努力：如何用正确的方法快速进阶》，豆瓣评分8.7。","authorPic":"https://static.iqycamp.com/images/rise_problem_author_pic_sunquanquanV2.png?imageslim","difficultyScore":2.7627,"subjectDesc":"学习是为了更好地实践。不妨跟大家分享一下，你是如何准备面试的吧。好的分享能有机会获得圈外教练的点评，其他童鞋的点赞，以及被收录为精华！","descPic":"https://www.iqycamp.com/images/problem_desc_7.png","audio":null,"who":"任何想要找工作或跳槽转行的人","what":"对应6个关键，以下是课程表：","how":"按照以下6个关键去做，能让你在面试中更有胜算。","why":"每次准备面试，你是不是都有这样的疑惑：自我介绍里，面试官到底想听什么？为什么老是要我举例子？面试里有哪些坑？面试官让我提问，我该问他什么？","del":false,"newProblem":false,"trial":false,"categoryPic":"https://www.iqycamp.com/images/fragment/category4_2.jpeg","done":null,"status":null,"hasProblemScore":null,"chapterList":[{"chapter":1,"sections":[{"section":1,"knowledgeId":30,"name":"自我介绍，塑造良好印象","series":1,"chapter":1,"integrated":false,"chapterName":"面试开场","practices":[]}],"name":"面试开场","myWarmScore":null,"totalWarmScore":null,"integrated":false},{"chapter":2,"sections":[{"section":1,"knowledgeId":42,"name":"预判面试问题，提前准备","series":2,"chapter":2,"integrated":false,"chapterName":"面试中段","practices":[]},{"section":2,"knowledgeId":31,"name":"用STAR回答，增加说服力","series":3,"chapter":2,"integrated":false,"chapterName":"面试中段","practices":[]},{"section":3,"knowledgeId":33,"name":"避开陷阱问题","series":4,"chapter":2,"integrated":false,"chapterName":"面试中段","practices":[]}],"name":"面试中段","myWarmScore":null,"totalWarmScore":null,"integrated":false},{"chapter":3,"sections":[{"section":1,"knowledgeId":32,"name":"提问面试官，展现思考力","series":5,"chapter":3,"integrated":false,"chapterName":"面试收尾","practices":[]}],"name":"面试收尾","myWarmScore":null,"totalWarmScore":null,"integrated":false},{"chapter":4,"sections":[{"section":1,"knowledgeId":34,"name":"找准角色，攻破群面","series":6,"chapter":4,"integrated":false,"chapterName":"群面","practices":[]}],"name":"群面","myWarmScore":null,"totalWarmScore":null,"integrated":false},{"chapter":5,"sections":[{"section":1,"knowledgeId":57,"name":"内容回顾 & 综合练习1","series":7,"chapter":5,"integrated":true,"chapterName":"复习","practices":[]},{"section":2,"knowledgeId":58,"name":"内容回顾 & 综合练习2","series":8,"chapter":5,"integrated":true,"chapterName":"复习","practices":[]}],"name":"复习","myWarmScore":null,"totalWarmScore":null,"integrated":true}],"subCatalog":"求职能力","catalog":"营销自己"},"sections":null,"openRise":null,"deadline":0,"hasProblemScore":null,"doneAllIntegrated":null,"lockedStatus":-1,"reportStatus":null,"mustStudyDays":null},{"id":6953,"openid":null,"problemId":15,"startDate":"2017-06-21","endDate":"2017-06-30","closeDate":"2017-07-21","completeTime":"2017-07-05","closeTime":"2017-07-06","status":3,"point":342,"warmupComplete":9,"applicationComplete":2,"total":null,"keycnt":0,"currentSeries":9,"completeSeries":9,"totalSeries":9,"riseMember":true,"requestCommentCount":1,"profileId":null,"problem":{"id":15,"problem":"如何改变自己","pic":"https://www.iqycamp.com/images/fragment/problem15_3.png","length":9,"description":"改变不能单单依靠意志力，因为意志力是会被耗尽的。心理学家罗伊·鲍迈斯特的研究表明——意志力是一种有限的生理资源：当意志力消耗越多时，被压抑的欲望反弹得也更强烈。\n\n真正让改变发生的，是三个关键因素：理性、感性和情境。我们可以把改变自己看做是骑马奔向目标的过程，你想达到的最终状态就是那个目标。理性就好比骑手，感性是骑手驾驭的野马，而情境则是骑手驾马驰骋的草原。要想到达终点，需要骑手、野马和草原的共同作用。\n\n理性的力量为我们指引改变的方向、寻找解决办法；感性的力量让我们在改变的过程中，更愿意坚持；理性和感性都是我们自身拥有的资源，除此之外，合适的外部情境能让改变更容易发生。\n\n需要注意的是，在进行改变的时候，我们并不一定要动用所有的方法。有的情况下，调动情感最有效，而有的情况下可能调整环境最有效。\n\n接下来，我们将会用9小节，依次学习这些知识，其中，最后1节是对前期所学内容的综合复习和应用。一起行动起来，让改变真正发生。","catalogId":4,"subCatalogId":7,"author":"孙圈圈","authorDesc":"孙圈圈，原名孙园媛，移动学习品牌“圈外” （iquanwai）创始人&CEO，前外资管理咨询公司咨询总监，曾为6大行业、50多家大型企业设计过人才发展战略。著有职场干货畅销书《请停止无效努力：如何用正确的方法快速进阶》，豆瓣评分8.7。","authorPic":"https://static.iqycamp.com/images/rise_problem_author_pic_sunquanquanV2.png?imageslim","difficultyScore":3.0,"subjectDesc":"学习是为了更好地实践。不妨跟大家分享一下，你想对什么做出改变，准备用哪些方法改变。好的分享能有机会获得圈外教练的点评，其他童鞋的点赞，以及被收录为精华！","descPic":"https://www.iqycamp.com/images/problem_desc_15_1.jpg","audio":"https://www.iqycamp.com/audio/rise_p15.m4a","who":"曾经想要改变却找不到方向的人;想要改变却无法坚持的人;想要改变却始终不能成功的人","what":"对应这三个关键因素，我们的课程共分为4章9小节，以下是课程表：","how":"真正让改变发生有三个关键因素：理性、感性和情境。只要我们能善用理性、借助感性、制造情境，就能让改变更轻松。","why":"想要早起、少玩手机、坚持运动、不对家人发脾气、工作更有效率…… 每个想改变自己的努力，似乎都是一场反人性的斗争。需要极强的意志力，才能真正改变。\n\n事实上，改变可以来的更加轻松。","del":false,"newProblem":false,"trial":false,"categoryPic":"https://www.iqycamp.com/images/fragment/category3_3.jpeg","done":null,"status":null,"hasProblemScore":null,"chapterList":[{"chapter":1,"sections":[{"section":1,"knowledgeId":73,"name":"设定目标","series":1,"chapter":1,"integrated":false,"chapterName":"善用理性","practices":[{"type":31,"status":1,"unlocked":true,"practiceIdList":[73],"series":1,"sequence":1,"practicePlanId":114747,"optional":false,"planId":4070},{"type":1,"status":1,"unlocked":true,"practiceIdList":[772,773,774,775,776],"series":1,"sequence":2,"practicePlanId":114756,"optional":false,"planId":4070},{"type":11,"status":1,"unlocked":true,"practiceIdList":[263],"series":1,"sequence":3,"practicePlanId":114765,"optional":true,"planId":4070},{"type":11,"status":1,"unlocked":true,"practiceIdList":[264],"series":1,"sequence":4,"practicePlanId":114766,"optional":true,"planId":4070},{"type":21,"status":0,"unlocked":true,"practiceIdList":[15],"series":0,"sequence":5,"practicePlanId":114778,"optional":true,"planId":4070}]},{"section":2,"knowledgeId":74,"name":"分析关键因素","series":2,"chapter":1,"integrated":false,"chapterName":"善用理性","practices":[{"type":31,"status":1,"unlocked":true,"practiceIdList":[74],"series":2,"sequence":1,"practicePlanId":114748,"optional":false,"planId":4070},{"type":1,"status":1,"unlocked":true,"practiceIdList":[777,778,779,780,781,782],"series":2,"sequence":2,"practicePlanId":114757,"optional":false,"planId":4070},{"type":11,"status":1,"unlocked":true,"practiceIdList":[265],"series":2,"sequence":3,"practicePlanId":114767,"optional":true,"planId":4070},{"type":11,"status":1,"unlocked":true,"practiceIdList":[266],"series":2,"sequence":4,"practicePlanId":114768,"optional":true,"planId":4070}]}],"name":"善用理性","myWarmScore":null,"totalWarmScore":null,"integrated":false},{"chapter":2,"sections":[{"section":1,"knowledgeId":76,"name":"调动情感","series":3,"chapter":2,"integrated":false,"chapterName":"借助感性","practices":[{"type":31,"status":1,"unlocked":true,"practiceIdList":[76],"series":3,"sequence":1,"practicePlanId":114749,"optional":false,"planId":4070},{"type":1,"status":1,"unlocked":true,"practiceIdList":[788,789,790],"series":3,"sequence":2,"practicePlanId":114758,"optional":false,"planId":4070},{"type":11,"status":1,"unlocked":true,"practiceIdList":[269],"series":3,"sequence":3,"practicePlanId":114769,"optional":true,"planId":4070}]},{"section":2,"knowledgeId":75,"name":"小处做起","series":4,"chapter":2,"integrated":false,"chapterName":"借助感性","practices":[{"type":31,"status":1,"unlocked":true,"practiceIdList":[75],"series":4,"sequence":1,"practicePlanId":114750,"optional":false,"planId":4070},{"type":1,"status":1,"unlocked":true,"practiceIdList":[783,784,785,786,787],"series":4,"sequence":2,"practicePlanId":114759,"optional":false,"planId":4070},{"type":11,"status":0,"unlocked":true,"practiceIdList":[267],"series":4,"sequence":3,"practicePlanId":114770,"optional":true,"planId":4070},{"type":11,"status":0,"unlocked":true,"practiceIdList":[268],"series":4,"sequence":4,"practicePlanId":114771,"optional":true,"planId":4070}]},{"section":3,"knowledgeId":77,"name":"获得认同","series":5,"chapter":2,"integrated":false,"chapterName":"借助感性","practices":[{"type":31,"status":1,"unlocked":true,"practiceIdList":[77],"series":5,"sequence":1,"practicePlanId":114751,"optional":false,"planId":4070},{"type":1,"status":1,"unlocked":true,"practiceIdList":[791,792,793],"series":5,"sequence":2,"practicePlanId":114760,"optional":false,"planId":4070},{"type":11,"status":1,"unlocked":true,"practiceIdList":[270],"series":5,"sequence":3,"practicePlanId":114772,"optional":true,"planId":4070}]}],"name":"借助感性","myWarmScore":null,"totalWarmScore":null,"integrated":false},{"chapter":3,"sections":[{"section":1,"knowledgeId":78,"name":"调整环境","series":6,"chapter":3,"integrated":false,"chapterName":"制造情境","practices":[{"type":31,"status":1,"unlocked":true,"practiceIdList":[78],"series":6,"sequence":1,"practicePlanId":114752,"optional":false,"planId":4070},{"type":1,"status":1,"unlocked":true,"practiceIdList":[794,795,796,797,798,799],"series":6,"sequence":2,"practicePlanId":114761,"optional":false,"planId":4070},{"type":11,"status":1,"unlocked":true,"practiceIdList":[271],"series":6,"sequence":3,"practicePlanId":114773,"optional":true,"planId":4070},{"type":11,"status":1,"unlocked":true,"practiceIdList":[272],"series":6,"sequence":4,"practicePlanId":114774,"optional":true,"planId":4070}]},{"section":2,"knowledgeId":79,"name":"培养习惯","series":7,"chapter":3,"integrated":false,"chapterName":"制造情境","practices":[{"type":31,"status":1,"unlocked":true,"practiceIdList":[79],"series":7,"sequence":1,"practicePlanId":114753,"optional":false,"planId":4070},{"type":1,"status":1,"unlocked":true,"practiceIdList":[800,801,802],"series":7,"sequence":2,"practicePlanId":114762,"optional":false,"planId":4070},{"type":11,"status":1,"unlocked":true,"practiceIdList":[273],"series":7,"sequence":3,"practicePlanId":114775,"optional":true,"planId":4070}]},{"section":3,"knowledgeId":80,"name":"找到同伴","series":8,"chapter":3,"integrated":false,"chapterName":"制造情境","practices":[{"type":31,"status":1,"unlocked":true,"practiceIdList":[80],"series":8,"sequence":1,"practicePlanId":114754,"optional":false,"planId":4070},{"type":1,"status":1,"unlocked":true,"practiceIdList":[803,804,805],"series":8,"sequence":2,"practicePlanId":114763,"optional":false,"planId":4070},{"type":11,"status":0,"unlocked":true,"practiceIdList":[274],"series":8,"sequence":3,"practicePlanId":114776,"optional":true,"planId":4070}]}],"name":"制造情境","myWarmScore":null,"totalWarmScore":null,"integrated":false},{"chapter":4,"sections":[{"section":1,"knowledgeId":59,"name":"内容回顾 & 综合练习","series":9,"chapter":4,"integrated":true,"chapterName":"复习","practices":[{"type":32,"status":1,"unlocked":true,"practiceIdList":[59],"series":9,"sequence":1,"practicePlanId":114755,"optional":false,"planId":4070},{"type":2,"status":1,"unlocked":true,"practiceIdList":[806,807,808,809,810,811],"series":9,"sequence":2,"practicePlanId":114764,"optional":false,"planId":4070},{"type":12,"status":0,"unlocked":true,"practiceIdList":[275],"series":9,"sequence":3,"practicePlanId":114777,"optional":false,"planId":4070}]}],"name":"复习","myWarmScore":null,"totalWarmScore":null,"integrated":true}],"subCatalog":"行为管理","catalog":"管理自己"},"sections":null,"openRise":null,"deadline":0,"hasProblemScore":null,"doneAllIntegrated":null,"lockedStatus":-1,"reportStatus":null,"mustStudyDays":null},{"id":6936,"openid":null,"problemId":19,"startDate":"2017-06-15","endDate":"2017-06-20","closeDate":"2017-06-18","completeTime":"2017-06-19","closeTime":"2017-06-19","status":3,"point":122,"warmupComplete":2,"applicationComplete":1,"total":null,"keycnt":0,"currentSeries":2,"completeSeries":1,"totalSeries":5,"riseMember":true,"requestCommentCount":1,"profileId":null,"problem":{"id":19,"problem":"如何结识比自己牛的人","pic":"https://www.iqycamp.com/images/fragment/problem19_1.png","length":5,"description":"为什么结识大牛那么难？我该去哪里结识大牛？大牛那么高大上，会理我这个小透明吗？一遇见大牛我就紧张地说不出话来，怎么破？我加了大牛的微信好激动，但是接下来该怎么办…..相信很多人都会有这样的烦恼。然而大牛其实远不像我们想的那样高高在上。只要我们找对方法，结识他们一点都不难。马云刚创建阿里巴巴的时候还是个默默无闻的毛头小子，但是当年他和软饮投创始人孙正义就见了6分钟，孙正义就决定投资他。而当时马云的开场白就说了一句话：“我不需要钱，我只谈谈我对阿里巴巴的理解。” 一个创业者见投资人第一句话居然是不要钱，这一下子引起了孙正义的兴趣，于是接下来的故事大家都知道了。\n\n实际上我们结识大牛，也是一个营销自己的过程。我们可以把自己当做一个产品，把大牛当做我们的消费者。我们要有自己的独特销售主张（Unique Selling Point）, 找到自己身上能够对大牛形成吸引力的利益点，然后通过高效的社交沟通手段将它们传递出去。通过科学的方法，结识大牛易如反掌。那么简单来说，结识大牛分为四个步骤，分别是：\n\n1.定义自身价值，找到你身上最契合大牛需求的价值闪光点；\n2.创造接触场景，根据不同类型的场景找到最适合接触大牛的方法；\n3.致胜第一印象，灵活运用高效的沟通技巧给大牛留下最佳印象；\n4.长期反馈循环，不断地循序渐进，逐渐加强和大牛之间的关系。\n\n接下来我们会用5个小节，依次学习这些知识。其中，最后一个小节是对前期所学内容的综合复习和运用。下面就请大家跟随我，一起来学习如何高效地结识大牛吧！","catalogId":2,"subCatalogId":10,"author":"张鹏","authorDesc":"张鹏，资深广告战略规划。曾在多家知名4A公司服务过NIKE, 百事可乐，大众汽车，联合利华，宝洁等众多知名品牌。擅长社交媒体数字营销以及逻辑思维分析。同时是Linkedin中国，壹周刊心理，36Kr,虎嗅的签约专栏作者，个人微信号张良计(zhangliang_j)拥有8万粉丝，定期分享各类职场干货。目前个人的第一本书正在筹备中。","authorPic":"https://static.iqycamp.com/images/rise_problem_author_pic_zhangpengV2.png?imageslim","difficultyScore":3.5,"subjectDesc":"学习是为了更好地实践。不妨跟大家分享一下，你的接触大牛计划。好的分享能有机会获得圈外教练的点评，其他童鞋的点赞，以及被收录为精华！","descPic":"https://www.iqycamp.com/images/fragment/problem_desc_19_1.png","audio":"https://www.iqycamp.com/audio/problem_19.m4a","who":"想要建立高阶社交圈的人;想要拓展自己的视野和人脉的人","what":"","how":"接下来，通过循序渐进的四个步骤让你了解如何和大牛进行交流：\n\n","why":"在职场工作中，能过结识比自己厉害的大牛可以极大拓宽我们的知识和视野，让我们的技能和实力迅速攀升。\n\n然而很多人苦于不知道通过何种方法和渠道去认识大牛，和大牛交往。\n\n其实这也是有套路的，通过学习，你也能迅速掌握和大牛零距离对话的窍门。","del":false,"newProblem":true,"trial":false,"categoryPic":"https://www.iqycamp.com/images/fragment/category4_3.jpeg","done":null,"status":null,"hasProblemScore":null,"chapterList":[{"chapter":1,"sections":[{"section":1,"knowledgeId":99,"name":"枚举法找到内部和外部价值","series":1,"chapter":1,"integrated":false,"chapterName":"定义自身价值","practices":[]}],"name":"定义自身价值","myWarmScore":null,"totalWarmScore":null,"integrated":false},{"chapter":2,"sections":[{"section":1,"knowledgeId":100,"name":"最佳场景列表","series":2,"chapter":2,"integrated":false,"chapterName":"创造接触场景","practices":[]}],"name":"创造接触场景","myWarmScore":null,"totalWarmScore":null,"integrated":false},{"chapter":3,"sections":[{"section":1,"knowledgeId":101,"name":"运用30秒电梯法则","series":3,"chapter":3,"integrated":false,"chapterName":"致胜第一印象","practices":[]}],"name":"致胜第一印象","myWarmScore":null,"totalWarmScore":null,"integrated":false},{"chapter":4,"sections":[{"section":1,"knowledgeId":102,"name":"维护和大牛的长期联系","series":4,"chapter":4,"integrated":false,"chapterName":"长期反馈循环","practices":[]}],"name":"长期反馈循环","myWarmScore":null,"totalWarmScore":null,"integrated":false},{"chapter":5,"sections":[{"section":1,"knowledgeId":59,"name":"内容回顾 & 综合练习","series":5,"chapter":5,"integrated":true,"chapterName":"复习","practices":[]}],"name":"复习","myWarmScore":null,"totalWarmScore":null,"integrated":true}],"subCatalog":"人际网络","catalog":"营销自己"},"sections":null,"openRise":null,"deadline":0,"hasProblemScore":null,"doneAllIntegrated":null,"lockedStatus":-1,"reportStatus":null,"mustStudyDays":null},{"id":6919,"openid":null,"problemId":14,"startDate":"2017-06-08","endDate":"2017-06-14","closeDate":"2017-07-12","completeTime":"2017-06-15","closeTime":"2017-06-15","status":3,"point":1006,"warmupComplete":7,"applicationComplete":8,"total":null,"keycnt":0,"currentSeries":1,"completeSeries":6,"totalSeries":6,"riseMember":true,"requestCommentCount":1,"profileId":null,"problem":{"id":14,"problem":"如何用故事说服别人","pic":"https://www.iqycamp.com/images/problem14_4.jpg","length":6,"description":"尤瓦尔·赫拉利在《人类简史》中提出了这样一个观点：智人在演化中偶然获得的讲故事的能力，是他们称霸世界的关键——只能描述事实的语言的作用是有限的，至多只能将部落维持在一百五十人的规模，然而故事（包括传说、神话、宗教）可以将更多的人集合在同一背景下，继而完成规模更大的活动。\n\n我们经过漫长的岁月，进化成了更喜欢听故事，并且更容易理解和记忆故事的物种。\n\n所以我们无论是与家人相处、和老板提要求、向客户推销产品、向投资人阐述商业计划的时候，要记得我们对面坐着的是喜欢听故事的人。\n\n接下来的训练，我们要这些内容：在说服别人时，讲故事是如何起作用的，讲故事的套路，以及商业故事的注意要点。\n我们将会用6小节依次学习这些知识，其中，最后两节是对前面所学知识的综合复习和应用。通过刻意练习，从而让我们向讲故事的高手进阶。","catalogId":1,"subCatalogId":6,"author":"孙圈圈","authorDesc":"孙圈圈，原名孙园媛，移动学习品牌“圈外” （iquanwai）创始人&CEO，前外资管理咨询公司咨询总监，曾为6大行业、50多家大型企业设计过人才发展战略。著有职场干货畅销书《请停止无效努力：如何用正确的方法快速进阶》，豆瓣评分8.7。","authorPic":"https://static.iqycamp.com/images/rise_problem_author_pic_sunquanquanV2.png?imageslim","difficultyScore":3.5,"subjectDesc":"学习是为了更好地实践。不妨跟大家分享一下，你在说服别人的时候讲了一个什么故事。好的分享能有机会获得圈外教练的点评，其他童鞋的点赞，以及被收录为精华！","descPic":"https://www.iqycamp.com/images/problem_desc_14.png","audio":"https://www.iqycamp.com/audio/rise_p14.m4a","who":"想要提高自己表达沟通能力的人;想要更好地影响和说服别人的人","what":"与此对应，我们的课程共分为4章6小节，以下是课程表：\n","how":"如何训练自己讲故事的能力，从而说服别人呢？首先我们要认识到故事是如何起作用的；进而深入学习讲故事的套路；最后聚焦到商业场景中，该如何运用讲故事的能力。","why":"你有没有遇到过这样的销售？原本并不是你想购买的东西，但是经过他的推销，你心甘情愿掏了钱并且心情愉悦，觉得他帮了自己大忙；但另一些销售，你连让他开口详细介绍产品的机会都不一定给。\n\n你有没有这样一种同事？明明能力和你差不多，但上级接受了他的策划案而不是你的；当他在做presentation时听众都听得津津有味而轮到你上台汇报时底下却昏昏欲睡。\n\n亚里士多德说“我们无法通过智力去影响别人，而情感却能做到这一点。”讲故事，是一种被严重低估的能力，也造成了人和人之间的差异。\n\n幸好，它是可以被训练的。\n","del":false,"newProblem":false,"trial":false,"categoryPic":"https://www.iqycamp.com/images/fragment/category2_5.jpeg","done":null,"status":null,"hasProblemScore":null,"chapterList":[{"chapter":1,"sections":[{"section":1,"knowledgeId":69,"name":"故事的三种作用场景","series":1,"chapter":1,"integrated":false,"chapterName":"故事有哪些作用","practices":[]}],"name":"故事有哪些作用","myWarmScore":null,"totalWarmScore":null,"integrated":false},{"chapter":2,"sections":[{"section":1,"knowledgeId":70,"name":"故事的基本要素","series":2,"chapter":2,"integrated":false,"chapterName":"故事的基本套路","practices":[]},{"section":2,"knowledgeId":71,"name":"故事的附加要素","series":3,"chapter":2,"integrated":false,"chapterName":"故事的基本套路","practices":[]}],"name":"故事的基本套路","myWarmScore":null,"totalWarmScore":null,"integrated":false},{"chapter":3,"sections":[{"section":1,"knowledgeId":72,"name":"商业故事的要点","series":4,"chapter":3,"integrated":false,"chapterName":"如何讲好商业故事","practices":[]}],"name":"如何讲好商业故事","myWarmScore":null,"totalWarmScore":null,"integrated":false},{"chapter":4,"sections":[{"section":1,"knowledgeId":57,"name":"内容回顾 & 综合练习1","series":5,"chapter":4,"integrated":true,"chapterName":"复习","practices":[]},{"section":2,"knowledgeId":58,"name":"内容回顾 & 综合练习2","series":6,"chapter":4,"integrated":true,"chapterName":"复习","practices":[]}],"name":"复习","myWarmScore":null,"totalWarmScore":null,"integrated":true}],"subCatalog":"影响力","catalog":"打造自己"},"sections":null,"openRise":null,"deadline":0,"hasProblemScore":null,"doneAllIntegrated":null,"lockedStatus":-1,"reportStatus":null,"mustStudyDays":null},{"id":6911,"openid":null,"problemId":8,"startDate":"2017-06-01","endDate":"2017-06-17","closeDate":"2017-06-26","completeTime":"2017-06-08","closeTime":"2017-06-08","status":3,"point":254,"warmupComplete":2,"applicationComplete":3,"total":null,"keycnt":0,"currentSeries":8,"completeSeries":2,"totalSeries":10,"riseMember":true,"requestCommentCount":0,"profileId":null,"problem":{"id":8,"problem":"给自己的未来定个发展策略","pic":"https://www.iqycamp.com/images/fragment/problem8_3.png","length":10,"description":"迷茫是我们这个社会的时代病，迷茫的根源在于你没有方向和发展策略。对于企业来说，发展策略决定了企业的资源投向。对于个人来说，我们也要制定策略，以最大化自己时间精力的投入产出比。<br/><br/>那么如何给自己定义职业发展策略呢？你可以使用个人商业模式画布这个工具","catalogId":3,"subCatalogId":5,"author":"孙圈圈","authorDesc":"孙圈圈，原名孙园媛，移动学习品牌“圈外” （iquanwai）创始人&CEO，前外资管理咨询公司咨询总监，曾为6大行业、50多家大型企业设计过人才发展战略。著有职场干货畅销书《请停止无效努力：如何用正确的方法快速进阶》，豆瓣评分8.7。","authorPic":"https://static.iqycamp.com/images/rise_problem_author_pic_sunquanquanV2.png?imageslim","difficultyScore":3.2857,"subjectDesc":"学习是为了更好地实践。不妨跟大家分享一下，你用商业画布，给自己制定了一个什么样的发展策略。好的分享能有机会获得圈外教练的点评，其他童鞋的点赞，以及被收录为精华！","descPic":"https://www.iqycamp.com/images/problem_desc_8.png","audio":"https://www.iqycamp.com/audio/rise_p8.m4a","who":"对自己发展感到迷茫或想要转型的人","what":"对应2个步骤，以下是课程表：","how":"如何给自己制定职业发展策略呢？你可以把自己当做一家企业，使用个人商业模式画布这个工具，先通过填写画布，理清自己的核心资源、渠道通路、价值主张等，再进行分析，从而更好地制定自己的战略规划。","why":"你有没有这样的迷茫：自己的兴趣和工作不匹配怎么办？能力不足，做不好手头的工作经常被老板批评，应不应该把这份工作继续做下去？行业有天花板，但又不知道自己该换什么工作，该怎么规划职业道路？\n\n迷茫的根源在于你没有方向和发展策略。对于企业来说，发展策略决定了企业的资源投向。对于个人来说，我们也要制定策略，以最大化自己时间精力的投入产出比。","del":false,"newProblem":false,"trial":false,"categoryPic":"https://www.iqycamp.com/images/fragment/category1_4.jpeg","done":null,"status":null,"hasProblemScore":null,"chapterList":[{"chapter":1,"sections":[{"section":1,"knowledgeId":35,"name":"核心资源","series":1,"chapter":1,"integrated":false,"chapterName":"填写画布","practices":[]},{"section":2,"knowledgeId":36,"name":"关键业务","series":2,"chapter":1,"integrated":false,"chapterName":"填写画布","practices":[]},{"section":3,"knowledgeId":37,"name":"客户群体与价值服务","series":3,"chapter":1,"integrated":false,"chapterName":"填写画布","practices":[]},{"section":4,"knowledgeId":38,"name":"渠道通路","series":4,"chapter":1,"integrated":false,"chapterName":"填写画布","practices":[]},{"section":5,"knowledgeId":39,"name":"客户关系","series":5,"chapter":1,"integrated":false,"chapterName":"填写画布","practices":[]},{"section":6,"knowledgeId":40,"name":"重要合作","series":6,"chapter":1,"integrated":false,"chapterName":"填写画布","practices":[]},{"section":7,"knowledgeId":41,"name":"投入产出","series":7,"chapter":1,"integrated":false,"chapterName":"填写画布","practices":[]}],"name":"填写画布","myWarmScore":null,"totalWarmScore":null,"integrated":false},{"chapter":2,"sections":[{"section":1,"knowledgeId":43,"name":"用画布做职业诊断和规划","series":8,"chapter":2,"integrated":false,"chapterName":"分析画布","practices":[]}],"name":"分析画布","myWarmScore":null,"totalWarmScore":null,"integrated":false},{"chapter":3,"sections":[{"section":1,"knowledgeId":57,"name":"内容回顾 & 综合练习1","series":9,"chapter":3,"integrated":true,"chapterName":"复习","practices":[]},{"section":2,"knowledgeId":58,"name":"内容回顾 & 综合练习2","series":10,"chapter":3,"integrated":true,"chapterName":"复习","practices":[]}],"name":"复习","myWarmScore":null,"totalWarmScore":null,"integrated":true}],"subCatalog":"个人规划","catalog":"定位自己"},"sections":null,"openRise":null,"deadline":0,"hasProblemScore":null,"doneAllIntegrated":null,"lockedStatus":-1,"reportStatus":null,"mustStudyDays":null},{"id":7005,"openid":null,"problemId":6,"startDate":"2017-07-16","endDate":"2017-07-22","closeDate":"2017-08-15","completeTime":null,"closeTime":null,"status":3,"point":60,"warmupComplete":1,"applicationComplete":0,"total":null,"keycnt":0,"currentSeries":1,"completeSeries":0,"totalSeries":6,"riseMember":true,"requestCommentCount":1,"profileId":null,"problem":{"id":6,"problem":"写出令HR过目难忘的简历","pic":"https://www.iqycamp.com/images/fragment/problem6_3.png","length":6,"description":"简历是求职面试的敲门砖，但在初筛时，HR停留在每份简历上的平均时间只有10秒。以下四招让你的简历脱颖而出——知己知彼、有的放矢、投其所好、赏心悦目，学成之后快去准备一份令HR过目难忘的简历吧。","catalogId":2,"subCatalogId":4,"author":"孙圈圈","authorDesc":"孙圈圈，原名孙园媛，移动学习品牌“圈外” （iquanwai）创始人&CEO，前外资管理咨询公司咨询总监，曾为6大行业、50多家大型企业设计过人才发展战略。著有职场干货畅销书《请停止无效努力：如何用正确的方法快速进阶》，豆瓣评分8.7。","authorPic":"https://static.iqycamp.com/images/rise_problem_author_pic_sunquanquanV2.png?imageslim","difficultyScore":2.82,"subjectDesc":"学习是为了更好地实践。如果愿意的话，和大家分享一下你准备好的简历吧。好的分享能有机会获得圈外教练的点评，其他童鞋的点赞，以及被收录为精华！","descPic":"https://www.iqycamp.com/images/problem_desc_6.png","audio":null,"who":"任何想要找工作或跳槽转行的人","what":"对应4个步骤，以下是课程表：","how":"按照以下4个步骤去做，就能让你的简历更受HR青睐。","why":"为什么你的简历在投出之后往往石沉大海？为什么隔壁小王一投简历就能获得面试机会？\n\n简历是求职面试的敲门砖，但在初筛时，HR停留在每份简历上的平均时间只有10秒。如何在10秒之内让你的简历脱颖而出，决定了你求职第一步是否成功。","del":false,"newProblem":false,"trial":false,"categoryPic":"https://www.iqycamp.com/images/fragment/category4_2.jpeg","done":null,"status":null,"hasProblemScore":null,"chapterList":[{"chapter":1,"sections":[{"section":1,"knowledgeId":18,"name":"分析招聘需求","series":1,"chapter":1,"integrated":false,"chapterName":"知己知彼","practices":[]}],"name":"知己知彼","myWarmScore":null,"totalWarmScore":null,"integrated":false},{"chapter":2,"sections":[{"section":1,"knowledgeId":19,"name":"进行人岗匹配分析","series":2,"chapter":2,"integrated":false,"chapterName":"有的放矢","practices":[]}],"name":"有的放矢","myWarmScore":null,"totalWarmScore":null,"integrated":false},{"chapter":3,"sections":[{"section":1,"knowledgeId":20,"name":"突出简历卖点","series":3,"chapter":3,"integrated":false,"chapterName":"投其所好","practices":[]}],"name":"投其所好","myWarmScore":null,"totalWarmScore":null,"integrated":false},{"chapter":4,"sections":[{"section":1,"knowledgeId":21,"name":"完善简历形式","series":4,"chapter":4,"integrated":false,"chapterName":"赏心悦目","practices":[]}],"name":"赏心悦目","myWarmScore":null,"totalWarmScore":null,"integrated":false},{"chapter":5,"sections":[{"section":1,"knowledgeId":57,"name":"内容回顾 & 综合练习1","series":5,"chapter":5,"integrated":true,"chapterName":"复习","practices":[]},{"section":2,"knowledgeId":58,"name":"内容回顾 & 综合练习2","series":6,"chapter":5,"integrated":true,"chapterName":"复习","practices":[]}],"name":"复习","myWarmScore":null,"totalWarmScore":null,"integrated":true}],"subCatalog":"求职能力","catalog":"营销自己"},"sections":null,"openRise":null,"deadline":0,"hasProblemScore":null,"doneAllIntegrated":null,"lockedStatus":-1,"reportStatus":null,"mustStudyDays":null}],"riseMember":null},"code":200}
        );
    },Math.random()*1500)
});

module.exports = router;
