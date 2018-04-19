import * as React from 'react'
import _ from 'lodash'
import { set, startLoad, endLoad, alertMsg } from 'reduxutil/actions'
import TextInput from './TextInput'
import { getMobileCode } from './async'
import './MobileBind.less'

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：platon-static
 2. 文件功能：手机号绑定组件
 3. 作者： yangren@iquanwai.com
 4. 备注：
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


export default class MobileBind extends React.Component<any,any>{

  constructor(props) {
    super(props)
    this.state = {
      sending: false,
      seconds: 60,
      show: false
    }
    this.intervalTrigger = null
  }

  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  点击发送验证码
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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

  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  点击修改手机号
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  handleChangePhone(e) {
    let value = e.currentTarget.value
    this.props.changeMobile(value)
  }


  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  点击修改code
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  handleChangeCode(e) {
    let value = e.currentTarget.value
    this.props.changeCode(value)
  }

  render() {
    const { sending, seconds,code} = this.state
    let { mobile } = this.props

    if(mobile == null) {
      mobile = ''
    }
    return (
      <div className="base-mobile-bind-component">
            <TextInput placeholder={'请填写手机号'} value={mobile} label="手机号"
                       onChange={(e) => this.handleChangePhone(e)}/>
            <TextInput placeholder="请填写" value={code} label="验证码"
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
        <div className="interval-div">
        </div>
      </div>
    )
  }
}
