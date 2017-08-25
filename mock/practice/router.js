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
    res.status(200).json(
      {
        "msg": {
          "practice": [
            {
              "id": 177,
              "question": "Airbnb是“住”的共享经济，旅行者可以住在房东家里，体验“一晚当地人的生活”。如今，其估值已达到300亿美元。但最初，它只是由两个付不起房租的年轻人创办，也不被投资人看好，他们质问：谁愿意让陌生人住进自己的家里呢？Airbnb上的房东将自己家的空置房间出租体现了SCAMPER中的哪种思维？",
              "type": 1,
              "analysis": "Put to other uses 家里的空房间除了空置还可以用作他用吗？Airbnb给出了另一个答案：将房子租给陌生人另外，Substitute 以当地居民家里代替酒店，为旅行者提供了其他选择，这是Airbnb公司的视角，而非“Airbnb房东”的视角",
              "pic": null,
              "difficulty": 2,
              "knowledgeId": 15,
              "sceneId": 1,
              "del": false,
              "problemId": 3,
              "sequence": 1,
              "example": false,
              "practiceUid": "TT003C002C002X01001",
              "score": 30,
              "choiceList": [
                {
                  "id": 525,
                  "questionId": 177,
                  "subject": "Substitute替代",
                  "sequence": 1,
                  "isRight": false,
                  "selected": true
                },
                {
                  "id": 526,
                  "questionId": 177,
                  "subject": "Combine合并",
                  "sequence": 2,
                  "isRight": false,
                  "selected": false
                },
                {
                  "id": 527,
                  "questionId": 177,
                  "subject": "Adapt适应",
                  "sequence": 3,
                  "isRight": false,
                  "selected": false
                },
                {
                  "id": 529,
                  "questionId": 177,
                  "subject": "Put to other uses改作他用",
                  "sequence": 4,
                  "isRight": true,
                  "selected": true
                }
              ],
              "discussList": [
                {
                  "id": 2870,
                  "comment": "111",
                  "priority": 0,
                  "del": 0,
                  "name": "三十文",
                  "avatar": "https://wx.qlogo.cn/mmopen/ibLButGMnqJM3VKwgXu3qeibBJWv8CNw4kNNia0EfnibB87iaWokNAG4p6sZuljsnNpxWg7RqkFibFxw6KKSibtSKQib0KK4ypmU5nrH/0",
                  "discussTime": "2017-06-06",
                  "role": 9,
                  "signature": null,
                  "isMine": false,
                  "warmupPracticeId": 177,
                  "originDiscussId": 2870,
                  "addTime": 1496678400000,
                  "priorityComment": 1,
                  "warmupPracticeDiscussList": [
                    {
                      "id": 2871,
                      "repliedId": 2870,
                      "comment": "111",
                      "openid": null,
                      "profileId": null,
                      "addTime": 1496678400000,
                      "priority": 1,
                      "repliedOpenid": null,
                      "repliedProfileId": null,
                      "repliedComment": "111",
                      "del": 0,
                      "repliedDel": 0,
                      "repliedName": "三十文",
                      "name": "三十文",
                      "avatar": "https://wx.qlogo.cn/mmopen/ibLButGMnqJM3VKwgXu3qeibBJWv8CNw4kNNia0EfnibB87iaWokNAG4p6sZuljsnNpxWg7RqkFibFxw6KKSibtSKQib0KK4ypmU5nrH/0",
                      "discussTime": "2017-06-06",
                      "role": 9,
                      "signature": null,
                      "isMine": false,
                      "referenceId": null,
                      "warmupPracticeId": 177,
                      "originDiscussId": 2870
                    },
                    {
                      "id": 2872,
                      "repliedId": 2871,
                      "comment": "111",
                      "openid": null,
                      "profileId": null,
                      "addTime": 1496678400000,
                      "priority": 0,
                      "repliedOpenid": null,
                      "repliedProfileId": null,
                      "repliedComment": "111",
                      "del": 0,
                      "repliedDel": 0,
                      "repliedName": "三十文",
                      "name": "三十文",
                      "avatar": "https://wx.qlogo.cn/mmopen/ibLButGMnqJM3VKwgXu3qeibBJWv8CNw4kNNia0EfnibB87iaWokNAG4p6sZuljsnNpxWg7RqkFibFxw6KKSibtSKQib0KK4ypmU5nrH/0",
                      "discussTime": "2017-06-06",
                      "role": 9,
                      "signature": null,
                      "isMine": false,
                      "referenceId": null,
                      "warmupPracticeId": 177,
                      "originDiscussId": 2870
                    }
                  ]
                },
                {
                  "id": 2869,
                  "comment": "测试测试",
                  "priority": 0,
                  "del": 0,
                  "name": "三十文",
                  "avatar": "https://wx.qlogo.cn/mmopen/ibLButGMnqJM3VKwgXu3qeibBJWv8CNw4kNNia0EfnibB87iaWokNAG4p6sZuljsnNpxWg7RqkFibFxw6KKSibtSKQib0KK4ypmU5nrH/0",
                  "discussTime": "2017-06-06",
                  "role": 9,
                  "signature": null,
                  "isMine": false,
                  "warmupPracticeId": 177,
                  "originDiscussId": 2869,
                  "addTime": 1496678400000,
                  "priorityComment": 0,
                  "warmupPracticeDiscussList": []
                }
              ],
              "choice": null,
              "knowledge": {
                "id": 15,
                "knowledge": "用SCAMPER结构化头脑风暴",
                "step": "结构化思考",
                "analysis": "SCAMPER（由七个英文单词或短语的首字母构成）是一种用于头脑风暴的问题清单，它为普通的头脑风暴提供了更为结构化的指导。通常适用于改进某个产品或服务的情景。",
                "means": "在改进产品或服务时，用以下七个问题一一发问，拓展思路：\nSubstitute（代替）：成分、材料、人员是否有可替代方案，乃至对旧产品、旧服务可以进行替代吗？\nCombine（合并）：资源、品类、功能等是否存在合并的可能？\nAdapt（适应）：产品或服务能适应哪些其他场景？\nModify（修改）：产品的颜色、形状等特征可以作何修改？\nPut to other uses（作为他用）：产品或服务还有哪些新用途吗？\nEliminate（简化）：产品或服务可以做哪些简化？\nReverse（rearrange）（反向、重新安排）：产品或服务可以怎样逆向操作、重新安排？\n",
                "keynote": "SCAMPER问题清单可以使你打开思路、拓展想法，但并非每个问题的答案都适合需要\n",
                "analysisPic": null,
                "meansPic": null,
                "keynotePic": null,
                "pic": null,
                "analysisAudio": null,
                "meansAudio": null,
                "keynoteAudio": null,
                "audio": "https://www.iqycamp.com/audio/rise_k15.m4a",
                "appear": null,
                "example": null
              }
            },
            {
              "id": 178,
              "question": "“直播＋电商”的新型网络购物模式越来越火热。博主在直播平台上售卖商品，并可以实时展示试用、互动答疑。这种模式运用了SCAMPER中的以下哪些思维？",
              "type": 2,
              "analysis": "Combine 将直播和电商相结合Adapt 除了传统的静态形式，网络购物同样可以适应于动态直播场景",
              "pic": null,
              "difficulty": 2,
              "knowledgeId": 15,
              "sceneId": 1,
              "del": false,
              "problemId": 3,
              "sequence": 2,
              "example": false,
              "practiceUid": "TT003C002C002X01002",
              "score": 30,
              "choiceList": [
                {
                  "id": 532,
                  "questionId": 178,
                  "subject": "Substitute替代",
                  "sequence": 1,
                  "isRight": false,
                  "selected": false
                },
                {
                  "id": 533,
                  "questionId": 178,
                  "subject": "Combine合并",
                  "sequence": 2,
                  "isRight": true,
                  "selected": false
                },
                {
                  "id": 534,
                  "questionId": 178,
                  "subject": "Adapt适应",
                  "sequence": 3,
                  "isRight": true,
                  "selected": true
                },
                {
                  "id": 535,
                  "questionId": 178,
                  "subject": "Modify改变",
                  "sequence": 4,
                  "isRight": false,
                  "selected": false
                }
              ],
              "discussList": [],
              "choice": null,
              "knowledge": {
                "id": 15,
                "knowledge": "用SCAMPER结构化头脑风暴",
                "step": "结构化思考",
                "analysis": "SCAMPER（由七个英文单词或短语的首字母构成）是一种用于头脑风暴的问题清单，它为普通的头脑风暴提供了更为结构化的指导。通常适用于改进某个产品或服务的情景。",
                "means": "在改进产品或服务时，用以下七个问题一一发问，拓展思路：\nSubstitute（代替）：成分、材料、人员是否有可替代方案，乃至对旧产品、旧服务可以进行替代吗？\nCombine（合并）：资源、品类、功能等是否存在合并的可能？\nAdapt（适应）：产品或服务能适应哪些其他场景？\nModify（修改）：产品的颜色、形状等特征可以作何修改？\nPut to other uses（作为他用）：产品或服务还有哪些新用途吗？\nEliminate（简化）：产品或服务可以做哪些简化？\nReverse（rearrange）（反向、重新安排）：产品或服务可以怎样逆向操作、重新安排？\n",
                "keynote": "SCAMPER问题清单可以使你打开思路、拓展想法，但并非每个问题的答案都适合需要\n",
                "analysisPic": null,
                "meansPic": null,
                "keynotePic": null,
                "pic": null,
                "analysisAudio": null,
                "meansAudio": null,
                "keynoteAudio": null,
                "audio": "https://www.iqycamp.com/audio/rise_k15.m4a",
                "appear": null,
                "example": null
              }
            },
            {
              "id": 179,
              "question": "万达商业地产在全国首创了招商和地产开发相结合的“资源包”模式。招商在前，建设在后。上述模式利用了SCAMPER中的哪些思维？",
              "type": 2,
              "analysis": "Combine“资源包”将招商和地产开发相结合Reverse颠覆传统模式，将建设和招商顺序调换",
              "pic": null,
              "difficulty": 2,
              "knowledgeId": 15,
              "sceneId": 1,
              "del": false,
              "problemId": 3,
              "sequence": 3,
              "example": false,
              "practiceUid": "TT003C002C004X01003",
              "score": 30,
              "choiceList": [
                {
                  "id": 539,
                  "questionId": 179,
                  "subject": "Substitute替代",
                  "sequence": 1,
                  "isRight": false,
                  "selected": true
                },
                {
                  "id": 540,
                  "questionId": 179,
                  "subject": "Combine合并",
                  "sequence": 2,
                  "isRight": true,
                  "selected": false
                },
                {
                  "id": 544,
                  "questionId": 179,
                  "subject": "Eliminate消除",
                  "sequence": 3,
                  "isRight": false,
                  "selected": false
                },
                {
                  "id": 545,
                  "questionId": 179,
                  "subject": "Reverse反向",
                  "sequence": 4,
                  "isRight": true,
                  "selected": false
                }
              ],
              "discussList": [],
              "choice": null,
              "knowledge": {
                "id": 15,
                "knowledge": "用SCAMPER结构化头脑风暴",
                "step": "结构化思考",
                "analysis": "SCAMPER（由七个英文单词或短语的首字母构成）是一种用于头脑风暴的问题清单，它为普通的头脑风暴提供了更为结构化的指导。通常适用于改进某个产品或服务的情景。",
                "means": "在改进产品或服务时，用以下七个问题一一发问，拓展思路：\nSubstitute（代替）：成分、材料、人员是否有可替代方案，乃至对旧产品、旧服务可以进行替代吗？\nCombine（合并）：资源、品类、功能等是否存在合并的可能？\nAdapt（适应）：产品或服务能适应哪些其他场景？\nModify（修改）：产品的颜色、形状等特征可以作何修改？\nPut to other uses（作为他用）：产品或服务还有哪些新用途吗？\nEliminate（简化）：产品或服务可以做哪些简化？\nReverse（rearrange）（反向、重新安排）：产品或服务可以怎样逆向操作、重新安排？\n",
                "keynote": "SCAMPER问题清单可以使你打开思路、拓展想法，但并非每个问题的答案都适合需要\n",
                "analysisPic": null,
                "meansPic": null,
                "keynotePic": null,
                "pic": null,
                "analysisAudio": null,
                "meansAudio": null,
                "keynoteAudio": null,
                "audio": "https://www.iqycamp.com/audio/rise_k15.m4a",
                "appear": null,
                "example": null
              }
            },
            {
              "id": 180,
              "question": "巴菲特最推崇的十本书之一——《穷查理宝典》中有这样一段话：如果要明白人生如何得到幸福，查理首先是研究人生如何才能变得痛苦；要研究企业如何做强做大，查理首先研究企业是如何衰败的；大部分人更关心如何在股市投资上成功，查理最关心的是为什么在股市投资上大部分人都失败了。他的这种思考方法来源于下面这句农夫谚语中所蕴含的哲理：我只想知道将来我会死在什么地方，这样我就不去那儿了。这段话蕴含了SCAMPER中的哪种智慧？",
              "type": 1,
              "analysis": "Reverse想做成什么，不是直接看成功案例。先看失败的案例，从中吸取总结教训，然后避免",
              "pic": null,
              "difficulty": 1,
              "knowledgeId": 15,
              "sceneId": 1,
              "del": false,
              "problemId": 3,
              "sequence": 4,
              "example": false,
              "practiceUid": "TT003C002B004X01004",
              "score": 20,
              "choiceList": [
                {
                  "id": 546,
                  "questionId": 180,
                  "subject": "Substitute替代",
                  "sequence": 1,
                  "isRight": false,
                  "selected": false
                },
                {
                  "id": 547,
                  "questionId": 180,
                  "subject": "Adapt适应",
                  "sequence": 2,
                  "isRight": false,
                  "selected": true
                },
                {
                  "id": 548,
                  "questionId": 180,
                  "subject": "Reverse逆向",
                  "sequence": 3,
                  "isRight": true,
                  "selected": false
                }
              ],
              "discussList": [],
              "choice": null,
              "knowledge": {
                "id": 15,
                "knowledge": "用SCAMPER结构化头脑风暴",
                "step": "结构化思考",
                "analysis": "SCAMPER（由七个英文单词或短语的首字母构成）是一种用于头脑风暴的问题清单，它为普通的头脑风暴提供了更为结构化的指导。通常适用于改进某个产品或服务的情景。",
                "means": "在改进产品或服务时，用以下七个问题一一发问，拓展思路：\nSubstitute（代替）：成分、材料、人员是否有可替代方案，乃至对旧产品、旧服务可以进行替代吗？\nCombine（合并）：资源、品类、功能等是否存在合并的可能？\nAdapt（适应）：产品或服务能适应哪些其他场景？\nModify（修改）：产品的颜色、形状等特征可以作何修改？\nPut to other uses（作为他用）：产品或服务还有哪些新用途吗？\nEliminate（简化）：产品或服务可以做哪些简化？\nReverse（rearrange）（反向、重新安排）：产品或服务可以怎样逆向操作、重新安排？\n",
                "keynote": "SCAMPER问题清单可以使你打开思路、拓展想法，但并非每个问题的答案都适合需要\n",
                "analysisPic": null,
                "meansPic": null,
                "keynotePic": null,
                "pic": null,
                "analysisAudio": null,
                "meansAudio": null,
                "keynoteAudio": null,
                "audio": "https://www.iqycamp.com/audio/rise_k15.m4a",
                "appear": null,
                "example": null
              }
            },
            {
              "id": 181,
              "question": "冬日里，一杯暖暖的奶茶可以使人快速温暖。你有没有想过，奶茶这种饮品利用了SCAMPER中的哪一种思维呢？",
              "type": 1,
              "analysis": "Combine 将牛奶和茶相结合，香浓的奶茶就诞生了",
              "pic": null,
              "difficulty": 2,
              "knowledgeId": 15,
              "sceneId": 1,
              "del": false,
              "problemId": 3,
              "sequence": 5,
              "example": false,
              "practiceUid": "TT003C002A001X01005",
              "score": 30,
              "choiceList": [
                {
                  "id": 549,
                  "questionId": 181,
                  "subject": "Reverse逆向",
                  "sequence": 1,
                  "isRight": false,
                  "selected": true
                },
                {
                  "id": 550,
                  "questionId": 181,
                  "subject": "Combine合并",
                  "sequence": 2,
                  "isRight": true,
                  "selected": false
                },
                {
                  "id": 551,
                  "questionId": 181,
                  "subject": "Eliminate消除",
                  "sequence": 3,
                  "isRight": false,
                  "selected": false
                }
              ],
              "discussList": [],
              "choice": null,
              "knowledge": {
                "id": 15,
                "knowledge": "用SCAMPER结构化头脑风暴",
                "step": "结构化思考",
                "analysis": "SCAMPER（由七个英文单词或短语的首字母构成）是一种用于头脑风暴的问题清单，它为普通的头脑风暴提供了更为结构化的指导。通常适用于改进某个产品或服务的情景。",
                "means": "在改进产品或服务时，用以下七个问题一一发问，拓展思路：\nSubstitute（代替）：成分、材料、人员是否有可替代方案，乃至对旧产品、旧服务可以进行替代吗？\nCombine（合并）：资源、品类、功能等是否存在合并的可能？\nAdapt（适应）：产品或服务能适应哪些其他场景？\nModify（修改）：产品的颜色、形状等特征可以作何修改？\nPut to other uses（作为他用）：产品或服务还有哪些新用途吗？\nEliminate（简化）：产品或服务可以做哪些简化？\nReverse（rearrange）（反向、重新安排）：产品或服务可以怎样逆向操作、重新安排？\n",
                "keynote": "SCAMPER问题清单可以使你打开思路、拓展想法，但并非每个问题的答案都适合需要\n",
                "analysisPic": null,
                "meansPic": null,
                "keynotePic": null,
                "pic": null,
                "analysisAudio": null,
                "meansAudio": null,
                "keynoteAudio": null,
                "audio": "https://www.iqycamp.com/audio/rise_k15.m4a",
                "appear": null,
                "example": null
              }
            },
            {
              "id": 183,
              "question": "平时我们使用圆轴形胶带中总是为找不到头而浪费不少时间，一家公司设计了齿轮轴形的胶带，使用后只要把胶带架在两齿之间，就能很方便找到头。齿轮轴形的胶带体现了SCAMPER中的哪种思维？",
              "type": 1,
              "analysis": "Modify 改变产品形状",
              "pic": null,
              "difficulty": 2,
              "knowledgeId": 15,
              "sceneId": 1,
              "del": false,
              "problemId": 3,
              "sequence": 6,
              "example": false,
              "practiceUid": "TT003C002F006X01006",
              "score": 30,
              "choiceList": [
                {
                  "id": 559,
                  "questionId": 183,
                  "subject": "Substitute替代",
                  "sequence": 1,
                  "isRight": false,
                  "selected": true
                },
                {
                  "id": 560,
                  "questionId": 183,
                  "subject": "Combine合并",
                  "sequence": 2,
                  "isRight": false,
                  "selected": false
                },
                {
                  "id": 561,
                  "questionId": 183,
                  "subject": "Adapt适应",
                  "sequence": 3,
                  "isRight": false,
                  "selected": false
                },
                {
                  "id": 562,
                  "questionId": 183,
                  "subject": "Modify修改",
                  "sequence": 4,
                  "isRight": true,
                  "selected": false
                }
              ],
              "discussList": [],
              "choice": null,
              "knowledge": {
                "id": 15,
                "knowledge": "用SCAMPER结构化头脑风暴",
                "step": "结构化思考",
                "analysis": "SCAMPER（由七个英文单词或短语的首字母构成）是一种用于头脑风暴的问题清单，它为普通的头脑风暴提供了更为结构化的指导。通常适用于改进某个产品或服务的情景。",
                "means": "在改进产品或服务时，用以下七个问题一一发问，拓展思路：\nSubstitute（代替）：成分、材料、人员是否有可替代方案，乃至对旧产品、旧服务可以进行替代吗？\nCombine（合并）：资源、品类、功能等是否存在合并的可能？\nAdapt（适应）：产品或服务能适应哪些其他场景？\nModify（修改）：产品的颜色、形状等特征可以作何修改？\nPut to other uses（作为他用）：产品或服务还有哪些新用途吗？\nEliminate（简化）：产品或服务可以做哪些简化？\nReverse（rearrange）（反向、重新安排）：产品或服务可以怎样逆向操作、重新安排？\n",
                "keynote": "SCAMPER问题清单可以使你打开思路、拓展想法，但并非每个问题的答案都适合需要\n",
                "analysisPic": null,
                "meansPic": null,
                "keynotePic": null,
                "pic": null,
                "analysisAudio": null,
                "meansAudio": null,
                "keynoteAudio": null,
                "audio": "https://www.iqycamp.com/audio/rise_k15.m4a",
                "appear": null,
                "example": null
              }
            }
          ]
        },
        "code": 200
      }
    ), Math.random() * 1500)
});

