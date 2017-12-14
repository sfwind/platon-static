var Router = require('express').Router

var router = new Router()

router.post('/rise/b/log', (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      'msg': {
        'mobileNo': '13712345678',
        'email': 'aaa@mail.com',
        'industry': 'IT',
        'function': '软件开发',
        'workingLife': '10'
      },
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

const letterData = [{"nickname":"Vina","id":"81"},{"nickname":"大哉乾元","id":"169"},{"nickname":"Patton","id":"175"},{"nickname":"简单","id":"213"},{"nickname":"佑天","id":"284"},{"nickname":"晶晶","id":"308"},{"nickname":"八方名动","id":"336"},{"nickname":"花花","id":"518"},{"nickname":"卢志敏","id":"607"},{"nickname":"Nepture","id":"610"},{"nickname":"lisa","id":"636"},{"nickname":"兔子","id":"720"},{"nickname":"旺旺","id":"852"},{"nickname":"两颗门牙","id":"871"},{"nickname":"橘子哒橙橙色","id":"880"},{"nickname":"金小金","id":"901"},{"nickname":"高敬南","id":"1072"},{"nickname":"小龙人的爹","id":"1141"},{"nickname":"英迎","id":"1312"},{"nickname":"青春无悔","id":"1340"},{"nickname":"Limi","id":"1375"},{"nickname":"DQ","id":"1470"},{"nickname":"Pawpawgoof","id":"1497"},{"nickname":"许东波","id":"1543"},{"nickname":"蓝田","id":"1567"},{"nickname":"8","id":"1588"},{"nickname":"赵玲艳","id":"1593"},{"nickname":"盛开的叶子","id":"1708"},{"nickname":"华仔","id":"1866"},{"nickname":"Fan口八","id":"2009"},{"nickname":"小施施","id":"2039"},{"nickname":"JessieP.银凤","id":"2425"},{"nickname":"⭐️ Amber??","id":"2587"},{"nickname":"Alan","id":"2664"},{"nickname":"七花妈","id":"2719"},{"nickname":"Ada","id":"2741"},{"nickname":"HR实名俱乐部-晶晶","id":"2766"},{"nickname":"James","id":"2808"},{"nickname":"Roger","id":"2962"},{"nickname":"好好学习","id":"2965"},{"nickname":"董林玉","id":"2992"},{"nickname":"李静Lesley","id":"3046"},{"nickname":"哦乎","id":"3084"},{"nickname":"Hiro zeng","id":"3088"},{"nickname":"默思静寻","id":"3129"},{"nickname":"Nancy Z","id":"3381"},{"nickname":"林海漫","id":"3491"},{"nickname":"凌霞","id":"3823"},{"nickname":"周林鑫","id":"4001"},{"nickname":"魏青山","id":"4028"},{"nickname":"张亚超","id":"4050"},{"nickname":"大河马","id":"4198"},{"nickname":"你呀！","id":"4243"},{"nickname":"Vivi","id":"4403"},{"nickname":"杨雨","id":"4480"},{"nickname":"A 鲁骐瑞","id":"4585"},{"nickname":"K.O麦肯锡","id":"4740"},{"nickname":"陈果","id":"4944"},{"nickname":"吃瓜群众","id":"5100"},{"nickname":"途摄coffee","id":"5694"},{"nickname":"?白曉白","id":"5761"},{"nickname":"远黛秀空灵","id":"5797"},{"nickname":"熊司令","id":"5987"},{"nickname":"笨熊玲珑心","id":"6120"},{"nickname":"jessie-金融-青岛","id":"6162"},{"nickname":"曳尾泥中","id":"8260"},{"nickname":"Snow","id":"8318"},{"nickname":"karmi","id":"8382"},{"nickname":"仙人掌","id":"8435"},{"nickname":"初色","id":"8467"},{"nickname":"张丹","id":"8480"},{"nickname":"：）张超","id":"8980"},{"nickname":"Jayce","id":"9372"},{"nickname":"dolphin","id":"9604"},{"nickname":"张金","id":"9841"},{"nickname":"反虑不漏","id":"9855"},{"nickname":"月儿 ","id":"10094"},{"nickname":"月半老王睿","id":"10451"},{"nickname":"Henry","id":"10500"},{"nickname":"梁爽","id":"10848"},{"nickname":"pople","id":"11118"},{"nickname":"Even","id":"11133"},{"nickname":"hj","id":"11616"},{"nickname":"橙子叶?","id":"12561"},{"nickname":"Nicole绿矾","id":"12693"},{"nickname":"Jacky","id":"12828"},{"nickname":"刀锋","id":"12860"},{"nickname":"Robin","id":"12866"},{"nickname":"kent/魏开开","id":"13144"},{"nickname":"一闪就过","id":"13173"},{"nickname":"Altman ♧","id":"13198"},{"nickname":"Nil","id":"13270"},{"nickname":"Gab","id":"13323"},{"nickname":"赖祺","id":"13412"},{"nickname":"靜䉙?Maria","id":"13526"},{"nickname":"巴津冀蜀吴","id":"13553"},{"nickname":"糖小妞。","id":"13626"},{"nickname":"吖。。。GM","id":"13640"},{"nickname":"子路","id":"13668"},{"nickname":"米粒粒","id":"13712"},{"nickname":"Xiao迪_Joanne","id":"13907"},{"nickname":"水冰月.?","id":"14094"},{"nickname":"一只会飞的猪?","id":"14238"},{"nickname":"琴心剑魄","id":"14602"},{"nickname":"青","id":"14665"},{"nickname":"心君","id":"14872"},{"nickname":"Justin","id":"14908"},{"nickname":"艾牙牙","id":"15509"},{"nickname":"张晨婷","id":"15604"},{"nickname":"蹦恰恰","id":"15865"},{"nickname":"Dong Na","id":"15914"},{"nickname":"046-大脸-结算-杭州","id":"16097"},{"nickname":"Khloe","id":"16401"},{"nickname":"与你为邻","id":"16560"},{"nickname":"慕Shan","id":"16655"},{"nickname":"苏洁","id":"16970"},{"nickname":"青蛙菇凉","id":"17432"},{"nickname":"以璇","id":"17468"},{"nickname":"徐梦婷","id":"17516"},{"nickname":"Shizuku","id":"17577"},{"nickname":"bagualier","id":"17595"},{"nickname":"程相豹","id":"17623"},{"nickname":"第七感","id":"17629"},{"nickname":"博言","id":"18020"},{"nickname":"猫头铮","id":"18263"},{"nickname":"Taylor","id":"18659"},{"nickname":"李广鹏Peter","id":"18697"},{"nickname":"Carol","id":"18766"},{"nickname":"Liu","id":"19032"},{"nickname":"平凡","id":"19517"},{"nickname":"夏至","id":"19741"},{"nickname":"kelly","id":"20269"},{"nickname":"Tina","id":"20282"},{"nickname":"四刀","id":"20302"},{"nickname":"青云","id":"20488"},{"nickname":"Chloe","id":"20501"},{"nickname":"Watson/华尔斯","id":"20651"},{"nickname":"bling๑bling","id":"20837"},{"nickname":"chén","id":"21059"},{"nickname":"羽","id":"21152"},{"nickname":"香汐&shirley","id":"21373"},{"nickname":"小学生","id":"21608"},{"nickname":"白小晨","id":"22445"},{"nickname":"肉馒头吴","id":"22683"},{"nickname":"Tina","id":"22742"},{"nickname":"夏琳","id":"22820"},{"nickname":"夏夏（夏兵健）","id":"23823"},{"nickname":"Tracy","id":"24387"},{"nickname":"我的一个道长朋友","id":"24422"},{"nickname":"仁林","id":"24455"},{"nickname":"心愿","id":"24850"},{"nickname":"似水华年","id":"24889"},{"nickname":"巧凤","id":"25416"},{"nickname":"Kira??","id":"25482"},{"nickname":"自定義","id":"25700"},{"nickname":"mi","id":"25762"},{"nickname":"暖暖的阳光","id":"26423"},{"nickname":"雾","id":"26543"},{"nickname":"Jasmine","id":"26609"},{"nickname":"MarcoChow波波","id":"26615"},{"nickname":"Bridge","id":"26656"},{"nickname":"智翔","id":"26750"},{"nickname":"萌玲酱","id":"26778"},{"nickname":"Bustling&Hustling?","id":"27375"},{"nickname":"千山","id":"27660"},{"nickname":"王则~","id":"27740"},{"nickname":"sabrinagong","id":"28499"},{"nickname":"顾理珍","id":"29667"},{"nickname":"秋秋","id":"29889"},{"nickname":"耳可此系","id":"29935"},{"nickname":"陈飞","id":"29938"},{"nickname":"杨睿","id":"30069"},{"nickname":"圓小圓?","id":"30121"},{"nickname":"木木","id":"30165"},{"nickname":"周依秀","id":"30189"},{"nickname":"Grit杨","id":"30226"},{"nickname":"katy","id":"30454"},{"nickname":"zxx","id":"30756"},{"nickname":"木棉","id":"30777"},{"nickname":"熊财政","id":"30869"},{"nickname":"summer?","id":"30873"},{"nickname":"培培","id":"30959"},{"nickname":"永华","id":"31362"},{"nickname":"詹瑶","id":"31434"},{"nickname":"Sally","id":"31445"},{"nickname":"效率部吴娜","id":"31721"},{"nickname":"Cathy","id":"31772"},{"nickname":"Li Kunlin","id":"31782"},{"nickname":"王小娜","id":"31854"},{"nickname":"Azul?","id":"31999"},{"nickname":"clover","id":"32275"},{"nickname":"杨 启星","id":"32394"},{"nickname":"汤尼?","id":"32403"},{"nickname":"后生。","id":"32687"},{"nickname":"Beyond","id":"33204"},{"nickname":"彩芳","id":"33724"},{"nickname":"?SkateMan?好名字","id":"33809"},{"nickname":"Susie 郭","id":"33924"},{"nickname":"seven&兴","id":"34150"},{"nickname":"driving","id":"34936"},{"nickname":"林士杰","id":"35074"},{"nickname":"刘美君","id":"35307"},{"nickname":"lyrics","id":"35568"},{"nickname":"刘在文","id":"35863"},{"nickname":"✨Liva✨","id":"36309"},{"nickname":"duan-sanity","id":"37084"},{"nickname":"朱峰","id":"37836"},{"nickname":"谢麟 ?仁能达生涯","id":"38007"},{"nickname":"fay","id":"38150"},{"nickname":"深~蓝","id":"38277"},{"nickname":"赟O(∩_∩)O","id":"38593"},{"nickname":"借用","id":"38608"},{"nickname":"旅行","id":"38719"},{"nickname":"王华","id":"39324"},{"nickname":"scorpion","id":"39494"},{"nickname":"毛哥","id":"39601"},{"nickname":"Karen.程稳","id":"39788"},{"nickname":"Joyce","id":"40062"},{"nickname":"Ivy","id":"40570"},{"nickname":"图图是个丸子","id":"40795"},{"nickname":"呢呢","id":"41094"},{"nickname":"吉","id":"41797"},{"nickname":"不懂咖啡","id":"42432"},{"nickname":"肖路香","id":"42720"},{"nickname":"Perrache","id":"42762"},{"nickname":"知玉","id":"44549"},{"nickname":"Lizzy  Zhou","id":"45871"},{"nickname":"Liliane","id":"49670"},{"nickname":"郑聪","id":"50109"},{"nickname":"Amy","id":"50299"},{"nickname":"刘军红","id":"50404"},{"nickname":"冯锋","id":"52121"},{"nickname":"上善若水","id":"52221"},{"nickname":"平哥","id":"52224"},{"nickname":"周楚皓 Francis","id":"52369"},{"nickname":"谁爱麦丽素","id":"53432"},{"nickname":"雨木11","id":"53724"},{"nickname":"黑山路","id":"53866"},{"nickname":"Evelyn Zhu?(DY)","id":"53954"},{"nickname":"Darko 梁大宽","id":"54372"},{"nickname":"*兰草*","id":"54425"},{"nickname":"张曦予","id":"54458"},{"nickname":"大鹏","id":"54600"},{"nickname":"Grace ","id":"54640"},{"nickname":"黄鹤","id":"54790"},{"nickname":"言之","id":"55027"},{"nickname":"点点","id":"55366"},{"nickname":"不笑狼","id":"55758"},{"nickname":"史东修","id":"55849"},{"nickname":"凉夜","id":"55945"},{"nickname":"小白盖","id":"56346"},{"nickname":"芒格","id":"56359"},{"nickname":"なな","id":"56526"},{"nickname":" 申老师13622842944","id":"56551"},{"nickname":"交流电","id":"56585"},{"nickname":"正己","id":"56598"},{"nickname":"Jack","id":"56744"},{"nickname":"Linda???","id":"56777"},{"nickname":"վ'ᴗ' ի 大花猫冯夏","id":"56803"},{"nickname":"elva","id":"56824"},{"nickname":"小龙","id":"57185"},{"nickname":"Vi Kwan","id":"57243"},{"nickname":"突然想改名就改了(｡-_-｡)","id":"57304"},{"nickname":"紫霜","id":"57319"},{"nickname":"月亮与六便士","id":"57381"},{"nickname":"友阳","id":"57475"},{"nickname":"萍萍在魔都","id":"57638"},{"nickname":"星","id":"58163"},{"nickname":"吴燕","id":"58313"},{"nickname":"徐明娇","id":"58334"},{"nickname":"Mandy 张","id":"58548"},{"nickname":"摆渡人","id":"58948"},{"nickname":"?新春?","id":"59065"},{"nickname":"西瓜头","id":"59224"},{"nickname":"痞子张 老师","id":"59450"},{"nickname":"差不多先生","id":"59513"},{"nickname":"hi-story","id":"59786"},{"nickname":"聪心触發","id":"59869"},{"nickname":"Maggie强君","id":"59997"},{"nickname":"jiao娇season","id":"60002"},{"nickname":"李军","id":"60141"},{"nickname":"停虫798","id":"60186"},{"nickname":"Smile小美","id":"60549"},{"nickname":"Helen","id":"60572"},{"nickname":"Jiaqi","id":"60650"},{"nickname":"，大鱼酱?","id":"60680"},{"nickname":"三十年","id":"60752"},{"nickname":"?紫桃轩✨","id":"60834"},{"nickname":"遇。。","id":"60919"},{"nickname":"免费模式学习者","id":"60945"},{"nickname":"其其","id":"61037"},{"nickname":"成玉","id":"61045"},{"nickname":"罗琴fiona","id":"61059"},{"nickname":"林萧","id":"61077"},{"nickname":"左娇Hazel～","id":"61083"},{"nickname":"明月","id":"61100"},{"nickname":"醉别烟雨丶","id":"61137"},{"nickname":"张波","id":"61143"},{"nickname":"乖，过来","id":"61167"},{"nickname":"彩。","id":"61181"},{"nickname":"来自火星边上的胖子","id":"61240"},{"nickname":"Victor","id":"61243"},{"nickname":"静守阳光","id":"61278"},{"nickname":"jean余娟","id":"61305"},{"nickname":"凌燕","id":"61348"},{"nickname":" 马多多 、","id":"61368"},{"nickname":"翁莹莹","id":"61376"},{"nickname":"Kate.Mao","id":"61379"},{"nickname":"陈莎","id":"61411"},{"nickname":"爽爽","id":"61450"},{"nickname":"?贤芳?","id":"61471"},{"nickname":"llf","id":"61483"},{"nickname":"Qin","id":"61493"},{"nickname":"娜娜","id":"61512"},{"nickname":"?Lijie","id":"61516"},{"nickname":"Cynthia_月","id":"61577"},{"nickname":"清泉流水","id":"61634"},{"nickname":"suki","id":"61635"},{"nickname":"柴进","id":"61658"},{"nickname":"小司","id":"61676"},{"nickname":"九霄","id":"61689"},{"nickname":"恋","id":"61730"},{"nickname":"竹本龙虾","id":"61749"},{"nickname":"有知","id":"61794"},{"nickname":"先生有话说","id":"61822"},{"nickname":"笑笑","id":"61823"},{"nickname":"透","id":"61827"},{"nickname":"Rocío.Yang.","id":"61900"},{"nickname":"重剑无锋","id":"62002"},{"nickname":"coco","id":"62029"},{"nickname":"郭贞海","id":"62044"},{"nickname":"行者","id":"62053"},{"nickname":"zw","id":"62086"},{"nickname":"尹喜","id":"62099"},{"nickname":"霖煦","id":"62117"},{"nickname":"无","id":"62136"},{"nickname":"曹小仙儿","id":"62140"},{"nickname":"玉","id":"62160"},{"nickname":"贾先生","id":"62195"},{"nickname":"啊喵。","id":"62249"},{"nickname":"豆豆","id":"62303"},{"nickname":"?魔鱼?","id":"62318"},{"nickname":"张崛","id":"62524"},{"nickname":"","id":"62534"},{"nickname":"★-sunshine*✨","id":"62611"},{"nickname":"方舟","id":"62668"},{"nickname":"little sun","id":"62673"},{"nickname":"lan","id":"62723"},{"nickname":"Jay","id":"63069"},{"nickname":"曾燕珍jenny","id":"63136"},{"nickname":"棉质先生","id":"63267"},{"nickname":"七公子","id":"63316"},{"nickname":"vivi","id":"63340"},{"nickname":"Anddy韩","id":"63354"},{"nickname":"胡丙良","id":"63394"},{"nickname":"雨馨","id":"63411"},{"nickname":"A江西王祥@专注学历教育","id":"63477"},{"nickname":"颖","id":"63493"},{"nickname":"Elfin","id":"63509"},{"nickname":"\"life is life ","id":"63653"},{"nickname":"Vivian","id":"63708"},{"nickname":"古灵精怪的鹅妹子嘤","id":"63977"},{"nickname":"秋芬","id":"64074"},{"nickname":"蓝色独角兽","id":"64116"},{"nickname":"火翼","id":"64230"},{"nickname":"小泽","id":"64240"},{"nickname":"乔泓淅","id":"64245"},{"nickname":"TSMM_Madge","id":"64361"},{"nickname":"王克伟","id":"64569"},{"nickname":"SUPER SUMMER","id":"64690"},{"nickname":"crystal","id":"64877"},{"nickname":"樊湾","id":"64967"},{"nickname":"慧^o^Zhen","id":"65047"},{"nickname":"Samuel","id":"65049"},{"nickname":"二哈","id":"65064"},{"nickname":"王杰","id":"65065"},{"nickname":"K.LUI","id":"65112"},{"nickname":"安之","id":"65191"},{"nickname":"小宁echo","id":"65209"},{"nickname":"Richard","id":"65233"},{"nickname":"玖月的奇迹","id":"65258"},{"nickname":"Wanyi_J","id":"65286"},{"nickname":"Monica","id":"65295"},{"nickname":"Cyndi","id":"65319"},{"nickname":"CHEN『乐创景观』","id":"65326"},{"nickname":"柏拉兔","id":"65334"},{"nickname":"浅笑","id":"65358"},{"nickname":"JANET","id":"65365"},{"nickname":"苍穹猎鹰","id":"65385"},{"nickname":"悦娜","id":"65390"},{"nickname":"the Shining Ones","id":"65435"},{"nickname":"关于起名这件事我真的不在行","id":"65447"},{"nickname":"Lizzy","id":"65454"},{"nickname":"康德的星空","id":"65459"},{"nickname":"智能的一只","id":"65478"},{"nickname":"大菁小怪-","id":"65479"},{"nickname":"Yuki","id":"65487"},{"nickname":"mengmemg","id":"65488"},{"nickname":"?余生","id":"65494"},{"nickname":"小小","id":"65545"},{"nickname":"Lynn?","id":"65570"},{"nickname":"?玟汐?","id":"65588"},{"nickname":"郝召娟","id":"65603"},{"nickname":"豆子","id":"65607"},{"nickname":"Charlene","id":"65643"}]

router.get('/operation/letter/load', (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      'msg': letterData,
      'code': 200
    }), Math.random() * 1000)
})

module.exports = router
