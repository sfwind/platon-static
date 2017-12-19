import * as React from 'react'
import { connect } from 'react-redux'
import { set, startLoad, endLoad, alertMsg } from 'redux/actions'
import { changeTitle } from 'utils/helpers'
import './CardIntroduction.less'
import { SubmitButton } from '../schedule/components/SubmitButton'
import { configShare } from '../helpers/JsConfig'

@connect(state => state)
export default class CardIntroduction extends React.Component<any, any> {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      showTips: false
    }
  }

  componentWillMount() {
    changeTitle('学习礼品卡')
  }

  componentDidMount() {
    let id = this.props.location.query.cardId
    configShare(`送你圈外同学￥100礼品卡，和我一起赢`,
      `https://${window.location.hostname}/rise/static/card/receive?id=${id}`,
      'https://static.iqycamp.com/images/rise_share.jpg?imageslim',
      '点击领取')
  }

  //点击分享
  handleShare() {
    const { dispatch } = this.props
    this.setState({
      showTips: true
    })
  }

  render() {
    const { showTips } = this.state
    const renderCard = () => {

      return (
        <div className="card_pic">

        </div>
      )

    }

    const renderIntroduction = () => {
      return (
        <div className="introduction_container">
          <div className="introduction_title">知识送礼怎么玩</div>
          <div className="introduction_what_title">什么是礼品卡？</div>
        </div>
      )
    }

    const renderSendBtn = () => {
      return (
        <div>
          <SubmitButton buttonText='赠送好友' clickFunc={() => this.handleShare()}/>
        </div>
      )
    }

    return (
      <div className="card_introduction_container">
        <div className="body_container">
          {renderCard()}
          {renderIntroduction()}
          {renderSendBtn()}
          {showTips ?
            <div className="card_introduction_share-tip" onClick={() => this.setState({ showTips: false })}>
              <div className="tip-pic">
                <img src="https://static.iqycamp.com/images/share_pic1.png" width={247}/>
              </div>
            </div>
            : null
          }
        </div>
      </div>
    )
  }
}