router.post("/rise/practice/warmup/answer/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": {
        "rightNumber": 3, //正确题数
        "point": 2000, //积分
        "total": 3 //题目总数
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
    res.status(200).json(
      {
        "msg": {
          "id": 315,
          "topic": "盘点自己的能力",
          "description": "请按照圈圈的个体势能模型（详见下表），针对每项能力，进行1-5分打分。<br/>评分标准：1分代表完全不具备，5分代表非常拔尖，3分代表能够适当地运用该能力，2和4介于之间。<br/><br/>打分后，总结一下自己的优势能力（4-5分）和弱势能力（1-2分）。",
          "knowledgeId": 104,
          "sceneId": 1,
          "difficulty": 3,
          "problemId": 20,
          "sequence": 1,
          "del": false,
          "practiceUid": "TT020F006B004Y01001",
          "pic": "https://www.iqycamp.com/images/application315.png",
          "content": null,
          "submitId": null,
          "submitUpdateTime": null,
          "voteCount": 0,
          "commentCount": 0,
          "voteStatus": 0,
          "picList": null,
          "planId": 10628,
          "requestCommentCount": null,
          "request": null,
          "feedback": null,
          "draft": null,
          "draftId": null
        }, "code": 200
      }
    ), Math.random() * 1500)
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
        "content": "aaaa", //提交内容
        "submitId": 1, //提交id
        "submitUpdateTime": "2017-02-15", //最后提交时间
        "planId": 1, //计划id
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
      "msg": [
        {
          "id": 2870,
          "comment": "111",
          "priority": 0,
          "del": 0,
          "name": "三十文",
          "avatar": "https://wx.qlogo.cn/mmopen/ibLButGMnqJM3VKwgXu3qeibBJWv8CNw4kNNia0EfnibB87iaWokNAG4p6sZuljsnNpxWg7RqkFibFxw6KKSibtSKQib0KK4ypmU5nrH/0",
          "discussTime": "2017-06-06",
          "role": 9,
          "signature": null,
          "isMine": false,
          "warmupPracticeId": 177,
          "originDiscussId": 2870,
          "addTime": 1496678400000,
          "priorityComment": 1,
          "warmupPracticeDiscussList": [
            {
              "id": 2871,
              "repliedId": 2870,
              "comment": "111",
              "openid": "o5h6ywkpuvFd5Qd53TG1xJh8B1HU",
              "profileId": 30,
              "addTime": 1496678400000,
              "priority": 1,
              "repliedOpenid": "o5h6ywkpuvFd5Qd53TG1xJh8B1HU",
              "repliedProfileId": 30,
              "repliedComment": "111",
              "del": 0,
              "repliedDel": 0,
              "repliedName": "三十文",
              "name": "三十文",
              "avatar": "https://wx.qlogo.cn/mmopen/ibLButGMnqJM3VKwgXu3qeibBJWv8CNw4kNNia0EfnibB87iaWokNAG4p6sZuljsnNpxWg7RqkFibFxw6KKSibtSKQib0KK4ypmU5nrH/0",
              "discussTime": "2017-06-06",
              "role": 9,
              "signature": null,
              "isMine": false,
              "referenceId": null,
              "warmupPracticeId": 177,
              "originDiscussId": 2870
            },
            {
              "id": 2872,
              "repliedId": 2871,
              "comment": "111",
              "openid": "o5h6ywkpuvFd5Qd53TG1xJh8B1HU",
              "profileId": 30,
              "addTime": 1496678400000,
              "priority": 0,
              "repliedOpenid": "o5h6ywkpuvFd5Qd53TG1xJh8B1HU",
              "repliedProfileId": 30,
              "repliedComment": "111",
              "del": 0,
              "repliedDel": 0,
              "repliedName": "三十文",
              "name": "三十文",
              "avatar": "https://wx.qlogo.cn/mmopen/ibLButGMnqJM3VKwgXu3qeibBJWv8CNw4kNNia0EfnibB87iaWokNAG4p6sZuljsnNpxWg7RqkFibFxw6KKSibtSKQib0KK4ypmU5nrH/0",
              "discussTime": "2017-06-06",
              "role": 9,
              "signature": null,
              "isMine": false,
              "referenceId": null,
              "warmupPracticeId": 177,
              "originDiscussId": 2870
            }
          ]
        },
        {
          "id": 2869,
          "comment": "测试测试",
          "priority": 0,
          "del": 0,
          "name": "三十文",
          "avatar": "https://wx.qlogo.cn/mmopen/ibLButGMnqJM3VKwgXu3qeibBJWv8CNw4kNNia0EfnibB87iaWokNAG4p6sZuljsnNpxWg7RqkFibFxw6KKSibtSKQib0KK4ypmU5nrH/0",
          "discussTime": "2017-06-06",
          "role": 9,
          "signature": null,
          "isMine": false,
          "warmupPracticeId": 177,
          "originDiscussId": 2869,
          "addTime": 1496678400000,
          "priorityComment": 0,
          "warmupPracticeDiscussList": []
        }
      ],
      "code": 200
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

router.get('/rise/practice/warmup/new/analysis/*', (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "msg": {
        "id": 177,
        "question": "Airbnb是“住”的共享经济，旅行者可以住在房东家里，体验“一晚当地人的生活”。如今，其估值已达到300亿美元。但最初，它只是由两个付不起房租的年轻人创办，也不被投资人看好，他们质问：谁愿意让陌生人住进自己的家里呢？Airbnb上的房东将自己家的空置房间出租体现了SCAMPER中的哪种思维？",
        "type": 1,
        "analysis": "Put to other uses 家里的空房间除了空置还可以用作他用吗？Airbnb给出了另一个答案：将房子租给陌生人另外，Substitute 以当地居民家里代替酒店，为旅行者提供了其他选择，这是Airbnb公司的视角，而非“Airbnb房东”的视角",
        "pic": null,
        "difficulty": 2,
        "knowledgeId": 15,
        "sceneId": 1,
        "del": false,
        "problemId": 3,
        "sequence": 1,
        "example": false,
        "practiceUid": "TT003C002C002X01001",
        "score": 0,
        "choiceList": [
          {
            "id": 525,
            "questionId": 177,
            "subject": "Substitute替代",
            "sequence": 1,
            "isRight": false,
            "selected": false
          },
          {
            "id": 526,
            "questionId": 177,
            "subject": "Combine合并",
            "sequence": 2,
            "isRight": false,
            "selected": false
          },
          {
            "id": 527,
            "questionId": 177,
            "subject": "Adapt适应",
            "sequence": 3,
            "isRight": false,
            "selected": false
          },
          {
            "id": 529,
            "questionId": 177,
            "subject": "Put to other uses改作他用",
            "sequence": 4,
            "isRight": true,
            "selected": false
          }
        ],
        "discussList": [
          {
            "id": 2870,
            "comment": "111",
            "priority": 0,
            "del": 0,
            "name": "三十文",
            "avatar": "https://wx.qlogo.cn/mmopen/ibLButGMnqJM3VKwgXu3qeibBJWv8CNw4kNNia0EfnibB87iaWokNAG4p6sZuljsnNpxWg7RqkFibFxw6KKSibtSKQib0KK4ypmU5nrH/0",
            "discussTime": "2017-06-06",
            "role": 9,
            "signature": null,
            "isMine": false,
            "warmupPracticeId": 177,
            "originDiscussId": 2870,
            "addTime": 1496678400000,
            "priorityComment": 1,
            "warmupPracticeDiscussList": [
              {
                "id": 2871,
                "repliedId": 2870,
                "comment": "111",
                "openid": "o5h6ywkpuvFd5Qd53TG1xJh8B1HU",
                "profileId": 30,
                "addTime": 1496678400000,
                "priority": 1,
                "repliedOpenid": "o5h6ywkpuvFd5Qd53TG1xJh8B1HU",
                "repliedProfileId": 30,
                "repliedComment": "111",
                "del": 0,
                "repliedDel": 0,
                "repliedName": "三十文",
                "name": "三十文",
                "avatar": "https://wx.qlogo.cn/mmopen/ibLButGMnqJM3VKwgXu3qeibBJWv8CNw4kNNia0EfnibB87iaWokNAG4p6sZuljsnNpxWg7RqkFibFxw6KKSibtSKQib0KK4ypmU5nrH/0",
                "discussTime": "2017-06-06",
                "role": 9,
                "signature": null,
                "isMine": false,
                "referenceId": null,
                "warmupPracticeId": 177,
                "originDiscussId": 2870
              },
              {
                "id": 2872,
                "repliedId": 2871,
                "comment": "111",
                "openid": "o5h6ywkpuvFd5Qd53TG1xJh8B1HU",
                "profileId": 30,
                "addTime": 1496678400000,
                "priority": 0,
                "repliedOpenid": "o5h6ywkpuvFd5Qd53TG1xJh8B1HU",
                "repliedProfileId": 30,
                "repliedComment": "111",
                "del": 0,
                "repliedDel": 0,
                "repliedName": "三十文",
                "name": "三十文",
                "avatar": "https://wx.qlogo.cn/mmopen/ibLButGMnqJM3VKwgXu3qeibBJWv8CNw4kNNia0EfnibB87iaWokNAG4p6sZuljsnNpxWg7RqkFibFxw6KKSibtSKQib0KK4ypmU5nrH/0",
                "discussTime": "2017-06-06",
                "role": 9,
                "signature": null,
                "isMine": false,
                "referenceId": null,
                "warmupPracticeId": 177,
                "originDiscussId": 2870
              }
            ]
          },
          {
            "id": 2869,
            "comment": "测试测试",
            "priority": 0,
            "del": 0,
            "name": "三十文",
            "avatar": "https://wx.qlogo.cn/mmopen/ibLButGMnqJM3VKwgXu3qeibBJWv8CNw4kNNia0EfnibB87iaWokNAG4p6sZuljsnNpxWg7RqkFibFxw6KKSibtSKQib0KK4ypmU5nrH/0",
            "discussTime": "2017-06-06",
            "role": 9,
            "signature": null,
            "isMine": false,
            "warmupPracticeId": 177,
            "originDiscussId": 2869,
            "addTime": 1496678400000,
            "priorityComment": 0,
            "warmupPracticeDiscussList": []
          }
        ],
        "choice": null,
        "knowledge": {
          "id": 15,
          "knowledge": "用SCAMPER结构化头脑风暴",
          "step": "结构化思考",
          "analysis": "SCAMPER（由七个英文单词或短语的首字母构成）是一种用于头脑风暴的问题清单，它为普通的头脑风暴提供了更为结构化的指导。通常适用于改进某个产品或服务的情景。",
          "means": "在改进产品或服务时，用以下七个问题一一发问，拓展思路：\nSubstitute（代替）：成分、材料、人员是否有可替代方案，乃至对旧产品、旧服务可以进行替代吗？\nCombine（合并）：资源、品类、功能等是否存在合并的可能？\nAdapt（适应）：产品或服务能适应哪些其他场景？\nModify（修改）：产品的颜色、形状等特征可以作何修改？\nPut to other uses（作为他用）：产品或服务还有哪些新用途吗？\nEliminate（简化）：产品或服务可以做哪些简化？\nReverse（rearrange）（反向、重新安排）：产品或服务可以怎样逆向操作、重新安排？\n",
          "keynote": "SCAMPER问题清单可以使你打开思路、拓展想法，但并非每个问题的答案都适合需要\n",
          "analysisPic": null,
          "meansPic": null,
          "keynotePic": null,
          "pic": null,
          "analysisAudio": null,
          "meansAudio": null,
          "keynoteAudio": null,
          "audio": "https://www.iqycamp.com/audio/rise_k15.m4a",
          "appear": null,
          "example": null
        }
      },
      "code": 200
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

router.get("/rise/practice/comment/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": {
        "end": true,
        "list": [
          {
            "id": 1,
            "comment": "评论评论",
            "name": "风之伤",
            "discussTime": "2017-03-28",
            "avatar": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1488373052881&di=7a470b200f5f2f97d0d7fe5598c34cf9&imgtype=0&src=http%3A%2F%2Fci.xiaohongshu.com%2F5c3f7604-0ca9-4d7d-bcc3-8d8667399307%40r_640w_640h.jpg",
            "signature": "签名",
            "role": 3,
            "del": 0,
            "isMine": true,
            "repliedComment": "balbal",
            "repliedName": "三十文",
            "repliedDel": 0,
          },
        ]
      }
    }), Math.random() * 1500)
});

