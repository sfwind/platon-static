import * as React from 'react'
import './MonthSchedule.less'
import Sortable from 'sortablejs'

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
  }

  state = {}
  sortbale

  componentWillMount() {
    const { id, schedules, draggable} = this.props
    this.setState({ id: id, schedules: schedules, draggable: draggable })
  }

  componentDidMount() {
    let node = document.getElementById(this.props.id)
    this.sortbale = Sortable.create(node, {
      group: 'sorting',
      sort: true,
      animation: 150,
      // filter: '.disable'
      handle: '.draggable',
      ghostClass: 'ghost',  // Class name for the drop placeholder
      dragClass: 'drag'  // Class name for the dragging item
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

  getInnerState() {
    return this.state
  }

  handleClickChangeSelected(schedule) {
    const { schedules } = this.state
    schedules.forEach(item => {
      if(item.id === schedule.id) {
        item.selected = !schedule.selected
      }
    })
    this.setState({ schedules: schedules })
  }

  render() {
    const { id, schedules = [], draggable } = this.state
    let firstSchedule = schedules[0]
    let majors = schedules.filter(schedule => schedule.type === 1)
    let minors = schedules.filter(schedule => schedule.type === 2)
    return (
      <section id={`year-${firstSchedule.year}-month-${firstSchedule.month}`} className="month-schedule-component">
        <div className="schedule-topic">{`${firstSchedule.month} 月 ${firstSchedule.topic}`}</div>
        <div className="schedule-major">
          <span className="type">主修课</span>
          {
            majors.map((schedule, index) => {
              return (
                <div key={index} className="problem major-problem">
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
                  <li>
                    <div key={index}
                         id={`problemid-${schedule.problem.id}-id-${schedule.id}`}
                         className={
                           `problem minor-problem
                            ${schedule.selected ? 'selected' : 'no-selected'}
                           `}>
                      <span className="draggable" style={{ display: draggable ? '' : 'none' }}
                            onTouchStartCapture={() => {window.scrollTo(window.scrollX, window.scrollY + 1)}}>点击拖动</span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <span onClick={() => this.handleClickChangeSelected(schedule)}>{schedule.problem.problem}</span>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </section>
    )
  }

}
