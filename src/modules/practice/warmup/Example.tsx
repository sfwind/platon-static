import * as React from "react";
import { connect } from "react-redux";
import { remove, set, merge } from "lodash";
import "./Main.less";
import { loadExample, answer, loadKnowledgeIntro } from "./async";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import Audio from "../../../components/Audio";
import KnowledgeViewer from "../components/KnowledgeViewer";

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
export class Example extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      data:{},
      knowledge:{},
      showKnowledge: false,
      selected: [],
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch, location } = this.props
    dispatch(startLoad())
    loadExample(location.query.kid).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if (code === 200)  {
        if(msg === null){
          dispatch(alertMsg('该知识点没有例题'))
          this.context.router.push({ pathname: '/rise/static/practice/warmup/intro', query: this.props.location.query })
        }
        this.setState({ data: msg })
      }
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
    loadKnowledgeIntro(location.query.kid).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if (code === 200)  this.setState({ knowledge: msg })
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  onChoiceSelected(choiceId) {
    const { selected } = this.state
    let _list = selected
    if (_list.indexOf(choiceId) > -1) {
      remove(_list, n => n === choiceId)
    } else {
      _list.push(choiceId)
    }
    this.setState({ selected: _list })
    // }
  }

  setChoice(cb) {
    let { data, selected } = this.state
    set(data, "choice", selected)
    this.setState({ data })
    if (cb) {
      cb(data)
    }
  }

  onSubmit() {
    const { dispatch,location } = this.props
    const { selected, data } = this.state
    if (selected.length === 0) {
      dispatch(alertMsg("你还没有选择答案哦"))
      return
    }
    this.context.router.push({
      pathname: '/rise/static/practice/knowledge/example/analysis',
      query: {"warmupPracticeId": data.id, "practicePlanId": location.query.practicePlanId,
        "kid": location.query.kid, "series": location.query.series},
      state: {selected}
    })
  }

  closeModal() {
    this.setState({ showKnowledge: false })
  }

  render() {
    const { data,knowledge,showKnowledge,selected } = this.state

    const questionRender = (practice) => {
      const { question, voice, analysis, choiceList = [], score = 0 } = practice
      return (
        <div className="intro-container">
          <div className="intro-index">
            <span className="index">第1/1题</span>
            <span className="type">本题为例题，答案不计分</span>
          </div>
          { voice ? <div className="context-audio">
              <Audio url={voice}/>
            </div> : null }
          <div className="question">
            <div dangerouslySetInnerHTML={{__html: question}}></div>
          </div>
          <div className="choice-list">
            {choiceList.map((choice, idx) => choiceRender(choice, idx))}
          </div>
          <div className="knowledge-link" onClick={() => this.setState({showKnowledge: true})}>不确定? 瞄一眼知识点</div>
        </div>
      )
    }

    const choiceRender = (choice, idx) => {
      const { id, subject } = choice
      return (
        <div key={id} className={`choice${selected.indexOf(id) > -1 ? ' selected' : ''}`}
             onClick={e => this.onChoiceSelected(id)}>
          <span className="index">{sequenceMap[idx]}</span>
          <span className="text">{subject}</span>
        </div>
      )
    }

    return (
      <div>
        <div className="container has-footer" style={{height: window.innerHeight - 75}}>
          <div className="warm-up">
            <div className="page-header">{knowledge.knowledge}</div>
            {questionRender(data)}
          </div>
        </div>
        <div className="button-footer" onClick={this.onSubmit.bind(this)}>提交</div>
        {showKnowledge ? <KnowledgeViewer knowledge={knowledge} closeModal={this.closeModal.bind(this)}/> : null}
      </div>
    )
  }
}