router.get("/rise/practice/application/list/other/*", (req, res) => {
  setTimeout(() => {
    res.status(200).json(
      {
        "msg": {
          "list": [
            {
              "title": null,
              "userName": "nethunder",
              "role": 3,
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
              "role": 5,
              "signature": "我的签名",
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
              "role": 6,
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
              "role": 7,
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
              "role": 8,
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
              "role": 4,
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
          ],
          "end": false
        },
        "code": 200
      }
    )
  }, Math.random() * 1500);
});

router.post("/rise/practice/comment/*", (req, res) => {
  setTimeout(() => {
    res.status(200).json(
      {
        "msg": {
          "id": null,
          "comment": "ccccc",
          "name": "风之伤",
          "discussTime": "2017-03-01",
          "avatar": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1488373052881&di=7a470b200f5f2f97d0d7fe5598c34cf9&imgtype=0&src=http%3A%2F%2Fci.xiaohongshu.com%2F5c3f7604-0ca9-4d7d-bcc3-8d8667399307%40r_640w_640h.jpg"
        }, "code": 200
      }
    );
  }, Math.random() * 1500);
});

router.get("/rise/practice/subject/list/*", (req, res) => {
  setTimeout(() => {
    res.status(200).json({
      "msg": {
        "list": [{
          "requestCommentCount": 1,
          "title": "团队成员的绩效表现为什么不佳？",
          "userName": "Chloé\uD83C\uDF38",
          "submitUpdateTime": "2017-04-18",
          "role": 6,
          "headImage": "http://wx.qlogo.cn/mmopen/Bqm3aw1TmGlHZDT30nZLHgYsBTxNN5eWWzX7ibBgulX8TVUhWMx9RQ2awkFbkGPt0kDfplxFmzVDErWpQvEr3yibmgGY8PIHeX/0",
          "content": "如图所示<img src=\"http://www.confucius.mobi/images/subject/subject-pefect5.jpeg\" width=\"90%\"/>",
          "voteCount": 0,
          "commentCount": 2,
          "submitId": 8,
          "type": 1,
          "voteStatus": 0,
          "publishTime": null,
          "priority": null,
          "perfect": true,
          "problemId": null,
          "authorType": 2,
          "isMine": true,
          "labelList": [{ "id": 20, "labelId": 21, "articleModule": 3, "articleId": 8, "del": false }],
          "picList": ["http://www.confucius.mobi/images/subject/subject-pefect5.jpeg"]
        }, {
          "title": "早上起不来的真正原因",
          "userName": "Chloé\uD83C\uDF38",
          "submitUpdateTime": "2017-04-18",
          "headImage": "http://wx.qlogo.cn/mmopen/Bqm3aw1TmGlHZDT30nZLHgYsBTxNN5eWWzX7ibBgulX8TVUhWMx9RQ2awkFbkGPt0kDfplxFmzVDErWpQvEr3yibmgGY8PIHeX/0",
          "content": "balbabl",
          "voteCount": 0,
          "commentCount": 0,
          "submitId": 47,
          "type": 1,
          "voteStatus": 0,
          "publishTime": null,
          "priority": null,
          "perfect": true,
          "problemId": null,
          "authorType": 1,
          "isMine": false,
          "labelList": [],
          "picList": []
        }, {
          "title": "拖延症是病，得治。可是，病根在哪里？",
          "userName": "Chloé\uD83C\uDF38",
          "submitUpdateTime": "2017-04-18",
          "headImage": "http://wx.qlogo.cn/mmopen/Bqm3aw1TmGlHZDT30nZLHgYsBTxNN5eWWzX7ibBgulX8TVUhWMx9RQ2awkFbkGPt0kDfplxFmzVDErWpQvEr3yibmgGY8PIHeX/0",
          "content": "我自己就有拖延症，曾经，我不知道我的拖延症从哪里来？也不知道怎么去对付它？用毅力、监督都无济于事。靠这些要成功，拖延症发病率就不会那么高了！\n\n我会积极主动地打开酷狗音乐，不知疲倦地看《奇葩说》，为什么做这些事不会拖延呢？万为什么专研一个，没有搞清楚的临床问题会孜孜不倦呢？\n\n对比这两类事情，我发现后面的这些事情，不会给人带来压迫感，也就是说，你不要担心承担失败的后果。而早起、学英语、写论文，要不短期看不到效果，要不被拒稿会很沮丧。\n\n所以拖延根本的原因是二个，一个是害怕失败，一个是缺乏短期回馈。\n\n澄清了拖延症的，根本原因之后，我自然就找到了解决拖延症的良方：1.告诉自己只有进步过程中的挫折，过程不是终点，有一口气就不会是失败；2.给自己设定一个根本不会失败的改进性行动计划，因为要求特别低，然后使用i+1原理来逐步提升难度，这样就不会有挫败感；3.达到一个小目标后得给自己一点小小的奖励，听一首自己喜欢的歌、思考一个疑难的医学问题，给自己及时的正反馈，制作一个克服拖延症进度条，坚持一天就给自己提升一格。\n\n拖延症这样必须被治愈。\n",
          "voteCount": 0,
          "commentCount": 0,
          "submitId": 16,
          "type": 1,
          "voteStatus": 0,
          "publishTime": null,
          "priority": null,
          "perfect": false,
          "problemId": null,
          "authorType": 1,
          "isMine": false,
          "labelList": [{ "id": 1, "labelId": 28, "articleModule": 3, "articleId": 16, "del": false }, {
            "id": 2,
            "labelId": 29,
            "articleModule": 3,
            "articleId": 16,
            "del": false
          }],
          "picList": []
        }], "highlightList": null, "end": true
      }, "code": 200
    });
  }, Math.random() * 1500);
});

router.get("/rise/practice/subject/desc/*", (req, res) => {
  setTimeout(() => {
    res.status(200).json({
      "msg": "学习是为了更好地实践。不妨跟大家分享一下，你运用学习的方法找到了什么本质问题。好的分享能有机会获得圈外教练的点评，其他童鞋的点赞，以及被收录为精华！",
      "code": 200
    });
  }, Math.random() * 1500);
});

router.post("/rise/practice/subject/submit/*", (req, res) => {
  setTimeout(() => {
    res.status(200).json({ "msg": "ok", "code": 200 });
  }, Math.random() * 1500);
});

router.get("/rise/practice/label/*", (req, res) => {
  setTimeout(() => {
    res.status(200).json(
      {
        "msg": [{
          "id": 1,
          "problemId": 1,
          "name": "标签1",
          "del": false,
        }], "code": 200
      }
    );
  }, Math.random() * 1500);
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

router.post("/rise/practice/request/comment/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": "ok"
    }), Math.random() * 1500)
});

