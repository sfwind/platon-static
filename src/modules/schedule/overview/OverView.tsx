import * as React from 'react'
import { startLoad, endLoad, alertMsg } from 'redux/actions'
import { connect } from 'react-redux'
import { MonthSchedule } from './MonthSchedule'
import { loadPersonalSchedule, updateCourseScheduleAll } from '../async'
import './OverView.less'
import { calcScheduleData } from './getMonthScheduleData'

@connect(state => state)
export default class OverView extends React.Component {

  constructor() {
    super()
  }

  state = {
    scheduleList: []
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

  enableAutoScroll() {
    document.body.addEventListener('touchmove', e => {
      let container = document.getElementById('overview-container')
      let containerHeight = container.offsetHeight
      let clientY = e.changedTouches[0].clientY
      let pageY = e.changedTouches[0].pageY
      if(clientY < window.innerHeight / 8 && pageY > 0) {
        this.scrollTop()
      }
      if(clientY > window.innerHeight * 7 / 8 && pageY < containerHeight - window.innerHeight / 8) {
        this.scrollBottom()
      }
    })
  }

  scrollTop() {
    window.scrollTo(window.scrollX, window.scrollY - 8)
  }

  scrollBottom() {
    window.scrollTo(window.scrollX, window.scrollY + 8)
  }

  calcData() {
    let node = document.getElementById('overview-scroll')
    let result = calcScheduleData(node)
    updateCourseScheduleAll(result).then(res => {
      if(res.code === 200) {
        this.componentWillMount()
      }
    })
  }

  render() {
    const { scheduleList = [] } = this.state

    return (
      <div className="overview-container"
           id="overview-container">
        <div id="overview-scroll" className="overview-scroll"
             style={{
               position: 'relative'
             }}>
          {
            scheduleList.map((schedules, index) => {
              return (
                <MonthSchedule key={index} id={index} schedules={schedules}/>
              )
            })
          }
        </div>
        <br/>
        <h2 style={{ textAlign: 'center' }} onClick={() => this.calcData()}>HAHAHA</h2>
      </div>
    )
  }

}
