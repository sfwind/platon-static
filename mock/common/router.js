var Router = require('express').Router

var router = new Router()

router.post('/b/log', (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      'msg': "ok",
      'code': 200
    }), Math.random() * 1500)
})

router.get('/wx/js/signature', (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      'code': 200,
      'msg': {
        appId: '', // 必填，公众号的唯一标识
        timestamp: '', // 必填，生成签名的时间戳
        nonceStr: '', // 必填，生成签名的随机串
        signature: '',// 必填，签名，见附录1
      }
    }), Math.random() * 1500)
})

router.post('/rise/b/mark', (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      'msg': 'ok',
      'code': 200
    }), Math.random() * 1500)
})

router.get('/rise/index/msg', (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      'msg': {
        'message': null,
        'url': null
      },
      'code': 200
    }), Math.random() * 1500)
})

router.get('/rise/schedule/count/down', (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      'msg': {
        days: 32,
        hasSchedule: true
      },
      'code': 200
    }), Math.random() * 1000)
})

router.get('/rise/customer/notify/expire', (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      'msg': {
        'id': null,
        'profileId': null,
        'orderId': null,
        'openId': null,
        'memberTypeId': null,
        'openDate': null,
        'expireDate': null,
        'expired': false,
        'addTime': null,
        'startTime': null,
        'endTime': null,
        'name': null,
        'expiredInSevenDays': false
      }, 'code': 200
    }), Math.random() * 1000)
})

