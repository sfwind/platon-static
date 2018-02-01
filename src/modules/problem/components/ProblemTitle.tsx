import * as React from 'react'
import './ProblemTitle.less'
import { loadMyProblem } from '../async'
import AssetImg from '../../../components/AssetImg'

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
      loadMyProblem(problemId).then(res => {
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
    const { problem, deadline, typeDesc, month } = data
    return (
      <div {...this.props} className={`problem-head-component`} style={style}>
        {/*<div className="problem-icon"/>*/}
        { problem && <div className="problem-name">{problem.abbreviation+'：'+problem.problem}</div> }
        { problem && <div className="problem-info">{month}{'月 | '}{typeDesc}{' | '}{deadline === 0 ? '已关闭':deadline+'天后关闭'}
        </div> }
        <div className="problem-span"/>
      </div>
    )
  }
}

export { ProblemTitleType, ProblemTitle }
