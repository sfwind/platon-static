import * as React from "react";
import {connect} from "react-redux";
import "./Main.less";
import {loadWarmUpAnalysis, loadKnowledgeIntro, loadWarmUpNext, loadWarmUpDiscuss} from "./async";
import {startLoad, endLoad, alertMsg} from "../../../redux/actions";
import AssetImg from "../../../components/AssetImg";
import KnowledgeViewer from "../components/KnowledgeViewer";
import Discuss from "../components/Discuss";
import DiscussShow from "../components/DiscussShow";
import {set} from "lodash"

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
export class Analysis extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      list: [],
      currentIndex: 0,
      practiceCount: 0,
      knowledge: {},
      showKnowledge: false,
      showDiscuss: false,
      repliedId: 0,
      warmupPracticeId: 0,
      pageIndex:1,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillReceiveProps(newProps) {
    if (this.props.location.query.practicePlanId !== newProps.location.query.practicePlanId) {
      this.componentWillMount(newProps)
    }
  }

  componentWillMount(props) {
    const {dispatch, location} = props || this.props
    this.setState({currentIndex: 0})
    const {practicePlanId} = location.query
    dispatch(startLoad())
    loadKnowledgeIntro(location.query.kid).then(res => {
      dispatch(endLoad())
      const {code, msg} = res
      if (code === 200) this.setState({knowledge: msg})
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
    loadWarmUpAnalysis(practicePlanId).then(res => {
      dispatch(endLoad())
      const {code, msg} = res
      if (code === 200) this.setState({list: msg, practiceCount: msg.practice.length})
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  next() {
    const {dispatch} = this.props
    const {currentIndex, practiceCount} = this.state
    if (currentIndex < practiceCount - 1) {
      this.setState({currentIndex: currentIndex + 1})
    }
  }

  prev() {
    const {dispatch} = this.props
    const {currentIndex} = this.state
    if (currentIndex > 0) {
      this.setState({currentIndex: currentIndex - 1})
    }
  }

  nextTask() {
    const {dispatch} = this.props
    const {series, practicePlanId} = this.props.location.query
    this.context.router.push({
      pathname: '/rise/static/plan/main',
      query: {series}
    })
  }

  closeModal() {
    this.setState({showKnowledge: false})
  }

  closeDiscussModal() {
    const {dispatch} = this.props
    let {list, currentIndex} = this.state
    const {practice = []} = list
    const {id} = practice[currentIndex]

    loadWarmUpDiscuss(id, 1).then(res => {
      dispatch(endLoad())
      const {code, msg} = res
      if (code === 200) {
        set(list, `practice.${currentIndex}.discussList`, msg)
        this.setState({showDiscuss: false, list})
      }
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })

    window.location.href = '#discuss'

  }

  reply(warmupPracticeId, repliedId){
    this.setState({showDiscuss:true, warmupPracticeId, repliedId})
  }

  render() {
    const {list, currentIndex, selected, knowledge, practiceCount,
      showKnowledge, showDiscuss, repliedId} = this.state
    const {practice = []} = list

    const questionRender = (practice) => {
      const {id, question, voice, analysis, choiceList = [], score = 0, discussList = []} = practice
      return (
        <div>
          <div className="intro-container">
            { practiceCount !== 0 && currentIndex <= practiceCount - 1 ? <div className="intro-index">
                <span className="index">第{currentIndex + 1}/{practiceCount}题</span>
                <span className="type"><span className="number">{score}</span>分</span>
              </div> : null}
            <div className="question">
              <div dangerouslySetInnerHTML={{__html: question}}></div>
            </div>
            <div className="choice-list">
              {choiceList.map((choice, idx) => choiceRender(choice, idx))}
            </div>
            <div className="analysis">
              <div className="analysis-title">【解析】</div>
              <div className="context"
                   dangerouslySetInnerHTML={{__html: practice ? practice.analysis : ''}}></div>
              <div className="knowledge-link" onClick={() => this.setState({showKnowledge: true})}>点击查看知识点</div>
            </div>
            <div className="writeDiscuss" onClick={() => this.setState({showDiscuss: true, warmupPracticeId: id, repliedId:0})}>
              <AssetImg url="http://www.iqycamp.com/images/discuss.png" width={45} height={45}></AssetImg>
            </div>
          </div>
          <div className="discuss-container">
            <div className="discuss">
              <a name="discuss"/>
              <div className="discuss-title-bar">问答</div>
              {discussList.map((discuss, idx) => discussRender(discuss, idx))}
              { discussList.length > 0 ?
                <div className="discuss-end">
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

    return (
      <div>
        <div className="container has-footer">
          <div className="warm-up">
            <div className="page-header">{knowledge.knowledge}</div>
            {questionRender(practice[currentIndex] || {})}
          </div>
        </div>
        <div className="button-footer">
          <div className={`left ${currentIndex === 0 ? ' disabled' : 'origin'}`} onClick={this.prev.bind(this)}>上一题</div>
          {currentIndex + 1 < practiceCount ?
            <div className={`right`} onClick={this.next.bind(this)}>下一题</div> :
            <div className="right" onClick={this.nextTask.bind(this)}>返回</div>}
        </div>

        {showKnowledge ? <KnowledgeViewer knowledge={knowledge} closeModal={this.closeModal.bind(this)}/> : null}
        {showDiscuss ?<Discuss repliedId={repliedId} warmupPracticeId={this.state.warmupPracticeId}
                               closeModal={this.closeDiscussModal.bind(this)}/> : null}
      </div>
    )
  }
}
