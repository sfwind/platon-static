import * as React from 'react'
import './CurrentPlanBar.less'

export default class CurrentPlanBar extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  componentWillMount() {
    this.setState(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(nextProps) != JSON.stringify(this.props)) {
      this.setState(nextProps)
    }
  }

  render() {
    const {
      type = 1,
      problemId = 0,
      isLearning = false,
      name = '',
      description = '',
      completeSeries = 0,
      totalSeries = 0,
      remainDaysCount = 0,
      completeTime = '2000-01-01'
    } = this.state.plan

    return (
      <div className={`current-problem-component ${type === 1 ? 'major' : 'minor'}`}>
        <div className="problem-name">{name}</div>
        {
          isLearning ?
            <div className="learning-status">课程学习进度：{completeSeries} / {totalSeries}</div> :
            <div className="waiting-status">待开课</div>
        }
        <div className="problem-description">{description}</div>
        {isLearning && <div className="close-tips">{remainDaysCount} 天后关闭</div>}
      </div>
    )
  }

}

