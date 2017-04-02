import * as React from "react";
import { connect } from "react-redux";
import { loadKnowledgeIntro, learnKnowledge } from "./async";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import KnowledgeViewer from "../components/KnowledgeViewer";

@connect(state => state)
export class Intro extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      data: {}
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch, location } = this.props
    dispatch(startLoad())
    loadKnowledgeIntro(location.query.kid).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if (code === 200) {
        this.setState({ data: msg })
        learnKnowledge(location.query.kid)
      }
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  onBack() {
    this.context.router.push({ pathname: '/rise/static/practice/warmup/ready', query: this.props.location.query })
  }


  render() {
    const { data } = this.state

    return (
        <KnowledgeViewer knowledge={data} closeModal={this.onBack.bind(this)}/>
    )
  }
}
