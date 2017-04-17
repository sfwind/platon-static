var Router = require("express").Router;

var router = new Router();

router.get("/rise/practice/warmup/start/*", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"msg": {
				"practice": [{
					"id": 49,
					"question": "请判断下面2段话哪一个符合概括主题的要点？",
					"type": 1,
					"analysis": "选项2中的主题不符合预期，如果用选项2中的主题，人们对内容的预期是解释”男女厕所不应该分开“的原因",
					"voice": null,
					"difficulty": 1,
					"knowledgeId": 6,
					"sceneId": 1,
					"choiceList": [{
						"id": 147,
						"questionId": 49,
						"subject": "中性厕所正在兴起。",
						"sequence": 1,
						"isRight": true,
						"selected": null
					}, {
						"id": 148,
						"questionId": 49,
						"subject": "男女厕所不应该分开。",
						"sequence": 2,
						"isRight": false,
						"selected": null
					}],
					"choice": null,
                    "knowledge": {
                        "id": 5,
                        "knowledge": "逻辑顺序",
                        "step": null,
                        "analysis": "用时间、空间、程度三种逻辑顺序进行沟通表达，能让你的表达更加清晰、缜密、有条理，更有吸引力，让别人容易记住。",
                        "means": "逻辑顺序是时间、空间、程度三种顺序的统称。在思考和表达时，逻辑顺序可以有两种使用方式：\n\n1）自上而下：根据主题，设定合适的逻辑顺序框架，去组织内容；\n2）自下而上：先头脑风暴出很多信息/观点，然后寻找他们之间的逻辑顺序，重新组织。",
                        "keynote": "这三种逻辑顺序，只是代表类型，具体在表达和解决问题时，如果想要更高效，还需要积累更多具体的结构，比如，时间顺序下的产品价值链。",
                        "pic": null,
                        "audio": null,
                        "appear": null
                    }
				}, {
					"id": 45,
					"question": "请判断下面这段话作为主题是否适度？\n当今世界已进入信息网络化时代，信息网络化对编辑工作既提出了新的挑战，也带来了难得的发展机遇。当下，互联网在民众的生活中产生着越来越大的影响，“互联网+编辑出版业”也为编辑出版产业提供了广阔的发展空间。如何利用好互联网平台，使其与编辑出版业进行深度融合，为编辑出版工作打造新的局面，是值得编辑出版人深思的话题。目前以网络为代表的新媒体无疑给信息的传播带来了便捷，让编辑编发的成果受众面更为广阔。而同时，“互联网+”带给编辑工作者的冲击也是不小的，对此，编辑工作者就需积极应对。我认为进入网络化社会，编辑要不断学习新知识和技能，创新工作方式。\n ……\n",
					"type": 1,
					"analysis": "主题不符合“适度”，主题中对于背景的介绍太长。",
					"voice": null,
					"difficulty": 1,
					"knowledgeId": 6,
					"sceneId": 1,
					"choiceList": [{
						"id": 136,
						"questionId": 45,
						"subject": "适度",
						"sequence": 1,
						"isRight": false,
						"selected": null
					}, { "id": 137, "questionId": 45, "subject": "不适度", "sequence": 2, "isRight": true, "selected": null }],
					"choice": null,
                    "knowledge": {
                        "id": 5,
                        "knowledge": "逻辑顺序",
                        "step": null,
                        "analysis": "用时间、空间、程度三种逻辑顺序进行沟通表达，能让你的表达更加清晰、缜密、有条理，更有吸引力，让别人容易记住。",
                        "means": "逻辑顺序是时间、空间、程度三种顺序的统称。在思考和表达时，逻辑顺序可以有两种使用方式：\n\n1）自上而下：根据主题，设定合适的逻辑顺序框架，去组织内容；\n2）自下而上：先头脑风暴出很多信息/观点，然后寻找他们之间的逻辑顺序，重新组织。",
                        "keynote": "这三种逻辑顺序，只是代表类型，具体在表达和解决问题时，如果想要更高效，还需要积累更多具体的结构，比如，时间顺序下的产品价值链。",
                        "pic": null,
                        "audio": null,
                        "appear": null
                    }
				}, {
					"id": 47,
					"question": "请为下面这段话概括一个最合适的主题：\n为了改善公司目前新入职员工的培训状况：\n 应向管理层强调，对新入职员工的培训十分影响员工的工作质量和忠诚度\n 应在年末给予优秀讲师奖励和表彰，提高讲师的积极性\n 应搜集新入职员工对培训的反馈，调整培训内容，使之更贴合新员工需要\n",
					"type": 1,
					"analysis": "选项1和3的主题都没有思想，而2概括出了有思想的主题",
					"voice": null,
					"difficulty": 1,
					"knowledgeId": 6,
					"sceneId": 1,
					"choiceList": [{
						"id": 141,
						"questionId": 47,
						"subject": "为改善公司目前新入职员工的培训状况，我们提出3点建议",
						"sequence": 1,
						"isRight": false,
						"selected": null
					}, {
						"id": 142,
						"questionId": 47,
						"subject": "为改善公司目前新入职员工的培训状况，我们必须有所行动，促使培训体制中各参与主体支持培训",
						"sequence": 2,
						"isRight": true,
						"selected": null
					}, {
						"id": 143,
						"questionId": 47,
						"subject": "为改善公司目前新入职员工的培训状况，步骤如下",
						"sequence": 3,
						"isRight": false,
						"selected": null
					}],
					"choice": null,
                    "knowledge": {
                        "id": 5,
                        "knowledge": "逻辑顺序",
                        "step": null,
                        "analysis": "用时间、空间、程度三种逻辑顺序进行沟通表达，能让你的表达更加清晰、缜密、有条理，更有吸引力，让别人容易记住。",
                        "means": "逻辑顺序是时间、空间、程度三种顺序的统称。在思考和表达时，逻辑顺序可以有两种使用方式：\n\n1）自上而下：根据主题，设定合适的逻辑顺序框架，去组织内容；\n2）自下而上：先头脑风暴出很多信息/观点，然后寻找他们之间的逻辑顺序，重新组织。",
                        "keynote": "这三种逻辑顺序，只是代表类型，具体在表达和解决问题时，如果想要更高效，还需要积累更多具体的结构，比如，时间顺序下的产品价值链。",
                        "pic": null,
                        "audio": null,
                        "appear": null
                    }
				}]
			}, "code": 200
		}), Math.random() * 1500)
});

