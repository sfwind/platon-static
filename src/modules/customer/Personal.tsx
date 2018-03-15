import * as React from 'react'
import { connect } from 'react-redux'
import { set, startLoad, endLoad, alertMsg } from 'reduxutil/actions'
import { changeTitle } from 'utils/helpers'
import { mark } from 'utils/request'
import { openNotifyStatus, closeNotifyStatus, getNotifyStatus } from '../message/async'
import { loadUserInfo } from './async'
import './Personal.less'
import { CellBody, FormCell, CellFooter, Switch } from 'react-weui'
import { MarkBlock } from '../../components/markblock/MarkBlock'
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
      learningNotify: true,
      isRiseMember: true
    }
  }

  componentWillMount() {
    changeTitle('个人中心')
    mark({ module: '打点', function: '个人中心', action: '打开个人中心' })
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

  render() {
    const { userInfo, learningNotify,isRiseMember } = this.state

    const renderUserInfo = () => {

      return (
        <div className="header-container">
          <div className="img-container">
            <img src={userInfo.headImgUrl}/>
            <div className="arrow"></div>
          </div>
          <div className="info-container">
            <div className="nickname-container">
              {userInfo.nickName}
            </div>
            <div className="score-container">
              积分2200分
            </div>
          </div>
          {isRiseMember &&
          <div className="class-info-container">
            <div className="class-container">
              <div className="title">
                学号
              </div>
              <div className="name">班级名称</div>
            </div>

            < div className="content-container">
              <div className="member">
                1803011020
              </div>
              <div className="grade">
                3月2班
              </div>
            </div>

            <div className="notice-container">
              <FormCell switch className="learn-notice">
                <CellBody>学习提醒</CellBody>
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
          }

          <div className="achievement-container">
            <div className="essenceCard">
              知识卡1张
            </div>
            <div className="middle-divider">

            </div>
            <div className="certificate">
              荣誉证书1张
            </div>
          </div>
        </div>
      )
    }

    const renderList = () => {
      return (
        <div className="list-container">
          <img src={isRiseMember? 'http://static.iqycamp.com/images/share_business.png':'http://static.iqycamp.com/images/join_business.png'}/>
          <div className="hyq-container">
            <div className="img-container">
              <img src="http://static.iqycamp.com/images/icon_yhq.png"/>
              <div className="arrow"></div>
            </div>
            <div className="content">我的抵用券</div>
            <div className="amount">XX元</div>
            <div className="arrow"></div>
          </div>
          <div className="study-report-container">
            <div className="img-container">
              <img src="http://static.iqycamp.com/images/icon_study.png"/>
            </div>
            <div className="content">我的学习报告</div>
            <div className="arrow"></div>
          </div>
          <div className="message-container">
            <div className="img-container">
              <img src="http://static.iqycamp.com/images/icon_message.png"/>
            </div>
            <div className="content">消息中心</div>
            <div className="arrow"></div>
          </div>
          <div className="help-container">
            <div className="img-container">
              <img src="http://static.iqycamp.com/images/icon_help.png"/>
            </div>
            <div className="content">使用帮助</div>
            <div className="arrow"></div>
          </div>
          <div className="protocol-container">
            <div className="img-container">
              <img src="http://static.iqycamp.com/images/icon_user.png"/>
            </div>
            <div className="content">用户协议</div>
            <div className="arrow"></div>
          </div>
        </div>
      )
    }

    return (
      <div className="person-center-container">
        {renderUserInfo()}
        {renderList()}
      </div>
    )
  }

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     learningNotify: true,
  //     totalCoupon: 0,
  //   }
  //   this.picHeight = window.innerWidth / 2.5
  //   this.marginTop = (this.picHeight - 65) / 2 > 0 ? (this.picHeight - 65) / 2 : 0
  // }
  //
  // componentWillMount() {
  //   changeTitle('个人中心')
  //   mark({ module: '打点', function: '个人中心', action: '打开个人中心' })
  //   const { dispatch } = this.props
  //   dispatch(startLoad())
  //   getNotifyStatus().then(res => {
  //     dispatch(endLoad())
  //     this.setState({ learningNotify: res.msg })
  //   }).catch(ex => {
  //     dispatch(endLoad())
  //     dispatch(alertMsg(ex))
  //   })
  //
  //   loadUserCoupon().then(res => {
  //     this.setState({ totalCoupon: res.msg.total })
  //     dispatch(endLoad())
  //   }).catch(ex => {
  //     dispatch(endLoad())
  //     dispatch(alertMsg(ex))
  //   })
  // }
  //
  // componentDidMount() {
  //   const { showTab } = this.props
  //   if(showTab) {
  //     showTab()
  //   }
  // }
  //
  // goProfile() {
  //   this.context.router.push('/rise/static/customer/profile')
  // }
  //
  // goAccount() {
  //   this.context.router.push('/rise/static/customer/account')
  // }
  //
  // goCouponList() {
  //   this.context.router.push('/rise/static/customer/coupon')
  // }
  //
  // goMessage() {
  //   const { dispatch } = this.props
  //   dispatch(startLoad())
  //   getOldMsg().then(res => {
  //     dispatch(endLoad())
  //     if(res.code === 200) {
  //       dispatch(set('noticeMsgCount', 0))
  //       this.context.router.push('/rise/static/message/center')
  //     }
  //   }).catch(ex => {
  //     dispatch(endLoad())
  //     dispatch(alertMsg(ex))
  //   })
  // }
  //
  // handleClickLearningNotify() {
  //   const { learningNotify } = this.state
  //   const { dispatch } = this.props
  //   if(learningNotify) {
  //     dispatch(startLoad())
  //     closeNotifyStatus().then(res => {
  //       dispatch(endLoad())
  //       this.setState({ learningNotify: false })
  //     }).catch(ex => {
  //       dispatch(endLoad())
  //       dispatch(alertMsg(ex))
  //     })
  //   } else {
  //     dispatch(startLoad())
  //     openNotifyStatus().then(res => {
  //       dispatch(endLoad())
  //       this.setState({ learningNotify: true })
  //     }).catch(ex => {
  //       dispatch(endLoad())
  //       dispatch(alertMsg(ex))
  //     })
  //   }
  // }
  //
  // goProblem() {
  //   this.context.router.push('/rise/static/customer/problem')
  // }
  //
  // goShare() {
  //   window.location.href = '/pay/static/share'
  // }
  //
  // goHelp() {
  //   this.context.router.push('/rise/static/customer/feedback')
  // }
  //
  // render() {
  //   const { noticeMsgCount } = this.props
  //   const { learningNotify, totalCoupon } = this.state
  //
  //   const renderHeader = () => {
  //     return (
  //       <div className="personal-head" style={{ marginTop: this.marginTop + 'px' }}>
  //         <div className="personal-head-pic"
  //              style={{ background: 'url(' + window.ENV.headImgUrl + ')  no-repeat  center center/100% auto' }}/>
  //         <div className="personal-name">
  //           {window.ENV.userName}
  //         </div>
  //         <div className="personal-edit"
  //              onClick={() => {this.context.router.push(`/rise/static/customer/personal/modify`)}}>
  //           <AssetImg className="edit-icon" alt="icon"
  //                     url="https://static.iqycamp.com/images/person_edit_icon.png"/>
  //           <span className="edit-text">修改</span>
  //         </div>
  //       </div>
  //     )
  //   }
  //
  //   const renderContainer = () => {
  //     return (
  //       <div>
  //         <MarkBlock module={'打点'} func={'个人中心'} action={'点击个人中心'} className="personal-item no-gutter"
  //                    onClick={() => this.goProfile()}>
  //           <span>个人信息</span></MarkBlock>
  //         <MarkBlock module={'打点'} func={'个人中心'} action={'点击我的账户'} className="personal-item no-gutter"
  //                    onClick={() => this.goAccount()}>
  //           <span>我的账户</span>
  //         </MarkBlock>
  //         <MarkBlock module={'打点'} func={'个人中心'} action={'点击我的优惠券'} className="personal-item"
  //                    onClick={() => this.goCouponList()}>
  //           <span>我的优惠券</span>
  //           {totalCoupon ?
  //             <span className="tail-message">{totalCoupon == 0 ? '暂无' : totalCoupon + '元'}</span> : null}
  //         </MarkBlock>
  //         <MarkBlock module={'打点'} func={'个人中心'} action={'点击消息通知'} className="personal-item no-gutter"
  //                    onClick={() => this.goMessage()}>
  //           <span>消息通知</span>
  //           {noticeMsgCount ?
  //             <span className="notify-message">{noticeMsgCount > 99 ? 99 : noticeMsgCount}</span> : null}
  //         </MarkBlock>
  //         <FormCell switch className="personal-item">
  //           <CellBody>学习提醒</CellBody>
  //           <CellFooter>
  //             <MarkBlock module={'打点'} func={'个人中心'} action={'点击学习提醒'}>
  //               <Switch checked={learningNotify} onClick={() => this.handleClickLearningNotify()}/>
  //             </MarkBlock>
  //           </CellFooter>
  //         </FormCell>
  //         <div className="pi-gray-tips">
  //           建议开启：周一至周五，若当天未登录学习，晚上09：30会发给你学习提醒消息
  //         </div>
  //         {/*{*/}
  //           {/*window.ENV.showForum !== 'false' &&*/}
  //           {/*<div className="personal-item no-gutter"*/}
  //                {/*onClick={() => {this.context.router.push('/forum/static/question')}}><span>论坛</span>*/}
  //           {/*</div>*/}
  //         {/*}*/}
  //         <MarkBlock module={'打点'} func={'个人中心'} action={'点击我的课程'} className="personal-item"
  //                    onClick={() => this.goProblem()}>
  //           <span>我的课程</span>
  //         </MarkBlock>
  //         <MarkBlock module={'打点'} func={'个人中心'} action={'点击推荐给朋友'} className="personal-item no-gutter"
  //                    onClick={() => this.goShare()}>
  //           <span>推荐【圈外商学院】给朋友</span>
  //         </MarkBlock>
  //         <MarkBlock module={'打点'} func={'个人中心'} action={'点击帮助'} className="personal-item"
  //                    onClick={() => this.goHelp()}>
  //           <span>帮助</span>
  //         </MarkBlock>
  //       </div>
  //     )
  //   }
  //   return (
  //     <div className="personal">
  //       <div className="personal-header" style={{ height: this.picHeight }}>
  //         <div className="personal-mask"
  //              style={{ background: 'url(' + window.ENV.headImgUrl + ')  no-repeat  center center/100% auto' }}/>
  //         {renderHeader()}
  //       </div>
  //       <div className="personal-container">
  //         {renderContainer()}
  //       </div>
  //       <div className="padding-footer"/>
  //     </div>
  //   )
  // }
}
