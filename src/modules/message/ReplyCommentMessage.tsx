import * as React from 'react';
import {connect} from 'react-redux';
import {startLoad, endLoad, alertMsg} from "../../redux/actions";
import DiscussShow from "../practice/components/DiscussShow";
import Discuss from "../practice/components/Discuss"
import "./ReplyDiscussMessage.less";
import {isString, truncate} from "lodash";
import {commentReply, loadArticleData, deleteComment} from "./async";

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
    const {moduleId, commentId} = location.query;
    dispatch(startLoad());
    loadArticleData(moduleId, commentId).then(
      res => {
        dispatch(endLoad());
        if (res.code === 200) {
          this.setState({
            data: res.msg,
            commentList: [res.msg.comment],
            filterContent: isString(res.msg.description) ? res.msg.description.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, "") : ""
          });
        } else {
          dispatch(alertMsg(res.msg));
        }
      }
    ).catch(ex => {
        dispatch(endLoad());
        dispatch(alertMsg(ex));
    })
  }

  onSubmit() {
    const {dispatch, location} = this.props;
    const {content, repliedId} = this.state;
    if (content) {
      dispatch(startLoad());
      this.setState({editDisable: true});
      commentReply(location.query.moduleId, location.query.submitId, content, repliedId).then(res => {
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
          this.goComment();
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

  goDetail() {
    const {moduleId, submitId} = this.props.location.query;
    if (moduleId == 2) {
      this.context.router.push({
        pathname: "/rise/static/practice/application/comment",
        query: {submitId}
      });
    }

    if (moduleId == 3) {
      this.context.router.push({
        pathname: `/rise/static/practice/subject/comment`,
        query: {submitId}
      });
    }
  }

  goComment() {
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

  reply(item){
    this.setState({showDiscuss:true, repliedId:item.id})
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

  render() {
    const {showDiscuss, showAll, filterContent,data} = this.state;
    const {topic, description, comment} = data;
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
                this.reply(item);
              }} onDelete={this.onDelete.bind(this, item.id)}/>
            );
          })
        );
      }
    };

    return (
      <div>
        <div className="container" onClick={()=>this.cancel()}>
          <div className="page-header">{topic}</div>
            {renderWorkContent()}
          <div className="origin-question-tip" onClick={() => this.goDetail()}>点击查看原题</div>
            <div className="discuss-title-bar"><span className="discuss-title">当前评论</span></div>
            {renderComments()}
        </div>
        {showDiscuss ?<Discuss isReply={true} placeholder={'回复 '+comment.name+':'}
                               submit={()=>this.onSubmit()} onChange={(v)=>this.onChange(v)}
                               cancel={()=>this.cancel()}/> : null}
      </div>
    );
  }
}