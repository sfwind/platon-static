import * as React from 'react'
import { startLoad, endLoad, alertMsg, get, set } from 'redux/actions'
import { connect } from 'react-redux'
import { loadPersonalSchedule, updateCourseScheduleAll } from '../async'
import { calcScheduleData } from './util'
import { MonthSchedule } from './components/MonthSchedule'
import { SubmitButton } from '../components/SubmitButton'
import Toast from '../../../components/Toast'
import AssetImg from '../../../components/AssetImg'
import { Dialog } from 'react-weui'
import './OverView.less'

const { Alert } = Dialog

@connect(state => state)
export default class OverView extends React.Component {

  constructor() {
    super()
  }

  state = {
    scheduleList: [],
    draggable: false
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch } = this.props
    const firstEntry = dispatch(get('firstEntry'))
    dispatch(set('firstEntry', undefined))

    if(firstEntry) {
      this.setState({ showFirstEntryAlert: true })
    }

    dispatch(startLoad())
    new Promise(resolve => {
      loadPersonalSchedule().then(res => {
        resolve(res)
      })
    }).then(res => {
      dispatch(endLoad())
      const { key } = this.props.location.query
      if(res.code === 200) {
        if(key && key === 'showToast') {
          this.setState({
            showToast: true,
            scheduleList: res.msg
          }, () => {
            setTimeout(() => {
              this.setState({ showToast: false })
            }, 2000)
          })
        } else {
          this.setState({
            scheduleList: res.msg
          })
        }
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(e => dispatch(alertMsg(e)))
  }

  componentWillUnmount() {
    this.disableAutoScroll()
  }

  scrollFunc(e) {
    let container = document.getElementById('overview-container')
    let containerHeight = container.offsetHeight
    let clientY = e.changedTouches[0].clientY
    let pageY = e.changedTouches[0].pageY
    if(clientY < window.innerHeight / 5 && pageY > 0) {
      for(let i = 0; i < 10; i++) {
        window.scrollTo(window.scrollX, window.scrollY - 1)
      }
    }
    if(clientY > window.innerHeight * 4 / 5 && pageY < containerHeight - window.innerHeight / 5) {
      for(let i = 0; i < 10; i++) {
        window.scrollTo(window.scrollX, window.scrollY + 1)
      }
    }
  }

  enableAutoScroll() {
    document.body.addEventListener('touchmove', this.scrollFunc, false)
  }

  disableAutoScroll() {
    document.body.removeEventListener('touchmove', this.scrollFunc, false)
  }

  switchDraggableStatus(draggable) {
    if(draggable) {
      this.context.router.push({
        pathname: '/rise/static/transfer',
        query: {
          'history': window.location.pathname
        }
      })
    } else {
      this.setState({
        draggable: !this.state.draggable
      })
    }
  }

  handleSubmitButton(draggable) {
    if(draggable) {
      let node = document.getElementById('overview-scroll')
      let result = calcScheduleData(node)
      const { dispatch } = this.props
      dispatch(startLoad())
      updateCourseScheduleAll(result).then(res => {
        dispatch(endLoad())
        if(res.code === 200) {
          this.context.router.push({
            pathname: '/rise/static/transfer',
            query: {
              'history': window.location.pathname,
              'key': 'showToast'
            }
          })
        }
      })
    } else {
      this.context.router.push(`/rise/static/course/schedule/plan`)
    }
  }

  render() {
    const { scheduleList = [], draggable = false, showToast = false, showFirstEntryAlert = false } = this.state

    const firstEntryAlertProps = {
      buttons: [
        { label: '我知道了', onClick: () => this.setState({ showFirstEntryAlert: false }) }
      ]
    }

    return (
      <div className="overview-container" id="overview-container" ref="overview-container">
        <div className="overview-header">
          <span className="overview-title">学习计划</span>
          <span className={`modify-sequence ${draggable ? 'draggable' : ''}`}
                onClick={() => this.switchDraggableStatus(draggable)}>{draggable ? '恢复默认排序' : '调整课程顺序'}</span>
        </div>
        {
          draggable ?
            <span className="modify-drag-tips">尚未开课的辅修课，按住右侧按钮，可拖动到其他月份</span>
            : null
        }
        <div id="overview-scroll" className="overview-scroll">
          {
            scheduleList.map((schedules, index) => {
              return (
                <MonthSchedule key={index}
                               id={index}
                               schedules={schedules}
                               draggable={draggable}
                               enableAutoScroll={() => this.enableAutoScroll()}
                               disableAutoScroll={() => this.disableAutoScroll()}/>
              )
            })
          }
        </div>

        <SubmitButton clickFunc={() => this.handleSubmitButton(draggable)} buttonText={draggable ? '完成顺序调整' : '确定'}/>

        <Toast show={showToast} timeout={2000} height={220} width={200} top={160}>
          <AssetImg type="success" width={60} style={{ marginTop: 60 }}/>
          <div className="text">调整完成</div>
        </Toast>

        <Alert {...firstEntryAlertProps} show={showFirstEntryAlert}>
          <p>学习计划说明</p>
          <p>已根据你的回答，为你制定了学习计划。</p>
          <p>勾选的课程为推荐课。你可选择或取消其中的辅修课，或调整辅修课所在月份。</p>
        </Alert>
      </div>
    )
  }

}
