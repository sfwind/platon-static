import * as React from "react";
import {connect} from "react-redux";
import "./ReplyDiscussMessage.less";
import {loadKnowledge, loadKnowledgeDiscussReply,discussKnowledge} from "./async";
import {startLoad, endLoad, alertMsg} from "../../redux/actions";
import Discuss from "../practice/components/Discuss";
import DiscussShow from "../practice/components/DiscussShow";

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
        console.log(res.msg);
        this.setState({knowledge:res.msg, knowledgeId})
      } else {
        dispatch(alertMsg(msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  onSubmit(){
    this.context.router.push({ pathname: '/rise/static/practice/warmup/new/analysis', query: this.props.location.query })
  }

  back(){
    this.context.router.push({ pathname: '/rise/static/message/center'})
  }

  closeModal(){
    this.context.router.push({ pathname: '/rise/static/practice/warmup/new/analysis', query: this.props.location.query })
  }

  reply(warmupPracticeId, repliedId){
    this.setState({showDiscuss:true, warmupPracticeId, repliedId})
  }

  render() {
    const {knowledge, knowledgeId, data, commentId, showDiscuss} = this.state

    const renderDiscuss = (discuss) => {
        return (
            <DiscussShow discuss={discuss} reply={this.reply.bind(this)}/>
        )
    }
    return (
      <div>
        <div className="container has-footer">
           <div className="question">{knowledge?knowledge.knowledge:null}</div>
           <div className="origin-question-tip" onClick={this.onSubmit.bind(this)}>点击查看原题</div>
           <div className="discuss-title-bar"><span className="discuss-title">当前评论</span></div>
           {renderDiscuss(data)}
         </div>
        <div className="button-footer" onClick={this.back.bind(this)}>返回</div>
        {showDiscuss ?<Discuss repliedId={commentId} referenceId={knowledgeId}
                               closeModal={this.closeModal.bind(this)} discuss={(body)=>discussKnowledge(body)}  /> : null}
      </div>
    )
  }
}
