import * as React from "react";
import "./Comment.less";
import {connect} from "react-redux"
import {loadCommentList,comment} from "./async"
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import AssetImg from "../../../components/AssetImg";
import SubmitBox from "../components/SubmitBox"
import PullElement from "pull-element"
import {findIndex,remove} from "lodash";

@connect(state=>state)
export class Comment extends React.Component<any,any>{
  constructor(){
    super();
    this.state = {
      page:1,
      editDisable:false,
      opacity:0,
    }
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
        if(res.code===200){
          this.setState({commentList:res.msg});
        } else {
          dispatch(alertMsg(res.msg));
        }
      }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    });
  }

  goBack(){
    this.context.router.push({
      pathname:'/rise/static/practice/challenge',
      query: {
        id: this.props.location.query.id,
        practicePlanId: this.props.location.query.practicePlanId,
        series: this.props.location.query.series
      },
      state: this.props.location.state
    })
  }

  componentDidMount() {
    const {dispatch,location} = this.props;
    this.pullElement = new PullElement({
      target: '.pull-target',
      scroller: '.comment',
      trigger:'.comment',
      damping: 4,
      onPullUp: (data) => {
        if (data.translateY <= -40){
        } else {
          console.log(data.translateY);
          this.setState({opacity:(-data.translateY)/40});
        }
      },
      detectScroll: true,
      detectScrollOnStart: true,
      onPullUpEnd: (data) => {
        console.log("开始加载更多");
        this.setState({opacity:0});
        dispatch(startLoad());
        loadCommentList(location.query.submitId, this.state.page+1)
          .then(res => {
            dispatch(endLoad());
            if(res.code===200){
              if(res.msg && res.msg.length !== 0) {
                remove(res.msg,(item)=>{
                  return findIndex(this.state.commentList,item)!==-1;
                });
                this.setState({commentList: this.state.commentList.concat(res.msg),page:this.state.page+1})
              } else {
                dispatch(alertMsg('没有更多了'));
              }
            } else {
              dispatch(alertMsg(res.msg));
            }
          }).catch(ex => {
          dispatch(endLoad());
          dispatch(alertMsg(ex));
        });
      }
    });
    this.pullElement.init();
  }

  componentWillUnmount(){
    this.pullElement.destroy();
  }

  onSubmit(content){
    console.log("提交",content);
    const {dispatch,location} = this.props;
    if(content){
      dispatch(startLoad());
      this.setState({editDisable:true});
      comment(location.query.submitId,content)
        .then(res=>{
          dispatch(endLoad());
          if(res.code===200){
            this.setState({commentList:[res.msg].concat(this.state.commentList),showDiscuss:false,editDisable:false});
            if(this.pullElement){
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

  render(){
    const { commentList=[],showDiscuss } = this.state;
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
                    <div className="comment-time right">{item.upTime}</div>
                  </div>
                  <div className="comment-content">
                    <pre>{item.content}</pre>
                  </div>
                </div>
              </div>
            )
          })
        )
      } else {
        return (<div className="on_message">
          <div className="no_comment">
            <AssetImg url="http://www.iquanwai.com/images/no_comment.png" height={120} width={120}/>
          </div>
          暂时还没有评论，点击左下角提交评论
        </div>)
      }
    }


    return (
      <div className="comment has-footer">
        <div className="pull-target">
          <div className="comment-header">
            评论
          </div>
          <div className="comment-body">
            {renderCommentList()}
            {commentList && commentList.length !== 0 ?<div className="show-more">上拉加载更多消息</div>: null}
          </div>
        </div>
        <div className="writeDiscuss" onClick={() => this.openWriteBox()}>
          <AssetImg type="discuss" width={45} height={45}/>
        </div>
        {showDiscuss ?<SubmitBox placeholder={"和作者切磋讨论一下吧"} editDisable={this.state.editDisable} onSubmit={(content)=>this.onSubmit(content)}/> : null}
        <div className="button-footer" onClick={()=>this.goBack()}>返回</div>
      </div>
    )
  }
}
