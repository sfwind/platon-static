import * as React from 'react'
import { connect } from 'react-redux'
import { SubmitButton } from '../schedule/components/SubmitButton'
import { configShare } from '../helpers/JsConfig'
import { checkSubscribe } from '../interlocution/async'
import RenderInBody from '../../components/RenderInBody'
import AssetImg from '../../components/AssetImg'
import { receivePreviewCard, sendTemplate } from './async'
import { set, startLoad, endLoad, alertMsg } from 'redux/actions'
import './SendCard.less'
import { closeWindow } from '../helpers/JsConfig'

@connect(state => state)
export default class SendCard extends React.Component<any, any> {

  constructor(props) {
    super(props)

    this.state = {
      showQrDialog: false,
      qrCode: '',
      showTip: false
    }
  }

  componentWillMount() {
    const { cardId } = this.props.location.query
    //分享给好友
    configShare(`送你￥168礼品卡，开启7天圈外商学院线上体验之旅！`,
      `https://${window.location.hostname}/rise/static/guest/card/send?cardId=${cardId}`,
      'https://static.iqycamp.com/images/card/prize_card.png?imageslim',
      '点击领取，有效期截止2018.01.07')
  }

  handleClick() {
    const { cardId } = this.props.location.query
    const { dispatch } = this.props
    //检查是否关注
    checkSubscribe(window.location.href, 'prize_card_cardId_' + cardId).then(res => {
      if(res.code === 200) {
        if(res.msg === 'ok') {
          //领取礼品卡
          receivePreviewCard(cardId).then(res1 => {
            if(res1.code === 200) {
              closeWindow()
              sendTemplate().then(res2 => {
              })
            }
            else {
              this.setState({
                showTip: true
              })
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

  /*点击确定按钮
   */
  handleTipButton = () => {
    this.setState({
      showTip: false
    })
  }

  render() {
    const { showQrDialog, qrCode, showTip } = this.state
    const showQr = () => {
      return (
        <RenderInBody>
          <div className="qr_dialog">
            <div className="qr_dialog_mask" onClick={() => {
              this.setState({ showQrDialog: false })
            }}>
            </div>
            <div className="qr_dialog_content">
              <span>长按关注圈外商学院，完成体验卡领取。</span>
              <div className="qr_code">
                <AssetImg url={qrCode}/>
              </div>
            </div>
          </div>
        </RenderInBody>
      )
    }

    const renderShowTips = () => {

      return (
        <div className="tip-container">
          <div className="show-tip">
            <div className="content-container">
              <div>您已在圈外学习过，无需重复体验</div>
              <div>可以点击右上角，转发给需要的小伙伴！</div>
              <div className="border-bottom"></div>
              <div className="button" onClick={() => this.handleTipButton()}>确定</div>
            </div>
          </div>

        </div>
      )
    }

    return (
      <div className="card-body-container">
        {
          showQrDialog ? showQr() :
            <div className="total-container">
              <img src="https://static.iqycamp.com/images/card/prize_card.png?imageslim" className="card_img"/>
              <div className="card-rise-title">
                商学院体验卡
              </div>
              <div className="content-container">
                <div>
                  • 本卡价值¥168，用于兑换商学院7天线上体验课--
                </div>
                <div>
                  《认识自己|用冰山模型分析出真实的你》
                </div>
                <div>
                  • 体验时间：2018.01.07 - 2018.01.14
                </div>
                <div>
                  • 每位用户只能领取一次
                </div>
                <div>
                  • 有效期至2018.01.07
                </div>
              </div>
              <SubmitButton clickFunc={() => this.handleClick()} buttonText='领取'/>
            </div>
        }
        {showTip && renderShowTips()}
      </div>
    )
  }

}
