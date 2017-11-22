import * as React from 'react'
import './ProblemDescription.less'
import AssetImg from '../../../../components/AssetImg'

interface ProblemDescriptionProps {
  show: boolean,
  schedules: any,
  closeCallBack: any
}
export class ProblemDescription extends React.Component<any, ProblemDescriptionProps> {

  constructor() {
    super()
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(nextProps) != JSON.stringify(this.props)) {
      this.props = nextProps
      this.render()
    }
  }

  render() {
    const { show = false, schedules = [], closeCallBack = () => {} } = this.props

    if(!show) {
      return <div/>
    }

    return (
      <section className="problem-desc-component">
        <div className="desc-box">
          <AssetImg className="desc-cancel" onClick={() => closeCallBack()}
                    url="https://static.iqycamp.com/images/course_schedule_cancel.png"/>
          <span className="desc-title">查看当月小课介绍</span>
          <span className="desc-tips">选择你需要查看的小课</span>
          {
            schedules.filter(schedule => schedule.type === 1).map((schedule, index) => {
              return (
                <div key={index} className="desc-problem"
                     onClick={() => {
                       if(schedule.problem.publish) {
                         this.context.router.push(`/rise/static/plan/view?id=${schedule.problem.id}`)
                       } else {
                         this.context.router.push(`/rise/static/course/schedule/nopublish`)
                       }
                     }}>{schedule.problem.problem}</div>
              )
            })
          }
          {
            schedules.filter(schedule => schedule.type === 2).map((schedule, index) => {
              return (
                <div key={index} className="desc-problem"
                     onClick={() => {
                       if(schedule.problem.publish) {
                         this.context.router.push(`/rise/static/plan/view?id=${schedule.problem.id}`)
                       } else {
                         this.context.router.push(`/rise/static/course/schedule/nopublish`)
                       }
                     }}>{schedule.problem.problem}</div>
              )
            })
          }
        </div>
        <div className="mask"/>
      </section>
    )

  }

}
