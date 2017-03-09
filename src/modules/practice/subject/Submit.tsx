import * as React from "react";
import { connect } from "react-redux";
import { loadSubject, submitSubject } from "./async";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";

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
    const {dispatch, location } = this.props
    if(location.query.submitId){
      loadSubject(location.query.submitId).then(res => {
        dispatch(endLoad())
        const { code, msg } = res
        if (code === 200)  this.setState({ data: msg, submitId: msg.submitId, answer: msg.content })
        else dispatch(alertMsg(msg))
      }).catch(ex => {
        dispatch(endLoad())
        dispatch(alertMsg(ex))
      })
    }
  }

  onSubmit(){
    const { dispatch, location} = this.props
    const { data, answer } = this.state
    const { submitId } = data
    if(answer == null || answer.length === 0){
      dispatch(alertMsg('请填写作业'))
      return
    }
    this.setState({showDisable: true})
    submitSubject(submitId, {answer}).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if (code === 200) {
        this.context.router.push({ pathname: '/rise/static/practice/subject',
          query: {id: location.query.id, series: location.query.series},
          state: location.state})
      }
      else {
        dispatch(alertMsg(msg))
        this.setState({showDisable: false})
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
      this.setState({showDisable: false})
    })
  }

  render() {
    const { data, showDisable } = this.state
    const { description } = data
    return (
      <div className="submit">
        <div className="description" dangerouslySetInnerHTML={{__html: description}}>
        </div>
        <textarea className="submit-area" cols="30" rows="10" height="500px"
                    value={this.state.answer}
                    placeholder="离开页面前请提交，以免内容丢失。"
                    onChange={(e) => this.setState({answer: e.currentTarget.value})}></textarea>
        { showDisable ?
          <div className="submit-button disabled">提交中</div>
            :
          <div className="submit-button" onClick={this.onSubmit.bind(this)}>提交</div>
        }
      </div>
    )
  }
}
