import * as React from "react";
import { connect } from "react-redux";
import { loadApplicationPractice, submitApplicationPractice } from "./async";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import "./Submit.less"
import Editor from "../../../components/simditor/Editor"

@connect(state => state)
export class Submit extends React.Component<any, any> {

  constructor() {
    super()
    this.state = {
      data: {},
      submitId: 0,
      answer: '',
      showDisable: false,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch, location } = this.props
    loadApplicationPractice(location.query.id).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) this.setState({ data: msg, submitId: msg.submitId, answer: msg.content, planId: msg.planId })
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  onSubmit() {
    const { dispatch, location } = this.props
    const { data, planId } = this.state
    const answer = this.refs.editor.getValue();
    const { submitId } = data
    if(answer == null || answer.length === 0) {
      dispatch(alertMsg('请填写作业'))
      return
    }
    this.setState({ showDisable: true })
    submitApplicationPractice(planId, location.query.id, { answer }).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        this.context.router.push({
          pathname: '/rise/static/practice/application',
          query: { id: location.query.id, series: location.query.series },
          state: location.state
        })
      }
      else {
        dispatch(alertMsg(msg))
        this.setState({ showDisable: false })
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
      this.setState({ showDisable: false })
    })
  }

  render() {
    const { data, showDisable } = this.state
    const { description } = data
    return (
      <div className="submit-container">
        <div className="description" dangerouslySetInnerHTML={{__html: description}}>
        </div>
        <Editor ref="editor" moduleId={3}
                value={this.state.answer} placeholder="离开页面前请提交，以免内容丢失。"/>

        <div className="btn-container">
          { showDisable ?
            <div className="submit-button disabled">提交中</div>
            :
            <div className="submit-button" onClick={this.onSubmit.bind(this)}>提交</div>
          }
        </div>
      </div>
    )
  }
}