router.get("/rise/practice/warmup/analysis/*", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": {
				"practice": [
					{
						"id": 1, //题目id
						"question": "题干", //问题题干
						"analysis": "balbal", //问题分析
						"voice": "http://someurl", //语音分析链接
						"type": 1, //1-单选题，2-多选题
						"Difficulty": 1, //1-简单，2-普通，3-困难
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
                        "knowledge": {
                            "id": 5,
                            "knowledge": "逻辑顺序",
                            "step": null,
                            "analysis": "用时间、空间、程度三种逻辑顺序进行沟通表达，能让你的表达更加清晰、缜密、有条理，更有吸引力，让别人容易记住。",
                            "means": "逻辑顺序是时间、空间、程度三种顺序的统称。在思考和表达时，逻辑顺序可以有两种使用方式：\n\n1）自上而下：根据主题，设定合适的逻辑顺序框架，去组织内容；\n2）自下而上：先头脑风暴出很多信息/观点，然后寻找他们之间的逻辑顺序，重新组织。",
                            "keynote": "这三种逻辑顺序，只是代表类型，具体在表达和解决问题时，如果想要更高效，还需要积累更多具体的结构，比如，时间顺序下的产品价值链。",
                            "pic": null,
                            "audio": null,
                            "appear": null
                        },
                        "discussList": [
                          {
                            "id":2,
                            "repliedId": 1,
                            "comment":"回复回复",
                            "repliedName": "风之伤",
                            "repliedComment": "评论评论评论",
                            "warmupPracticeId": 49,
                            "name":"Diane",
                            "avatar":"http://wx.qlogo.cn/mmopen/Q3auHgzwzM4j579r72ltlZK0uBEz3klv57pOrqolSjZONIIlyffo4ib5p7sneIH4MgXyCKzKOKBiaCTkQUyu15XKiaeSppaJ0U3j1OBLIOrxrk/0",
                            "discussTime":"10:30",
                            "priority":1,
                          },

                          {
                            "id":1,
                            "repliedId": null,
                            "comment":"评论评论评论",
                            "repliedName": null,
                            "repliedComment": null,
                            "warmupPracticeId": 49,
                            "name":"风之伤",
                            "avatar":"http://wx.qlogo.cn/mmopen/Q3auHgzwzM4j579r72ltlZK0uBEz3klv57pOrqolSjZONIIlyffo4ib5p7sneIH4MgXyCKzKOKBiaCTkQUyu15XKiaeSppaJ0U3j1OBLIOrxrk/0",
                            "discussTime":"10:38"
                          }
                        ],
					},
					{
						"id": 2, //题目id
						"question": "题干", //问题题干
						"analysis": "balbal", //问题分析
						"voice": "http://someurl", //语音分析链接
						"type": 1, //1-单选题，2-多选题
						"Difficulty": 1, //1-简单，2-普通，3-困难
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
                        "knowledge": {
                            "id": 5,
                            "knowledge": "逻辑顺序",
                            "step": null,
                            "analysis": "用时间、空间、程度三种逻辑顺序进行沟通表达，能让你的表达更加清晰、缜密、有条理，更有吸引力，让别人容易记住。",
                            "means": "逻辑顺序是时间、空间、程度三种顺序的统称。在思考和表达时，逻辑顺序可以有两种使用方式：\n\n1）自上而下：根据主题，设定合适的逻辑顺序框架，去组织内容；\n2）自下而上：先头脑风暴出很多信息/观点，然后寻找他们之间的逻辑顺序，重新组织。",
                            "keynote": "这三种逻辑顺序，只是代表类型，具体在表达和解决问题时，如果想要更高效，还需要积累更多具体的结构，比如，时间顺序下的产品价值链。",
                            "pic": null,
                            "audio": null,
                            "appear": null
                        }
					}
				]
			}
		}), Math.random() * 1500)
});

router.post("/rise/practice/warmup/answer/*", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": {
				"rightNumber": 3, //正确题数
				"point": 2000, //积分
                "total":3 //题目总数
			}
		}), Math.random() * 1500)
});

router.get("/rise/practice/next/*", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": {
				"knowledge": {
					"Id": 1,
					"knowledge": "知识点描述", //知识点描述
					"appear": 0, //是否出现过,0-未出现，1-出现过
				},
				"type": 21, // 1-单选题，2-多选题，11-应用题，21-小目标
				"status": 1, // 0-未完成，1-已完成
				"unlocked": true, //是否解锁
				"practiceIdList": [1, 2, 3], //训练id
				"series": 1, //组号
				"sequence": 1 //组内顺序
			}
		}), Math.random() * 1500)
});

router.get("/rise/practice/application/start/*", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": {
				"id": 1,
				"description": "balbal",
                "topic":"应用训练题1",
				"pic": "http://www.iquanwai.com/images/cintro1.png",
				"knowledgeId": 1,
				"sceneId": 1,
				"difficulty": null,
        "content": "babal",
        "submitId": 1, //提交id
        "submitUpdateTime": "2017-02-15" ,//最后提交时间
        "voteCount": 0,
        "commentCount": 0,
        "voteStatus": 0
			}
		}), Math.random() * 1500)
});

router.get("/rise/practice/challenge/start/*", (req, res) => {
	setTimeout(() =>
		res.status(200).json({
			"code": 200,
			"msg": {
				"id": 1,
				"description": "图文混排内容", //html
				"pic": "http://www.iquanwai.com/images/cintro1.png",  //图片url
				"problemId": 1, //问题id
				"pcurl": "http://someurl", //pc端url
				"content": null, //提交内容
        "submitId": 1, //提交id
        "submitUpdateTime": "2017-02-15" //最后提交时间
			}
		}), Math.random() * 1500)
});

router.post("/rise/practice/warmup/discuss", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": "ok"
    }), Math.random() * 1500)
});

router.get("/rise/practice/warmup/load/discuss/*/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": [
        {
          "id":2,
          "repliedId": 1,
          "comment":"新增的评论",
          "repliedName": "风之伤",
          "repliedComment": "评论评论评论",
          "warmupPracticeId": 49,
          "name":"Diane",
          "avatar":"http://wx.qlogo.cn/mmopen/Q3auHgzwzM4j579r72ltlZK0uBEz3klv57pOrqolSjZONIIlyffo4ib5p7sneIH4MgXyCKzKOKBiaCTkQUyu15XKiaeSppaJ0U3j1OBLIOrxrk/0",
          "discussTime":"10:30"
        },

        {
          "id":1,
          "repliedId": null,
          "comment":"评论评论评论",
          "repliedName": null,
          "repliedComment": null,
          "warmupPracticeId": 49,
          "name":"风之伤",
          "avatar":"http://wx.qlogo.cn/mmopen/Q3auHgzwzM4j579r72ltlZK0uBEz3klv57pOrqolSjZONIIlyffo4ib5p7sneIH4MgXyCKzKOKBiaCTkQUyu15XKiaeSppaJ0U3j1OBLIOrxrk/0",
          "discussTime":"10:38"
        }
      ]
    }), Math.random() * 1500)
});

