var Router = require("express").Router;

var router = new Router();

router.get("/rise/problem/load", (req, res) => {
	setTimeout(() =>
		res.status(200).json(
      {
        "msg": {
          "name": "风之伤",
          "catalogList": [{'pic':'http://www.iquanwai.com/images/fragment/problem1.png','name':'测试标题类目','problemList':[
            {
              "id": 1,
              "problem": "与人沟通时条理更清晰",
              "pic": "http://www.iquanwai.com/images/fragment/problem1.png",
              "length": 9,
              "warmupCount": 18,
              "applicationCount": 9,
              "challengeCount": 1,
              "description": "当你觉得表达不清楚的时候，往往就是因为你没想清楚。在本训练中达不清楚的时候，往往就是因为你没想清楚。在本训练中达不清楚的时候，往往就是因为你没想清楚。在本训练中达不清楚的时候，往往就是因为你没想清楚。在本训练中达不清楚的时候，往往就是因为你没想清楚。在本训练中达不清楚的时候，往往就是因为你没想清楚。在本训练中达不清楚的时候，往往就是因为你没想清楚。在本训练中达不清楚的时候，往往就是因为你没想清楚。在本训练中，你能了解到<br/>1）如何将杂乱信息归类<br/>2）以一定的逻辑进行表达<br/>3）让信息/观点不重叠不遗漏<br/>做到这三点，你的沟通就能更有条理。<br/><br/>对应这三点，你未来将要学习的知识点如下：<br/>1）杂乱信息归类——分层归类<br/>2）逻辑表达——时间顺序、空间顺序、程度顺序、逻辑顺序<br/>3）信息/观点不重叠不遗漏——MECE原则<br/><br/>这些知识点都会以选择题和应用题的方式，来帮助你更好地掌握。"
            },
            {
              "id": 2,
              "problem": "跟老板/家人提要求时更有说服力",
              "pic": "http://www.iquanwai.com/images/fragment/problem2.png",
              "length": 5,
              "warmupCount": 10,
              "applicationCount": 5,
              "challengeCount": 1,
              "description": "以情动人和以理服人是说服别人的两种方式，通过本训练，你将掌握<br/>1）提出明确的诉求<br/>2）讲好故事<br/>3）有效使用证据<br/>结合运用理性和感性，能更好说服他人。<br/><br/>对应这三个目标，你未来将要学习的知识点如下：<br/>1）明确提出诉求——概括主题<br/>2）讲好故事——SCQA<br/>3）有效使用证据——证据的效力<br/><br/>这些知识点都会以选择题和应用题的方式，来帮助你更好地掌握。"
            },
            {
              "id": 3,
              "problem": "面对前所未有的新问题时撬开脑洞",
              "pic": "http://www.iquanwai.com/images/fragment/problem3_1.png",
              "length": 6,
              "warmupCount": 12,
              "applicationCount": 6,
              "challengeCount": 1,
              "description": "创造性思维不会凭空产生，但创造力是可以训练的！有多种方法可以帮你打开思路，打破思维定势。<br/><br/>在接下去的训练中，你将学习以下四个知识点：<br/>1）5W1H<br/>2）逆向提问<br/>3）类比提问<br/>4）SCAMPER<br/><br/>这些知识点都会以选择题和应用题的方式，来帮助你更好地掌握。"
            },
            {
              "id": 4,
              "problem": "临场发言也能掷地有声",
              "pic": "http://www.iquanwai.com/images/fragment/problem4_1.png",
              "length": 9,
              "warmupCount": 18,
              "applicationCount": 9,
              "challengeCount": 1,
              "description": "在没有充足准备时间就要发言的情况下，如果能做到以下两点：<br/>1）快速提出鲜明的主题<br/>2）以有层次、有逻辑的方式组织语言<br/>将会令你的表达有观点有条理且令人印象深刻。<br/><br/>对应以上目标，你未来将要学习的知识点如下：<br/>1）快速提出鲜明的主题——概括主题<br/>2）有层次的表达——分层归类<br/>3）有逻辑地组织语言——时间顺序、空间顺序、程度顺序、逻辑顺序<br/><br/>这些知识点都会以选择题和应用题的方式，来帮助你更好地掌握。"
            },
            {
              "id": 5,
              "problem": "与人撕逼时找到对方漏洞",
              "pic": "http://www.iquanwai.com/images/fragment/problem5_1.png",
              "length": 8,
              "warmupCount": 16,
              "applicationCount": 8,
              "challengeCount": 1,
              "description": "辩论被碾压，遭受窝囊气？分清事实与观点、识破各种谬误，不再有口难辩、找到反驳的突破口，一举击破对方的套路。<br/><br/>在接下去的训练中，你将学习的知识点如下：<br/>1）事实与观点<br/>2）错误诉诸<br/>3）证据的效力<br/>4）滑坡谬误<br/>5）人身攻击谬误<br/><br/>这些知识点都会以选择题和应用题的方式，来帮助你更好地掌握。"
            }
          ]},{'pic':'http://www.iquanwai.com/images/fragment/problem2.png','name':'测试标题类目','problemList':[
            {
              "id": 1,
              "problem": "与人沟通时条理更清晰",
              "pic": "http://www.iquanwai.com/images/fragment/problem1.png",
              "length": 9,
              "warmupCount": 18,
              "applicationCount": 9,
              "challengeCount": 1,
              "description": "当你觉得表达不清楚的时候，往往就是因为你没想清楚。在本训练中，你能了解到<br/>1）如何将杂乱信息归类<br/>2）以一定的逻辑进行表达<br/>3）让信息/观点不重叠不遗漏<br/>做到这三点，你的沟通就能更有条理。<br/><br/>对应这三点，你未来将要学习的知识点如下：<br/>1）杂乱信息归类——分层归类<br/>2）逻辑表达——时间顺序、空间顺序、程度顺序、逻辑顺序<br/>3）信息/观点不重叠不遗漏——MECE原则<br/><br/>这些知识点都会以选择题和应用题的方式，来帮助你更好地掌握。"
            },
            {
              "id": 2,
              "problem": "跟老板/家人提要求时更有说服力",
              "pic": "http://www.iquanwai.com/images/fragment/problem2.png",
              "length": 5,
              "warmupCount": 10,
              "applicationCount": 5,
              "challengeCount": 1,
              "description": "以情动人和以理服人是说服别人的两种方式，通过本训练，你将掌握<br/>1）提出明确的诉求<br/>2）讲好故事<br/>3）有效使用证据<br/>结合运用理性和感性，能更好说服他人。<br/><br/>对应这三个目标，你未来将要学习的知识点如下：<br/>1）明确提出诉求——概括主题<br/>2）讲好故事——SCQA<br/>3）有效使用证据——证据的效力<br/><br/>这些知识点都会以选择题和应用题的方式，来帮助你更好地掌握。"
            },
            {
              "id": 3,
              "problem": "面对前所未有的新问题时撬开脑洞",
              "pic": "http://www.iquanwai.com/images/fragment/problem3_1.png",
              "length": 6,
              "warmupCount": 12,
              "applicationCount": 6,
              "challengeCount": 1,
              "description": "创造性思维不会凭空产生，但创造力是可以训练的！有多种方法可以帮你打开思路，打破思维定势。<br/><br/>在接下去的训练中，你将学习以下四个知识点：<br/>1）5W1H<br/>2）逆向提问<br/>3）类比提问<br/>4）SCAMPER<br/><br/>这些知识点都会以选择题和应用题的方式，来帮助你更好地掌握。"
            },
            {
              "id": 4,
              "problem": "临场发言也能掷地有声",
              "pic": "http://www.iquanwai.com/images/fragment/problem4_1.png",
              "length": 9,
              "warmupCount": 18,
              "applicationCount": 9,
              "challengeCount": 1,
              "description": "在没有充足准备时间就要发言的情况下，如果能做到以下两点：<br/>1）快速提出鲜明的主题<br/>2）以有层次、有逻辑的方式组织语言<br/>将会令你的表达有观点有条理且令人印象深刻。<br/><br/>对应以上目标，你未来将要学习的知识点如下：<br/>1）快速提出鲜明的主题——概括主题<br/>2）有层次的表达——分层归类<br/>3）有逻辑地组织语言——时间顺序、空间顺序、程度顺序、逻辑顺序<br/><br/>这些知识点都会以选择题和应用题的方式，来帮助你更好地掌握。"
            },
            {
              "id": 5,
              "problem": "与人撕逼时找到对方漏洞",
              "pic": "http://www.iquanwai.com/images/fragment/problem5_1.png",
              "length": 8,
              "warmupCount": 16,
              "applicationCount": 8,
              "challengeCount": 1,
              "description": "辩论被碾压，遭受窝囊气？分清事实与观点、识破各种谬误，不再有口难辩、找到反驳的突破口，一举击破对方的套路。<br/><br/>在接下去的训练中，你将学习的知识点如下：<br/>1）事实与观点<br/>2）错误诉诸<br/>3）证据的效力<br/>4）滑坡谬误<br/>5）人身攻击谬误<br/><br/>这些知识点都会以选择题和应用题的方式，来帮助你更好地掌握。"
            }
          ]},{'pic':'http://www.iquanwai.com/images/fragment/problem3_1.png','name':'测试标题类目','problemList':[
            {
              "id": 1,
              "problem": "与人沟通时条理更清晰",
              "pic": "http://www.iquanwai.com/images/fragment/problem1.png",
              "length": 9,
              "warmupCount": 18,
              "applicationCount": 9,
              "challengeCount": 1,
              "description": "当你觉得表达不清楚的时候，往往就是因为你没想清楚。在本训练中，你能了解到<br/>1）如何将杂乱信息归类<br/>2）以一定的逻辑进行表达<br/>3）让信息/观点不重叠不遗漏<br/>做到这三点，你的沟通就能更有条理。<br/><br/>对应这三点，你未来将要学习的知识点如下：<br/>1）杂乱信息归类——分层归类<br/>2）逻辑表达——时间顺序、空间顺序、程度顺序、逻辑顺序<br/>3）信息/观点不重叠不遗漏——MECE原则<br/><br/>这些知识点都会以选择题和应用题的方式，来帮助你更好地掌握。"
            },
            {
              "id": 2,
              "problem": "跟老板/家人提要求时更有说服力",
              "pic": "http://www.iquanwai.com/images/fragment/problem2.png",
              "length": 5,
              "warmupCount": 10,
              "applicationCount": 5,
              "challengeCount": 1,
              "description": "以情动人和以理服人是说服别人的两种方式，通过本训练，你将掌握<br/>1）提出明确的诉求<br/>2）讲好故事<br/>3）有效使用证据<br/>结合运用理性和感性，能更好说服他人。<br/><br/>对应这三个目标，你未来将要学习的知识点如下：<br/>1）明确提出诉求——概括主题<br/>2）讲好故事——SCQA<br/>3）有效使用证据——证据的效力<br/><br/>这些知识点都会以选择题和应用题的方式，来帮助你更好地掌握。"
            },
            {
              "id": 3,
              "problem": "面对前所未有的新问题时撬开脑洞",
              "pic": "http://www.iquanwai.com/images/fragment/problem3_1.png",
              "length": 6,
              "warmupCount": 12,
              "applicationCount": 6,
              "challengeCount": 1,
              "description": "创造性思维不会凭空产生，但创造力是可以训练的！有多种方法可以帮你打开思路，打破思维定势。<br/><br/>在接下去的训练中，你将学习以下四个知识点：<br/>1）5W1H<br/>2）逆向提问<br/>3）类比提问<br/>4）SCAMPER<br/><br/>这些知识点都会以选择题和应用题的方式，来帮助你更好地掌握。"
            },
            {
              "id": 4,
              "problem": "临场发言也能掷地有声",
              "pic": "http://www.iquanwai.com/images/fragment/problem4_1.png",
              "length": 9,
              "warmupCount": 18,
              "applicationCount": 9,
              "challengeCount": 1,
              "description": "在没有充足准备时间就要发言的情况下，如果能做到以下两点：<br/>1）快速提出鲜明的主题<br/>2）以有层次、有逻辑的方式组织语言<br/>将会令你的表达有观点有条理且令人印象深刻。<br/><br/>对应以上目标，你未来将要学习的知识点如下：<br/>1）快速提出鲜明的主题——概括主题<br/>2）有层次的表达——分层归类<br/>3）有逻辑地组织语言——时间顺序、空间顺序、程度顺序、逻辑顺序<br/><br/>这些知识点都会以选择题和应用题的方式，来帮助你更好地掌握。"
            },
            {
              "id": 5,
              "problem": "与人撕逼时找到对方漏洞",
              "pic": "http://www.iquanwai.com/images/fragment/problem5_1.png",
              "length": 8,
              "warmupCount": 16,
              "applicationCount": 8,
              "challengeCount": 1,
              "description": "辩论被碾压，遭受窝囊气？分清事实与观点、识破各种谬误，不再有口难辩、找到反驳的突破口，一举击破对方的套路。<br/><br/>在接下去的训练中，你将学习的知识点如下：<br/>1）事实与观点<br/>2）错误诉诸<br/>3）证据的效力<br/>4）滑坡谬误<br/>5）人身攻击谬误<br/><br/>这些知识点都会以选择题和应用题的方式，来帮助你更好地掌握。"
            }
          ]},{'pic':'http://www.iquanwai.com/images/fragment/problem1.png','name':'测试标题类目','problemList':[
            {
              "id": 1,
              "problem": "与人沟通时条理更清晰",
              "pic": "http://www.iquanwai.com/images/fragment/problem1.png",
              "length": 9,
              "warmupCount": 18,
              "applicationCount": 9,
              "challengeCount": 1,
              "description": "当你觉得表达不清楚的时候，往往就是因为你没想清楚。在本训练中，你能了解到<br/>1）如何将杂乱信息归类<br/>2）以一定的逻辑进行表达<br/>3）让信息/观点不重叠不遗漏<br/>做到这三点，你的沟通就能更有条理。<br/><br/>对应这三点，你未来将要学习的知识点如下：<br/>1）杂乱信息归类——分层归类<br/>2）逻辑表达——时间顺序、空间顺序、程度顺序、逻辑顺序<br/>3）信息/观点不重叠不遗漏——MECE原则<br/><br/>这些知识点都会以选择题和应用题的方式，来帮助你更好地掌握。"
            },
            {
              "id": 2,
              "problem": "跟老板/家人提要求时更有说服力",
              "pic": "http://www.iquanwai.com/images/fragment/problem2.png",
              "length": 5,
              "warmupCount": 10,
              "applicationCount": 5,
              "challengeCount": 1,
              "description": "以情动人和以理服人是说服别人的两种方式，通过本训练，你将掌握<br/>1）提出明确的诉求<br/>2）讲好故事<br/>3）有效使用证据<br/>结合运用理性和感性，能更好说服他人。<br/><br/>对应这三个目标，你未来将要学习的知识点如下：<br/>1）明确提出诉求——概括主题<br/>2）讲好故事——SCQA<br/>3）有效使用证据——证据的效力<br/><br/>这些知识点都会以选择题和应用题的方式，来帮助你更好地掌握。"
            },
            {
              "id": 3,
              "problem": "面对前所未有的新问题时撬开脑洞",
              "pic": "http://www.iquanwai.com/images/fragment/problem3_1.png",
              "length": 6,
              "warmupCount": 12,
              "applicationCount": 6,
              "challengeCount": 1,
              "description": "创造性思维不会凭空产生，但创造力是可以训练的！有多种方法可以帮你打开思路，打破思维定势。<br/><br/>在接下去的训练中，你将学习以下四个知识点：<br/>1）5W1H<br/>2）逆向提问<br/>3）类比提问<br/>4）SCAMPER<br/><br/>这些知识点都会以选择题和应用题的方式，来帮助你更好地掌握。"
            },
            {
              "id": 4,
              "problem": "临场发言也能掷地有声",
              "pic": "http://www.iquanwai.com/images/fragment/problem4_1.png",
              "length": 9,
              "warmupCount": 18,
              "applicationCount": 9,
              "challengeCount": 1,
              "description": "在没有充足准备时间就要发言的情况下，如果能做到以下两点：<br/>1）快速提出鲜明的主题<br/>2）以有层次、有逻辑的方式组织语言<br/>将会令你的表达有观点有条理且令人印象深刻。<br/><br/>对应以上目标，你未来将要学习的知识点如下：<br/>1）快速提出鲜明的主题——概括主题<br/>2）有层次的表达——分层归类<br/>3）有逻辑地组织语言——时间顺序、空间顺序、程度顺序、逻辑顺序<br/><br/>这些知识点都会以选择题和应用题的方式，来帮助你更好地掌握。"
            },
            {
              "id": 5,
              "problem": "与人撕逼时找到对方漏洞",
              "pic": "http://www.iquanwai.com/images/fragment/problem5_1.png",
              "length": 8,
              "warmupCount": 16,
              "applicationCount": 8,
              "challengeCount": 1,
              "description": "辩论被碾压，遭受窝囊气？分清事实与观点、识破各种谬误，不再有口难辩、找到反驳的突破口，一举击破对方的套路。<br/><br/>在接下去的训练中，你将学习的知识点如下：<br/>1）事实与观点<br/>2）错误诉诸<br/>3）证据的效力<br/>4）滑坡谬误<br/>5）人身攻击谬误<br/><br/>这些知识点都会以选择题和应用题的方式，来帮助你更好地掌握。"
            }
          ]}]
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
			"code": 200,
			"msg":{
				"id": 1,
				"problem":"问题描述", //问题
				"pic":"http://www.iquanwai.com/images/cintro1.png", //问题头图
				"description":"问题详情" //html
			}
		}), Math.random() * 1500)
});

module.exports = router;
