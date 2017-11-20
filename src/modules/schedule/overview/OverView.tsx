import * as React from 'react'
import { startLoad, endLoad, alertMsg } from 'redux/actions'
import { connect } from 'react-redux'
import { loadPersonalSchedule, updateCourseScheduleAll } from '../async'
import { calcScheduleData } from './util'
import { MonthSchedule } from './components/MonthSchedule'
import { SubmitButton } from '../components/SubmitButton'
import './OverView.less'
import { randomStr } from '../../../utils/helpers'

@connect(state => state)
export default class OverView extends React.Component {

  constructor() {
    super()
  }

  state = {
    scheduleList: [],
    draggable: false,
    showSubmitButton: true
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(startLoad())
    loadPersonalSchedule().then(res => {
      if(res.code === 200) {
        dispatch(endLoad())
        this.setState({
          scheduleList: res.msg
        })
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
      let node = document.getElementById('overview-scroll')
      let result = calcScheduleData(node)
      updateCourseScheduleAll(result).then(res => {
        if(res.code === 200) {
          this.context.router.push('/middle')
        }
      })
      this.setState({
        draggable: !this.state.draggable
      })
    } else {
      this.setState({
        draggable: !this.state.draggable
      })
    }
  }

  handleSubmitButton() {
    let node = document.getElementById('overview-scroll')
    let result = calcScheduleData(node)
    const { dispatch } = this.props
    dispatch(startLoad())
    updateCourseScheduleAll(result).then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.context.router.push(`/rise/static/course/schedule/plan`)
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(e => dispatch(alertMsg(e)))
  }

  render() {
    const { scheduleList = [], draggable = false, showSubmitButton = true } = this.state
    return (
      <div className="overview-container" id="overview-container" ref="overview-container">
        <div className="overview-title">学习计划</div>
        <span className="overview-tips">根据你的回答，为你制定的学习计划：</span>
        <div className="modify-tips-block">
          {
            draggable ?
              <section>
                <span className="modify-drag-tips">按住小课右侧按钮，即可拖动到其他月份（仅辅修课）</span>
              </section>
              : null
          }
          <span className={`modify-sequence ${draggable ? 'draggable' : ''}`}
                onClick={() => this.switchDraggableStatus(draggable)}>{draggable ? '恢复默认排序' : '调整课程顺序'}</span>
        </div>
        <div id="overview-scroll" className="overview-scroll">
          {
            scheduleList.map((schedules, index) => {
              return (
                <MonthSchedule key={randomStr(16)} id={randomStr(16)} schedules={schedules} draggable={draggable}
                               switchSubmitButton={(submitButtonStatus) => {
                                 this.setState({ showSubmitButton: submitButtonStatus })
                               }}
                               enableAutoScroll={() => this.enableAutoScroll()}
                               disableAutoScroll={() => this.disableAutoScroll()}/>
              )
            })
          }
        </div>
        {showSubmitButton ? <SubmitButton clickFunc={() => this.handleSubmitButton()} buttonText="确定"/> : null}
      </div>
    )
  }

}