router.post("/rise/practice/application/submit/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": "ok"
    }), Math.random() * 1500)
});

router.post("/rise/practice/challenge/submit/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": "ok"
    }), Math.random() * 1500)
});


router.get('/rise/practice/warmup/new/analysis/*', (req, res) =>{
  setTimeout(() =>
    res.status(200).json({
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
          "knowledge": {
              "id": 5,
              "knowledge": "逻辑顺序",
              "step": null,
              "analysis": "用时间、空间、程度三种逻辑顺序进行沟通表达，能让你的表达更加清晰、缜密、有条理，更有吸引力，让别人容易记住。",
              "means": "逻辑顺序是时间、空间、程度三种顺序的统称。在思考和表达时，逻辑顺序可以有两种使用方式：\n\n1）自上而下：根据主题，设定合适的逻辑顺序框架，去组织内容；\n2）自下而上：先头脑风暴出很多信息/观点，然后寻找他们之间的逻辑顺序，重新组织。",
              "keynote": "这三种逻辑顺序，只是代表类型，具体在表达和解决问题时，如果想要更高效，还需要积累更多具体的结构，比如，时间顺序下的产品价值链。",
              "pic": null,
              "audio": null,
              "appear": null
          },
        "discussList": [
          {
            "id":2,
            "repliedId": 1,
            "comment":"回复回复",
            "repliedName": "风之伤",
            "repliedComment": "评论评论评论",
            "warmupPracticeId": 49,
            "name":"Diane",
            "avatar":"http://wx.qlogo.cn/mmopen/Q3auHgzwzM4j579r72ltlZK0uBEz3klv57pOrqolSjZONIIlyffo4ib5p7sneIH4MgXyCKzKOKBiaCTkQUyu15XKiaeSppaJ0U3j1OBLIOrxrk/0",
            "discussTime":"10:30"
          },

          {
            "id":1,
            "repliedId": null,
            "comment":"评论评论评论",
            "repliedName": null,
            "repliedComment": null,
            "warmupPracticeId": 49,
            "name":"风之伤",
            "avatar":"http://wx.qlogo.cn/mmopen/Q3auHgzwzM4j579r72ltlZK0uBEz3klv57pOrqolSjZONIIlyffo4ib5p7sneIH4MgXyCKzKOKBiaCTkQUyu15XKiaeSppaJ0U3j1OBLIOrxrk/0",
            "discussTime":"10:38"
          }
        ],
      }, "code": 200
    }), Math.random() * 1500)
})

router.get("/rise/practice/warmup/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": {
        "id": 13,
        "question": "如何战胜公开发言恐慌症？1、 发言前:准备好讲稿，反复演练提前到场熟悉发言环境上台前深呼吸放松心情2、发言时：眼睛盯住远方一个点避免紧张3、 发言后：收集听众的正面反馈，树立信心这段话符合时间顺序的哪种子结构类型",
        "type": 1,
        "analysis": "这段话按照时间顺序，按照发言前、发言时、发言后几个时间点提出了消除恐惧心理的方法。不属于步骤/流程，也没有因果关系",
        "voice": null,
        "difficulty": 1,
        "knowledgeId": 2,
        "sceneId": 1,
        "score": null,
        "choiceList": null,
        "discussList": null,
        "choice": null,
          "knowledge": {
              "id": 5,
              "knowledge": "逻辑顺序",
              "step": null,
              "analysis": "用时间、空间、程度三种逻辑顺序进行沟通表达，能让你的表达更加清晰、缜密、有条理，更有吸引力，让别人容易记住。",
              "means": "逻辑顺序是时间、空间、程度三种顺序的统称。在思考和表达时，逻辑顺序可以有两种使用方式：\n\n1）自上而下：根据主题，设定合适的逻辑顺序框架，去组织内容；\n2）自下而上：先头脑风暴出很多信息/观点，然后寻找他们之间的逻辑顺序，重新组织。",
              "keynote": "这三种逻辑顺序，只是代表类型，具体在表达和解决问题时，如果想要更高效，还需要积累更多具体的结构，比如，时间顺序下的产品价值链。",
              "pic": null,
              "audio": null,
              "appear": null
          }
      }
    }), Math.random() * 1500)
});

router.post("/rise/practice/vote", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": "ok"
    }), Math.random() * 1500)
});

