import * as React from "react";
import {connect} from "react-redux";
import "./ReplyDiscussMessage.less";
import {loadWarmUp, loadWarmUpDiscussReply} from "./async";
import {startLoad, endLoad, alertMsg} from "../../redux/actions";
import Discuss from "../practice/components/Discuss";
import DiscussShow from "../practice/components/DiscussShow";

@connect(state => state)
export class ReplyDiscussMessage extends React.Component <any, any> {
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
    const {warmupPracticeId} = location.query
    const {commentId} = location.query
    dispatch(startLoad())
    loadWarmUpDiscussReply(commentId).then(res => {
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

    loadWarmUp(warmupPracticeId).then(res => {
      dispatch(endLoad())
      const {code, msg} = res

      if (code === 200) {
        let {question} = msg
        if(question.length>16){
          question = question.substring(0, 16)+"......"
        }
        this.setState({question, warmupPracticeId})

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
    const {question, warmupPracticeId, data, commentId, showDiscuss} = this.state

    const renderDiscuss = (discuss) => {
        return (
            <DiscussShow discuss={discuss} reply={this.reply.bind(this)}/>
        )
    }
    return (
      <div>
        <div className="container has-footer">
          <div className="question">{question}</div>
          <div className="origin-question-tip" onClick={this.onSubmit.bind(this)}>点击查看原题</div>
          <div className="discuss-title-bar"><span className="discuss-title">当前评论</span></div>
          {renderDiscuss(data)}
        </div>
        <div className="button-footer" onClick={this.back.bind(this)}>返回</div>
        {showDiscuss ?<Discuss repliedId={commentId} warmupPracticeId={warmupPracticeId}
                               closeModal={this.closeModal.bind(this)}/> : null}
      </div>
    )
  }
}
