import * as React from "react";
import {connect} from "react-redux";
import "./Main.less";
import {loadWarmUpAnalysisNew, discuss} from "./async";
import {startLoad, endLoad, alertMsg} from "../../../redux/actions";
import AssetImg from "../../../components/AssetImg";
import KnowledgeViewer from "../components/KnowledgeViewer";
import Discuss from "../components/Discuss";
import {set} from "lodash"
import DiscussShow from "../components/DiscussShow";

const sequenceMap = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'F',
  6: 'G',
}

@connect(state => state)
export class AnalysisNew extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      data: {},
      showKnowledge: false,
      showDiscuss: false,
      repliedId: 0,
      warmupPracticeId: 0,
      integrated:false,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount(props) {
    const {dispatch, location} = props || this.props
    const {warmupPracticeId, integrated} = location.query
    this.setState({integrated})
    dispatch(startLoad())
    loadWarmUpAnalysisNew(warmupPracticeId).then(res => {
      dispatch(endLoad())
      const {code, msg} = res
      if (code === 200){
        this.setState({data: msg, warmupPracticeId})
      }
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }


  closeModal() {
    this.setState({showKnowledge: false})
  }

  closeDiscussModal() {
    const {dispatch} = this.props
    let {data, warmupPracticeId} = this.state

    loadWarmUpAnalysisNew(warmupPracticeId).then(res => {
      dispatch(endLoad())
      const {code, msg} = res
      if (code === 200) {
        set(data, data.discussList, msg)
        this.setState({showDiscuss: false, data})
      }
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })

    window.location.href = '#discuss'
  }

  back(){
    this.context.router.push({ pathname: '/rise/static/message/center'})
  }

  reply(warmupPracticeId, repliedId){
    this.setState({showDiscuss:true, warmupPracticeId, repliedId})
  }

  render() {
    const {data, selected, showKnowledge, showDiscuss, repliedId, integrated} = this.state
    const {knowledge} = data

    const questionRender = (practice) => {
      const {id, question, pic, analysis, choiceList = [], score = 0, discussList = []} = practice
      return (
        <div>
          <div className="intro-container">
            {pic ? <div className="context-img">
                  <AssetImg url={pic}/></div>:null
            }
            <div className="question">
              <div dangerouslySetInnerHTML={{__html: question}}></div>
            </div>
            <div className="choice-list">
              {choiceList.map((choice, idx) => choiceRender(choice, idx))}
            </div>
            <div className="analysis">
              <div className="title-bar">解析</div>
              <div className="context">
                正确答案：{choiceList.map((choice, idx) => rightAnswerRender(choice, idx))}
              </div>
              <div className="context" style={{marginBottom:15}}>
                已选答案：{choiceList.map((choice, idx) => myAnswerRender(choice, idx))}
              </div>
              <div className="context"
                   dangerouslySetInnerHTML={{__html: practice ? practice.analysis : ''}}></div>
              {integrated=='false'?
              <div className="knowledge-link" onClick={() => this.setState({showKnowledge: true})}>点击查看相关知识</div>:null}
            </div>
            <div className="writeDiscuss" onClick={() => this.setState({showDiscuss: true, warmupPracticeId: id, repliedId:0})}>
              <AssetImg url="http://www.iqycamp.com/images/discuss.png" width={45} height={45}></AssetImg>
            </div>
          </div>
          <div className="discuss-container">
            <div className="discuss">
              <a name="discuss"/>
              <div className="title-bar">问答</div>
              {discussList.map((discuss, idx) => discussRender(discuss, idx))}
              { discussList.length > 0 ?
                <div className="show-more">
                  你已经浏览完所有的讨论啦
                </div>
                :
                <div className="discuss-end">
                  <div className="discuss-end-img">
                    <AssetImg url="http://www.iqycamp.com/images/no_comment.png" width={94} height={92}></AssetImg>
                  </div>
                  <span className="discuss-end-span">点击左侧按钮，发表第一个好问题吧</span>

                </div>
              }
            </div>
          </div>
        </div>
      )
    }

    const discussRender = (discuss, idx) => {
      return (
          <DiscussShow discuss={discuss} reply={this.reply.bind(this)}/>
      )
    }

    const choiceRender = (choice, idx) => {
      const {id, subject} = choice
      return (
          <div key={id} className={`choice${choice.selected ? ' selected' : ''}${choice.isRight ? ' right' : ''}`}>
          <span className={`index`}>
            {choice.isRight ? <AssetImg type="right" width={13} height={8}/> : sequenceMap[idx]}
            {/*( choice.selected ? <AssetImg type="wrong" size={10}/> : sequenceMap[idx])}*/}
          </span>
            <span className={`text`}>{subject}</span>
          </div>
      )
    }

    const rightAnswerRender = (choice, idx) => {
      return (choice.isRight? sequenceMap[idx]+' ' :'')
    }

    const myAnswerRender = (choice, idx) => {
      return (choice.selected? sequenceMap[idx]+' ' :'')
    }

    return (
      <div>
        <div className="container has-footer">
          <div className="warm-up">

            {knowledge?<div className="page-header">{knowledge.knowledge}</div>:null}
            {questionRender(data)}
          </div>
        </div>
        <div className="button-footer" onClick={this.back.bind(this)}>关闭</div>

        {showKnowledge ? <KnowledgeViewer knowledge={knowledge} closeModal={this.closeModal.bind(this)}/> : null}
        {showDiscuss ?<Discuss repliedId={repliedId} referenceId={this.state.warmupPracticeId}
                               closeModal={this.closeDiscussModal.bind(this)} discuss={(body)=>discussKnowledge(body)} /> : null}
      </div>
    )
  }
}
