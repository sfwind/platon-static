import * as React from "react";
import {connect} from "react-redux";
import "./ReplyDiscussMessage.less";
import {loadWarmUp, loadWarmUpDiscussReply} from "./async";
import {startLoad, endLoad, alertMsg} from "../../redux/actions";
import AssetImg from "../../components/AssetImg";
import Discuss from "../practice/components/Discuss";

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

  render() {
    const {question, warmupPracticeId, data, commentId, showDiscuss} = this.state
    const {comment, name, repliedComment, repliedName, avatar, discussTime} = data
    return (
      <div>
        <div className="container has-footer">
          <div className="question">{question}
            <div className="origin-question-tip" onClick={this.onSubmit.bind(this)}>点击查看原题</div>
          </div>
          <div className="discuss-title-bar"><span className="discuss-title">当前评论</span></div>
          <div className="comment-cell">
            <div className="comment-avatar"><img className="comment-avatar-img" src={avatar} /></div>
            <div className="comment-area">
              <div className="comment-head">
                <div className="comment-name">
                  {name}
                </div>
                <div className="comment-time">{discussTime}</div>
                <div className="right" onClick={() =>
                this.setState({showDiscuss: true, warmupPracticeId, repliedId:commentId})}>
                  <div className="function-icon">
                    <AssetImg type="reply" height={17}/>
                  </div>
                  <div className="function-button">
                    回复
                  </div>
                </div>
              </div>
              <div className="comment-content">{comment}</div>
              <div className="comment-replied-content">{'回复 '}{repliedName}:{repliedComment}</div>
            </div>
          </div>
        </div>
        <div className="button-footer" onClick={this.back.bind(this)}>返回</div>
        {showDiscuss ?<Discuss repliedId={commentId} warmupPracticeId={warmupPracticeId}
                               closeModal={this.closeModal.bind(this)}/> : null}
      </div>
    )
  }
}
