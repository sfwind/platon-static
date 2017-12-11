import * as React from 'react'
import './ProblemTitle.less'
import { connect } from 'react-redux'
import { loadProblem } from '../async'
import { startLoad, endLoad, alertMsg } from 'redux/actions'

interface ProblemTitleProps {
  style?: object,
  problemId: number,
}

const MAJOR_PROBLEM = 1
const MINOR_PROBLEM = 2
const TRIAL_PROBLEM = 3

@connect(state => state)
export class ProblemTitle extends React.Component<ProblemTitleProps, any> {

  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
    this.getProblemType = this.getProblemType().bind(this)
  }

  componentWillMount() {

  }

  componentWillReceiveProps(props) {
    const { dispatch, problemId } = props
    if(problemId) {
      loadProblem(problemId).then(res => {
        if(res.code === 200) {
          this.setState({ data: res.msg })
        } else {
          dispatch(alertMsg(res.msg))
        }
      }).catch(e => {
        dispatch(alertMsg(e))
      })
    }
  }

  getProblemType() {
    return this.state.problemType
  }

  render() {
    const { style = {}, problemId } = this.props
    const { data } = this.state
    const { problemType, problem } = data
    let styleType = ''
    if(problemType === MAJOR_PROBLEM) {
      styleType = 'major'
    } else if(problemType === MINOR_PROBLEM) {
      styleType = 'minor'
    }
    return (
      <div {...this.props} className={`study-problem-head ${styleType}`} style={style}>
        <div className="problem-name">{problem}</div>
      </div>
    )
  }
}
