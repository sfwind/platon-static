import * as React from 'react'
import './subscribeAlert.less'
import AssetImg from '../../components/AssetImg'
import { lockWindow, unlockWindow } from '../../utils/helpers'

interface SubscribeAlertProps {
  closeFunc: any
}

export class SubscribeAlert extends React.Component<SubscribeAlertProps, any> {

  constructor () {
    super();
    this.state = {}
  }

  componentWillMount () {
    lockWindow();
    this.setState({
      show: this.props.show,
      closeFunc: this.props.closeFunc,
      asstWechat: this.props.asstWechat,

    })
  }

  componentWillReceiveProps (nextProps) {
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      this.setState({
        show: nextProps.show,
        closeFunc: nextProps.closeFunc,
        asstWechat: nextProps.asstWechat,

      })
    }
  }

  componentWillUnmount () {
    unlockWindow()
  }

  render () {
    const { closeFunc = () => {} } = this.state;

    return (
      <div className="subscribe-alert-component">
        <div className="content-box">
          <AssetImg className="subscribe-success" url="http://static.iqycamp.com/subscribe_success-lu5oeic1.png"/>
          <div className="success-content">恭喜你已
            <span className="orange">预约成功！</span>
          </div>
          <div className="add-tip">
            长按扫码添加
            <br/>
            圈外小Y（ID：quanwai666）
            <br/>
            回复【预购】，领取<span className="orange">课程学习资料包</span>
          </div>
          <AssetImg className="qrcode" url={this.state.asstWechat? this.state.asstWechat:"https://static.iqycamp.com/images/qrcode_xiaoy.jpg?imageslim"}/>
        </div>
        <AssetImg className="close-icon"
                  url="http://static.iqycamp.com/subscribe_icon_close-2vyuissf.png"
                  onClick={() => closeFunc()}/>
      </div>
    )
  }

}
