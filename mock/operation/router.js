var Router = require('express').Router

var router = new Router()

router.post('/rise/operation/free/submit/*', (req, res) => {
  setTimeout(() =>
    res.status(200).json(
      {
        'msg': {
          'learnFreeLimit': false,
          'result': '你已获得免费领取洞察力课程资格啦',
          'percent': 80,
          'suggestion': '根据测评结果，我们建议你:\n\n  1. 掌握更多的提问技巧，挖掘他人隐藏的真实需求\n  2. 提升自己的分析能力，遇到难题时，先找到根本原因\n  3. 找到根本原因后，根据关键程度和解决成本，定位最有价值的问题\n\n当你的大量时间都在解决高价值问题时，就能成为在职场上游刃有余的高效能人士啦。\n\n如果你想要充分发挥自己的洞察力潜力，可以使用【洞察力强化包】(原价99,点击下方按钮免费领取)。据说已经使用的小伙伴，有人已经跳槽成功，薪资连涨三倍。'
        }, 'code': 200
      }
    ), Math.random() * 1500)
})

router.get('/rise/operation/free/init', (req, res) => {
  setTimeout(() =>
    res.status(200).json(
      {'msg': 'ok', 'code': 200}
    ), Math.random() * 1500)
})

router.post('/rise/operation/free/share/*', (req, res) => {
  setTimeout(() =>
    res.status(200).json(
      {'msg': 'ok', 'code': 200}
    ), Math.random() * 1500)
})

router.get('/rise/operation/free/coupon', (req, res) => {
  setTimeout(() =>
    res.status(200).json(
      {'msg': false, 'code': 200}
    ), Math.random() * 1500)
})

router.get('/rise/operation/annual/summary/user', (req, res) => {
  res.status(200).json(
    {
      'code': 200,
      'msg': {
        'currentRiseId': 'aaa',
        'masterRiseId': 'aaa',
        'masterHeadImageUrl': 'https://static.iqycamp.com/headImage-97yboxsa-blob'
      }
    }
  )
})

router.get('/rise/operation/annual/summary/schoolgate', (req, res) => {
  res.status(200).json(
    {
      'code': 200,
      'msg': {
        'registerDate': '2000年01月01日',
        'registerSequence': 2
      }
    }
  )
})

router.get('/rise/operation/annual/summary/library', (req, res) => {
  res.status(200).json(
    {
      'code': 200,
      'msg': {
        'courseCount': 25,
        'knowledgeCount': 100,
        'allRightCount': 10,
        'assts': [
          {
            'nickName': '三十文',
            'headImageUrl': 'https://static.iqycamp.com/headImage-97yboxsa-blob'
          },
          {
            'nickName': '薛定谔的猫',
            'headImageUrl': 'https://static.iqycamp.com/headImage-97yboxsa-blob'
          },
          {
            'nickName': 'aDASdwfe',
            'headImageUrl': 'https://static.iqycamp.com/headImage-97yboxsa-blob'
          }
        ],
        'classmates': [
          {
            'nickName': '三十文',
            'headImageUrl': 'https://static.iqycamp.com/headImage-97yboxsa-blob'
          },
          {
            'nickName': '薛定谔的猫',
            'headImageUrl': 'https://static.iqycamp.com/headImage-97yboxsa-blob'
          },
          {
            'nickName': 'aDASdwfe',
            'headImageUrl': 'https://static.iqycamp.com/headImage-97yboxsa-blob'
          }
        ]
      }
    }
  )
})

router.get('/rise/operation/annual/summary/auditorium', (req, res) => {
  res.status(200).json(
    {
      'code': 200,
      'msg': {
        'point': '100',
        'defeatPercentage': 20
      }
    }
  )
})

module.exports = router
