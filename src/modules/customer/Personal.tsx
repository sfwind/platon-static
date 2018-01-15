import * as React from 'react'
import { connect } from 'react-redux'
import { set, startLoad, endLoad, alertMsg } from 'redux/actions'
import { changeTitle } from 'utils/helpers'
import { mark } from 'utils/request'
import { getOldMsg, openNotifyStatus, closeNotifyStatus, getNotifyStatus } from '../message/async'
import './Personal.less'
import { CellBody, FormCell, CellFooter, Switch } from 'react-weui'
import AssetImg from '../../components/AssetImg'

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
      learningNotify: true
    }
    this.picHeight = window.innerWidth / 2.5
    this.marginTop = (this.picHeight - 65) / 2 > 0 ? (this.picHeight - 65) / 2 : 0
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
  }

  componentDidMount() {
    const { showTab } = this.props
    if(showTab) {
      showTab()
    }
  }

  goProfile() {
    mark({
      module: '打点',
      function: '个人中心',
      action: '点击个人信息'
    })
    this.context.router.push('/rise/static/customer/profile')
  }

  goAccount() {
    mark({
      module: '打点',
      function: '个人中心',
      action: '点击我的账户'
    })
    this.context.router.push('/rise/static/customer/account')
  }

  goCardList() {
    mark({
      module: '打点',
      function: '个人中心',
      action: '点击学习礼品卡'
    })
    this.context.router.push('/rise/static/customer/prize/card/list')
  }

  goMessage() {
    mark({
      module: '打点',
      function: '个人中心',
      action: '点击消息通知'
    })
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

  handleClickLearningNotify() {
    mark({
      module: '打点',
      function: '个人中心',
      action: '点击学习提醒'
    })
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

  goProblem() {
    mark({
      module: '打点',
      function: '个人中心',
      action: '点击我的课程'
    })
    this.context.router.push('/rise/static/customer/problem')
  }

  goShare() {
    mark({
      module: '打点',
      function: '个人中心',
      action: '点击推荐给朋友'
    })
    window.location.href = '/pay/static/share'
  }

  goHelp() {
    mark({
      module: '打点',
      function: '个人中心',
      action: '点击帮助'
    })
    this.context.router.push('/rise/static/customer/feedback')
  }

  render() {
    const { noticeMsgCount } = this.props
    const { learningNotify } = this.state

    const renderHeader = () => {
      return (
        <div className="personal-head" style={{ marginTop: this.marginTop + 'px' }}>
          <div className="personal-head-pic"
               style={{ background: 'url(' + window.ENV.headImage + ')  no-repeat  center center/100% auto' }}/>
          <div className="personal-name">
            {window.ENV.userName}
          </div>
          <div className="personal-edit"
               onClick={() => {this.context.router.push(`/rise/static/customer/personal/modify`)}}>
            <AssetImg className="edit-icon" alt="icon"
                      url="https://static.iqycamp.com/images/person_edit_icon.png"/>
            <span className="edit-text">修改</span>
          </div>
        </div>
      )
    }

    const renderContainer = () => {
      return (
        <div>
          <div className="personal-item no-gutter"
               onClick={() => this.goProfile()}>
            <span>个人信息</span></div>
          <div className="personal-item no-gutter"
               onClick={() => this.goAccount()}>
            <span>我的账户</span>
          </div>
          <div className="personal-item"
               onClick={() => this.goCardList()}>
            <span>学习礼品卡</span>
          </div>
          <div className="personal-item no-gutter" onClick={() => this.goMessage()}>
            <span>消息通知</span>
            {noticeMsgCount ?
              <span className="notice_message">{noticeMsgCount > 99 ? 99 : noticeMsgCount}</span> : null}
          </div>
          <FormCell switch className="personal-item">
            <CellBody>学习提醒</CellBody>
            <CellFooter>
              <Switch checked={learningNotify} onClick={() => this.handleClickLearningNotify()}/>
            </CellFooter>
          </FormCell>
          <div className="pi-gray-tips">
            建议开启：周一至周五，若当天未登录学习，晚上09：30会发给你学习提醒消息
          </div>
          {
            window.ENV.showForum !== 'false' &&
            <div className="personal-item no-gutter"
                 onClick={() => {this.context.router.push('/forum/static/question')}}><span>论坛</span>
            </div>
          }
          <div className="personal-item" onClick={() => this.goProblem()}>
            <span>我的课程</span>
          </div>
          <div className="personal-item no-gutter" onClick={() => this.goShare()}>
            <span>推荐【圈外商学院】给朋友</span>
          </div>
          <div className="personal-item" onClick={() => this.goHelp()}>
            <span>帮助</span>
          </div>
        </div>
      )
    }
    return (
      <div className="personal">
        <div className="personal-header" style={{ height: this.picHeight }}>
          <div className="personal-mask"
               style={{ background: 'url(' + window.ENV.headImage + ')  no-repeat  center center/100% auto' }}/>
          {renderHeader()}
        </div>
        <div className="personal-container">
          {renderContainer()}
        </div>
        <div className="padding-footer"/>
      </div>
    )
  }
}
