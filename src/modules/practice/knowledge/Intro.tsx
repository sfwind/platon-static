import * as React from "react";
import { connect } from "react-redux";
import { loadKnowledges, learnKnowledge } from "./async";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import KnowledgeViewer from "../components/KnowledgeViewer";

@connect(state => state)
export class Intro extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      data: {},
      knowledge: {},
      currentIndex: 1,
      total_knowledge: 1,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch, location } = this.props
    dispatch(startLoad())
    loadKnowledges(location.query.practicePlanId).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if (code === 200) {
        this.setState({ data: msg, knowledge: msg[0], total_knowledge: msg.length})
      }
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  prev() {
    const { data, currentIndex } = this.state
    const { location } = this.props
    if(currentIndex===1){
      this.context.router.push({
        pathname: '/rise/static/practice/roadmap',
        query: location.query
      })
    }else{
      this.setState({knowledge: data[currentIndex-2], currentIndex: currentIndex-1 })
    }
  }

  next() {
    const { data, currentIndex } = this.state
    this.setState({knowledge: data[currentIndex], currentIndex: currentIndex+1 })
  }


  onSubmit(){
    const { dispatch, location } = this.props
    learnKnowledge(location.query.practicePlanId).then(res=>{
      const { code, msg } = res
      if (code === 200) {
        this.context.router.push({ pathname: '/rise/static/plan/main', query: this.props.location.query })
      }
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }


  render() {
    const { knowledge, currentIndex, total_knowledge } = this.state
    return (
        <div>
          <div className="container has-footer">
            {knowledge? <KnowledgeViewer knowledge={knowledge} />:null}
          </div>
          <div className="button-footer">
            <div className={`left`} onClick={this.prev.bind(this)}>上一步
            </div>
            { currentIndex !== total_knowledge ? <div className={`right`} onClick={this.next.bind(this)}>下一步</div> :
                <div className={`right`} onClick={this.onSubmit.bind(this)}>返回</div>
            }
          </div>
        </div>
    )
  }
}
