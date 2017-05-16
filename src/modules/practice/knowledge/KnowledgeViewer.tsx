import * as React from "react";
import {connect} from "react-redux"
import "./KnowledgeViewer.less";
import AssetImg from "../../../components/AssetImg";
import Audio from "../../../components/Audio";
import {loadDiscuss,discussKnowledge,loadKnowledge, learnKnowledge, loadKnowledges} from "./async"
import DiscussShow from "../components/DiscussShow"
import Discuss from "../components/Discuss"
import _ from "lodash"
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";

const sequenceMap = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'F',
  6: 'G',
}

@connect(state=>state)
export class KnowledgeViewer extends React.Component<any, any> {
  constructor() {
    super()
    this.state = {
      showTip:false,
      showDiscuss:false,
      commentId:0,
      knowledge:{},
      discuss:{},
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount(){
    const {id,practicePlanId} = this.props.location.query
    const {dispatch} = this.props
    dispatch(startLoad())
    if(practicePlanId){
      loadKnowledges(practicePlanId).then(res =>{
        if(res.code === 200){
          this.setState({knowledge:res.msg[0]})
          dispatch(endLoad())
          loadDiscuss(res.msg[0].id,1)
              .then(res=>{
                if(res.code === 200){
                  this.setState({discuss:res.msg})
                }
              });
        }else{
          dispatch(endLoad())
          dispatch(alertMsg(res.msg))
        }
      })
    }else if(id){
      loadKnowledge(id).then(res=>{
        if(res.code === 200){
          this.setState({knowledge:res.msg})
          dispatch(endLoad())
          loadDiscuss(id,1)
              .then(res=>{
                if(res.code === 200){
                  this.setState({discuss:res.msg})
                }
              });
        }else{
          dispatch(endLoad())
          dispatch(alertMsg(res.msg))
        }
      })
    }
  }


  reply(repliedId){
    this.setState({showDiscuss:true, repliedId},()=>{scroll(0,0)})
  }

  reload(){
    const {knowledge} = this.state;
    loadDiscuss(knowledge.id,1)
      .then(res=>{
        if(res.code === 200){
          this.setState({discuss:res.msg,showDiscuss:false})
        }
      });
  }

  writeDiscuss(){
    this.setState({showDiscuss: true, repliedId:0},()=>{scroll(0,0)});
    if(this.props.trigger){
      this.props.trigger();
    }
  }

  onSubmit() {
    const {dispatch, location} = this.props
    learnKnowledge(location.query.practicePlanId).then(res => {
      const {code, msg} = res
      if (code === 200) {
        this.context.router.push({pathname: '/rise/static/plan/main', query: this.props.location.query})
      }
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  render() {
    const { showTip,showDiscuss,knowledge,discuss=[] } = this.state
    const { analysis, means, keynote, audio, pic,example,id } = knowledge
    const {location} = this.props
    const {practicePlanId} = location.query

    const choiceRender = (choice, idx) => {
      const {id, subject} = choice
      return (
          <div key={id} className={`choice${choice.isRight ? ' right' : ''}`}>
          <span className={`index`}>
            {sequenceMap[idx]}
          </span>
            <span className={`subject`}>{subject}</span>
          </div>
      )
    }

    const rightAnswerRender = (choice, idx) => {
      return (choice.isRight? sequenceMap[idx]+' ' :'')
    }

    return (
      <div className={`knowledge-page`}>
        <div className={`container ${practicePlanId?'has-footer':''}`}>
          <div className="page-header">{knowledge.knowledge}</div>
          <div className="intro-container">
            { audio ? <div className="context-audio"><Audio url={audio}/></div> : null }
            { pic ? <div className="context-img"><img src={pic}/></div> : null }
            { analysis?
                <div>
                  <div className="context-title-img">
                    <AssetImg width={'100%'} url="http://www.iqycamp.com/images/fragment/analysis2.png"/>
                  </div>
                  <div className="text">
                    <pre>{analysis}</pre>
                  </div>
                </div>
                : null}
            { means?
                <div>
                  <div className="context-title-img">
                    <AssetImg width={'100%'} url="http://www.iqycamp.com/images/fragment/means2.png"/>
                  </div>
                  <div className="text">
                    <pre>{means}</pre>
                  </div>
                </div>
                : null }
            {keynote ?<div><div className="context-title-img">
                  <AssetImg width={'100%'} url="http://www.iqycamp.com/images/fragment/keynote2.png"/>
                </div><div className="text">
                  <pre>{keynote}</pre>
                </div></div>: null}
            {example ?
                <div>
                  <div className="context-title-img">
                    <AssetImg width={'100%'} url="http://www.iqycamp.com/images/fragment/example.png"/>
                  </div>
                  <div className="question">
                    <div className="context" dangerouslySetInnerHTML={{__html: example.question}}></div>
                  </div>
                  <div className="choice-list">
                    {example.choiceList.map((choice, idx) => choiceRender(choice, idx))}
                  </div>

                  {showTip?
                  <div className="analysis">
                    <div className="title-bar">解析</div>
                    <div className="context">
                      正确答案：{example.choiceList.map((choice, idx) => rightAnswerRender(choice, idx))}
                    </div>
                    <div className="context"
                         dangerouslySetInnerHTML={{__html: example.analysis}}></div>
                  </div>
                      :<div className="analysis"><div className="analysis-tip" onClick={() => this.setState({showTip:true})}>点击查看解析</div></div>}
                </div>
            : null}
            <div ref="reply" className="title-bar">问答</div>
            <div className="discuss">
              {_.isEmpty(discuss) ? null: discuss.map(item => {
                return <DiscussShow discuss={item} reply={()=>{this.reply(item.id)}}/>
              })}
              { discuss ? (discuss.length > 0 ?
                <div className="show-more">
                  你已经浏览完所有的讨论啦
                </div>
                :
                <div className="discuss-end">
                  <div className="discuss-end-img">
                    <AssetImg url="http://www.iqycamp.com/images/no_comment.png" width={94}
                              height={92}></AssetImg>
                  </div>
                  <span className="discuss-end-span">点击左侧按钮，发表第一个好问题吧</span>

                </div>) : null
              }
            </div>
            </div>
        </div>
        <div className="writeDiscuss" onClick={() => {this.writeDiscuss()}}>
          <AssetImg url="http://www.iqycamp.com/images/discuss.png" width={45} height={45}></AssetImg>
        </div>

        {practicePlanId?<div className="button-footer" onClick={this.onSubmit.bind(this)}>标记完成</div>:null}
        {showDiscuss ?<Discuss referenceId={id} type="本知识点"
                               closeModal={(body)=> this.reload()} discuss={(body)=>discussKnowledge(body)}  /> : null}
      </div>
    )
  }
}