router.get("/rise/practice/application/list/other/*",(req,res)=>{
  setTimeout(()=>{
    res.status(200).json(
        {
            "msg": {
                "list": [
                    {
                        "title": null,
                        "userName": "nethunder",
                        "submitUpdateTime": "2017-03-24",
                        "headImage": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLA6Yg58o1S3RwgdnMAIt01fo39veibmsokIa7NuaZ1m8fmxAL9VUdjyHHib5iaLSf1ZnzhawhdPcicicTnfVnyFlUViaRXyjnNibuTNws/0",
                        "content": "微博 [cp]今天难得和老爸下馆子聊天，他有些小抱怨。能立即进入移情倾听模式吗？能意识到情绪背后的诉求吗？能试着不去判断他的想法对错吗？回到聊天的目的是什么，是加强理解和沟通而非判断是非，即使是解释了也未必能改变想法。然而通常我们是害怕不解释不纠正，对方会继续错下去。先判断，再强加，这完全是和沟通的目的南辕北辙。[/cp]\n感觉对倾听的要素没有很清晰的分类，写的时候一直在想要按照逻辑去分，但有点难。现在思考，首先是明确和老爸吃饭聊天的目的是加强沟通增进感情，然后在意识到老爸这么说是在发泄情绪，接着开启移情倾听模式，然后时刻保持意识自己是否在判断老爸的对错，回到倾听和理解而非去解释和纠正。\n修改后的微博：\n今天难得和老爸吃饭聊天，快一年没见面真的要和老爸好好联络感情呢。老爸谈起一些家庭琐事的小抱怨，我又忍不住开始解释：其实也不是那样的。。。这是个很好的机会练习移情聆听呀。首先记得和老爸聊天的目的是增加沟通，尽量让老爸多说说他的想法；意识到小抱怨其实是在发泄情绪了，马上进去移情聆听的状态，控制自己不去判断和解释，耐心等老爸说完。嗯，下次应该能做得更好。",
                        "voteCount": 0,
                        "commentCount": 0,
                        "submitId": 5,
                        "type": 11,
                        "voteStatus": 0,
                        "priority": 0,
                        "perfect": null,
                        "problemId": null,
                        "authorType": null,
                        "isMine": null,
                        "labelList": null,
                        "picList": []
                    },
                    {
                        "title": null,
                        "userName": "nethunder",
                        "submitUpdateTime": "2017-03-24",
                        "headImage": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLA6Yg58o1S3RwgdnMAIt01fo39veibmsokIa7NuaZ1m8fmxAL9VUdjyHHib5iaLSf1ZnzhawhdPcicicTnfVnyFlUViaRXyjnNibuTNws/0",
                        "content": "最近只有转发，没有自创。\n还是不瞎编了吧。",
                        "voteCount": 0,
                        "commentCount": 0,
                        "submitId": 560,
                        "type": 11,
                        "voteStatus": 0,
                        "priority": 0,
                        "perfect": null,
                        "problemId": null,
                        "authorType": null,
                        "isMine": null,
                        "labelList": null,
                        "picList": []
                    },
                    {
                        "title": null,
                        "userName": "nethunder",
                        "submitUpdateTime": "2017-03-24",
                        "headImage": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLA6Yg58o1S3RwgdnMAIt01fo39veibmsokIa7NuaZ1m8fmxAL9VUdjyHHib5iaLSf1ZnzhawhdPcicicTnfVnyFlUViaRXyjnNibuTNws/0",
                        "content": "是没有做到MECE完全独立，无穷大",
                        "voteCount": 0,
                        "commentCount": 0,
                        "submitId": 827,
                        "type": 11,
                        "voteStatus": 0,
                        "priority": 0,
                        "perfect": null,
                        "problemId": null,
                        "authorType": null,
                        "isMine": null,
                        "labelList": null,
                        "picList": []
                    },
                    {
                        "title": null,
                        "userName": "nethunder",
                        "submitUpdateTime": "2017-03-24",
                        "headImage": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLA6Yg58o1S3RwgdnMAIt01fo39veibmsokIa7NuaZ1m8fmxAL9VUdjyHHib5iaLSf1ZnzhawhdPcicicTnfVnyFlUViaRXyjnNibuTNws/0",
                        "content": "招聘工作分析\n年后一个月招聘旺季，但是最近招聘成效很差，主要可能存在以下几个问题：\n1.无人投递简历。\n2.新公司搬到安亭，距离较远。\n3.薪资待遇不高，出差补贴低。\n",
                        "voteCount": 0,
                        "commentCount": 0,
                        "submitId": 1133,
                        "type": 11,
                        "voteStatus": 0,
                        "priority": 0,
                        "perfect": null,
                        "problemId": null,
                        "authorType": null,
                        "isMine": null,
                        "labelList": null,
                        "picList": []
                    },
                    {
                        "title": null,
                        "userName": "nethunder",
                        "submitUpdateTime": "2017-03-24",
                        "headImage": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLA6Yg58o1S3RwgdnMAIt01fo39veibmsokIa7NuaZ1m8fmxAL9VUdjyHHib5iaLSf1ZnzhawhdPcicicTnfVnyFlUViaRXyjnNibuTNws/0",
                        "content": "拿最近一次的项目Email为例子\n改动前\nMy duties of the tournament\nDesign the questionaire for tournament feedback collection；\nManage Registration payment(Company Alipay)：Check and feedback every payment during the registration； \nPurchase tournament supplies which include: Tee/Tee marker/flag/towel/unbrella/skin coat for outsourses team/tent/badage；\nPurhase Office and players' supplies；\nHotel arrangement for committee and part of paid clients and potencial clients;\nTransportation for picking up and drop off the airport for committee/players/coach;\nManage the catering for committee;\nShuttle car from hotel to club house;\nManage the cashflow and payment to outsource team;\nManage the invoices from all parties;\nManage the award ceremony;\nPacking with the team and clean up.\n\n改动后\nBefore the tournament（赛前）\nDesign the questionaire for tournament feedback collection；\nManage Registration payment(Company Alipay)：Check and feedback every payment during the registration； \nPurchase tournament supplies which include: Tee/Tee marker/flag/towel/unbrella/skin coat for outsourses team/tent/badage；\nPurhase Office and players' supplies；\nHotel arrangement for committee and part of paid clients and potencial clients;\nTransportation for picking up and drop off the airport for committee/players/coach;\n\nDuring the tournament（赛中）\nManage the catering for committee;\nShuttle car from hotel to club house;\nManage the award ceremony;\n\nAfter the Tournament（赛后）\nManage the cashflow and payment to outsource team;\nManage the invoices from all parties;\nPacking with the team and clean up.",
                        "voteCount": 0,
                        "commentCount": 0,
                        "submitId": 373,
                        "type": 11,
                        "voteStatus": 0,
                        "priority": 0,
                        "perfect": null,
                        "problemId": null,
                        "authorType": null,
                        "isMine": null,
                        "labelList": null,
                        "picList": []
                    },
                    {
                        "title": null,
                        "userName": "nethunder",
                        "submitUpdateTime": "2017-03-24",
                        "headImage": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLA6Yg58o1S3RwgdnMAIt01fo39veibmsokIa7NuaZ1m8fmxAL9VUdjyHHib5iaLSf1ZnzhawhdPcicicTnfVnyFlUViaRXyjnNibuTNws/0",
                        "content": "之前整理了一个会议纪要，见图片1；\n后来从分层归类角度又重新整理一下，见图片2\n调整的重点：重新归类，重新分组，主线更清晰，要点更明确。",
                        "voteCount": 0,
                        "commentCount": 0,
                        "submitId": 124,
                        "type": 11,
                        "voteStatus": 0,
                        "priority": 0,
                        "perfect": null,
                        "problemId": null,
                        "authorType": null,
                        "isMine": null,
                        "labelList": null,
                        "picList": []
                    },
                    {
                        "title": null,
                        "userName": "nethunder",
                        "submitUpdateTime": "2017-03-24",
                        "headImage": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLA6Yg58o1S3RwgdnMAIt01fo39veibmsokIa7NuaZ1m8fmxAL9VUdjyHHib5iaLSf1ZnzhawhdPcicicTnfVnyFlUViaRXyjnNibuTNws/0",
                        "content": "微博的文章内容和篇幅得改善了，平时做深度思考太少了。\n最近思考的主题是生活中顺其自然会平静很多。。\n首先孩子教育问题，不宜大声吼或者强迫他一定完成钢琴作业。\n其次夫妻关系方面，如果他没时间陪孩子就随便吧，他主动陪伴时也不挑他毛病。",
                        "voteCount": 0,
                        "commentCount": 0,
                        "submitId": 664,
                        "type": 11,
                        "voteStatus": 0,
                        "priority": 0,
                        "perfect": null,
                        "problemId": null,
                        "authorType": null,
                        "isMine": null,
                        "labelList": null,
                        "picList": []
                    },
                    {
                        "title": null,
                        "userName": "nethunder",
                        "submitUpdateTime": "2017-03-24",
                        "headImage": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLA6Yg58o1S3RwgdnMAIt01fo39veibmsokIa7NuaZ1m8fmxAL9VUdjyHHib5iaLSf1ZnzhawhdPcicicTnfVnyFlUViaRXyjnNibuTNws/0",
                        "content": "查看了最近发的一封邮件，发现自己已有意识地按照分层归类的要求来做了。\n\nX1项目分析\n\n公司简介\n\nX1致力于把制造能力互联网化，通过机器胶囊项目（Roboocap.com）让所有人可以非常方便地使用3D打印机、激光切割机、雕刻机和五轴CNC等制造装备来完成创造性的工作。机器胶囊是新一代的“制造云”。\n\n主要结论：不接这个项目\n\n为评估这个项目的可行性，我从网络渠道、上轮投资者、竞争对手等方面做了深入了解。\n\n1、网络方面，看了企查查、因果树等投资大数据平台，发现做云制造这一块的项目还非常少，资本介入也不活跃；\n2、上轮投资者方面，与X1项目两轮投资机构上海合力投资的投资经理电话聊了，总体感觉这是一个慢热的市场，3D云制造这一块需求端不够活跃，场景也不够清晰，那么供给端很难维持。未来还是主要往toB走，核心在于设备和物联网的成熟。\n3、竞争对手方面，与X1主要竞争对手X2的创始人XX面对面做了交流，实地参观了X2的制造车间，了解到X2虽然走访了3000多家制造企业，筛选出合格的2000多家，但是长期维持合作的企业就十几家。从供给端的数量可以推测需求端的量是非常少的。这是一个没有爆发潜质的项目，也没有核心的壁垒。据XX介绍，制造工业的成长需要较长时间的积累，才能形成品牌信誉度。IDG也看了X2项目，反馈是前景看好，但是还为时过早。\n\n",
                        "voteCount": 0,
                        "commentCount": 0,
                        "submitId": 955,
                        "type": 11,
                        "voteStatus": 0,
                        "priority": 0,
                        "perfect": null,
                        "problemId": null,
                        "authorType": null,
                        "isMine": null,
                        "labelList": null,
                        "picList": []
                    },
                    {
                        "title": null,
                        "userName": "nethunder",
                        "submitUpdateTime": "2017-03-24",
                        "headImage": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLA6Yg58o1S3RwgdnMAIt01fo39veibmsokIa7NuaZ1m8fmxAL9VUdjyHHib5iaLSf1ZnzhawhdPcicicTnfVnyFlUViaRXyjnNibuTNws/0",
                        "content": " 透过一扇小窗看到的大智慧\n \n 记得在参加完雅思考试之后，曾经引发过自己的深入思考。\n\n 将近一个半月的复习备考正式宣告结束。在这一个半月中，魔鬼式的集中上课、复习、刷题，自然英语水平自己都感觉到蹭蹭地往上窜。但更重要的是，这段时间让我一直在思考一个问题，那就是逻辑思维的问题。\n \n 问题的起源来自于一篇雅思剑桥的阅读材料，大意是说语言的演化和发展。其中有一段提到，一门语言就是一个思维体系，不同语言的不同表达方式其实本质上反映的是不同人群的思维方式，而一门语言的消失实际上是人类的一大损失，因为它终结了一种完全不同的思维体系，大大阻碍了人类思维多样性的发展。\n\n 坦白地讲，学了这么多年英语，还从未想过这个问题，我们始终关注的是单词、语法、阅读等等。现在想想，原来始终没有领会语言的精髓。就雅思英语阅读而言，判断题始终围绕着简单的逻辑判断和推理，只要掌握其逻辑判断准则，自然正确率大大提高；而阅读中的段落大意、匹配等，本质上与写作和口语体现了同样的逻辑思维方式，那就是论据始终要为论点服务，要说服别人，就要表明自己的观点，然后用一些论据来展开说明，说明中利用各种论证方法，尤以举例最易于人接受，而整个推理过程都要合乎逻辑，才能更让人信服，也更乐于接受你的观点。写作如此，口语交流亦如此。\n\n 另一方面，从人类学习语言的整个过程来看，听力和阅读实际上是语言的输入，口语和写作则是语言的输出，从输入到输出是个漫长的过程，很多人输入没问题，输出却始终很难进步，关键的原因恐怕也在于没有掌握英语的思维方式这一精髓，这也是为什么大多数中国学生在这两方面普遍薄弱的主要原因。\n\n 可以说，逻辑思维是我在这次雅思备考中的最大收获。当我重新回到生活和工作中时，居然发现在很多方面都会遇到类似的情况。有次偶然看到美国加州小学生教材，发现数学教材里讲解的重点都是逻辑思维方法，语文教材里讲的依然是怎样用逻辑方法进行分析阅读。看到这里，我恍然大悟，中国和美国孩子的区别原来从这里就开始萌芽。说得更一般些，生活中为了一件事想要说服别人，你要充分了解事情的前因后果，然后提出自己的观点，摆出事实来说明，每一步都合情合理才能最终达到目的。工作中更是如此，为了说服同事接受你的一个提案，需要做大量的调查分析，指出问题所在，提出自己的解决方案，更要根据事实甚至是数据来说理，最终证明自己方案的合理性和可行性。\n\n 关于这一点，最近正好看了一些关于麦肯锡公司的书籍，其中都提到了关于逻辑思考的问题。在《思考的技术》中，作者大前研一提到“解决问题的根本就是逻辑思考力，逻辑思考力不但能够让问题迎刃而解，而且我们一般常说的先见之明、直觉也是从逻辑思考中产生的”，这与我最近备考的收获不谋而合。看来不论什么行业，给人们带来质的飞跃的关键点始终在于思维方式和逻辑思考。而这些都是哲学范畴的内容，哲学作为科学的科学，正是当之无愧。\n\n 写到这里，反观这篇文章的结构，也正是运用了逻辑思维方法，这与我从前的写作方式完全不同，但是却深刻感受到思路的清晰和行文的流畅（请允许我自恋一下哈！），看来逻辑思维已经开始潜移默化地影响我，这让我不禁再一次感叹：逻辑思维无处不在！\n\n",
                        "voteCount": 0,
                        "commentCount": 0,
                        "submitId": 506,
                        "type": 11,
                        "voteStatus": 0,
                        "priority": 0,
                        "perfect": null,
                        "problemId": null,
                        "authorType": null,
                        "isMine": null,
                        "labelList": null,
                        "picList": []
                    },
                    {
                        "title": null,
                        "userName": "nethunder",
                        "submitUpdateTime": "2017-03-24",
                        "headImage": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLA6Yg58o1S3RwgdnMAIt01fo39veibmsokIa7NuaZ1m8fmxAL9VUdjyHHib5iaLSf1ZnzhawhdPcicicTnfVnyFlUViaRXyjnNibuTNws/0",
                        "content": "1.背景：\n目前考研中的风险和问题\n考研原因、意愿及各比例、实际考研人数、考研失败人数、录取率等数据查询\n2.价值性（目的、功能）（能够反映经济社会民生保障、行业发展要求，为现实生活风险提供保障--能解决什么问题）\n3.相关保险研究现状、创新性（市场上没有，有前瞻性，市场空间大，或者对已有的进行较大改进或优化）\n4.可行性分析（技术、制度、政策）\n5.风险控制及应对（免责？）\n\n\n1.相关数据搜集（需查大量资料）、背景（为什么、目前问题）、价值性（能够反映经济社会民生保障、行业发展要求，为现实生活风险提供保障）\n\n2.问卷调查分析（问卷设计、对回收问卷结果分析）、保险目的（要解决什么达到什么），创新性（市场上没有，有前瞻性，市场空间大，或者对已有的进行较大改进或优化）\n\n2.合同设计资料：考研成本（经济、时间、心理），本科毕业就业时间，就业率，考研就业时间就业率，本科及考研就业薪资情况等",
                        "voteCount": 0,
                        "commentCount": 0,
                        "submitId": 253,
                        "type": 11,
                        "voteStatus": 0,
                        "priority": 0,
                        "perfect": null,
                        "problemId": null,
                        "authorType": null,
                        "isMine": null,
                        "labelList": null,
                        "picList": []
                    }
                ],
                "highlightList": [
                    {
                        "title": null,
                        "userName": "nethunder",
                        "submitUpdateTime": "2017-03-24",
                        "headImage": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLA6Yg58o1S3RwgdnMAIt01fo39veibmsokIa7NuaZ1m8fmxAL9VUdjyHHib5iaLSf1ZnzhawhdPcicicTnfVnyFlUViaRXyjnNibuTNws/0",
                        "content": "讨论某男生喜欢怎么样的女生。\n【性格】\n开朗、乖巧、体贴人、萌萌哒、孝顺\n【价值观】\n物欲不强、上进、自强、独立\n【兴趣】\n散步、做饭\n【知识】\n金融/政治常识、心理/行为学\n【能力】\n做家务、煮饭、沟通、思维\n",
                        "voteCount": 0,
                        "commentCount": 0,
                        "submitId": 1572,
                        "type": 11,
                        "voteStatus": 0,
                        "priority": 1,
                        "perfect": null,
                        "problemId": null,
                        "authorType": null,
                        "isMine": null,
                        "labelList": null,
                        "picList": []
                    },
                    {
                        "title": null,
                        "userName": "nethunder",
                        "submitUpdateTime": "2017-03-24",
                        "headImage": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLA6Yg58o1S3RwgdnMAIt01fo39veibmsokIa7NuaZ1m8fmxAL9VUdjyHHib5iaLSf1ZnzhawhdPcicicTnfVnyFlUViaRXyjnNibuTNws/0",
                        "content": "原文：\n摩拜只能手动关锁吗？忘记关锁的话就不能APP关锁，还要再折回去岂不是麻烦！万一回去关锁前别人骑走了咋整？\n\n用分层归类发调整后：\n\n摩拜单车使用完后，忘记关锁人就走了，怎么办？\n1、返回后发现车没被人骑走，那恭喜你，手动把锁关上就好了\n2、返回后发现车没锁的情况下又被别人骑走了，唯一办法：打客服电话\n\n",
                        "voteCount": 0,
                        "commentCount": 0,
                        "submitId": 1098,
                        "type": 11,
                        "voteStatus": 0,
                        "priority": 1,
                        "perfect": null,
                        "problemId": null,
                        "authorType": null,
                        "isMine": null,
                        "labelList": null,
                        "picList": []
                    },
                    {
                        "title": null,
                        "userName": "nethunder",
                        "submitUpdateTime": "2017-03-24",
                        "headImage": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLA6Yg58o1S3RwgdnMAIt01fo39veibmsokIa7NuaZ1m8fmxAL9VUdjyHHib5iaLSf1ZnzhawhdPcicicTnfVnyFlUViaRXyjnNibuTNws/0",
                        "content": "构建外卖业务指标体系，使用了分层归类的方法：\n一级分类：用户、商家、配送、订单\n二级分类：\n用户：用户特征；用户反应\n商家：基本属性、营销、经营、服务、商家分级\n订单：流量分流、交易属性、传播行为、配送属性\n\n在构建指标体系时，用到：海盗指标法、4w。",
                        "voteCount": 0,
                        "commentCount": 0,
                        "submitId": 588,
                        "type": 11,
                        "voteStatus": 0,
                        "priority": 1,
                        "perfect": null,
                        "problemId": null,
                        "authorType": null,
                        "isMine": null,
                        "labelList": null,
                        "picList": []
                    }
                ],
                "end": false
            },
            "code": 200
        }
    )
  },Math.random()*1500);
});

