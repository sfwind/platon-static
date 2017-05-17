import * as React from 'react';
import {connect} from 'react-redux';
import {startLoad, endLoad, alertMsg} from "../../redux/actions";
import {pget, ppost} from "../../utils/request";
import DiscussShow from "../practice/components/DiscussShow";
import SubmitBox from "../practice/components/SubmitBox"
import "./ReplyCommentMessage.less";
import {isString, truncate} from "lodash";

@connect(state => state)
export class ReplyCommentMessage extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {
      data: {},
      editDisable: false,
      commentList: [],
      showAll: false,
      filterContent: ''
    };
    this.commentHeight = window.innerHeight;
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentWillMount() {
    const {dispatch, location} = this.props;
    const {moduleId, submitId, commentId} = location.query;
    dispatch(startLoad());
    loadApplicationData(moduleId, submitId, commentId).then(
      res => {
        dispatch(endLoad());
        if (res.code === 200) {
          this.setState({
            data: res.msg,
            commentList: res.msg.comments,
            filterContent: isString(res.msg.description) ? res.msg.description.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, "") : ""
          });
        } else {
          dispatch(alertMsg(res.msg));
        }
      }
    ).catch(
      ex => {
        dispatch(endLoad());
        dispatch(alertMsg(ex));
      }
    )
  }

  reply(id) {
    this.setState({
      id: id,
      showReply: true
    })
  }

  onReply(content) {
    const {dispatch, location} = this.props;
    if (content) {
      dispatch(startLoad());
      this.setState({editDisable: true});
      commentReply(location.query.moduleId, location.query.submitId, content, this.state.id).then(res => {
        dispatch(endLoad());
        if (res.code === 200) {
          this.setState({
            commentList: this.state.commentList.concat(res.msg),
            showReply: false,
            editDisable: false
          });
          if (!this.state.end && this.pullElement) {
            this.pullElement.enable();
          }
          this.gocomment();
        } else {
          dispatch(alertMsg(res.msg));
          this.setState({editDisable: false});
        }
      }).catch(ex => {
        this.setState({editDisable: false});
        dispatch(endLoad());
        dispatch(alertMsg(ex));
      });
    } else {
      dispatch(alertMsg("请先输入内容再提交"))
    }
  }

  onDelete(id) {
    const commentList = this.state.commentList;
    deleteComment(id).then(res => {
      if (res.code === 200) {
        let newCommentList = [];
        commentList.forEach((item) => {
          if (item.id != id) {
            newCommentList.push(item)
          }
        });
        this.setState({commentList: newCommentList})
      }
    })
  }

  godetail() {
    const {id, integrated, planId} = this.state.data;
    const {moduleId} = this.props.location.query;
    if (moduleId == 2) {
      this.context.router.push({
        pathname: "/rise/static/practice/application",
        query: {id, integrated, planId}
      });
    }

    if (moduleId == 3) {
      this.context.router.push({
        pathname: `/rise/static/practice/subject/comment`,
        query: {id: 3, submitId: id}
      });
    }
  }

  gocomment() {
    const {id, integrated, planId} = this.state.data;
    const {submitId, moduleId} = this.props.location.query;
    if (moduleId == 2) {
      this.context.router.push({
        pathname: "/rise/static/practice/application/comment",
        query: {id, integrated, planId, submitId}
      });
    }
    if (moduleId == 3) {
      this.context.router.push({
        pathname: "/rise/static/practice/subject/comment",
        query: {id, submitId}
      });
    }
  }

  render() {
    console.log(this.state)
    const {showReply, showAll, filterContent} = this.state;
    const {topic, description} = this.state.data;
    const wordsCount = 60;

    const renderWorkContent = () => {
      if (isString(description)) {
        if (filterContent.length > wordsCount && !showAll) {
          return (
            <div className="description">
              {truncate(filterContent, {length: wordsCount, omission: ''})}
              ......
            </div>
          )
        } else {
          return (
            <div className="description">
              {filterContent}
            </div>
          )
        }
      }
      return null;
    };

    const renderComments = () => {
      const {commentList} = this.state;
      if (commentList && commentList.length != 0) {
        return (
          commentList.map((item) => {
            return (
              <DiscussShow discuss={item} reply={() => {
                this.reply(item.id);
              }} onDelete={this.onDelete.bind(this, item.id)}/>
            );
          })
        );
      }
    };

    return (
      <div>
        <div>
          <div className="container">
            <div className="page-header">{topic}</div>
            {renderWorkContent()}
            <div className="origin-question-tip" onClick={() => this.godetail()}>点击查看原题</div>
          </div>
          <div className="comment-area">
            <div className="comment-header"><span>当前评论</span></div>
            {renderComments()}
          </div>
        </div>
        {showReply ?
          <SubmitBox height={this.commentHeight} placeholder={"和作者切磋讨论一下吧"} editDisable={this.state.editDisable}
                     onSubmit={(content) => this.onReply(content)}/> : null}
      </div>
    );
  }
}

function loadApplicationData(moduleId, submitId, commentId) {
  return pget(`/rise/message/comment/reply/${moduleId}/${submitId}/${commentId}`);
}

function commentReply(moduleId, submitId, comment, replyedCommentId) {
  return ppost(`/rise/practice/comment/reply/${moduleId}/${submitId}`, {comment: comment, repliedId: replyedCommentId})
}

function deleteComment(id) {
  return ppost(`/rise/practice/delete/comment/${id}`)
}