const letterData = [{"nickname":"许江锋","id":"12860"},{"nickname":"周林鑫","id":"4001"},{"nickname":"赵元森","id":"49670"},{"nickname":"张超","id":"8980"},{"nickname":"翁莹莹","id":"61376"},{"nickname":"闫智翔","id":"26750"},{"nickname":"王华","id":"39324"},{"nickname":"周新星","id":"45871"},{"nickname":"赵福明","id":"61689"},{"nickname":"翟欣欣","id":"30756"},{"nickname":"史东修","id":"55849"},{"nickname":"查爽爽","id":"61450"},{"nickname":"熊财政","id":"30869"},{"nickname":"邱予芃","id":"54600"},{"nickname":"陈丹娜","id":"41094"},{"nickname":"刘丹","id":"34936"},{"nickname":"左娇","id":"61083"},{"nickname":"王珍婷","id":"20837"},{"nickname":"邬凤怡","id":"8260"},{"nickname":"段继旺","id":"852"},{"nickname":"邹雪姬","id":"308"},{"nickname":"慈明月","id":"61100"},{"nickname":"张文","id":"62086"},{"nickname":"Jingwa.HU","id":"17432"},{"nickname":"王启玉","id":"62160"},{"nickname":"李嘉宾","id":"62136"},{"nickname":"卢程稳","id":"39788"},{"nickname":"张亚男","id":"5100"},{"nickname":"谢俊强","id":"62534"},{"nickname":"黄健鹏","id":"2962"},{"nickname":"董晶晶","id":"2766"},{"nickname":"周君","id":"1141"},{"nickname":"杨浩鑫","id":"61900"},{"nickname":"陈梓烨","id":"12561"},{"nickname":"申小玉","id":"56551"},{"nickname":"杨立辉","id":"62668"},{"nickname":"刘卫红","id":"19032"},{"nickname":"任莉杰","id":"61516"},{"nickname":"叶育周","id":"4740"},{"nickname":"苏洁","id":"16970"},{"nickname":"刘子路","id":"13668"},{"nickname":"刘娜","id":"61512"},{"nickname":"张灵婕","id":"62318"},{"nickname":"陈中良","id":"61827"},{"nickname":"余娟","id":"61305"},{"nickname":"方芳","id":"61471"},{"nickname":"赵新春","id":"59065"},{"nickname":"吴震","id":"284"},{"nickname":"毛泽卫","id":"61379"},{"nickname":"王立飞","id":"14238"},{"nickname":"任丽华","id":"17629"},{"nickname":"鲍翰林","id":"61137"},{"nickname":"宋文雅","id":"25482"},{"nickname":"张萍","id":"29935"},{"nickname":"罗琴","id":"61059"},{"nickname":"李广鹏","id":"18697"},{"nickname":"杨雁凌","id":"60549"},{"nickname":"景妍肜","id":"27375"},{"nickname":"刘永忠","id":"30777"},{"nickname":"朱全毅","id":"53866"},{"nickname":"代娇","id":"15865"},{"nickname":"贺臣辉","id":"60945"},{"nickname":"段可","id":"62029"},{"nickname":"陈莎","id":"61411"},{"nickname":"陈丽莎","id":"636"},{"nickname":"吴凯丽","id":"20269"},{"nickname":"刘亚飞","id":"61822"},{"nickname":"周显波","id":"20488"},{"nickname":"李思其","id":"61037"},{"nickname":"linzhu.yue","id":"21608"},{"nickname":"赵小佩","id":"63708"},{"nickname":"王文娟","id":"57381"},{"nickname":"彭雅婷","id":"63509"},{"nickname":"张馨月","id":"61577"},{"nickname":"章佳倩","id":"40795"},{"nickname":"强君","id":"59997"},{"nickname":"马多亮","id":"61368"},{"nickname":"张波","id":"61143"},{"nickname":"潘丽星","id":"61823"},{"nickname":"陈虎","id":"60186"},{"nickname":"王婷","id":"60834"},{"nickname":"朱冬云","id":"53954"},{"nickname":"闫娇","id":"60002"},{"nickname":"宁敏","id":"32275"},{"nickname":"赵林萧","id":"61077"},{"nickname":"陈光磊","id":"61634"},{"nickname":"王迪","id":"59224"},{"nickname":"冯霞","id":"56803"},{"nickname":"李铮","id":"18263"},{"nickname":"邵晓书","id":"20302"},{"nickname":"司勤","id":"61676"},{"nickname":"胡家胜","id":"59869"},{"nickname":"赵友阳","id":"57475"},{"nickname":"陈嘉俊","id":"25700"},{"nickname":"Qin","id":"61493"},{"nickname":"张彩丽","id":"61181"},{"nickname":"肖路香","id":"42720"},{"nickname":"石海云","id":"10500"},{"nickname":"陈慧","id":"24387"},{"nickname":"彭凌燕","id":"61348"},{"nickname":"王教燕","id":"4243"},{"nickname":"林玲","id":"61635"},{"nickname":"吴娜","id":"31721"},{"nickname":"李岚","id":"62723"},{"nickname":"谢麟","id":"38007"},{"nickname":"李军","id":"60141"},{"nickname":"刘海金","id":"62053"},{"nickname":"郭颖杰","id":"58548"},{"nickname":"林耀群","id":"3084"},{"nickname":"柴进","id":"61658"},{"nickname":"梁大宽","id":"54372"},{"nickname":"刘晨晨","id":"22445"},{"nickname":"katy pan","id":"30454"},{"nickname":"徐妍","id":"15509"},{"nickname":"高小琴","id":"20282"},{"nickname":"娄琰","id":"17468"},{"nickname":"肖翔","id":"27660"},{"nickname":"王瑞婷","id":"62303"},{"nickname":"李轩冰","id":"62099"},{"nickname":"臧萌萌","id":"60680"},{"nickname":"朱金星","id":"61240"},{"nickname":"Roc Li","id":"63653"},{"nickname":"胡广典","id":"61278"},{"nickname":"平凡","id":"19517"},{"nickname":"陈飞昕","id":"61749"},{"nickname":"汪晶晶","id":"55366"},{"nickname":"张崛","id":"62524"},{"nickname":"祝遵燕","id":"3129"},{"nickname":"彭银凤","id":"2425"},{"nickname":"王梁屹","id":"64116"},{"nickname":"蔡静","id":"62249"},{"nickname":"袁司瑶","id":"30121"},{"nickname":"關慧勤","id":"57243"},{"nickname":"陈琴妹","id":"62673"},{"nickname":"鲁骐瑞","id":"4585"},{"nickname":"莫旋","id":"10451"},{"nickname":"梁爽","id":"10848"},{"nickname":"于颖","id":"63493"},{"nickname":"林怡旭","id":"62117"},{"nickname":"王薇","id":"880"},{"nickname":"朱家琪","id":"60650"},{"nickname":"陶军军","id":"8382"},{"nickname":"王嘉琪","id":"64074"},{"nickname":"孙鑫","id":"12866"},{"nickname":"曹云仙子","id":"62140"},{"nickname":"吴昊","id":"9604"},{"nickname":"李锦华","id":"24422"},{"nickname":"刘莉芬","id":"61483"},{"nickname":"杜萍","id":"57638"},{"nickname":"黄斌","id":"56359"},{"nickname":"张晓佳","id":"38277"},{"nickname":"朱强","id":"61167"},{"nickname":"吴亮","id":"22683"},{"nickname":"陈思莹","id":"11118"},{"nickname":"石鑫","id":"55027"},{"nickname":"卢志敏","id":"607"},{"nickname":"夏正策","id":"19741"},{"nickname":"孟洁","id":"64361"},{"nickname":"汪梅梅","id":"6120"},{"nickname":"詹毕玲","id":"56777"},{"nickname":"刘美君","id":"35307"},{"nickname":"陈泽","id":"64240"},{"nickname":"李亚强","id":"57319"},{"nickname":"陈飞","id":"29938"},{"nickname":"邱函","id":"2741"},{"nickname":"周砚","id":"64230"},{"nickname":"朱培莹","id":"30959"},{"nickname":"欧海燕","id":"60572"},{"nickname":"王克伟","id":"64569"},{"nickname":"韩萧笛","id":"63354"},{"nickname":"刘孟雷","id":"42432"},{"nickname":"梁馨","id":"18020"},{"nickname":"雷波","id":"22742"},{"nickname":"陈伟业","id":"16560"},{"nickname":"林夏薇","id":"63977"},{"nickname":"孟彦","id":"610"},{"nickname":"王小娜","id":"31854"},{"nickname":"倪闰贵","id":"21152"},{"nickname":"白晓娟","id":"5761"},{"nickname":"梅佩恋","id":"61730"},{"nickname":"杜杰","id":"56744"},{"nickname":"杨启星","id":"32394"},{"nickname":"王祥","id":"63477"},{"nickname":"惠帅平","id":"52224"},{"nickname":"黄馨仪","id":"59786"},{"nickname":"郭贞海","id":"62044"},{"nickname":"孙伟","id":"4403"},{"nickname":"包英迎","id":"1312"},{"nickname":"李启奎","id":"61794"},{"nickname":"李青","id":"50299"},{"nickname":"付雄峰","id":"39601"},{"nickname":"黄小花","id":"518"},{"nickname":"谢俊","id":"54425"},{"nickname":"卢智","id":"56585"},{"nickname":"张翠芬","id":"59450"},{"nickname":"王冰翎","id":"13270"},{"nickname":"林婧","id":"30165"},{"nickname":"米淑云","id":"25762"},{"nickname":"王勇","id":"60752"},{"nickname":"张路宁","id":"26609"},{"nickname":"孙凌霞","id":"3823"},{"nickname":"杨睿","id":"30069"},{"nickname":"贾军辉","id":"62195"},{"nickname":"施雯","id":"2039"},{"nickname":"温兴凯","id":"63267"},{"nickname":"赵玲艳","id":"1593"},{"nickname":"方家兴","id":"34150"},{"nickname":"李媚英","id":"31772"},{"nickname":"张承玉","id":"61045"},{"nickname":"唐彬","id":"336"},{"nickname":"罗娥","id":"1708"},{"nickname":"唐媛媛","id":"53432"},{"nickname":"杨凯","id":"24850"},{"nickname":"张曦予","id":"54458"},{"nickname":"顾理珍","id":"29667"},{"nickname":"周静芸","id":"13526"},{"nickname":"林子杰","id":"63069"},{"nickname":"张佳男","id":"14908"},{"nickname":"赵玉娥","id":"56824"},{"nickname":"吴焱红","id":"65049"},{"nickname":"李静","id":"3046"},{"nickname":"吴贇","id":"38593"},{"nickname":"郭思琪","id":"33924"},{"nickname":"鲁千秋","id":"29889"},{"nickname":"许方园","id":"8467"},{"nickname":"林士杰","id":"35074"},{"nickname":"杨航","id":"32687"},{"nickname":"黄新培","id":"13626"},{"nickname":"邱晓玲","id":"1340"},{"nickname":"李旭洋","id":"4198"},{"nickname":"陈晨","id":"18766"},{"nickname":"康彩芳","id":"33724"},{"nickname":"程相豹","id":"17623"},{"nickname":"刘香汐","id":"21373"},{"nickname":"冯锋","id":"52121"},{"nickname":"周楚皓","id":"52369"},{"nickname":"彭婷梅","id":"52221"},{"nickname":"王小滨","id":"38719"},{"nickname":"孙乾坤","id":"17595"},{"nickname":"陈慕山","id":"16655"},{"nickname":"高子健","id":"9372"},{"nickname":"曾燕珍","id":"63136"},{"nickname":"刘军红","id":"50404"},{"nickname":"刘芳云","id":"65191"},{"nickname":"汤玉芬","id":"60919"},{"nickname":"胡丙良","id":"63394"},{"nickname":"唐洁妹","id":"2965"},{"nickname":"李运敏","id":"2587"},{"nickname":"陈冬蕊","id":"26423"},{"nickname":"张晨婷","id":"15604"},{"nickname":"侯若晨","id":"1588"},{"nickname":"王新军","id":"14872"},{"nickname":"周雯君","id":"55945"},{"nickname":"杨树","id":"30226"},{"nickname":"李咪咪","id":"1375"},{"nickname":"曲婧","id":"1497"},{"nickname":"徐然","id":"64877"},{"nickname":"黄亮儒","id":"57304"},{"nickname":"华尔斯","id":"20651"},{"nickname":"廖晨","id":"65435"},{"nickname":"黄超亚","id":"33204"},{"nickname":"陈超","id":"65326"},{"nickname":"吕飞","id":"65112"},{"nickname":"吴老师","id":"58313"},{"nickname":"谭健华","id":"1866"},{"nickname":"薛佩","id":"42762"},{"nickname":"李靖涵","id":"13323"},{"nickname":"刘振波","id":"59513"},{"nickname":"李冠沐","id":"13640"},{"nickname":"宫敏燕","id":"28499"},{"nickname":"祝艺文","id":"65064"},{"nickname":"谢永新","id":"62611"},{"nickname":"王肖迪","id":"13907"},{"nickname":"张朝明","id":"65233"},{"nickname":"谭永华","id":"31362"},{"nickname":"龙韵臣","id":"57185"},{"nickname":"余婷","id":"720"},{"nickname":"方仕青","id":"14665"},{"nickname":"陈仁林","id":"24455"},{"nickname":"朱峰","id":"37836"},{"nickname":"杨国强","id":"26778"},{"nickname":"徐嘉龑","id":"35568"},{"nickname":"赖祺","id":"13412"},{"nickname":"张鑫","id":"65319"},{"nickname":"张丹","id":"8480"},{"nickname":"靳婉艺","id":"65286"},{"nickname":"刘静","id":"2719"},{"nickname":"李孟","id":"65494"},{"nickname":"林海漫","id":"3491"},{"nickname":"樊湾湾","id":"64967"},{"nickname":"魏巍","id":"4028"},{"nickname":"陈绪瑞","id":"56598"},{"nickname":"张瑜","id":"3381"},{"nickname":"陈宇","id":"21059"},{"nickname":"陈慧珍","id":"65047"},{"nickname":"蒋慧","id":"65295"},{"nickname":"葛幸桥","id":"26656"},{"nickname":"陈微微","id":"5694"},{"nickname":"李维娜","id":"81"},{"nickname":"贾亚男","id":"6162"},{"nickname":"许东波","id":"1543"},{"nickname":"李晓燕","id":"31445"},{"nickname":"曹俊飞","id":"38608"},{"nickname":"陈东园","id":"65459"},{"nickname":"吴丽霞","id":"18659"},{"nickname":"董林玉","id":"2992"},{"nickname":"徐梦婷","id":"17516"},{"nickname":"刘剑锋","id":"62002"},{"nickname":"阚鸿玙","id":"65358"},{"nickname":"常豪","id":"2808"},{"nickname":"柯霁虹","id":"16401"},{"nickname":"黄志明","id":"65258"},{"nickname":"董雪嫣","id":"65447"},{"nickname":"徐明娇","id":"58334"},{"nickname":"叶景锋","id":"65385"},{"nickname":"杜光程","id":"61243"},{"nickname":"汲雪丹","id":"65487"},{"nickname":"焦峥","id":"65334"},{"nickname":"王志超","id":"169"},{"nickname":"潘靓","id":"14602"},{"nickname":"宫重阳","id":"33809"},{"nickname":"尹文","id":"11133"},{"nickname":"张帆","id":"2009"},{"nickname":"高敬南","id":"1072"},{"nickname":"王然","id":"30873"},{"nickname":"曾庆伟","id":"3088"},{"nickname":"文颢然","id":"13173"},{"nickname":"周依秀","id":"30189"},{"nickname":"张金","id":"9841"},{"nickname":"段一邦","id":"37084"},{"nickname":"黄园","id":"13198"},{"nickname":"张悦娜","id":"65390"},{"nickname":"刘在文","id":"35863"},{"nickname":"王则","id":"27740"},{"nickname":"陈婷","id":"8435"},{"nickname":"乔伟","id":"64245"},{"nickname":"陈晓婷","id":"8318"},{"nickname":"肖姝婕","id":"1567"},{"nickname":"刘维维","id":"63340"},{"nickname":"王杰","id":"65065"},{"nickname":"黎婷玉","id":"17577"},{"nickname":"刘大地","id":"13553"},{"nickname":"马兰云","id":"12693"},{"nickname":"张鹏","id":"175"},{"nickname":"刘琼","id":"213"},{"nickname":"段琦","id":"1470"},{"nickname":"李锟林","id":"31782"},{"nickname":"刘斌","id":"41797"},{"nickname":"刘稳","id":"40062"},{"nickname":"黄晓玮","id":"14094"},{"nickname":"张星星","id":"58163"},{"nickname":"刘玟汐","id":"65588"},{"nickname":"罗金华","id":"24889"},{"nickname":"孙志强","id":"64690"},{"nickname":"金银丽","id":"901"},{"nickname":"王晓璇","id":"44549"},{"nickname":"陈丽夫","id":"9855"},{"nickname":"刘越凡","id":"56346"},{"nickname":"郑小兰","id":"58948"},{"nickname":"闫敏章","id":"5987"},{"nickname":"冯小小","id":"65454"},{"nickname":"李达宏","id":"32403"},{"nickname":"时丽","id":"54640"},{"nickname":"谭志韬","id":"12828"},{"nickname":"许玉铃","id":"22820"},{"nickname":"应孔章","id":"26543"},{"nickname":"李省非","id":"38150"},{"nickname":"刘国勇","id":"55758"},{"nickname":"刘巧凤","id":"25416"},{"nickname":"胡宁俊","id":"65209"},{"nickname":"黄鹤","id":"54790"},{"nickname":"苏七","id":"63316"},{"nickname":"韩雁","id":"40570"},{"nickname":"胡新强","id":"65478"},{"nickname":"陈丽华","id":"36309"},{"nickname":"吴婷","id":"63411"},{"nickname":"詹瑶","id":"31434"},{"nickname":"覃佳雪","id":"5797"},{"nickname":"杨雨","id":"4480"},{"nickname":"胡荣惠 外婆","id":"65643"},{"nickname":"王岚","id":"20501"},{"nickname":"杨永辉","id":"2664"},{"nickname":"叶云云","id":"10094"},{"nickname":"魏开开","id":"13144"},{"nickname":"郑聪","id":"50109"},{"nickname":"佟舟","id":"65488"},{"nickname":"朱红杰","id":"11616"},{"nickname":"曹力予","id":"65607"},{"nickname":"张亚超","id":"4050"},{"nickname":"鲁江","id":"39494"},{"nickname":"林菁菁","id":"65479"},{"nickname":"周伟波","id":"26615"},{"nickname":"黄淼琴","id":"871"},{"nickname":"高小燕","id":"65365"},{"nickname":"汪巧蓉","id":"16097"},{"nickname":"王雪平","id":"13712"},{"nickname":"郝召娟","id":"65603"},{"nickname":"霍艺方","id":"65545"},{"nickname":"林琳","id":"65570"},{"nickname":"张雪林","id":"53724"},{"nickname":"陈果","id":"4944"},{"nickname":"黄娜","id":"56526"},{"nickname":"张恺婕","id":"31999"}]

router.get('/operation/letter/load', (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      'msg': letterData,
      'code': 200
    }), Math.random() * 1000)
})

module.exports = router
