var Router = require("express").Router;
var router = new Router();

router.get("/rise/customer/profile", (req, res) => {
    setTimeout(() =>
        res.status(200).json(
            {"msg":{"industry":null,"function":null,"workingLife":null,"city":"","cityId":null,"province":"","provinceId":null,"isFull":false},"code":200}
        ), Math.random() * 1500)
});

router.get("/rise/customer/region", (req, res) => {
    setTimeout(() =>
        res.status(200).json(
            {"msg":{"provinceList":[{"id":"1","value":"北京市","parentId":"1000000"},{"id":"2","value":"上海市","parentId":"1000000"}]},"code":200}
        ), Math.random() * 1500);
})

router.post("/rise/customer/profile/region", (req, res) => {
    setTimeout(() =>
        res.status(200).json(
            {
                msg:"ok",
                code:200
            }

        ), Math.random() * 1500);
})

router.post("/rise/customer/profile/industry", (req, res) => {
    setTimeout(() =>
        res.status(200).json(
            {
                msg:"ok",
                code:200
            }

        ), Math.random() * 1500);
})

router.post("/rise/customer/profile/workinglife", (req, res) => {
    setTimeout(() =>
        res.status(200).json(
            {
                msg:"ok",
                code:200
            }

        ), Math.random() * 1500);
})
router.get("/rise/customer/rise", (req, res) => {
    setTimeout(() =>
        res.status(200).json(
            {"msg":{"point":144},"code":200}
        ), Math.random() * 1500);
})



router.get("/rise/customer/plans", (req, res) => {
    setTimeout(() =>
        res.status(200).json(
            {"msg":{"runningPlans":[{"name":"与人沟通时条理更清晰","point":0}],"donePlans":[{"name":"面对前所未有的新问题时撬开脑洞","point":814},{"name":"临场发言也能掷地有声","point":124}], "point":2000},"code":200}
        ), Math.random() * 1500);
})


router.post("/rise/customer/profile", (req, res) => {
    setTimeout(() =>
        res.status(200).json(
            {"msg": "ok", "code": 200}
        ), Math.random() * 1500);
})



router.get("/rise/customer/account", (req, res) => {
    setTimeout(() =>
        res.status(200).json(
            {"msg": {
                "riseId":"dsiv91",
                "memberType": "专业版（一年）",
            }, "code": 200}
        ), Math.random() * 1500);
})

router.get("/rise/customer/member", (req, res) => {
    setTimeout(() =>
        res.status(200).json(
            {
                "msg": {
                    "id": 47,
                    "orderId": "iy1q66nes0jtsxkz",
                    "openId": "o5h6ywlXxHLmoGrLzH9Nt7uyoHbM",
                    "memberTypeId": 3,
                    "expireDate": "2018-04-19",
                    "expired": false,
                    "addTime": 1492573781000,
                    "startTime": "2017.04.19",
                    "endTime": "2018.04.18",
                    "name": "精英版（一年）"
                },
                "code": 200
            }
        ), Math.random() * 1500);
})

router.post("/rise/customer/send/valid/code", (req, res) => {
    setTimeout(() =>
        res.status(200).json(
            {"msg": true, "code": 200}
        ), Math.random() * 1500);
})

router.post("/rise/customer/valid/sms", (req, res) => {
    setTimeout(() =>
        res.status(200).json(
            {"msg": true, "code": 200}
        ), Math.random() * 1500);
})

