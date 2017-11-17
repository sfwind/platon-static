import * as React from 'react'
import './MonthSchedule.less'
import Sortable from 'sortablejs'
import { ProblemDescription } from './ProblemDescription'
import AssetImg from '../../../../components/AssetImg'
import { updateSelected } from '../../async'

interface MonthScheduleProps {
  id: any,
  schedules: any,
  draggable: boolean
}
interface MonthScheduleState {
}
export class MonthSchedule extends React.Component<MonthScheduleProps, MonthScheduleState> {

  constructor() {
    super()
    this.state = {}
  }

  sortbale

  componentWillMount() {
    const { id, schedules, draggable } = this.props
    this.setState({ id: id, schedules: schedules, draggable: draggable })
  }

  componentDidMount() {
    let node = document.getElementById(this.props.id)
    this.sortbale = Sortable.create(node, {
      group: 'sorting',
      sort: true,
      animation: 150,
      handle: '.draggable-item',
      ghostClass: 'ghost',
      dragClass: 'drag'
    })
    document.body.addEventListener('touchend', () => {
      for(let node of document.getElementsByClassName('drag')) {
        if(node.classList.contains('drag')) {
          node.classList.remove('drag')
        }
      }
    })
    document.body.addEventListener('touchcancel', () => {
      for(let node of document.getElementsByClassName('drag')) {
        if(node.classList.contains('drag')) {
          node.classList.remove('drag')
        }
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      this.props = nextProps
      const { id, schedules, draggable } = this.props
      this.setState({ id: id, schedules: schedules, draggable: draggable })
    }
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto'
  }

  getInnerState() {
    return this.state
  }

  handleClickChangeSelected(schedule, draggable) {
    if(!draggable) {
      updateSelected(schedule.id, !schedule.selected)
      const { schedules } = this.state
      schedules.forEach(item => {
        if(item.id === schedule.id) {
          item.selected = !schedule.selected
        }
      })
      this.setState({ schedules: schedules })
    }
  }

  render() {
    const { id, schedules = [], draggable, showDescBox = false } = this.state
    let firstSchedule = schedules[0]
    let majors = schedules.filter(schedule => schedule.type === 1)
    let minors = schedules.filter(schedule => schedule.type === 2)
    return (
      <section id={`year-${firstSchedule.year}-month-${firstSchedule.month}`} className="month-schedule-component">
        <div className="schedule-topic">{`${firstSchedule.month} 月 ${firstSchedule.topic}`}</div>
        {
          !draggable ?
            <div className="month-problem-desc"
                 onClick={() => {
                   this.setState({ showDescBox: true })
                   document.body.style.overflow = 'hidden'
                 }}>查看当月小课介绍
            </div> :
            null
        }
        <div className="split-line"/>
        <div className="schedule-major">
          <span className="type">主修课</span>
          {
            majors.map((schedule, index) => {
              return (
                <div key={index} className={`problem major-problem ${draggable ? 'draggable' : ''}`}>
                  {schedule.problem.problem}
                </div>
              )
            })
          }
        </div>
        <div className="schedule-minor">
          <span className="type">辅修课</span>
          <ul id={id} style={{ minHeight: 30 }}>
            {
              minors.map((schedule, index) => {
                return (
                  <li key={index}>
                    <div
                      id={`problemid-${schedule.problem.id}-id-${schedule.id}`}
                      className={`problem minor-problem ${schedule.selected ? 'selected' : 'no-selected'} ${draggable && schedule.adjustable ? 'draggable' : ''}`}
                      onClick={() => this.handleClickChangeSelected(schedule, draggable)}>
                      <span>{schedule.problem.problem}</span>
                      {
                        draggable && schedule.adjustable ?
                          <div className="draggable-item"/> :
                          schedule.recommend ?
                            <AssetImg className="problem-recommed-tag"
                                      url="https://static.iqycamp.com/images/course_schedule_recommend.png"/> :
                            null
                      }
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <ProblemDescription show={showDescBox} schedules={schedules}
                            closeCallBack={() => {
                              this.setState({ showDescBox: false })
                              document.body.style.overflow = 'auto'
                            }}/>
      </section>
    )
  }

}
