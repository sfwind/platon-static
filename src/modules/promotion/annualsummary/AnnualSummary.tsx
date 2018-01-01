import * as React from 'react'
import './AnnualSummary.less'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg } from 'redux/actions'
import { NextStepButton } from './components/NextStepButton'
import { Step_Start } from './steps/Step_Start'
import { Step1_SchoolGate } from './steps/Step1_SchoolGate'
import { Step2_ActivityCenter } from './steps/Step2_ActivityCenter'
import { Step3_TeachingBuilding } from './steps/Step3_TeachingBuilding'
import { Step4_Library } from './steps/Step4_Library'
import { Step5_Auditorium } from './steps/Step5_Auditorium'
import { getPromotionUserInfo, receivePrizeCard } from './async'
import { configShare } from '../../helpers/JsConfig'
import AssetImg from '../../../components/AssetImg'

@connect(state => state)
export default class AnnualSummary extends React.Component {

  constructor() {
    super()
    this.state = {
      personStep: this.PERSON_STEPS.init,
      showShareTip: false,
      showPage: false
    }
  }

  PERSON_STEPS = {
    init: 'init',
    building1: 'building1',
    building2: 'building2',
    building3: 'building3',
    building4: 'building4',
    building5: 'building5',
    jumpBuilding5: 'jumpBuilding5'
  }

  async componentWillMount() {
    const { riseId } = this.props.location.query
    let userInfo = await getPromotionUserInfo(riseId)
    if(userInfo.code === 200) {
      let msg = userInfo.msg
      this.setState({
        riseId: msg.masterRiseId,
        nickName: msg.masterNickName,
        headImageUrl: msg.masterHeadImageUrl,
        isSelf: msg.currentRiseId === msg.masterRiseId,
        stepBox: this.loadCurrentBuilding(),
        showPage: true
      })
    }
  }

  handleNextStep(sleepTime = 2000) {
    this.setState({
      stepBox: <div></div>
    })
    let person = document.getElementById('person')
    let step = person.dataset.nextstep
    let nextStep = ''
    switch(step) {
      case this.PERSON_STEPS.init:
        nextStep = this.PERSON_STEPS.building1
        break
      case this.PERSON_STEPS.building1:
        nextStep = this.PERSON_STEPS.building2
        break
      case this.PERSON_STEPS.building2:
        nextStep = this.PERSON_STEPS.building3
        break
      case this.PERSON_STEPS.building3:
        if(this.state.isSelf) {
          nextStep = this.PERSON_STEPS.building4
        } else {
          nextStep = this.PERSON_STEPS.jumpBuilding5
        }
        break
      case this.PERSON_STEPS.building4:
        nextStep = this.PERSON_STEPS.building5
        break
      default:
        break
    }
    person.dataset.nextstep = nextStep
    this.setState({ personStep: nextStep }, () => {
      setTimeout(() => {
        this.setState({
          stepBox: this.loadCurrentBuilding()
        })
      }, sleepTime)
    })
  }

  loadCurrentBuilding() {
    const { personStep, isSelf } = this.state

    let result = []
    switch(personStep) {
      case this.PERSON_STEPS.init:
        result.push(<Step_Start getGlobalState={() => this.state}/>)
        result.push(<NextStepButton buttonText="开始回顾" clickFunc={() => this.handleNextStep(1000)}
                                    style={{ backgroundColor: '#f8aa08', color: '#fff', bottom: '14rem' }}/>)
        return result
      case this.PERSON_STEPS.building1:
        result.push(<Step1_SchoolGate getGlobalState={() => this.state}/>)
        result.push(<NextStepButton buttonText="下一步" clickFunc={() => this.handleNextStep()}/>)
        break
      case this.PERSON_STEPS.building2:
        result.push(<Step2_ActivityCenter getGlobalState={() => this.state}/>)
        result.push(<NextStepButton buttonText="下一步" clickFunc={() => this.handleNextStep()}/>)
        break
      case this.PERSON_STEPS.building3:
        result.push(<Step3_TeachingBuilding getGlobalState={() => this.state}/>)
        result.push(<NextStepButton buttonText="下一步" clickFunc={() => this.handleNextStep(isSelf ? 2000 : 4000)}/>)
        break
      case this.PERSON_STEPS.building4:
        result.push(<Step4_Library getGlobalState={() => this.state}/>)
        result.push(<NextStepButton buttonText="下一步" clickFunc={() => this.handleNextStep()}/>)
        break
      case this.PERSON_STEPS.building5:
        result.push(<Step5_Auditorium getGlobalState={() => this.state}/>)
        result.push(<NextStepButton buttonText="分享" clickFunc={() => this.configShareOption()}/>)
        break
      case this.PERSON_STEPS.jumpBuilding5:
        result.push(<Step5_Auditorium getGlobalState={() => this.state}
                                      receivePrizeCardFunc={(prizeCardNo) => this.handleClickReceivePrizeCard(prizeCardNo)}/>)
        break
      default:
        return
    }
    result.push(<div className="mask" id='mask'></div>)
    return result
  }

  configShareOption() {
    this.setState({
      showShareTip: true
    })
    configShare(
      `回顾了在圈外商学院的2017后，我想发你这张邀请函`,
      `https://${window.location.hostname}/rise/static/guest/annual/summary?riseId=${this.state.riseId}`,
      'https://static.iqycamp.com/images/share_link_icon.jpg?imageslim',
      '一份最有价值的新年礼')
  }

  async handleClickReceivePrizeCard(prizeCardNo) {
    const { dispatch } = this.props
    let res = await receivePrizeCard(prizeCardNo)
    if(res.code === 200) {
      dispatch(alertMsg('领取成功'))
    } else if(res.code === 201) {
      document.getElementById('mask').style.zIndex = 20
      this.setState({
        showQrCode: true,
        qrCodeUrl: res.msg
      })
    } else {
      dispatch(alertMsg(res.msg))
    }
    return res
  }

  render() {
    const {
      personStep = this.PERSON_STEPS.init,
      stepBox = <div></div>,
      headImageUrl = '',
      showQrCode = false,
      qrCodeUrl = 'https://static.iqycamp.com/images/serverQrCode.jpg?imageslim',
      showShareTip,
      showPage
    } = this.state

    if(!showPage) return <div></div>

    return (
      <div className="annual-summary-container">
        <div className="move-block">
          <div id="person" className={`person step-${personStep}`}
               data-nextstep={this.PERSON_STEPS.init}>
            <div className="headimage"
                 style={{ background: `url(${headImageUrl}) no-repeat` }}>
            </div>
          </div>
          {
            showShareTip ?
              <div className="mask" id='mask'></div> :
              stepBox
          }
          {/*<Step1_SchoolGate getGlobalState={() => this.state}/>*/}
          {/*<Step2_ActivityCenter getGlobalState={() => this.state}/>*/}
          {/*<Step3_TeachingBuilding getGlobalState={() => this.state}/>*/}
          {/*<Step4_Library getGlobalState={() => this.state}/>*/}
          {/*<Step5_Auditorium getGlobalState={() => this.state}/>*/}
          {/*<div className="mask" id='mask'></div>*/}
          {
            showQrCode &&
            <div className="qrcode-box"
                 onClick={() => {
                   document.getElementById('mask').style.zIndex = 5
                   this.setState({ showQrCode: false })
                 }}>
              <AssetImg className="qrcode" url={qrCodeUrl}/>
            </div>
          }
          {
            showShareTip &&
            <AssetImg className="annual-share" url="https://static.iqycamp.com/images/annual_share.png"/>
          }
        </div>
      </div>
    )
  }

}