router.get("/rise/customer/event/list", (req, res) => {
    setTimeout(() =>
        res.status(200).json(
            {"msg":[{"id":36,"title":"圈外分舵一大波岗位来袭！","publisher":" ","subHead":"怎样才能和圈圈约个饭？","time":"","banner":true,"type":4,"pic":"https://www.iqycamp.com/images/event_wall_06_24.jpeg","destUrl":"https://shimo.im/doc/NlD4zAa9xJobyW5X/","startTime":1498305286000,"addTime":1498305294000,"updateTime":1498305776000,"del":false,"showTime":null,"visibility":null},{"id":40,"title":"【圈圈时间】主题：对上管理","publisher":"创始人：孙圈圈","subHead":null,"time":"2017-06-20 20:30 ~ 21:30","banner":false,"type":1,"pic":"https://www.iqycamp.com/images/event_wall_0605_gzfqqv1.jpeg","destUrl":"https://shimo.im/doc/jFq650eZrx413w6H/","startTime":1497961800000,"addTime":1498477167000,"updateTime":1498477167000,"del":false,"showTime":null,"visibility":4},{"id":38,"title":"【圈圈夜聊】——跳槽转行那些事儿","publisher":"创始人：孙圈圈","subHead":null,"time":"2017-06－13 20:30 ~ 21:30","banner":false,"type":1,"pic":"https://www.iqycamp.com/images/event_wall_0605_gzfqqv1.jpeg","destUrl":"https://shimo.im/doc/jt8DKaL7rTAYxhVF/","startTime":1497357000000,"addTime":1498477067000,"updateTime":1498477067000,"del":false,"showTime":null,"visibility":4},{"id":23,"title":"2017.6.11 上海线下工作坊","publisher":"嘉宾：李彤","subHead":"主题：如何用故事说服别人","time":"2017-06-11 09:00 ~ 12:00","banner":false,"type":3,"pic":"https://www.iqycamp.com/images/event_wall_0605_gzflt.jpeg","destUrl":"https://shimo.im/doc/ExRBSzLnMrQu0gw6","startTime":1497142800000,"addTime":1497186730000,"updateTime":1496661196000,"del":false,"showTime":null,"visibility":2},{"id":20,"title":"2017.6.10 广州线下工作坊","publisher":"嘉宾：孙圈圈","subHead":"主题：如何让表达更清晰有力","time":"2017-06-10 14:00 ~ 17:00","banner":false,"type":3,"pic":"https://www.iqycamp.com/images/event_wall_0605_gzfqqv1.jpeg","destUrl":"https://shimo.im/doc/YNNrAiM6UiIfrLuU/","startTime":1497074400000,"addTime":1497074400000,"updateTime":1496660366000,"del":false,"showTime":null,"visibility":2},{"id":33,"title":"“如何改变自己”作业吊打","publisher":"教练：Yanae Yang、船小","subHead":"直播间密码：060812","time":"2017-06-09 20:30 ~ 21:30","banner":false,"type":2,"pic":"https://www.iqycamp.com/images/fragment/problem15_3.png","destUrl":"https://m.qlchat.com/topic/850000124017808.htm?shareKey=a63d9b04238bc42efae21b6bb150c881","startTime":1497011400000,"addTime":1496910537000,"updateTime":1496911938000,"del":false,"showTime":null,"visibility":5},{"id":32,"title":"“演讲也是力量”作业吊打","publisher":"教练：Jia、Jill Ling","subHead":"直播间密码：060822","time":"2017-06-08 20:30 ~ 21:30","banner":false,"type":2,"pic":"https://www.iqycamp.com/images/fragment/problem13_3.png","destUrl":"https://m.qlchat.com/topic/840000147017820.htm?shareKey=fb7a07576089d81c30c30630fa8fc2e6","startTime":1496925000000,"addTime":1496910433000,"updateTime":1496911915000,"del":false,"showTime":null,"visibility":5},{"id":15,"title":"圈圈带你玩转RISE","publisher":"创始人：孙圈圈","subHead":"直播间密码：060632","time":"2017-06-06 20:30 ~ 22:30","banner":true,"type":1,"pic":"https://www.iqycamp.com/images/rise_event0605_play_risev2.jpeg","destUrl":"https://m.qlchat.com/topic/850000115009221.htm?shareKey=0414fb7bcda1e12b0b91e0f3ebd6193a","startTime":1496752200000,"addTime":1496752233000,"updateTime":1496659471000,"del":false,"showTime":null,"visibility":5},{"id":16,"title":"“面对热点事件保持独立思考”作业吊打","publisher":"教练：Yanae Yang、Lydia","subHead":null,"time":"2017-06-02 20:30 ~ 21:30","banner":true,"type":2,"pic":"https://www.iqycamp.com/images/rise_event0605_face_hot_problem.jpeg","destUrl":"https://m.qlchat.com/topic/840000133083409.htm?authDataKey=310000127252714","startTime":1496406600000,"addTime":1496375449000,"updateTime":1496657801000,"del":false,"showTime":null,"visibility":5},{"id":13,"title":"“给自己的未来定个发展策略”作业吊打","publisher":"教练：若雨 Virgo","subHead":null,"time":"2017-06-01 20:30 ~ 21:30","banner":false,"type":2,"pic":"https://www.iqycamp.com/images/fragment/problem8_3.png","destUrl":"https://m.qlchat.com/topic/840000133031158.htm?pro_cl=link&authDataKey=240000453167900","startTime":1496320200000,"addTime":1496332273000,"updateTime":1496657788000,"del":false,"showTime":null,"visibility":5},{"id":18,"title":"“找到本质问题，减少无效努力”作业吊打","publisher":"教练：大禹、若雨","subHead":null,"time":"2017-05-31 20:30 ~ 21:30","banner":false,"type":2,"pic":"https://www.iqycamp.com/images/fragment/problem9_3.png","destUrl":"https://m.qlchat.com/topic/840000131346530.htm?from=singlemessage","startTime":1496233800000,"addTime":1496233800000,"updateTime":1496657809000,"del":false,"showTime":null,"visibility":5},{"id":17,"title":"“洞察他人行为背后的真相”作业吊打","publisher":"教练：敏","subHead":null,"time":"2017-05-31 20:00 ~ 21:30","banner":false,"type":2,"pic":"https://www.iqycamp.com/images/fragment/problem11_3.png","destUrl":"https://m.qlchat.com/topic/840000131346420.htm?from=singlemessage","startTime":1496232000000,"addTime":1496232000000,"updateTime":1496657804000,"del":false,"showTime":null,"visibility":5},{"id":14,"title":"2017.5.28 深圳线下工作坊","publisher":"嘉宾：孙圈圈","subHead":null,"time":"2017-05-28 14:00 ~ 17:00","banner":false,"type":3,"pic":"https://www.iqycamp.com/images/event_wall_0605_gzfqqv1.jpeg","destUrl":"https://mp.weixin.qq.com/s?__biz=MzA4MjU3Njc3NA==&mid=2451801666&idx=1&sn=8c272834c87773cee3872762368a491f&chksm=8854b2abbf233bbdfbc864c852f76217969b99cda76e0607055ab417842cef200a167f2c7cb1&mpshare=1&scene=1&srcid=0602HY1SFdtW4ladr0Su0I3D#rd","startTime":1495951200000,"addTime":1495951247000,"updateTime":1496657792000,"del":false,"showTime":null,"visibility":null},{"id":7,"title":"本周吊打活动作业征集","publisher":"参与者:所有分舵","subHead":null,"time":"2017-05-24 00:00 ~ 23:50","banner":false,"type":2,"pic":"https://www.iqycamp.com/images/event_2017_05_24_v1.jpeg","destUrl":"https://shimo.im/doc/RHOY8kFOfjcNGlXT/","startTime":1495555200000,"addTime":1495553244000,"updateTime":1496655892000,"del":false,"showTime":null,"visibility":5},{"id":1,"title":"如何分析行业？","publisher":"大咖：朱轶","subHead":"直播间密码：057188","time":"2017-05-17 20:30 ~ 21:30","banner":false,"type":1,"pic":"https://www.iqycamp.com/images/event_wall_0605_gzfzyv1.jpeg","destUrl":"https://m.qlchat.com/topic/850000105275670.htm?shareKey=a74fcefadc05f48718ce1d7c03945dc5","startTime":1495024218000,"addTime":1495024218000,"updateTime":1496659468000,"del":false,"showTime":null,"visibility":5},{"id":6,"title":"2017.5.13 北京线下工作","publisher":"嘉宾：孙圈圈","subHead":null,"time":"2017-05-13 14:00 ~ 17:00","banner":false,"type":3,"pic":"https://www.iqycamp.com/images/event_wall_0605_gzfqqv1.jpeg","destUrl":"http://note.youdao.com/share/index.html?id=8df9bd5214506ff79f479b8ef262650d&type=note&from=singlemessage&isappinstalled=0#/","startTime":1494655200000,"addTime":1494655200000,"updateTime":1496657758000,"del":false,"showTime":null,"visibility":null},{"id":5,"title":"怎样才能和圈圈约个饭？｜圈外分舵招人啦","publisher":" ","subHead":null,"time":"2017-05-26 ~ 06-02","banner":true,"type":4,"pic":"https://www.iqycamp.com/images/rise_event0605_rise_pointv2.jpeg","destUrl":"https://shimo.im/doc/hzYRoQwdkxwz2FDt/","startTime":1494518400000,"addTime":1496419200000,"updateTime":1498305109000,"del":false,"showTime":null,"visibility":null},{"id":2,"title":"2017.5.6 上海线下工作坊","publisher":"嘉宾：张良计","subHead":null,"time":"2017-05-06 14:00 ~ 17:00","banner":false,"type":3,"pic":"https://www.iqycamp.com/images/event_wall_0605_gzfzljv1.jpeg","destUrl":"https://shimo.im/doc/p5ntreRp9RUxbC6C/","startTime":1494050400000,"addTime":1494050400000,"updateTime":1496657747000,"del":false,"showTime":null,"visibility":null}],"code":200}
        ), Math.random() * 1500);
})

module.exports = router;