router.get("/rise/practice/challenge/list/other/*",(req,res)=>{
  setTimeout(()=>{
    res.status(200).json(
      {
        "msg": [
          {
            "title": null,
            "userName": "薛定谔的猫",
            "submitUpdateTime": "2017-01-24",
            "headImage": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM7wkhob9zgicD3IJxG1tLVSSe9qdzR1qUGXz6BwPv73sr67iaTEibcA1sNic3Roib4DgXCVG4IWe0zPAKJnlo5r4NibezssS6naic6dkM/0",
            "content": "ffefrgergerghthhthfewfewffewffwefwef",
            "voteCount": 1,
            "commentCount": 29,
            "submitId": 71,
            "type": 21,
            "voteStatus": null
          },
          {
            "title": null,
            "userName": "张凯雯",
            "submitUpdateTime": "2017-01-21",
            "headImage": "http://wx.qlogo.cn/mmopen/JeB8LAjhPIcjw65snUszvxogCNX1yV90K3QEa68sIXjVLuvaapaUUJOXw9P8qYcWlu3CuSsTEjdPuIoHhFWnIypmX6W84XzX/0",
            "content": "今天跟所有人说话前，都先停30先想逻辑",
            "voteCount": 1,
            "commentCount": 8,
            "submitId": 73,
            "type": 21,
            "voteStatus": null
          },
          {
            "title": null,
            "userName": "薛定谔的猫",
            "submitUpdateTime": "2017-02-04",
            "headImage": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM7wkhob9zgicD3IJxG1tLVSSe9qdzR1qUGXz6BwPv73sr67iaTEibcA1sNic3Roib4DgXCVG4IWe0zPAKJnlo5r4NibezssS6naic6dkM/0",
            "content": "提交圈外\n\n首页\n\nRISE\n薛定谔的猫\n专题\n与人沟通时条理更清晰\n跟老板/家人提要求时更有说服力\n面对前所未有的新问题时撬开脑洞\n临场发言也能掷地有声\n与人撕逼时找到对方漏洞\n我的心得\nHi，欢迎来到圈外社区。\n请按照手机端挑战任务的页面提示，在这里记录下你学习的小目标、感悟或经历吧！\n小提示\n完成小目标，获得相应的积分。\n训练期间的每日收获，以及最后的......",
            "voteCount": 1,
            "commentCount": 5,
            "submitId": 83,
            "type": 21,
            "voteStatus": null
          },
          {
            "title": null,
            "userName": "朱林源Juliet",
            "submitUpdateTime": "2017-01-23",
            "headImage": "http://wx.qlogo.cn/mmopen/DRC1udVVibvW6lHtaHXaPO6w1U0cgicWyPMZBY35VByWwApxkvQrJXOX74DnLDicoias5uJMBryPcuNRAJULL7NCj96FPrAeQUKo/0",
            "content": "完成训练后能更加条理清晰的与人沟通",
            "voteCount": 1,
            "commentCount": 4,
            "submitId": 75,
            "type": 21,
            "voteStatus": null
          },
          {
            "title": null,
            "userName": "(*¯︶¯*)微笑、淡然",
            "submitUpdateTime": "2017-01-26",
            "headImage": "http://wx.qlogo.cn/mmopen/DRC1udVVibvW6lHtaHXaPO5OpnUfXTwdgg2CYadWIbKia0JKe5GcAtZTbbk3jFMZag5Db0SkmWVUYbjaGeKgVOWpQm5HQ7kd5e/0",
            "content": "测试",
            "voteCount": 1,
            "commentCount": 3,
            "submitId": 76,
            "type": 21,
            "voteStatus": null
          },
          {
            "title": null,
            "userName": "圈外助手",
            "submitUpdateTime": "2017-01-26",
            "headImage": "http://wx.qlogo.cn/mmopen/DRC1udVVibvVx3HW1ha4UP24Grs1Pfwu2Rm7mYEOofNQKibosic8O0A1DMMkpAHH2cxagMO5moGgeMDTxk6cU4h7mYwtMzFJ5Xm/0",
            "content": "tewtwe",
            "voteCount": 1,
            "commentCount": 2,
            "submitId": 77,
            "type": 21,
            "voteStatus": null
          },
          {
            "title": null,
            "userName": "圈外助手",
            "submitUpdateTime": "2017-01-26",
            "headImage": "http://wx.qlogo.cn/mmopen/DRC1udVVibvVx3HW1ha4UP24Grs1Pfwu2Rm7mYEOofNQKibosic8O0A1DMMkpAHH2cxagMO5moGgeMDTxk6cU4h7mYwtMzFJ5Xm/0",
            "content": "est",
            "voteCount": 0,
            "commentCount": 2,
            "submitId": 78,
            "type": 21,
            "voteStatus": null
          },
          {
            "title": null,
            "userName": "张凯雯",
            "submitUpdateTime": "2017-02-19",
            "headImage": "http://wx.qlogo.cn/mmopen/JeB8LAjhPIcjw65snUszvxogCNX1yV90K3QEa68sIXjVLuvaapaUUJOXw9P8qYcWlu3CuSsTEjdPuIoHhFWnIypmX6W84XzX/0",
            "content": "表达更清晰",
            "voteCount": 0,
            "commentCount": 0,
            "submitId": 93,
            "type": 21,
            "voteStatus": null
          }
        ],
        "code": 200
      }
    )
  },Math.random()*1500);
});

