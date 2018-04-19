import * as React from 'react'
import _ from 'lodash'
import { set, startLoad, endLoad, alertMsg } from 'reduxutil/actions'
import TextInput from './TextInput'
import './MobileBindComponent.less'
import { getMobileCode } from './async'

export default class MobileBindComponent extends React.Component<any, any> {

  constructor(props) {
    super(props)
    this.state = {
      sending: false,
      seconds: 60,
      show: false,
      disable: true,
      oversea: false
    }
    this.intervalTrigger = null
  }

  onClick() {
    let { areaCode } = this.state
    const { dispatch ,mobile} = this.props

    let NUMBER_REG = /^[0-9]+$/
    if(!mobile) {
      dispatch(alertMsg('请输入手机号码'))
      return
    }
    if(!NUMBER_REG.test(mobile)) {
      dispatch(alertMsg('请输入格式正确的手机'))
      return
    }
    let param = {}
    // 中国的区号不下发
    if(areaCode && areaCode !== '86' && areaCode !== '+86') {
      if(areaCode.indexOf('+') === 0) {
        areaCode = areaCode.substring(1)
      }
      if(!NUMBER_REG.test(areaCode)) {
        dispatch(alertMsg('请输入格式正确的国家/地区号'))
        return
      }
      param = _.merge({}, { areaCode, phone: _.trim(mobile) })
    } else {
      param = _.merge({}, { phone: _.trim(mobile) })
    }
    if(this.intervalTrigger) {
      clearInterval(this.intervalTrigger)
    }
    this.setState({ seconds: 60, sending: true })
    this.intervalTrigger = setInterval(() => {
      this.setState({ seconds: this.state.seconds - 1 })
      if(this.state.seconds <= 0) {
        this.setState({ sending: false })
        clearInterval(this.intervalTrigger)
      }
    }, 1000)

    getMobileCode(param)
  }


  handleChangePhone(e) {
    let value = e.currentTarget.value
    this.props.changeMobile(value)
  }

  handleChangeWeixin(e) {
    let value = e.currentTarget.value
    this.props.changeWeiXinId(value)
  }

  handleChangeCode(e) {
    let value = e.currentTarget.value
    this.props.changeCode(value)
  }

  render() {
    const { sending, seconds, code, oversea } = this.state
    let { mobile, weixinId } = this.props

    if(mobile == null) {
      mobile = ''
    }
    if(weixinId == null) {
      weixinId = ''
    }
    return (
      <div className="mobile-bind-component">
        {oversea ?
          <div>
            <div className="mobile-switch" onClick={() => {
              if(mobile && code) {
                this.setState({
                  oversea: false,
                  disable: false
                })
              } else {
                this.setState({ oversea: false, disable: true })
              }
            }}>
              <div className="label">
                点击切换到国内用户模式
              </div>
            </div>
            <TextInput placeholder={'不确定？微信点击右下角“我”可查看'} value={weixinId} label="微信号"
                       onChange={(e) => this.handleChangeWeixin(e)}/>
          </div>
          :
          <div>
            <div className="mobile-switch" onClick={() => {
              if(weixinId) {
                this.setState({
                  oversea: true,
                  disable: false
                })
              } else {
                this.setState({ oversea: true, disable: true })
              }
            }}>
              <div className="label">
                点击切换到国外用户模式
              </div>
            </div>
            <TextInput placeholder={'请填写手机号'} value={mobile} label="手机号"
                       onChange={(e) => this.handleChangePhone(e)}/>
            <TextInput placeholder="请填写" value={this.state.code} label="验证码"
                       onChange={(e) => this.handleChangeCode(e)}>
              {
                sending ?
                  <div className={`send-code sending`}>
                    {seconds}秒后重新发送
                  </div> :
                  <div className={`send-code free`} onClick={() => this.onClick()}>
                    发送验证码
                  </div>
              }
            </TextInput>
            <TextInput placeholder={'不确定？微信点击右下角“我”可查看'} value={weixinId} label="微信号"
                       onChange={(e) => this.handleChangeWeixin(e)}/>
          </div>
        }
      </div>
    )
  }

}
