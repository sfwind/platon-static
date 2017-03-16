import * as React from "react";
import {connect} from "react-redux";
import "./AnalysisNew.less";
import {loadWarmUpAnalysisNew, loadKnowledgeIntro} from "./async";
import {startLoad, endLoad, alertMsg} from "../../../redux/actions";
import Audio from "../../../components/Audio";
import AssetImg from "../../../components/AssetImg";
import KnowledgeViewer from "../components/KnowledgeViewer";
import Discuss from "../components/Discuss";
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
export class AnalysisNew extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      data: {},
      knowledge: {},
      showKnowledge: false,
      showDiscuss: false,
      repliedId: 0,
      warmupPracticeId: 0,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount(props) {
    const {dispatch, location} = props || this.props
    const {warmupPracticeId} = location.query
    dispatch(startLoad())
    loadWarmUpAnalysisNew(warmupPracticeId).then(res => {
      let {code, msg} = res
      const data = msg
      if (code === 200){
        const {knowledgeId} = msg
        loadKnowledgeIntro(knowledgeId).then(res => {
          dispatch(endLoad())
          const {code, msg} = res
          if (code === 200) this.setState({knowledge: msg, data, warmupPracticeId})
          else dispatch(alertMsg(msg))
        }).catch(ex => {
          dispatch(endLoad())
          dispatch(alertMsg(ex))
        })
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

  render() {
    const {data, selected, knowledge,
      showKnowledge, showDiscuss, repliedId} = this.state

    const questionRender = (practice) => {
      const {id, question, voice, analysis, choiceList = [], score = 0, discussList = []} = practice
      return (
        <div className="intro-container">
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
            <AssetImg url="https://www.iqycamp.com/images/discuss.png" width={45} height={45}></AssetImg>
          </div>
          <div className="discuss">
            <a name="discuss"/>
            <div className="discuss-title-bar"><span className="discuss-title">问答</span></div>
            {discussList.map((discuss, idx) => discussRender(discuss, idx))}
            { discussList.length > 0 ?
              <div className="discuss-end">
                你已经浏览完所有的讨论啦
              </div>
              :
              <div className="discuss-end">
                <div className="discuss-end-img">
                  <AssetImg url="https://www.iqycamp.com/images/no_comment.png" width={94} height={92}></AssetImg>
                </div>
                <span className="discuss-end-span">点击左侧按钮，发表第一个好问题吧</span>

              </div>
            }
          </div>
        </div>
      )
    }

    const discussRender = (discuss, idx) => {
      const {id, name, avatar, comment, discussTime, repliedName, repliedComment, warmupPracticeId} = discuss
      return (
        <div className="comment-cell">
          <div className="comment-avatar"><img className="comment-avatar-img" src={avatar} /></div>
          <div className="comment-area">
            <div className="comment-head">
              <div className="comment-name">
                {name}
              </div>
              <div className="comment-time">{discussTime}</div>
              <div className="right" onClick={() => this.setState({showDiscuss: true, warmupPracticeId, repliedId:id})}>
                <div className="function-icon">
                  <AssetImg type="reply" height={17}/>
                </div>
                <div className="function-button">
                  回复
                </div>
              </div>
            </div>
            <div className="comment-content">{comment}</div>
            {repliedComment ?
              <div className="comment-replied-content">{'回复 '}{repliedName}:{repliedComment}</div> : null}
          </div>
          <div className="comment-hr"/>
        </div>
      )
    }

    const choiceRender = (choice, idx) => {
      const {id, subject} = choice
      return (
        <div key={id} className={`choice${choice.selected ? ' selected' : ''}`}>
          <span className={`index${choice.isRight ? ' right' : ' wrong'}`}>
            {choice.isRight ? <AssetImg type="right" width={13} height={8}/> :
              ( choice.selected ? <AssetImg type="wrong" size={10}/> : sequenceMap[idx])}
          </span>
          <span className={`text${choice.isRight ? ' right' : ' wrong'}`}>{subject}</span>
        </div>
      )
    }

    return (
      <div>
        <div className="container has-footer">
          <div className="warm-up-analysis">
            <div className="page-header">{knowledge.knowledge}</div>
            {questionRender(data)}
          </div>
        </div>
        <div className="button-footer" onClick={this.back.bind(this)}>关闭</div>

        {showKnowledge ? <KnowledgeViewer knowledge={knowledge} closeModal={this.closeModal.bind(this)}/> : null}
        {showDiscuss ?<Discuss repliedId={repliedId} warmupPracticeId={this.state.warmupPracticeId}
                               closeModal={this.closeDiscussModal.bind(this)}/> : null}
      </div>
    )
  }
}