router.get("/rise/practice/subject/*", (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      "code": 200,
      "msg": {
        "requestCommentCount": 0,
        "title": "团队成员的绩效表现为什么不佳？",
        "userName": "Chloé\uD83C\uDF38",
        "submitUpdateTime": "2017-04-18",
        "role": 6,
        "headImage": "http://wx.qlogo.cn/mmopen/Bqm3aw1TmGlHZDT30nZLHgYsBTxNN5eWWzX7ibBgulX8TVUhWMx9RQ2awkFbkGPt0kDfplxFmzVDErWpQvEr3yibmgGY8PIHeX/0",
        "content": "用5W1H给多啦A梦找女朋友用5W1H给多啦A梦找女朋友用5W1H给多啦A梦找女朋友用5W1H给多啦A梦找女朋友用5W1H给多啦A梦找女朋友用5W1H给多啦A梦找女朋友用5W1H给多啦A梦找女朋友用5W1H给多啦A梦找女朋友用5W1H给多啦A梦找女朋友用5W1H给多啦A梦找女朋友用5W1H给多啦A梦找女朋友",
        "voteCount": 0,
        "commentCount": 2,
        "submitId": 8,
        "type": 1,
        "voteStatus": 0,
        "publishTime": null,
        "priority": null,
        "perfect": true,
        "problemId": null,
        "authorType": 2,
        "isMine": true,
        "labelList": [{ "id": 20, "labelId": 21, "articleModule": 3, "articleId": 8, "del": false }],
        "picList": ["http://www.confucius.mobi/images/subject/subject-pefect5.jpeg"],
        "desc": '学习是为了更好地实践。不妨跟大家分享一下，你运用学习的方法找到了什么本质问题。好的分享能有机会获得圈外教练的点评，其他童鞋的点赞，以及被收录为精华！'
      }
    }), Math.random() * 1500)
});

