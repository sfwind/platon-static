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
			"code": 200,
			"msg":{
				"id": 1,
				"problem":"问题描述", //问题
				"pic":"http://www.iquanwai.com/images/cintro1.png", //问题头图
				"description":"问题详情", //html
        "length":5,
			}
		}), Math.random() * 1500)
});

router.post("/rise/problem/grade/*", (req, res) => {
    setTimeout(() =>
        res.status(200).json({
            "code": 200,
            "msg":"ok"
        }), Math.random() * 1500)
});

module.exports = router;
