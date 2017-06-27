import * as React from "react";
import {connect} from "react-redux";
import "./ReplyDiscussMessage.less";
import {loadKnowledge, loadKnowledgeDiscussReply,discussKnowledge} from "./async";
import {startLoad, endLoad, alertMsg} from "../../redux/actions";
import Discuss from "../practice/components/Discuss";
import DiscussShow from "../practice/components/DiscussShow";
import _ from "lodash"

@connect(state => state)
export class ReplyKnowledgeDiscussMessage extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      question:'',
      warmupPracticeId: 0,
      commentId:0,
      data:{},
      showDiscuss: false,
      showKnowledge:false,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }


  componentWillMount(props) {
    const {dispatch, location} = props || this.props
    const {knowledgeId} = location.query
    const {commentId} = location.query
    dispatch(startLoad())
    loadKnowledgeDiscussReply(commentId).then(res => {
      dispatch(endLoad())
      const {code, msg} = res
      if (code === 200) {
        this.setState({data:msg, commentId})
      } else {
        dispatch(alertMsg(msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })

    loadKnowledge(knowledgeId).then(res => {
      dispatch(endLoad())
      const {code, msg} = res
      if (code === 200) {
        this.setState({knowledge:res.msg, knowledgeId})
      } else {
        dispatch(alertMsg(msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  goKnowledge(){
    this.context.router.push({
      pathname: '/rise/static/practice/knowledge', query: {id:this.props.location.query.knowledgeId}
    })
  }

  reply(item){
    this.setState({showDiscuss:true, referenceId:item.knowledgeId, repliedId:item.id})
  }

  onChange(value){
    this.setState({content:value})
  }

  cancel(){
    const {showDiscuss} = this.state
    if(showDiscuss){
      this.setState({showDiscuss:false})
    }
  }

  onSubmit(){
    const {dispatch} = this.props
    const {referenceId, repliedId, content} = this.state
    if(content.length==0){
      dispatch(alertMsg('请填写评论'))
      return
    }
    if(content.length>300){
      dispatch(alertMsg('您的评论字数已超过300字'))
      return
    }

    let discussBody = {comment:content, referenceId: referenceId}
    if (repliedId) {
      _.merge(discussBody, {repliedId: repliedId})
    }

    discussKnowledge(discussBody).then(res => {
      const {code, msg} = res
      if (code === 200) {
        this.context.router.push({
          pathname: '/rise/static/practice/knowledge', query: {id:this.props.location.query.knowledgeId}
        })
      }
      else {
        dispatch(alertMsg(msg))
      }
    }).catch(ex => {
      dispatch(alertMsg(ex))
    })
  }

  render() {
    const {knowledge, data, showDiscuss} = this.state

    const renderDiscuss = (discuss) => {
        return (
            <DiscussShow discuss={discuss} showLength={50} reply={()=>this.reply(discuss)}/>
        )
    }
    return (
      <div>
        <div className="container" onClick={()=>this.cancel()}>
          <div className="question">知识点:{knowledge?knowledge.knowledge:null}</div>
          <div className="origin-question-tip" onClick={this.goKnowledge.bind(this)}>点击查看知识点</div>
          <div className="discuss-title-bar"><span className="discuss-title">{this.state.data.del === 1 ? "该评论已删除" : "当前评论"}</span></div>
          {renderDiscuss(data)}
         </div>
        {showDiscuss ?<Discuss isReply={true} placeholder={'回复 '+data.name+':'} limit={1000}
                               submit={()=>this.onSubmit()} onChange={(v)=>this.onChange(v)}
                               cancel={()=>this.cancel()}/> : null}

      </div>
    )
  }
}
