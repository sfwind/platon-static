import * as React from 'react'
import "./ProblemTitle.less"

interface ProblemTitleProps {
  style?: object,
  problemType: string,
  problemName: string,
  problemHeadPic: string
}

export class ProblemTitle extends React.Component<ProblemTitleProps, any> {

  constructor(props) {
    super(props)
  }

  render() {
    let { style = {}, problemName, problemType } = this.props

    return (
      <div {...this.props} className={`study-problem-head ${problemType}`} style={style}>
        <div className="problem-name">{problemName}</div>
      </div>
    )
  }
}
