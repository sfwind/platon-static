import * as React from 'react'
import './ProblemTitle.less'
import { loadProblem } from '../async'

interface ProblemTitleProps {
  callBack?: any,
  problemId: number,
  style?: object,
}

const ProblemTitleType = {
  MAJOR_PROBLEM: 1,
  MINOR_PROBLEM: 2,
  TRIAL_PROBLEM: 3
}

class ProblemTitle extends React.Component<ProblemTitleProps, any> {

  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
    this.getProblemType = this.getProblemType.bind(this)
  }

  componentWillMount() {
    const { problemId } = this.props
    if(problemId) {
      this.loadData(problemId)
    }
  }

  componentWillReceiveProps(props) {
    if(JSON.stringify(props) !== JSON.stringify(this.props)) {
      this.props = props
      this.loadData(this.props.problemId)
    }
  }

  loadData(problemId) {
    const { callBack = () => {} } = this.props
    if(problemId) {
      loadProblem(problemId).then(res => {
        if(res.code === 200) {
          this.setState({ data: res.msg })
          callBack(res.msg.problemType)
        }
      })
    }
  }

  getProblemType() {
    return this.state.data.problemType
  }

  render() {
    const { style = {} } = this.props
    const { data } = this.state
    const { problemType, problem } = data
    let styleType = ''
    if(problemType === ProblemTitleType.MAJOR_PROBLEM) {
      styleType = 'major'
    } else if(problemType === ProblemTitleType.MINOR_PROBLEM) {
      styleType = 'minor'
    }
    return (
      <div {...this.props} className={`study-problem-head ${styleType}`} style={style}>
        <div className="problem-name">{problem}</div>
      </div>
    )
  }
}

export { ProblemTitleType, ProblemTitle }
