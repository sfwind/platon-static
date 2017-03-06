import * as React from "react";
import { connect } from "react-redux";
import "./Main.less";
import { loadChallengePractice,vote,loadOtherList } from "./async";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import Audio from "../../../components/Audio";
import AssetImg from "../../../components/AssetImg";
import {isNull,isString,truncate,merge,set} from "lodash";
import Work from "../components/Work"
import PullElement from 'pull-element'
import {findIndex,remove,get} from "lodash";


@connect(state => state)
export class Main extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      data: {},
      knowledge: {},
      submitId: 0,
      page:1,
      otherList:[],
      opacity:0,
      goBackUrl: '',
    }
    this.pullElement=null;
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentDidMount(){
  }

  componentDidUpdate(preProps,preState){
    const content = get(this.state,'data.content');
    if(content && !this.pullElement){
      const {dispatch} = this.props;
      this.pullElement = new PullElement({
        target:'.work-container',
        scroller:'.container',
        damping:2,
        onPullUp: (data) => {
          if (data.translateY <= -40){
            this.pullElement.preventDefault()
          } else {
            this.setState({opacity:(-data.translateY)/40});
          }
        },
        detectScroll:true,
        detectScrollOnStart:true,
        onPullUpEnd:(data)=>{
          this.setState({opacity:0});
          dispatch(startLoad());
          loadOtherList(this.props.location.query.id,this.state.page+1).then(res=> {
            dispatch(endLoad());
            if (res.code === 200) {
              if (res.msg && res.msg.length !== 0) {
                remove(res.msg,(item)=>{
                  return findIndex(this.state.otherList,item)!==-1;
                })
                this.setState({otherList: this.state.otherList.concat(res.msg), page: this.state.page + 1});
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
      })
      this.pullElement.init();
    }
  }

  componentWillUnmount(){
    this.pullElement?this.pullElement.destroy():null;
  }

  componentWillMount() {
    const { dispatch, location } = this.props
    const {state} = location
    if(state)
    {
      const {goBackUrl} = state
      if (goBackUrl) {
        this.setState({goBackUrl})
      }
    }
    dispatch(startLoad())
    loadChallengePractice(location.query.id).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if (code === 200) {
        const { content } = msg
        this.setState({data: msg, submitId: msg.submitId})
        if (content !== null){
          window.location.href = '#submit'
          return true;
        }
      }
      else dispatch(alertMsg(msg))
      return false;
    }).then(res=>{
      if (res) {
        // 已提交
        return loadOtherList(location.query.id, 1).then(res => {
          if (res.code === 200) {
            this.setState({otherList: res.msg, page: 1});
          } else {
            dispatch(alertMsg(res.msg));
          }
        });
      } else {
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  onEdit() {
    const { location } = this.props
    const { goBackUrl } = this.state
    this.context.router.push({
      pathname: '/rise/static/practice/challenge/submit',
      query: { id: location.query.id, series: location.query.series},
      state: {goBackUrl}
    })
  }

  onCopy() {
    const { dispatch } = this.props
    dispatch(alertMsg('已复制到剪贴板'))
  }

  goComment(submitId){
    const { goBackUrl } = this.state
    this.context.router.push({pathname:"/rise/static/practice/challenge/comment",
      query:merge({submitId:submitId},this.props.location.query),
      state: {goBackUrl}})
  }

  voted(id,voteStatus,voteCount,isMine,seq){
    if(!voteStatus){
      if(isMine){
        this.setState({data:merge({},this.state.data,{voteCount:voteCount+1,voteStatus:true})});
      } else {
        let newOtherList = merge([],this.state.otherList);
        set(newOtherList,`[${seq}].voteCount`,voteCount+1)
        set(newOtherList,`[${seq}].voteStatus`,1);
        this.setState({otherList:newOtherList})
      }
      vote(id);
    } else {
    }
  }

  back(){
    const {goBackUrl} = this.state
    const {location} = this.props
    if(goBackUrl) {
      this.context.router.push({pathname: goBackUrl})
    }else{
      this.context.router.push({pathname: '/rise/static/plan/main', series: location.query.series})
    }
  }

  render() {
    const { data,otherList=[], knowledge = {} } = this.state
    const { voice, pic, description, content, submitUpdateTime,voteCount,
      commentCount,submitId,voteStatus } = data


    const renderOtherList = ()=>{
      if(content && otherList){
        return otherList.map((item,seq)=>{
          return (
            <Work onVoted={()=>this.voted(item.submitId,item.voteStatus,item.voteCount,false,seq)}  {...item}
                  goComment={()=>this.goComment(item.submitId)}/>
          )
        })
      }
    }

    const renderContent = ()=>{
      if(isNull(content)) {
        return (<div className="no-comment">
          <AssetImg type="mobile" height={65} marginTop={15}/>
          <div className="submit" onClick={this.onEdit.bind(this)}>手机提交</div>
          <div className="content">
            <div className="text">windows微信客户端也适用</div>
          </div>
          <AssetImg type="pc" height={65} marginTop={15}/>
          <div className="content">
            <div className="text">更喜欢电脑上提交?</div>
            <div className="text">登录www.iquanwai.com/community</div>
          </div>
        </div>)
      } else {
        return (
        <Work onVoted={()=>this.voted(submitId,voteStatus,voteCount,true)} onEdit={()=>this.onEdit()}
              headImage={window.ENV.headImage} userName={window.ENV.userName} {...data}
              goComment={()=>this.goComment(submitId)} />
        )
      }
    }
    {/*<div className="has-comment">*/}
    {/*<div className="submit-cell">*/}
    {/*<div className="submit-avatar"><img className="submit-avatar-img" src={window.ENV.headImage}/></div>*/}
    {/*<div className="submit-area">*/}
    {/*<div className="submit-head">*/}
    {/*<div className="submit-name">*/}
    {/*{window.ENV.userName}*/}
    //         </div>
    //         <div className="right" onClick={this.onEdit.bind(this)}>
    //           <div className="submit-icon">
    //             <AssetImg type="edit" height={17}/>
    //           </div>
    //           <div className="submit-button">
    //             编辑
    //           </div>
    //         </div>
    //       </div>
    //       <pre className="submit-content">{content}</pre>
    //       <div className="submit-time">{submitUpdateTime}</div>
    //     </div>
    //   </div>
    // </div>
    return (
      <div>
        <div ref="container" className="container has-footer">
          <div className="challenge">
            <div className="intro-container">
              { voice ? <div className="context-audio">
                <Audio url={voice}/>
              </div> : null }
              <div className="context-img">
                <img src="http://www.iquanwai.com/images/fragment/challenge_practice.png" alt=""/>
              </div>
              {/*<div className="context" dangerouslySetInnerHTML={{__html: description}}></div>*/}
              <div className="context">
                <p>好的开始是成功的一半！让我们来完成今天最后一个任务--专题训练。</p>
                <p>选择这个专题，你是想实现什么目标呢？制定目标帮你更积极地学习，也带给你更多成就感！</p>
                <p>建议在未来几天的学习中，也在这个任务里记录下通过学习实现目标的情况。</p>
              </div>
              <a name="submit"/>
            </div>
            <div ref="workContainer" className="work-container">
              <div className="submit-bar"><span className="padding"></span>{ content === null?'提交方式':'我的作业'}</div>
              {renderContent()}
              {content?<div className="submit-bar">群众的智慧</div>:null}
              {renderOtherList()}
            </div>
          </div>
        </div>
        <div className="show-more" style={{opacity:`${this.state.opacity}`,display:`${this.state.opacity===0?'none':'block'}`}} >上拉加载更多消息</div>
        <div className="button-footer" onClick={this.back.bind(this)}>返回</div>
      </div>
    )
  }
}
