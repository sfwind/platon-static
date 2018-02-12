import * as React from 'react'
import './StudyReport.less'

export default class StudyReport extends React.Component {

  constructor() {
    super()
  }

  componentWillMount() {

  }

  render() {

    return (
      <div className="study-report-container">
        <div className="report-header">学习报告</div>
        <div className="report-global-data">
          <span className="nickname">用户昵称</span>
          {/*<img src="" className="global-medal"/>*/}
          <div className="data-block">
            <div className="data">
              <div className="type-str">总得分</div>
              <div className="type-point">450</div>
            </div>
            <div className="data">
              <div className="type-str">击败</div>
              <div className="type-point">30%</div>
            </div>
            <div className="data">
              <div className="type-str">学习天数</div>
              <div className="type-point">15天</div>
            </div>
          </div>
        </div>
        <div className="warmup">
          <div className="warmup-header">各章巩固练习得分</div>

        </div>
        <div className="application"></div>
        <div className="tips">
          <p>不要在课程完成后，就放松对这些知识的学习哦！</p>
          <p>你还可以在已经完成列表中，进入课程补作业</p>
          <p>偷偷告诉你，不玩的作业依旧可以获得积分~</p>
        </div>
      </div>
    )
  }

}
