import * as React from "react";
import { connect } from "react-redux";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import "./DiscussShow.less";
import AssetImg from "../../../components/AssetImg";
import { Dialog } from "react-weui"
const {Alert} = Dialog

@connect(state => state)
export default class DiscussShow extends React.Component <any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super();
    const {showLength, discuss} = props;
    const {
        comment, repliedComment
    } = discuss;
    this.state = {
      show: false,
      filterComment:this.filterText(comment, showLength),
      filterReplied:this.filterText(repliedComment, showLength - comment.length),
      showAll:this.showAll(comment, repliedComment, showLength),
      filtered:!this.showAll(comment, repliedComment, showLength),
    }

  }

  componentWillReceiveProps(props){
    const {showLength, discuss} = props;
    const {
        comment, repliedComment
    } = discuss;
    this.setState({filterComment:this.filterText(comment, showLength),
      filterReplied:this.filterText(repliedComment, showLength - comment.length),
      filtered:!this.showAll(comment, repliedComment, showLength)})
  }

  filterText(comment, limit){
    if(comment && limit>0){
      return comment.length > limit? comment.substring(0, limit) : comment;
    }else{
      return '';
    }
  }

  showAll(comment, repliedComment, limit){
    let length = comment.length;
    let repliedLength = repliedComment?repliedComment.length:0;
    return limit>length+repliedLength;
  }

  delete() {
    const {onDelete} = this.props;
    this.setState({show: false});
    if(onDelete) {
      onDelete()
    }
  }

  show(showAll){
    this.setState({showAll:!showAll})
  }

  render() {
    const {discuss, reply} = this.props;
    const {show, filterComment, filterReplied, showAll, filtered} = this.state;
    const {
      id, name, avatar, discussTime, priority, comment, repliedComment, repliedName,
      role, signature, isMine, repliedDel, del
    } = discuss;
    const alertProps = {
      buttons: [
        {label: '再想想', onClick: () => this.setState({show: false})},
        {label: '确定', onClick: () => this.delete()}
      ],
    };

    const renderComment = ()=>{
      return (
          <div className="comment-div">
            <div className="comment-content">{showAll?comment:filterComment}</div>
            {renderRepliedComment()}
            {filtered?<div onClick={()=>this.show(showAll)} className="show-all">{showAll?'收起':'展开'}</div>:null}
          </div>
      )
    };

    const renderRepliedComment = () =>{
      if(repliedComment && repliedDel != 1){
        let replied = showAll?repliedComment:filterReplied;
        if(replied){
          return (
              <div className="comment-replied-content">{'回复 '}{repliedName}:{showAll?repliedComment:filterReplied}</div>
          )
        }else{
          return null;
        }
      }else{
        return null;
      }
    };

    return (
      <div key={id} className="comment-cell">
        <div className="comment-avatar"><img className="comment-avatar-img" src={avatar}/></div>
        <div className="comment-area">
          <div className="comment-head">
            <div className="comment-name">
              {name}
            </div>
            {role == 3 || role == 4 ?
              <div className="role"><AssetImg url='https://static.iqycamp.com/images/coach.png'/></div> : null}
            {role == 5 || role == 10 ?
              <div className="role"><AssetImg url='https://static.iqycamp.com/images/senior_coach.png'/></div> : null}
            {role == 6 || role == 8 ?
              <div className="role"><AssetImg url='https://static.iqycamp.com/images/first_coach.png'/></div> : null}
            {role == 7 ? <div className="role"><AssetImg url='https://static.iqycamp.com/images/vip.png'/></div> : null}
            <div className="comment-time">{discussTime}</div>
            {priority === 1 ?
              <div className="right">
                <AssetImg type="excellent_answer" height={31} width={32} marginTop={-10} marginRight={-10}/>
              </div> : null
            }
            {
              del === 1 ?
                <div className="right">
                  <AssetImg url="https://static.iqycamp.com/images/fragment/comment_reply_del.png" height={33} width={40} marginTop={-10}/>
                </div> : null
            }
          </div>
          <div className="signature">{signature}</div>
          {renderComment()}
          {
            del === 1 ? null :
            <div className="function-area">
              {isMine ?
                <div className="function-div" style={{marginRight: 5}}>
                  <AssetImg type="delete" height={15} width={15}/>
                  <div className="function-button" onClick={() => this.setState({show: true})}>
                    删除
                  </div>
                  <Alert { ...alertProps }
                         show={show}>
                    <div className="global-pre" dangerouslySetInnerHTML={{__html: `确认要删除评论吗？`}}/>
                  </Alert>
                </div> : null}
              <div className="function-div" onClick={() => reply()}>
                <AssetImg type="reply" height={12} width={15}/>
                <div className="function-button">
                  回复
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}
