import * as React from "react"
import {connect} from "react-redux"
import "./KnowledgeReview.less"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import { mark } from "../../../utils/request"
import {loadProblem} from "./async"

@connect(state=>state)
export class KnowledgeReview extends React.Component<any,any>{
  constructor(props){
    super(props);
    this.state = {
      showProblem:false,
      showKnowledge:false,
      knowledge:{},
      data:{},
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount(){
    mark({module: "打点", function: "学习", action: "打开知识点回顾页面"});
    const {dispatch,location} = this.props;
    dispatch(startLoad())
    loadProblem(location.query.problemId).then(res=>{
      const {code, msg} = res
      if (code === 200) {
        dispatch(endLoad())
        this.setState({ data: msg})
      }
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  goKnowledgeIntro(section){
    this.context.router.push({pathname:"/rise/static/practice/knowledge",query:{id:section.knowledgeId}})
  }

  goProblemIntro(){
    const {data} = this.state
    this.context.router.push({pathname:"/rise/static/problem/view",query:{id:data.id, show:true}})
  }

  render(){
    const {data} = this.state;
    const {chapterList=[]} = data;

    const renderRoadMap = (chapter, idx) => {
      const {sections} = chapter
      return (
          <div key={idx}>
            <div className='chapter'>{'第'+chapter.chapter+'章 '}{chapter.name}</div>
            {sections?sections.map((section, idx) => renderSection(section, idx, chapter.chapter)):null}
          </div>
      )
    }

    const renderSection = (section, idx, chapter) => {
      return (
      section.integrated?
          <div key={idx}>
            <div className='section'>{chapter}{'.'}{section.section+'节 '}{section.name}</div>
          </div>:
          <div key={idx} onClick={this.goKnowledgeIntro.bind(this, section)}>
            <div className='section click'>{chapter}{'.'}{section.section+'节 '}{section.name}</div>
          </div>
      )
    }

    return(
          <div className="problem-detail">
            <div className="detail-header click" style={{marginBottom:'10px',borderBottom:"none"}} onClick={this.goProblemIntro.bind(this)}>
              <div className="header-label" style={{float:"left"}}>
                小课介绍
              </div>
            </div>
            <div className="detail-header">
              小课知识点
            </div>
            <div className="detail-container">
              {chapterList ? chapterList.map((item, index) => renderRoadMap(item, index)) : null}
            </div>
          </div>
    )
  }
}
