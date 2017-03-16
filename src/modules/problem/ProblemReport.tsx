import * as React from "react";
import { connect } from "react-redux";
import "./ProblemReport.less";
import Audio from "../../components/Audio";
import { loadProblem, createPlan } from "./async";
import { startLoad, endLoad, alertMsg } from "redux/actions";

@connect(state => state)
export class ProblemReport extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {}
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(startLoad())
    loadProblem(this.props.location.query.id).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if (code === 200)  this.setState(msg)
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  onSubmit() {
    const { dispatch } = this.props
    dispatch(startLoad())
    createPlan(this.props.location.query.id).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if (code === 200)  this.context.router.push({ pathname: '/rise/static/plan/intro', query: { id: msg } })
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  render() {
    const { problem, descPic, description, length, audio } = this.state

    return (
      <div>
        <div className="container has-footer">
          <div className="problem-report">
            <div className="context">
              { audio ? <div className="context-audio">
                  <Audio url={audio}/>
                </div> : null }
            </div>
            <div className="context" dangerouslySetInnerHTML={{__html: description}}></div>
            <div className="context-img">
              <img src={descPic} alt=""/>
            </div>
            <div className="context">上图中，带数字编号的是你接下来{length}天要学习的知识点。你每天会练习到其中的两个。这些知识点会以选择题和应用题的方式，来帮助你更好地掌握。<br/><br/></div>
          </div>
        </div>
        <div className="button-footer" onClick={this.onSubmit.bind(this)}>下一步</div>
      </div>
    )
  }
}
