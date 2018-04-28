import * as React from 'react'
import { connect } from 'react-redux'
import { set, startLoad, endLoad, alertMsg } from 'reduxutil/actions'
import { changeTitle } from 'utils/helpers'
import { mark } from 'utils/request'
import { openNotifyStatus, closeNotifyStatus, getNotifyStatus, getOldMsg } from '../message/async'
import { loadUserInfo } from './async'
import './Personal.less'
import { CellBody, FormCell, CellFooter, Switch } from 'react-weui'
import { MarkBlock } from '../../components/markblock/MarkBlock'
import _ from 'lodash'
import { ToolBar } from '../base/ToolBar'
import WXHeadImg from './components/WXHeadImg'

/**
 * 个人中心页
 */
@connect(state => state)
export default class Personal extends React.Component<any, any> {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      userInfo: '',
      learningNotify: true
    }
  }

  componentWillMount() {
    changeTitle('个人中心')
    mark({ view: true, module: '打点', function: '个人中心', action: '打开个人中心' })
    const { dispatch } = this.props
    dispatch(startLoad())

    getNotifyStatus().then(res => {
      dispatch(endLoad())
      this.setState({ learningNotify: res.msg })
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })

    loadUserInfo().then(res => {
      const { code, msg } = res
      if(code === 200) {
        this.setState({
          userInfo: msg
        })
      } else {
        dispatch(alertMsg(msg))
      }
    })
  }

  handleClickLearningNotify() {
    const { learningNotify } = this.state
    const { dispatch } = this.props
    if(learningNotify) {
      dispatch(startLoad())
      closeNotifyStatus().then(res => {
        dispatch(endLoad())
        this.setState({ learningNotify: false })
      }).catch(ex => {
        dispatch(endLoad())
        dispatch(alertMsg(ex))
      })
    } else {
      dispatch(startLoad())
      openNotifyStatus().then(res => {
        dispatch(endLoad())
        this.setState({ learningNotify: true })
      }).catch(ex => {
        dispatch(endLoad())
        dispatch(alertMsg(ex))
      })
    }
  }

  goProfile() {
    this.context.router.push('/rise/static/customer/new/profile')
  }

  goShare() {
    mark({ module: '打点', function: '个人中心', action: '点击分享圈外商学院图片' })
    window.location.href = '/pay/static/share'
  }

  goRise() {
    mark({ module: '打点', function: '个人中心', action: '点击加入圈外商学院图片' })
    window.location.href = '/pay/rise'
  }

  goCouponList() {
    this.context.router.push('/rise/static/coupon')
  }

  goHelp() {
    this.context.router.push('/rise/static/faq')
  }

  goMessage() {
    const { dispatch } = this.props
    dispatch(startLoad())
    getOldMsg().then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        dispatch(set('noticeMsgCount', 0))
        this.context.router.push('/rise/static/message/center')
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  goProtocol() {
    this.context.router.push('/rise/static/userprotocol')
  }

  goStudyReport() {
    this.context.router.push('/rise/static/person/study/list')
  }

  goCards(sum) {
    if(sum === 0) {
      return
    }
    this.context.router.push('/rise/static/knowledge/card/list')
  }

  goCertificates(sum) {
    if(sum === 0) {
      return
    }
    this.context.router.push('/rise/static/person/certificate')
  }

  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   前往校友录页面
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  goSchoolFriend() {
    this.context.router.push(`/rise/static/customer/school/friend`)
  }

  render() {
    const { noticeMsgCount } = this.props
    const { userInfo, learningNotify } = this.state

    const renderUserInfo = () => {
      return (
        <div className="header-container">
          <MarkBlock className="img-container"
                     module={'打点'}
                     func={'个人中心'}
                     action={'点击修改信息'}
                     onClick={() => this.goProfile()}>
            <WXHeadImg src={window.ENV.headImgUrl} riseId={window.ENV.riseId}/>
            <div className="arrow"/>
          </MarkBlock>
          <div className="info-container">
            <div className="nickname-container">
              {userInfo.nickName}
            </div>
            <div className="score-container">
              积分{userInfo.point}分
            </div>
          </div>
          <div className="notice-container">
            <FormCell switch className="learn-notice">
              <CellBody>
                <div className="study-notice">学习提醒</div>
              </CellBody>
              <CellFooter>
                <MarkBlock module={'打点'} func={'个人中心'} action={'点击学习提醒'}>
                  <Switch checked={learningNotify} onClick={() => this.handleClickLearningNotify()}/>
                </MarkBlock>
              </CellFooter>
            </FormCell>
          </div>
          <div className="notice-msg">
            建议开启：周一至周五，若当天未登录学习，晚上09：30会发给学习提醒消息
          </div>
        </div>
      )
    }

    const renderCards = () => {
      return (
        <div className="card-certificate-container">
          <div className="achievement-container">
            <MarkBlock module={'打点'}
                       func={'个人中心'}
                       action={'点击知识卡'}
                       className="essenceCard"
                       onClick={() => this.goCards(userInfo.cardSum)}>
              <div className="left-header-box">
                <img className="consult-icon" src="http://static.iqycamp.com/images/card_icon.png"/>
                <span>&nbsp;知识卡{userInfo.cardSum}张</span>
              </div>
            </MarkBlock>
            <div className="middle-divider">

            </div>
            <MarkBlock module={'打点'}
                       func={'个人中心'}
                       action={'点击荣誉证书'}
                       className="certificate"
                       onClick={() => this.goCertificates(userInfo.certificateSum)}>
              <div className="right-header-box">
                <img className="consult-icon" src="http://static.iqycamp.com/images/certificate_icon.png"/>
                <span>&nbsp;荣誉证书{userInfo.certificateSum}张</span>
              </div>
            </MarkBlock>
          </div>
        </div>
      )
    }

    const renderBusiness = () => {
      return (
        <div className="business-list">
          {userInfo.showShare ?
            <img src="http://static.iqycamp.com/images/share_business.png" onClick={() => this.goShare()}/> :
            <img src="http://static.iqycamp.com/images/join_business.png" onClick={() => this.goRise()}/>}
        </div>
      )
    }

    const renderProject = () => {
      const { memberExpiredDate } = this.state.userInfo
      return (
        <div className="project-item-container">
          {memberExpiredDate && memberExpiredDate.map((item, index) => {
            return (
              <div className="project-item">
                {item}
              </div>
            )
          })}
        </div>


      )
    }

    const renderList = () => {
      return (
        <div className="list-container">
          <MarkBlock module={'打点'}
                     func={'个人中心'}
                     action={'点击抵用券'}
                     onClick={() => this.goCouponList()}
                     className="hyq-container">
            <div className="img-container">
              <img src="http://static.iqycamp.com/images/icon_yhq.png"/>
              <div className="arrow"></div>
            </div>
            <div className="content">我的抵用券</div>
            <div className="amount">{userInfo.couponSum}元</div>
            <div className="arrow"></div>
          </MarkBlock>
          <MarkBlock module={'打点'} func={'个人中心'} action={'点击校友录'} onClick={()=> this.goSchoolFriend()}
          className="friend-container">
          <div className="img-container">
          <img src='http://static.iqycamp.com/images/icon_friend.png'/>
          <div className="arrow">
          </div>
          </div>
          <div className="content">我的校友录</div>
          <div className="arrow"></div>
          </MarkBlock>

          <div className="project-container">
          <div className="img-container">
          <img src='http://static.iqycamp.com/images/icon_huiyuan.png'/>
          </div>
          <div className="content">我的学习项目</div>
          </div>

          {renderProject()}

          <MarkBlock module={'打点'}
                     func={'个人中心'}
                     action={'点击学习报告'}
                     onClick={() => this.goStudyReport()}
                     className="study-report-container">
            <div className="img-container">
              <img src="http://static.iqycamp.com/images/icon_study.png"/>
            </div>
            <div className="content">我的学习报告</div>
            <div className="arrow"></div>
          </MarkBlock>
          <MarkBlock module={'打点'}
                     func={'个人中心'}
                     action={'点击消息中心'}
                     onClick={() => this.goMessage()}
                     className="message-container">
            <div className="img-container">
              <img src="http://static.iqycamp.com/images/icon_message.png"/>
            </div>
            <div className="content">消息中心</div>
            {noticeMsgCount ?
              <span className="notice_message">{noticeMsgCount > 99 ? 99 : noticeMsgCount}</span> : null}
            <div className="arrow"></div>
          </MarkBlock>
          <MarkBlock module={'打点'}
                     func={'个人中心'}
                     action={'点击使用帮助'}
                     onClick={() => this.goHelp()}
                     className="help-container">
            <div className="img-container">
              <img src="http://static.iqycamp.com/images/icon_help.png"/>
            </div>
            <div className="content">使用帮助</div>
            <div className="arrow"></div>
          </MarkBlock>
          {!userInfo.isProMember &&
          <MarkBlock module={'打点'}
                     func={'个人中心'}
                     action={'点击用户协议'}
                     onClick={() => this.goProtocol()}
                     className="protocol-container">
            <div className="img-container">
              <img src="http://static.iqycamp.com/images/icon_user.png"/>
            </div>
            <div className="content">用户协议</div>
            <div className="arrow"></div>
          </MarkBlock>
          }
        </div>
      )
    }

    return (
      <div className="person-center-container">
        {renderUserInfo()}
        <div className="divider-container"></div>
        {renderCards()}
        {renderBusiness()}
        {renderList()}
        <ToolBar/>
      </div>
    )
  }
}
