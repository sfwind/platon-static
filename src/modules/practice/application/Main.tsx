import * as React from "react";
import { connect } from "react-redux";
import "./Main.less";
import { loadKnowledgeIntro, loadApplicationPractice,vote,loadOtherList } from "./async";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import Audio from "../../../components/Audio";
import AssetImg from "../../../components/AssetImg";
import KnowledgeViewer from "../components/KnowledgeViewer";
import {isNull,isString,truncate,merge,set} from "lodash";
import Work from "../components/Work"
import PullElement from 'pull-element'
import {findIndex,remove} from "lodash";

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
      otherList:[]
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }


  componentDidMount(){
    const {dispatch} = this.props;
    this.pullElement = new PullElement({
      target:'.work-container',
      scroller:'.container',
      damping:2,
      onPullUp: (data) => {
        if(data.translateY <= -40)
          this.pullElement.preventDefault()
      },
      detectScroll:true,
      detectScrollOnStart:true,
      onPullUpEnd:(data)=>{
        console.log("开始加载更多");
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

  componentWillUnmount(){
    this.pullElement.destroy();
  }

  componentWillMount() {
    const { dispatch, location } = this.props;
    dispatch(startLoad());
    loadKnowledgeIntro(location.query.kid).then(res => {
      dispatch(endLoad());
      const { code, msg } = res;
      if (code === 200)  this.setState({ knowledge: msg });
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    });
    loadApplicationPractice(location.query.id).then(res => {
      dispatch(endLoad());
      const { code, msg } = res;
      if (code === 200) {
        const { content } = msg;
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
        console.log("已经提交", res);
        return loadOtherList(location.query.id, 1).then(res => {
          if (res.code === 200) {
            this.setState({otherList: res.msg, page: 1});
          } else {
            dispatch(alertMsg(res.msg));
          }
        });
      } else {
        console.log("没有提交");
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  onSubmit() {
    const { location } = this.props
    this.context.router.push({
      pathname: '/rise/static/plan/main',
      query: { series: location.query.series }
    })
  }

  onEdit() {
    const { location } = this.props
    this.context.router.push({
      pathname: '/rise/static/practice/application/submit',
      query: { id: location.query.id, series: location.query.series, kid: location.query.kid}
    })
  }

  closeModal() {
    this.setState({ showKnowledge: false })
  }

  goComment(submitId){
    this.context.router.push({pathname:"/rise/static/practice/application/comment",query:merge({submitId:submitId},this.props.location.query)})
    console.log("开始评论",submitId);
  }

  voted(id,voteStatus,voteCount,isMine,seq){
    if(!voteStatus){
      console.log("点赞");
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
      console.log("不能点赞");
    }
  }

  render() {
    const { data,otherList, knowledge = {}, showKnowledge } = this.state
    const { voice, pic, description, content, submitUpdateTime,voteCount,commentCount,submitId,voteStatus } = data


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
      if(isNull(content)){
        return (
          <div className="no-comment">
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
          </div>
        )
      } else {
        return (
          <Work onVoted={()=>this.voted(submitId,voteStatus,voteCount,true)} onEdit={()=>this.onEdit()}
                headImage={window.ENV.headImage} userName={window.ENV.userName} {...data}
                goComment={()=>this.goComment(submitId)} />
        )
      }
    }

    return (
      <div>
        <div  ref="container" className="container has-footer">
          <div className="application">
            <div className="page-header">{knowledge.knowledge}</div>
            <div className="intro-container">
              { voice ? <div className="context-audio">
                <Audio url={voice}/>
              </div> : null }
              <div className="context-img">
                <img src="http://www.iquanwai.com/images/fragment/application_practice.png" alt=""/>
              </div>
              <div className="application-context">
                <div className="section1">
                  <p>好了，学以致用一下吧！结合相关知识点，思考并实践下面的任务。记录下你的经历，还会收获积分。</p>
                </div>
                <div className="application-title">
                  <AssetImg type="app" size={15}/><span>今日应用</span>
                </div>
                <div className="section2" dangerouslySetInnerHTML={{__html: description}}>
                </div>
              </div>
              <div className="knowledge-link" onClick={() => this.setState({showKnowledge: true})}>点击查看知识点</div>
              <a name="submit"/>
            </div>
            <div ref="workContainer" className="work-container">
              <div className="submit-bar">{ content === null?'提交方式':'我的作业'}</div>
              {renderContent()}
              {content?<div className="submit-bar">群众的智慧</div>:null}
              {renderOtherList()}
            </div>
          </div>
        </div>
        <div className="button-footer" onClick={this.onSubmit.bind(this)}>返回</div>
        {showKnowledge ? <KnowledgeViewer knowledge={knowledge} closeModal={this.closeModal.bind(this)}/> : null}
      </div>
    )
  }
}
