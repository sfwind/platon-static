import * as React from "react";
import "./Comment.less";
import {connect} from "react-redux"
import {loadCommentList, comment, deleteComment, commentReply} from "./async"
import {startLoad, endLoad, alertMsg} from "../../../redux/actions";
import AssetImg from "../../../components/AssetImg";
import SubmitBox from "../components/SubmitBox"
import PullElement from "pull-element"
import {findIndex, remove} from "lodash";
import DiscussShow from "../components/DiscussShow"

@connect(state => state)
export class Comment extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      page: 1,
      editDisable: false,
      commentList: [],
    }
    this.commentHeight = window.innerHeight;
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const {dispatch, location} = this.props;
    dispatch(startLoad());
    loadCommentList(location.query.submitId, 1)
      .then(res => {
        dispatch(endLoad());
        if (res.code === 200) {
          this.setState({commentList: res.msg.list, page: 1, end: res.msg.end});
        } else {
          dispatch(alertMsg(res.msg));
        }
      }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    });
  }

  goBack() {
    const {location} = this.props
    this.context.router.push({
      pathname: '/rise/static/practice/application',
      query: location.query,
      state: location.state
    })
  }

  componentDidUpdate() {
    const {commentList = [], end} = this.state;
    const {dispatch, location} = this.props;
    if (commentList && commentList.length !== 0 && !this.pullElement) {
      this.pullElement = new PullElement({
        target: '.pull-target',
        scroller: '.comment',
        trigger: '.comment',
        damping: 4,
        detectScroll: true,
        detectScrollOnStart: true,
        onPullUpEnd: (data) => {
          loadCommentList(location.query.submitId, this.state.page + 1)
            .then(res => {
              if (res.code === 200) {
                if (res.msg && res.msg.list.length !== 0) {
                  remove(res.msg.list, (item) => {
                    return findIndex(this.state.commentList, item) !== -1;
                  });
                  this.setState({
                    commentList: this.state.commentList.concat(res.msg.list),
                    page: this.state.page + 1,
                    end: res.msg.end
                  })
                } else {
                  dispatch(alertMsg('没有更多了'));
                }
              } else {
                dispatch(alertMsg(res.msg));
              }
            }).catch(ex => {
            dispatch(alertMsg(ex));
          });
        }
      });
      this.pullElement.init();
    }

    if (this.pullElement && this.state.end) {
      this.pullElement.disable();
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    this.pullElement ? this.pullElement.destroy() : null;
  }

  onSubmit(content) {
    const {dispatch, location} = this.props;
    if (content) {
      dispatch(startLoad());
      this.setState({editDisable: true});
      comment(location.query.submitId, content)
        .then(res => {
          dispatch(endLoad());
          if (res.code === 200) {
            this.setState({
              commentList: [res.msg].concat(this.state.commentList),
              showDiscuss: false,
              editDisable: false
            });
            if (!this.state.end && this.pullElement) {
              this.pullElement.enable();
            }
          } else {
            dispatch(alertMsg(res.msg));
            this.setState({editDisable: false});
          }
        }).catch(ex => {
        this.setState({editDisable: false});
        dispatch(endLoad());
        dispatch(alertMsg(ex));
      })
    } else {
      dispatch(alertMsg('请先输入内容再提交'))
    }
  }

  openWriteBox() {
    this.setState({showDiscuss: true})
    if (this.pullElement) {
      this.pullElement.disable();
    }
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
      commentReply(location.query.submitId, content, this.state.id).then(res => {
        dispatch(endLoad());
        if (res.code === 200) {
          this.setState({
            commentList: [res.msg].concat(this.state.commentList),
            showReply: false,
            editDisable: false
          });
          if (!this.state.end && this.pullElement) {
            this.pullElement.enable();
          }
        } else {
          dispatch(alertMsg(res.msg));
          this.setState({editDisable: false});
        }
        dispatch(startLoad());
        loadCommentList(location.query.submitId, 1)
          .then(res => {
            dispatch(endLoad());
            if (res.code === 200) {
              this.setState({commentList: res.msg.list, page: 1, end: res.msg.end});
            } else {
              dispatch(alertMsg(res.msg));
            }
          }).catch(ex => {
          dispatch(endLoad());
          dispatch(alertMsg(ex));
        });
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
    const {commentList = []} = this.state
    deleteComment(id).then(res => {
      if (res.code === 200) {
        let newCommentList = []
        commentList.forEach((item) => {
          if (item.id != id) {
            newCommentList.push(item)
          }
        })
        this.setState({commentList: newCommentList})
      }
    })
  }

  render() {
    const {commentList = [], showDiscuss, showReply, end} = this.state;
    const renderCommentList = () => {
      if (commentList && commentList.length !== 0) {
        return (
          commentList.map((item, seq) => {
            return (
              <DiscussShow discuss={item} reply={() => {
                this.reply(item.id)
              }} onDelete={this.onDelete.bind(this, item.id)}/>
            )
          })
        )
      } else {
        return (<div className="on_message">
          <div className="no_comment">
            <AssetImg url="http://www.iqycamp.com/images/no_comment.png" height={120} width={120}/>
          </div>
          还没有人评论过<br/>点击左下角按钮，发表第一条吧
        </div>)
      }
    }

    const renderTips = () => {

      if (commentList && commentList.length !== 0) {
        if (!end) {
          return (
            <div className="show-more">上拉加载更多消息</div>
          )
        } else {
          return (
            <div className="show-more">已经到最底部了</div>
          )
        }
      }
    }

    return (
      <div className="comment">
        <div className="pull-target">
          <div className="comment-header">
            评论
          </div>
          <div className="comment-body">
            {renderCommentList()}
            {renderTips()}
          </div>
        </div>
        <div className="writeDiscuss" onClick={() => this.openWriteBox()}>
          <AssetImg url="http://www.iqycamp.com/images/discuss.png" width={45} height={45}/>
        </div>
        {showDiscuss ?
          <SubmitBox height={this.commentHeight} placeholder={"和作者切磋讨论一下吧"} editDisable={this.state.editDisable}
                     onSubmit={(content) => this.onSubmit(content)}/> : null}
        {showReply ?
          <SubmitBox height={this.commentHeight} placeholder={"和志同道友们一起切磋讨论一下吧"} editDisable={this.state.editDisable}
                     onSubmit={(content) => this.onReply(content)}/> : null}

        {/*<div className="button-footer" onClick={()=>this.goBack()}>返回</div>*/}
      </div>
    );
  }
}
