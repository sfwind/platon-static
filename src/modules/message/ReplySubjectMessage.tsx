import * as React from "react";
import "./ReplySubjectMessage.less";
import {connect} from "react-redux"
import {loadSubjectCommentList,commentSubject,loadSubject, submitSubject} from "./async"
import {loadLabels} from "../practice/subject/async"
import {startLoad, endLoad, alertMsg} from "../../redux/actions";
import AssetImg from "../../components/AssetImg";
import SubmitBox from "../practice/components/SubmitBox"
import PullElement from "pull-element"
import {findIndex,remove,merge,set} from "lodash";
import Work from "../practice/components/NewWork"


@connect(state=>state)
export class ReplySubjectMessage extends React.Component<any,any>{
  constructor(){
    super();
    this.state = {
      page:1,
      editDisable:false,
    }
    this.commentHeight = window.innerHeight;
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const {dispatch, location} = this.props;
    dispatch(startLoad());
    loadSubjectCommentList(location.query.submitId, 1)
      .then(res => {
        dispatch(endLoad());
        if(res.code===200){
          this.setState({commentList:res.msg.list,page:1,end:res.msg.end});
        } else {
          dispatch(alertMsg(res.msg));
        }
      }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    });
    loadSubject(location.query.submitId)
      .then(res => {
        dispatch(endLoad());
        if (res.code === 200) {
          return res.msg;
        } else {
          dispatch(alertMsg(res.msg));
          throw "加载失败，请联系管理员";
        }
      }).then((work)=>{
      return loadLabels(work.problemId).then(res=>{
        let {code,msg} = res;
        if(code===200){
          this.setState({labels:msg,work:work});
        } else {
          dispatch(alertMsg("获取标签失败"));
        }
      })
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    })

  }

  goBack(){
    const {location} = this.props
    this.context.router.push({ pathname: '/rise/static/message/center'})
  }

  componentDidUpdate(){
    const { commentList=[],end } = this.state;
    const {dispatch,location} = this.props;
    if(commentList&& commentList.length!==0 && !this.pullElement){
      this.pullElement = new PullElement({
        target: '.pull-target',
        scroller: '.reply-subject',
        trigger:'.reply-subject',
        damping: 4,
        detectScroll: true,
        detectScrollOnStart: true,
        onPullUpEnd: (data) => {
          loadSubjectCommentList(location.query.submitId, this.state.page + 1)
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

    if(this.pullElement && this.state.end){
      this.pullElement.disable();
    }
  }

  componentDidMount() {

  }

  componentWillUnmount(){
    this.pullElement?this.pullElement.destroy():null;
  }

  onSubmitComment(content){
    const {dispatch,location} = this.props;
    if(content){
      dispatch(startLoad());
      this.setState({editDisable:true});
      commentSubject(location.query.submitId,content)
        .then(res=>{
          dispatch(endLoad());
          if(res.code===200){
            this.setState({commentList:[res.msg].concat(this.state.commentList),showDiscuss:false,editDisable:false});
            if(!this.state.end && this.pullElement){
              this.pullElement.enable();
            }
          } else {
            dispatch(alertMsg(res.msg));
            this.setState({editDisable:false});
          }
        }).catch(ex => {
        this.setState({editDisable:false});
        dispatch(endLoad());
        dispatch(alertMsg(ex));
      })
    } else {
      dispatch(alertMsg('请先输入内容再提交'))
    }
  }
  openWriteBox(){
    this.setState({showDiscuss: true})
    if(this.pullElement){
      this.pullElement.disable();
    }
  }


  onEdit(work) {
    this.setState({showWorkEdit: true,submitId:work.submitId,defaultTitle:work.title,defaultContent:work.content});
    if(this.pullElement){
      this.pullElement.disable();
    }
  }

  onSubmitWork(content,title,labels){
    const {work} = this.state;
    const { dispatch, location} = this.props
    if(!work){
      dispatch(alertMsg("作业未加载完毕，请刷新页面"));
    }
    if(content == null || content.length === 0){
      dispatch(alertMsg('请填写作业'))
      return
    }
    if(title == null || title.length === 0){
      dispatch(alertMsg('请填写标题'))
      return
    }
    this.setState({editDisable: true})
    submitSubject(work.problemId,title, content,work.submitId,labels).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if (code === 200) {
        this.setState({showWorkEdit:false,editDisable: false,work:set(merge({},work,{title:title,content:content,submitUpdateTime:res.msg.submitUpdateTime}),'labelList',msg.labelList)});
        if(!this.state.end && this.pullElement){
          this.pullElement.enable();
        }
      }
      else {
        dispatch(alertMsg(msg))
        this.setState({editDisable: false})
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
      this.setState({editDisable: false})
    })
  }

  render(){
    const { commentList=[],showDiscuss,end,work,showWorkEdit } = this.state;

    const renderCommentList = ()=>{
      if(commentList && commentList.length !== 0){
        return (
          commentList.map((item,seq)=>{
            return (
              <div className="comment-cell">
                <div className="comment-avatar"><img className="comment-avatar-img" src={item.headPic}/>
                </div>
                <div className="comment-area">
                  <div className="comment-head">
                    <div className="comment-name">
                      {item.upName}
                    </div>
                    <div className="comment-time">{item.upTime}</div>
                  </div>
                  <div className="comment-content">
                    <pre>{item.content}</pre>
                  </div>
                </div>
              </div>
            )
          })
        )
      }  else {
        return (<div className="on_message">
          <div className="no_comment">
            <AssetImg url="http://www.iqycamp.com/images/no_comment.png" height={120} width={120}/>
          </div>
          还没有人评论过<br/>点击左下角按钮，发表第一条吧
        </div>)
      }
    }

    const renderTips = ()=>{

      if(commentList && commentList.length !== 0){
        if(!end){
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
      <div className="reply-subject has-footer">
        <div className="pull-target">
          <div className="reply-header">
            {work?<Work onEdit={()=>this.onEdit(work)} operation={false} avatarStyle={"top"}
                  headImage={work.headImage} userName={work.userName} {...work}/>:null}
          </div>
          <div className="submit-bar">评论</div>
          <div className="comment-body">
            {renderCommentList()}
            {renderTips()}
          </div>
        </div>
        <div className="writeDiscuss" onClick={() => this.openWriteBox()}>
          <AssetImg url="http://www.iqycamp.com/images/discuss.png" width={45} height={45}/>
        </div>
        {showDiscuss ?<SubmitBox height={this.commentHeight} placeholder={"和作者切磋讨论一下吧"} editDisable={this.state.editDisable}
                                 onSubmit={(content)=>this.onSubmitComment(content)}/> : null}
        <div className="button-footer" onClick={()=>this.goBack()}>返回</div>
        {showWorkEdit ?<SubmitBox height={this.commentHeight} placeholder={"发表你的精彩见解吧"} editDisable={this.state.editDisable}
                                 onSubmit={(content,title,labels)=>this.onSubmitWork(content,title,labels)} desc={this.state.desc}
                                 defaultTitle={this.state.defaultTitle} defaultContent={this.state.defaultContent}
                                  labels={this.state.labels} defaultLabels={work.labelList}
                                  titleEnable={true} /> : null}
      </div>
    );
  }
}
