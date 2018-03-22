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

const letterData = [{"nickname":"许江锋","id":"12860"},{"nickname":"周林鑫","id":"4001"},{"nickname":"赵元森","id":"49670"},{"nickname":"张超","id":"8980"},{"nickname":"翁莹莹","id":"61376"},{"nickname":"闫智翔","id":"26750"},{"nickname":"王华","id":"39324"},{"nickname":"周新星","id":"45871"},{"nickname":"赵福明","id":"61689"},{"nickname":"翟欣欣","id":"30756"},{"nickname":"史东修","id":"55849"},{"nickname":"查爽爽","id":"61450"},{"nickname":"熊财政","id":"30869"},{"nickname":"邱予芃","id":"54600"},{"nickname":"陈丹娜","id":"41094"},{"nickname":"刘丹","id":"34936"},{"nickname":"左娇","id":"61083"},{"nickname":"王珍婷","id":"20837"}]

router.get('/operation/letter/load', (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      'msg': letterData,
      'code': 200
    }), Math.random() * 1000)
})

router.get('/rise/customer/global/notify', (req, res) => {
  setTimeout(() =>
    res.status(200).json({
      'msg': {"msg":{"id":null,"profileId":null,"orderId":null,"memberTypeId":null,"openDate":null,"expireDate":null,"expired":false,"addTime":null,"startTime":null,"endTime":null,"name":null,"expiredInSevenDays":false,"showGlobalNotify":false},"code":200},
      'code': 200
  }), Math.random() * 1000)
})

router.get('/rise/customer/info', (req, res) => {
  setTimeout(() =>
res.status(200).json({
  'msg': {"msg":{"id":0,"openid":null,"nickname":"风之伤","city":null,"country":null,"province":null,"headimgurl":"https://thirdwx.qlogo.cn/mmopen/Q3auHgzwzM6LrkJRYApibxYsAEYm2CmS7JZwX09AmHsP0X2VJQSpibHyoHsQKNcvqf1hzFgJr6l40vyhH7KtGWupGmgKHwFibbiaOOS0qKuvjsQ/132","headImgUrlCheckTime":null,"mobileNo":null,"email":null,"industry":null,"function":null,"workingLife":null,"realName":null,"signature":null,"point":null,"isFull":null,"riseId":null,"openRise":null,"unionid":null,"expireDate":null,"riseMember":null,"openNavigator":null,"openApplication":null,"openConsolidation":null,"openWelcome":null,"learningNotify":null,"requestCommentCount":null,"role":null,"address":null,"workingYear":null,"weixinId":null,"receiver":null,"married":null},"code":200},
  'code': 200
}), Math.random() * 1000)
})

module.exports = router