router.get("/rise/practice/comment/*",(req,res)=>{
  setTimeout(()=>{
    res.status(200).json(
      {
        "msg": {"list":[
          {
            "id": 52,
            "content": "fff ",
            "upName": "薛定谔的猫",
            "upTime": "2017-01-23",
            "headPic": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM7wkhob9zgicD3IJxG1tLVSSe9qdzR1qUGXz6BwPv73sr67iaTEibcA1sNic3Roib4DgXCVG4IWe0zPAKJnlo5r4NibezssS6naic6dkM/0"
          },
          {
            "id": 51,
            "content": "测试评论",
            "upName": "薛定谔的猫",
            "upTime": "2017-01-23",
            "headPic": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM7wkhob9zgicD3IJxG1tLVSSe9qdzR1qUGXz6BwPv73sr67iaTEibcA1sNic3Roib4DgXCVG4IWe0zPAKJnlo5r4NibezssS6naic6dkM/0"
          },
          {
            "id": 38,
            "content": "test",
            "upName": "薛定谔的猫",
            "upTime": "2017-01-22",
            "headPic": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM7wkhob9zgicD3IJxG1tLVSSe9qdzR1qUGXz6BwPv73sr67iaTEibcA1sNic3Roib4DgXCVG4IWe0zPAKJnlo5r4NibezssS6naic6dkM/0"
          },
          {
            "id": 37,
            "content": "fewfwef",
            "upName": "薛定谔的猫",
            "upTime": "2017-01-22",
            "headPic": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM7wkhob9zgicD3IJxG1tLVSSe9qdzR1qUGXz6BwPv73sr67iaTEibcA1sNic3Roib4DgXCVG4IWe0zPAKJnlo5r4NibezssS6naic6dkM/0"
          },
          {
            "id": 36,
            "content": "comment",
            "upName": "薛定谔的猫",
            "upTime": "2017-01-22",
            "headPic": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM7wkhob9zgicD3IJxG1tLVSSe9qdzR1qUGXz6BwPv73sr67iaTEibcA1sNic3Roib4DgXCVG4IWe0zPAKJnlo5r4NibezssS6naic6dkM/0"
          }
        ],
        "end": true,
        },
        "code": 200
      }
    );
  },Math.random()*1500);
});


