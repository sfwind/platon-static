import * as React from "react";
import { connect } from "react-redux";
import "./Main.less";
import { loadKnowledgeIntro, loadApplicationPractice,vote,loadOtherList } from "./async";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import Audio from "../../../components/Audio";
import AssetImg from "../../../components/AssetImg";
import KnowledgeViewer from "../components/KnowledgeViewer";
import {isNull,isString,truncate,merge,set,get} from "lodash";
import Work from "../components/NewWork"
import PullElement from 'pull-element'
import {findIndex,remove, isEmpty} from "lodash";

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
      otherHighlightList:[],
      goBackUrl: '',
    }
    this.pullElement=null;
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }


  componentDidMount(){

  }

  componentDidUpdate(preProps, preState) {
    const content = get(this.state, 'data.content');
    if (content && !this.pullElement) {
      // 有内容并且米有pullElement
      const {dispatch} = this.props;
      this.pullElement = new PullElement({
        target: '.container',
        scroller: '.container',
        damping: 4,
        detectScroll: true,
        detectScrollOnStart: true,
        onPullUpEnd: (data) => {
          loadOtherList(this.props.location.query.id, this.state.page + 1).then(res => {
            if (res.code === 200) {
              if (res.msg && res.msg.list && res.msg.list.length !== 0) {
                remove(res.msg.list, (item) => {
                  return findIndex(this.state.otherList, item) !== -1;
                })
                this.setState({
                  otherList: this.state.otherList.concat(res.msg.list),
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
    loadApplicationPractice(location.query.id).then(res => {
      let { code, msg } = res;
      if (code === 200) {
        const { content, knowledgeId } = msg;
        this.setState({data: msg, submitId: msg.submitId})
        loadKnowledgeIntro(knowledgeId).then(res => {
          dispatch(endLoad());
          let { code, msg } = res;
          if (code === 200)  this.setState({ knowledge: msg });
          else dispatch(alertMsg(msg))
        }).catch(ex => {
          dispatch(endLoad());
          dispatch(alertMsg(ex));
        });
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
            this.setState({otherList: res.msg.list, otherHighlightList:res.msg.highlightList, page: 1, end:res.msg.end});
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
      pathname: '/rise/static/practice/application/submit',
      query: { id: location.query.id, series: location.query.series},
      state: {goBackUrl}
    })
  }

  closeModal() {
    this.setState({ showKnowledge: false })
  }

  goComment(submitId){
    const {goBackUrl} = this.state
    this.context.router.push({pathname:"/rise/static/practice/application/comment",
      query:merge({submitId:submitId},this.props.location.query),
      state:{goBackUrl}
    })
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
      this.context.router.push({pathname: '/rise/static/plan/main', query: { series: location.query.series}})
    }
  }

  render() {
    const { data,otherList, otherHighlightList, knowledge = {}, showKnowledge, end } = this.state
    const { topic, description, content,voteCount,submitId,voteStatus } = data

    const renderList = (list)=>{
      if(content && list){
        return list.map((item,seq)=>{
          return (
            <Work onVoted={()=>this.voted(item.submitId,item.voteStatus,item.voteCount,false,seq)}  {...item}
                  goComment={()=>this.goComment(item.submitId)}/>
          )
        })
      }
    }

    const renderContent = ()=>{
      if(!content){
        return (
          <div className="no-comment">
            <AssetImg type="mobile" height={65} marginTop={15}/>
            <div className="submit-btn" onClick={this.onEdit.bind(this)}>手机提交</div>
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

    const renderTips = ()=>{
      if(content){
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
      <div>
        <div  ref="container" className="container has-footer">
          <div className="application">
            <div className="page-header">{topic}</div>
            <div className="intro-container">
              <div className="context-img">
                <img src="http://www.iqycamp.com/images/fragment/application_practice.png" alt=""/>
              </div>
              <div className="application-context">
                <div className="section1">
                  <p>输入是为了更好地输出！结合相关知识点，思考下面的问题，并提交你的答案吧</p>
                  <p>优质答案有机会入选精华作业，并获得更多积分；占坑帖会被删除，并扣除更多积分</p>
                </div>
                <div className="application-title">
                  <AssetImg type="app" size={15}/><span>今日应用</span>
                </div>
                <div className="section2" dangerouslySetInnerHTML={{__html: description}}>
                </div>
              </div>
              {/*<div className="knowledge-link" onClick={() => this.setState({showKnowledge: true})}>点击查看知识点</div>*/}
              <a name="submit"/>
            </div>
            <div ref="workContainer" className="work-container">
              <div className="submit-bar">{ content === null?'提交方式':'我的作业'}</div>
              {renderContent()}
              {content && !isEmpty(otherHighlightList)?<div><div className="submit-bar">{'管理员推荐'}</div>{renderList(otherHighlightList)}</div>:null}
              {content && !isEmpty(otherList)?<div><div className="submit-bar">{'最新文章'}</div>{renderList(otherList)}</div>:null}
              {renderTips()}
            </div>
          </div>
        </div>
        <div className="button-footer" onClick={this.back.bind(this)}>返回</div>
        {showKnowledge ? <KnowledgeViewer knowledge={knowledge} closeModal={this.closeModal.bind(this)}/> : null}
      </div>
    )
  }
}