router.post("/rise/practice/warmup/delete/comment/*", (req, res) => {
  setTimeout(() => {
    res.status(200).json({ "msg": "ok", "code": 200 });
  }, Math.random() * 1500);
});

router.post("/rise/practice/delete/comment/*", (req, res) => {
  setTimeout(() => {
    res.status(200).json({ "msg": "ok", "code": 200 });
  }, Math.random() * 1500);
});

router.get("/rise/practice/application/article/*", (req, res) => {
  setTimeout(() => {
    res.status(200).json({
      "msg": {
        "id": null,
        "topic": "用5W1H给多啦A梦找女朋友",
        "content": "<p>用5W1H给多啦A梦找女朋友用5W1H给多啦A梦找女朋友用5W1H给多啦A梦找女朋友用5W1H给多啦A梦找女朋友用5W1H给多啦A梦找女朋友用5W1H给多啦A梦找女朋友用5W1H给多啦A梦找女朋友用5W1H给多啦A梦找女朋友用5W1H给多啦A梦找女朋友用5W1H给多啦A梦找女朋友用5W1H给多啦A梦找女朋友</p>",
        "comments": null,
        "planId": null,
        "integrated": null
      },
      "code": 200
    });
  }, Math.random() * 1500);
});

router.get("/rise/practice/knowledge/discuss/*", (req, res) => {
  setTimeout(() => {
    res.status(200).json({
      "code": 200,
      "msg": [
        {
          "id": 2,
          "repliedId": 1,
          "comment": "新增的评论",
          "repliedName": "风之伤",
          "repliedComment": "评论评论评论",
          "repliedDel": 0,
          "knowledgeId": 49,
          "name": "Diane",
          "avatar": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM4j579r72ltlZK0uBEz3klv57pOrqolSjZONIIlyffo4ib5p7sneIH4MgXyCKzKOKBiaCTkQUyu15XKiaeSppaJ0U3j1OBLIOrxrk/0",
          "discussTime": "10:30",
          "isMine": true,
        },

        {
          "id": 1,
          "repliedId": null,
          "comment": "评论评论评论",
          "repliedName": null,
          "repliedComment": null,
          "repliedDel": null,
          "knowledgeId": 49,
          "name": "风之伤",
          "avatar": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM4j579r72ltlZK0uBEz3klv57pOrqolSjZONIIlyffo4ib5p7sneIH4MgXyCKzKOKBiaCTkQUyu15XKiaeSppaJ0U3j1OBLIOrxrk/0",
          "discussTime": "10:38"
        }
      ]
    });
  }, Math.random() * 1500);
});

router.post("/rise/practice/knowledge/discuss", (req, res) => {
  setTimeout(() => {
    res.status(200).json({ "msg": "ok", "code": 200 });
  }, Math.random() * 1500);
});

router.get("/rise/practice/knowledge/*", (req, res) => {
  setTimeout(() => {
    res.status(200).json({
      "code": 200,
      "msg": {
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
      }
    });
  }, Math.random() * 1500);
});

router.post("/rise/practice/application/autosave/*", (req, res) => {
  setTimeout(() => {
    res.status(200).json({ "msg": 127, "code": 200 });
  }, Math.random() * 1500);
});

router.post("/rise/practice/application/autoupdate/*", (req, res) => {
  setTimeout(() => {
    res.status(200).json({ "msg": "ok", "code": 200 });
  }, Math.random() * 1500);
});

module.exports = router;
