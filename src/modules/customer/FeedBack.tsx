import * as React from 'react'
import './FeedBack.less'
import { changeTitle } from 'utils/helpers'
import { mark } from 'utils/request'
import AssetImg from '../../components/AssetImg'
import { MarkBlock } from '../../components/markblock/MarkBlock'

export default class FeedBack extends React.Component<any, any> {
  constructor(props) {
    super(props)
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    changeTitle('帮助')
    mark({ module: '打点', function: '帮助', action: '打开帮助页面' })
  }

  render() {
    return (
      <div className="feedback">
        <MarkBlock module={'打点'} func={'帮助页面'} action={'点击用户协议'}
                   onClick={() => this.context.router.push('/rise/static/customer/userprotocol')}
                   className="feedback-header arrow">
          用户协议
        </MarkBlock>
        <div className="feedback-container">
          <div className="tip">
            <p style={{ fontSize: '15px', fontWeight: 'bolder' }}>有疑问或建议，请给后台留言</p>
            <div className="serverCode">
              <AssetImg url="https://static.iqycamp.com/images/personalFeedbackv2.png"/>
            </div>
            <p style={{ fontSize: '15px', fontWeight: 'bolder' }}>常见问题</p><br/>

            <p className="q">-可以在电脑端完成圈外课程练习吗？</p>
            <p>-可以登录www.iquanwai.com/community完成</p><br/>

            <p className="q">-为什么我的课程到期关闭了？</p>
            <p>-书非借不能读，为了每个人能有动力坚持完成练习，每个课程的开放天数=30天(拖延症福利)，到期后自动关闭</p><br/>

            <p className="q">-课程的老师是谁啊？</p>
            <p>-圈外的课程多数是圈圈设计、整个团队一同打磨出来的，另外的是和一些业界大V合作开发的</p><br/>

            <p className="q">还想了解更多【商学院】的使用问题？戳链接直达：</p>
            <p><a style={{ color: '#55cbcb', textDecoration: 'underline' }}
                  href="https://shimo.im/doc/EQFflI3uWg4mE9FZ?r=GQ373Y/">
              {'https://shimo.im/doc/EQFflI3uWg4mE9FZ?r=GQ373Y/'}</a>
            </p>
            <br/>
            <p className="q">还想了解更多【专项课】的使用问题？戳链接直达：</p>
            <p><a style={{ color: '#55cbcb', textDecoration: 'underline' }}
                  href="https://shimo.im/doc/DjJ32owqYC0iBTIw?r=GQ373Y/">
              {'https://shimo.im/doc/DjJ32owqYC0iBTIw?r=GQ373Y/'}</a>
            </p>
            <br/>
          </div>
        </div>
        <div className="padding-footer"/>
      </div>
    )
  }
}
