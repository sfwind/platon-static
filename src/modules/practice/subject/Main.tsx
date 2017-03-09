import * as React from "react";
import { connect } from "react-redux";
import "./Main.less";
import { loadSubjects,submitSubject,vote,loadSubjectDesc } from "./async";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import Work from "../components/Article"
import PullElement from 'pull-element'
import AssetImg from "../../../components/AssetImg";
import SubmitBox from "../components/SubmitBox"
import {findIndex,remove,isArray,findLast,isNull,isString,truncate,merge,set,get} from "lodash";

@connect(state => state)
export class Main extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      data: {},
      knowledge: {},
      showKnowledge: false,
      submitId: 0,
      page:1,
      otherList:[],
      goBackUrl: '',
      showDiscuss:false,
      editDisable:false,
      defaultTitle:null,
      defaultContent:null,
    }
    this.pullElement=null;
    this.picHeight = 350/750 * window.innerWidth;
    this.paddingTop = (this.picHeight - 24 - 14 - 20)/2;
    this.commentHeight = window.innerHeight;
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }


  componentDidMount(){

  }

  componentDidUpdate(preProps, preState) {
    if (!this.pullElement) {
      const {dispatch} = this.props;
      this.pullElement = new PullElement({
        target: '.container-no-pd',
        scroller: '.container-no-pd',
        damping: 4,
        detectScroll: true,
        detectScrollOnStart: true,
        onPullUpEnd: (data) => {
          console.log("开始加载更多");
          loadSubjects(this.props.location.query.id, this.state.page + 1).then(res => {
            if (res.code === 200) {
              if (res.msg && res.msg.list.length !== 0) {
                remove(res.msg.list, (item) => {
                  return findIndex(this.state.perfectList, item) !== -1;
                })
                remove(res.msg.list, (item) => {
                  return findIndex(this.state.normalList, item) !== -1;
                })
                let newPerfectList = [];
                let newNormalList = [];
                res.msg.list.forEach(item=>{
                  if(item.perfect){
                    newPerfectList.push(item);
                  } else {
                    newNormalList.push(item);
                  }
                });
                this.setState({
                  perfectList:this.state.perfectList.concat(newPerfectList),
                  normalList:this.state.normalList.concat(newNormalList),
                  page: this.state.page + 1,
                  end: res.msg.end
                });
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
      })
      this.pullElement.init();
    }
    if(this.pullElement && this.state.end){
      this.pullElement.disable();
    }
  }

  componentWillUnmount(){
    this.pullElement?this.pullElement.destroy():null;
  }

  componentWillMount() {
    const { dispatch, location } = this.props;
    const {state} = location
    if(state){
      const {goBackUrl} = state
      if(goBackUrl){
        this.setState({goBackUrl})
      }
    }

    dispatch(startLoad());
    loadSubjects(location.query.id,1).then(res => {
      dispatch(endLoad())
      let { code, msg } = res;
      if (code === 200) {
        const { list,end } = msg;
        let perfectList = [];
        let normalList = [];
        if(list && list.length!==0){
          list.forEach((item,key) => {
            item.perfect?perfectList.push(item):normalList.push(item);
          });
        }
        this.setState({perfectList: perfectList, normalList: normalList, end:end})
      }
      else dispatch(alertMsg(msg))
      return false;
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
    loadSubjectDesc(location.query.id).then(res=>{
      let {code, msg} = res;
      if(code === 200){
        this.setState({desc:msg});
      } else {
        dispatch(alertMsg("获取描述失败"));
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  onEdit(submitId,title,content) {
    this.setState({showDiscuss: true,submitId:submitId,defaultTitle:title,defaultContent:content});
    if(this.pullElement){
      this.pullElement.disable();
    }
  }


  goComment(submitId){
    const {goBackUrl} = this.state
    this.context.router.push({pathname:"/rise/static/practice/subject/comment",
      query:merge({submitId:submitId},this.props.location.query),
      state:{goBackUrl}
    })
    console.log("开始评论",submitId);
  }

  voted(id,voteStatus,voteCount,perfect,seq){
    if(!voteStatus){
      console.log("点赞");
      if(perfect){
        let newOtherList = merge([],this.state.perfectList);
        set(newOtherList,`[${seq}].voteCount`,voteCount+1)
        set(newOtherList,`[${seq}].voteStatus`,1);
        this.setState({perfectList:newOtherList})
      } else {
        let newOtherList = merge([],this.state.normalList);
        set(newOtherList,`[${seq}].voteCount`,voteCount+1)
        set(newOtherList,`[${seq}].voteStatus`,1);
        this.setState({normalList:newOtherList})
      }
      vote(id);
    } else {
      console.log("不能点赞");
    }
  }

  back(){
    const {goBackUrl} = this.state
    const {location} = this.props
    if(goBackUrl) {
      this.context.router.push({pathname: goBackUrl})
    }else{
      this.context.router.push({pathname: '/rise/static/plan/main', query: { series: location.query.series}})
    }
  }

  openWriteBox(){
    this.setState({showDiscuss: true,submitId:null})
    if(this.pullElement){
      this.pullElement.disable();
    }
  }

  onSubmit(content,title){
    const {submitId} = this.state;
    const { dispatch, location} = this.props
    if(content == null || content.length === 0){
      dispatch(alertMsg('请填写作业'))
      return
    }
    if(title == null || title.length === 0){
      dispatch(alertMsg('请填写标题'))
      return
    }
    this.setState({editDisable: true})
    submitSubject(location.query.id,title, content,submitId).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if (code === 200) {
        console.log(res.msg);
        if(submitId){
          // 是更新
          let newPerfect = merge([],this.state.perfectList);
          let newNormal = merge([],this.state.normalList);
          let flag = false;
          for(let i = 0;i<newPerfect.length; i++){
            if(flag){
              break;
            }
            if(newPerfect[i].submitId === submitId){
              flag = true;
              newPerfect[i].title = msg.title;
              newPerfect[i].content = msg.content;
              newPerfect[i].submitUpdateTime = msg.submitUpdateTime;
            }
          }
          for(let i=0;i<newNormal.length; i++){
            if(flag){
              break;
            }
            if(newNormal[i].submitId===submitId){
              flag=true;
              newNormal[i].title = msg.title;
              newNormal[i].content = msg.content;
              newNormal[i].submitUpdateTime = msg.submitUpdateTime;
            }
          }

          this.setState({showDiscuss:false,editDisable:false,submitId:null,perfectList:newPerfect,normalList:newNormal});
        } else {
          // 是新增
          if(msg.perfect){
            // 优秀
            this.setState({showDiscuss:false,editDisable:false,submitId:null,perfectList:[msg].concat(this.state.perfectList)});
          } else {
            this.setState({showDiscuss:false,editDisable:false,submitId:null,normalList:[msg].concat(this.state.normalList)});
          }
        }
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

  render() {
    const { perfectList=[],normalList=[],end,desc,showDiscuss } = this.state

    const renderTips = ()=>{
      if((normalList && normalList.length!==0) || (perfectList && perfectList.length!==0)){
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

    const renderArticle = (list,perfect)=>{
      if(list){
        return list.map((item,seq)=>{
          return (
            <Work onVoted={()=>this.voted(item.submitId,item.voteStatus,item.voteCount,perfect,seq)}  {...item}
                  goComment={()=>this.goComment(item.submitId)} onEdit={item.isMine?()=>this.onEdit(item.submitId,item.title,item.content):null}
            />
          )
        })
      }
    }

    const renderArticles = () => {
      return (
        <div ref="workContainer" className="content">
          <div className="submit-bar">精彩分享</div>
          {renderArticle(perfectList,true)}
          {normalList && normalList.length !== 0 ?<div className="submit-bar">最新分享</div>: null}
          {renderArticle(normalList,false)}
          {renderTips()}
        </div>

      )
    }

    return (
      <div>
        <div  ref="container" className="container-no-pd has-footer">
          <div className="subject">
            <div className="header" style={{height:`${this.picHeight}px`}}>
              <div className="main-tip" style={{paddingTop:`${this.paddingTop}px`}}>精华分享</div>
              <div className="sec-tip">深度好文•遇见大咖•分享心得</div>
            </div>
            <div className="intro" dangerouslySetInnerHTML={{__html:desc}}>
            </div>
            {renderArticles()}
          </div>
        </div>
        <div className="writeDiscuss" onClick={() => this.openWriteBox()}>
          <AssetImg type="discuss" width={45} height={45}/>
        </div>
        <div className="button-footer" onClick={this.back.bind(this)}>返回</div>
        {showDiscuss ?<SubmitBox height={this.commentHeight} placeholder={"发表你的精彩见解吧"} editDisable={this.state.editDisable}
                                 onSubmit={(content,title)=>this.onSubmit(content,title)} desc={this.state.desc}
                                 defaultTitle={this.state.defaultTitle} defaultContent={this.state.defaultContent}
                                 titleEnable={true} /> : null}
      </div>
    )
  }
}
