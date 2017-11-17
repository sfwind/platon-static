import * as React from 'react'
import { startLoad, endLoad, alertMsg } from 'redux/actions'
import { connect } from 'react-redux'
import { loadPersonalSchedule, updateCourseScheduleAll } from '../async'
import { calcScheduleData } from './util'
import { MonthSchedule } from './components/MonthSchedule'
import { ProblemDescription } from './components/ProblemDescription'
import { SubmitButton } from '../components/SubmitButton'
import './OverView.less'

@connect(state => state)
export default class OverView extends React.Component {

  constructor() {
    super()
  }

  state = {
    scheduleList: [],
    draggable: false,
    showDescBox: false,
    monthSchedules: []
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    loadPersonalSchedule().then(res => {
      this.setState({
        scheduleList: res.msg
      })
    })
  }

  componentDidMount() {
    this.enableAutoScroll()
  }

  componentWillUnmount() {
    document.body.removeEventListener('touchmove', true)
  }

  enableAutoScroll() {
    document.body.addEventListener('touchmove', e => {
      let container = document.getElementById('overview-container')
      let containerHeight = container.offsetHeight
      let clientY = e.changedTouches[0].clientY
      let pageY = e.changedTouches[0].pageY
      if(clientY < window.innerHeight / 8 && pageY > 0) {
        window.scrollTo(window.scrollX, window.scrollY - 5)
      }
      if(clientY > window.innerHeight * 7 / 8 && pageY < containerHeight - window.innerHeight / 8) {
        window.scrollTo(window.scrollX, window.scrollY + 5)
      }
    })
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

  render() {
    const { scheduleList = [], draggable = false, showDescBox = false, monthSchedules = [] } = this.state

    return (
      <div className="overview-container" id="overview-container" ref="overview-container">
        <div className="overview-title">学习计划</div>
        <span className="overview-tips">根据你的回答，为你制定的学习计划：</span>
        <div className="modify-tips-block">
          {
            draggable ?
              <section>
                <span className="modify-restore" onClick={() => {
                  this.context.router.push('/middle')
                }}>恢复默认排序</span>
                <span className="modify-drag-tips">按住小课右侧按钮，即可拖动到其他月份（仅辅修课）</span>
              </section>
              : null
          }
          <span className={`modify-sequence ${draggable ? 'draggable' : ''}`}
                onClick={() => this.switchDraggableStatus(draggable)}>{draggable ? '完成' : '调整课程顺序'}</span>
        </div>
        <div id="overview-scroll" className="overview-scroll">
          {
            scheduleList.map((schedules, index) => {
              return (
                <MonthSchedule key={index} id={index} schedules={schedules} draggable={draggable}/>
              )
            })
          }
        </div>
        {showDescBox ? <ProblemDescription show={showDescBox} schedules={monthSchedules}/> : null}
        <SubmitButton clickFunc={() => this.context.router.push(`/rise/static/course/schedule/plan`)} buttonText="确定"/>
      </div>
    )
  }

}
