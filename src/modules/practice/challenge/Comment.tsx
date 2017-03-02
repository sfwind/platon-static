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
      editDisable:false
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
    console.log('goBack');
    this.context.router.push({
      pathname:'/rise/static/practice/challenge',
      query: {
        id: this.props.location.query.id,
        practicePlanId: this.props.location.query.practicePlanId,
        series: this.props.location.query.series
      }
    })
  }

  componentDidMount() {
    const {dispatch,location} = this.props;
    this.pullElement = new PullElement({
      target: '.pull-target',
      scroller: '.comment',
      damping: 2,
      onPullUp: (data) => {
        if (data.translateY <= -40)
          this.pullElement.preventDefault()
      },
      detectScroll: true,
      detectScrollOnStart: true,
      onPullUpEnd: (data) => {
        console.log("开始加载更多");
        dispatch(startLoad());
        loadCommentList(location.query.submitId, this.state.page+1)
          .then(res => {
            dispatch(endLoad());
            if(res.code===200){
              if(res.msg && res.msg.length !== 0) {
                remove(res.msg,(item)=>{
                  return findIndex(this.state.commentList,item)!==-1;
                });
                this.setState({commentList: this.state.commentList.concat(res.msg)})
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
  }

  render(){
    const { commentList=[],showDiscuss } = this.state;
    const renderCommentList = ()=>{
      return (
        commentList.map((item,seq)=>{
          return (
            <div className="submit-cell">
              <div className="submit-avatar"><img className="submit-avatar-img" src={item.headPic}/>
              </div>
              <div className="submit-area">
                <div className="submit-head">
                  <div className="submit-name">
                    {item.upName}
                  </div>
                  <div className="submit-time">{item.upTime}</div>
                </div>
                <div className="submit-content">
                  <pre>{item.content}</pre>
                </div>
              </div>
            </div>
          )
        })
      )
    }


    return (
      <div className="comment has-footer">
        <div className="pull-target">
          <div className="comment-header">
            评论
          </div>
          <div className="comment-content">
            {renderCommentList()}
          </div>
        </div>
        <div className="writeDiscuss" onClick={() => this.openWriteBox()}>
          <AssetImg type="discuss" width={45} height={45}/>
        </div>
        {showDiscuss ?<SubmitBox editDisable={this.state.editDisable} onSubmit={(content)=>this.onSubmit(content)}/> : null}
        <div className="button-footer" onClick={()=>this.goBack()}>返回</div>
      </div>
    )
  }
}
