import * as React from 'react'
import { connect } from 'react-redux'
import { set, startLoad, endLoad, alertMsg } from 'redux/actions'
import { changeTitle } from 'utils/helpers'
import { checkSubscribe, loadAnnualPrizeCards, loadPersonalAnnualPrizeCard, receiveAnnualCards } from './async'
import { configShare } from '../helpers/JsConfig'
import { SubmitButton } from '../../components/submitbutton/SubmitButton'
import './Annual.less'
import AssetImg from '../../components/AssetImg'
import RenderInBody from '../../components/RenderInBody'

@connect(state => state)
export default class Annual extends React.Component<any, any> {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      showTips: false,
      data: [],
      showQrDialog: false,
      qrCode: ''
    }
  }

  async componentWillMount() {
    changeTitle('礼品卡')
    const { dispatch } = this.props
    const { riseId } = this.props.location.query

    dispatch(startLoad())

    if(riseId) {
      // 新人打开页面
      let otherPrizeCards = await loadAnnualPrizeCards(riseId)
      dispatch(endLoad())
      if(otherPrizeCards.code === 200) {
        this.configShareOptionMenu(otherPrizeCards.msg)
      }
    } else {
      let personalPrizeCards = await loadPersonalAnnualPrizeCard()
      dispatch(endLoad())
      if(personalPrizeCards.code === 200) {
        this.configShareOptionMenu(personalPrizeCards.msg)
      }
    }
  }

  configShareOptionMenu(msg) {
    //分享给好友
    configShare(`年终总结`,
      `https://${window.location.hostname}/rise/static/guest/annual?riseId=${msg[0].riseId}`,
      'https://static.iqycamp.com/images/rise_share.jpg?imageslim',
      '点击查看')
    this.setState({
      data: msg
    })
  }

  //点击分享
  handleShare() {
    const { dispatch } = this.props
    this.setState({
      showTips: true
    })
  }

  /**
   * 点击领取卡片
   * @param item
   */
  clickCard(item) {
    const { dispatch } = this.props
    const { riseId = '0' } = this.props.location.query
    if(riseId === '0') {
      return
    }
    if(item.used) {
      dispatch(alertMsg('该礼品卡已经被领取'))
    } else {
      //检查是否关注
      checkSubscribe(window.location.href, 'annual').then(res => {
        if(res.code === 200) {
          if(res.msg === 'ok') {
            receiveAnnualCards(item.id).then(res1 => {
              const { code, msg } = res1
              if(code === 200) {
                dispatch(alertMsg(msg))
              }
            })
          }
          else {
            this.setState({
              showQrDialog: true,
              qrCode: res.msg
            })
          }
        }
      })
    }
  }

  renderCardInfo() {
    const { data } = this.state

    return (
      <div className="card-tab-body">
        <ul className="card-list">
          {data ? data.map((item, idx) => {
            return (
              <li key={idx} className="card-item">
                <div className="card_container">
                  <div className="body_container">
                    <div className="card_pic" onClick={() => this.clickCard(item)}>
                      {item.used ? <div>已领取</div> : null}
                    </div>
                  </div>
                  <div className="card_bottom"></div>
                </div>
              </li>
            )
          }) : null}
        </ul>
      </div>
    )
  }

  render() {
    const { riseId } = this.props.location.query
    const { showTips, showQrDialog, qrCode } = this.state

    const renderHeader = () => {
      return (
        <div className="header_container">
          <div className="header_body">
            {
              !riseId ? '我的礼品卡' : 'ta的礼品卡'
            }
          </div>
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

    const renderContainer = () => {
      return (
        <div className="mime_card_container">
          {renderHeader()}
          {this.renderCardInfo()}
          {!riseId && renderSendBtn()}
          {
            showTips &&
            <div className="annual-share-tip" onClick={() => this.setState({ showTips: false })}>
              <div className="tip-pic">
                <img src="https://static.iqycamp.com/images/share_pic1.png" width={247}/>
              </div>
            </div>
          }
        </div>
      )
    }

    const showQr = () => {
      return (
        <RenderInBody>
          <div className="qr_dialog">
            <div className="qr_dialog_mask" onClick={() => {
              this.setState({ showQrDialog: false })
            }}>
            </div>
            <div className="qr_dialog_content">
              <span>扫码后关注圈外公众号</span>
              <div className="qr_code">
                <AssetImg url={qrCode}/>
              </div>
            </div>
          </div>
        </RenderInBody>
      )
    }

    return (
      <div>
        {showQrDialog ? showQr() : renderContainer()}
      </div>
    )
  }
}