router.post("/rise/practice/comment/*",(req,res)=>{
  setTimeout(()=>{
    res.status(200).json(
      {"msg":{"id":null,"content":"ccccc","upName":"风之伤","upTime":"2017-03-01","headPic":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1488373052881&di=7a470b200f5f2f97d0d7fe5598c34cf9&imgtype=0&src=http%3A%2F%2Fci.xiaohongshu.com%2F5c3f7604-0ca9-4d7d-bcc3-8d8667399307%40r_640w_640h.jpg"},"code":200}
    );
  },Math.random()*1500);
});

router.post("/rise/practice/check/*",(req,res)=>{
  setTimeout(()=>{
    res.status(200).json(
      {"msg":"ok","code":200}
    );
  },Math.random()*1500);
});

router.get("/rise/practice/subject/*",(req,res)=>{
    setTimeout(()=>{
        res.status(200).json(
            {"msg":{
                "title": null,
                "userName": "nethunder",
                "submitUpdateTime": "2017-03-24",
                "headImage": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLA6Yg58o1S3RwgdnMAIt01fo39veibmsokIa7NuaZ1m8fmxAL9VUdjyHHib5iaLSf1ZnzhawhdPcicicTnfVnyFlUViaRXyjnNibuTNws/0",
                "content": "微博 [cp]今天难得和老爸下馆子聊天，他有些小抱怨。能立即进入移情倾听模式吗？能意识到情绪背后的诉求吗？能试着不去判断他的想法对错吗？回到聊天的目的是什么，是加强理解和沟通而非判断是非，即使是解释了也未必能改变想法。然而通常我们是害怕不解释不纠正，对方会继续错下去。先判断，再强加，这完全是和沟通的目的南辕北辙。[/cp]\n感觉对倾听的要素没有很清晰的分类，写的时候一直在想要按照逻辑去分，但有点难。现在思考，首先是明确和老爸吃饭聊天的目的是加强沟通增进感情，然后在意识到老爸这么说是在发泄情绪，接着开启移情倾听模式，然后时刻保持意识自己是否在判断老爸的对错，回到倾听和理解而非去解释和纠正。\n修改后的微博：\n今天难得和老爸吃饭聊天，快一年没见面真的要和老爸好好联络感情呢。老爸谈起一些家庭琐事的小抱怨，我又忍不住开始解释：其实也不是那样的。。。这是个很好的机会练习移情聆听呀。首先记得和老爸聊天的目的是增加沟通，尽量让老爸多说说他的想法；意识到小抱怨其实是在发泄情绪了，马上进去移情聆听的状态，控制自己不去判断和解释，耐心等老爸说完。嗯，下次应该能做得更好。",
                "voteCount": 0,
                "commentCount": 0,
                "submitId": 5,
                "type": 11,
                "voteStatus": 0,
                "priority": 0,
                "perfect": null,
                "problemId": null,
                "authorType": null,
                "isMine": null,
                "labelList": [],
                "picList": []

            },"code":200}
        );
    },Math.random()*1500);
});

router.get("/rise/practice/label/*",(req,res)=>{
    setTimeout(()=>{
        res.status(200).json(
            {"msg":[{
                "id":1,
                "problemId":1,
                "name":"标签1",
                "del":false,
            }],"code":200}
        );
    },Math.random()*1500);
});

router.post("/rise/practice/knowledge/learn/*", (req, res) => {
    setTimeout(() =>
        res.status(200).json({
            "code": 200,
            "msg": "ok"
        }), Math.random() * 1500)
});

router.get("/rise/practice/knowledge/start/*", (req, res) => {
    setTimeout(() =>
        res.status(200).json({
            "msg": [
                {
                    "id": 57,
                    "knowledge": "故事的三种作用",
                    "step": "",
                    "analysis": "只有故事，才能达到共情、建立人与人之间的链接、塑造深层次的认同感。\n\n故事是一种有别于逻辑和数据的思维模式，可以被广泛运用与职场管理、市场营销、市场社交的领域。\n",
                    "means": "在以说服为目的的情景中，有三种代表性的故事：\n\n第一种：故事化包装，主要起到吸引受众的作用\n\n第二种：类比类故事，主要起到帮助受众理解的作用\n\n第三种：典型事例类故事，主要起到使受众对概念的理解更具象的作用\n",
                    "keynote": "\n\n",
                    "pic": null,
                    "audio": null,
                    "appear": 0,
                    "example": {
                        "id": 679,
                        "question": "初中语文课本上有一篇古文《邹忌讽齐王纳谏》。齐国的相邹忌，身高八尺多，容貌光艳美丽。有一天邹忌上朝拜见齐威王，说：“城北的徐公，是齐国的美男子。我不相信自己会比徐公美丽。有一天早晨我穿戴好衣帽，照着镜子，问妻子：‘我与城北的徐公相比，谁更美丽呢？’我妻子说：‘您美极了，徐公怎么能比得上您呢！’。我又问小妾，妾说：‘徐公怎么能比得上您呢？’。第二天，有客人从外面来拜访，我问客人，客人说：“徐公不如您美丽啊。”又过了一天，徐公前来拜访，我仔细地端详他，觉得远远比不上人家。晚上，我躺在床上想这件事：我的妻子说我美，是偏爱我；我的小妾说我美，是惧怕我；客人说我美，是想要有求于我。如今的齐国，土地方圆千里，有一百二十座城池，宫中的姬妾和身边的近臣，没有不偏爱大王的；朝廷中的大臣，没有不惧怕大王的；国内的百姓，没有不对大王有所求的：由此看来，大王受蒙蔽一定很厉害了。”请问，邹忌对齐威王讲的这个故事，属于以说服为目的的情景下，三种代表性故事类型的哪一种？起到了什么作用？",
                        "type": 1,
                        "analysis": "明显属于类比类故事，将君王身边的姬妾、大臣、百姓和自己的妻子、小妾、朋友做类比，帮助齐王理解：你面对的不同的人，会因为各自的私心而蒙蔽你，需要有清醒的认识",
                        "pic": null,
                        "difficulty": 2,
                        "knowledgeId": 57,
                        "sceneId": 1,
                        "del": false,
                        "problemId": 13,
                        "sequence": 1,
                        "example": true,
                        "practiceUid": "T014A015B001Y01001",
                        "score": 0,
                        "choiceList": [
                            {
                                "id": 2057,
                                "questionId": 679,
                                "subject": "典型事例类故事，主要起到使受众对概念的理解更具象的作用",
                                "sequence": 1,
                                "isRight": false,
                                "selected": false
                            },
                            {
                                "id": 2058,
                                "questionId": 679,
                                "subject": "类比类故事，主要起到帮助受众理解的作用",
                                "sequence": 2,
                                "isRight": true,
                                "selected": false
                            },
                            {
                                "id": 2059,
                                "questionId": 679,
                                "subject": "故事化包装，主要起到吸引受众的作用",
                                "sequence": 3,
                                "isRight": false,
                                "selected": false
                            }
                        ],
                        "discussList": null,
                        "choice": null,
                        "knowledge": {
                            "id": 57,
                            "knowledge": "故事的三种作用",
                            "step": "",
                            "analysis": "只有故事，才能达到共情、建立人与人之间的链接、塑造深层次的认同感。\n\n故事是一种有别于逻辑和数据的思维模式，可以被广泛运用与职场管理、市场营销、市场社交的领域。\n",
                            "means": "在以说服为目的的情景中，有三种代表性的故事：\n\n第一种：故事化包装，主要起到吸引受众的作用\n\n第二种：类比类故事，主要起到帮助受众理解的作用\n\n第三种：典型事例类故事，主要起到使受众对概念的理解更具象的作用\n",
                            "keynote": "\n\n",
                            "pic": null,
                            "audio": null,
                            "appear": null,
                            "example": null
                        }
                    }
                },
            ],
            "code": 200
        }), Math.random() * 1500)
});


module.exports = router;
