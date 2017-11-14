import * as React from 'react'
import { loadDefaultSchedule } from '../async'

export default class Modify extends React.Component {

  constructor() {
    super()
  }

  state = {
    schedules: []
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch } = this.props
    loadDefaultSchedule().then(res => {
      console.log(res.msg)
      this.setState({
        schedules: res.msg
      })
    })
  }

  render() {
    const { schedules = [] } = this.state

    const renderSchedules = () => {
      return (
        schedules.map((scheduleList, index) => {
          return (
            <div key={index}>
              {`${scheduleList[0].month}月 ${scheduleList[0].topic} `} <br/>
              {
                scheduleList.filter(schedule => schedule.type == 2).map((schedule, index) => {
                  return (
                    <div key={index}>
                      {schedule.problem.problem}
                    </div>
                  )
                })
              }
            </div>
          )
        })
      )
    }

    return (
      <div>
        Hello World!
        {renderSchedules()}
      </div>
    )
  }

}
