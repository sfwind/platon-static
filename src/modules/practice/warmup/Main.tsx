import * as React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import './Main.less'
import { answer, getOpenStatus, consolidationStatus } from './async'
import { mark } from '../../../utils/request'
import { startLoad, endLoad, alertMsg, set } from '../../../redux/actions'
import AssetImg from '../../../components/AssetImg'
import { FooterButton } from '../../../components/submitbutton/FooterButton'
import { SectionProgressHeader, SectionProgressStep } from '../components/SectionProgressHeader'
require("jquery-circle-progress")
var $ = require('jquery')

const sequenceMap = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'F',
  6: 'G'
}

const WARMUP_AUTO_SAVING = 'rise_warmup_autosaving'

@connect(state => state)
export class Main extends React.Component <any, any> {
  constructor() {
    super()
    this.state = this.getInitialState()
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  getInitialState() {
    return {
      list: [],
      currentIndex: 0,
      practiceCount: 0,
      selected: [],
      knowledge: {},
      integrated: false,
      submit: false,
      openStatus: {},
      data: {}
    }
  }

  componentWillMount() {
    const { dispatch, location, res } = this.props
    const { integrated, practicePlanId } = location.query
    this.setState({ integrated })
    dispatch(endLoad())
    const { code, msg } = res
    let list = msg
    if(code === 200) {
      const { practice } = msg
      let currentIndex = 0
      let selected = []
      if(practice) {
        let storageDraft = JSON.parse(window.localStorage.getItem(WARMUP_AUTO_SAVING))
        if(storageDraft && storageDraft.id == practicePlanId) {
          const selectedChoices = storageDraft.selectedChoices
          selectedChoices.map((choiceSelected, questionIdx) => {
            _.set(list, `practice.${questionIdx}.choice`, choiceSelected)
          })
          selected = _.get(list, `practice.${selectedChoices.length - 1}.choice`)
          currentIndex = selectedChoices.length - 1
        }
        this.setState({ list, practiceCount: msg.practice.length, currentIndex, selected })
      }
    } else dispatch(alertMsg(msg))

    getOpenStatus().then(res => {
      if(res.code === 200) {
        this.setState({ openStatus: res.msg })
      }
    })
  }

  onChoiceSelected(choiceId) {
    const { practicePlanId } = this.props.location.query
    const { list, currentIndex, selected } = this.state
    let _list = selected
    if(_list.indexOf(choiceId) > -1) {
      _.remove(_list, n => n === choiceId)
    } else {
      _list.push(choiceId)
    }
    // 临时保存到localstorage
    let storageDraft = JSON.parse(window.localStorage.getItem(WARMUP_AUTO_SAVING))
    if(storageDraft && storageDraft.id == practicePlanId) {
      let { selectedChoices } = storageDraft
      if(selectedChoices.length >= currentIndex + 1) {
        selectedChoices[ currentIndex ] = _list
      } else {
        selectedChoices.push(_list)
      }
    } else {
      // 初始化
      storageDraft = { id: practicePlanId, selectedChoices: [ _list ] }
    }
    window.localStorage.setItem(WARMUP_AUTO_SAVING, JSON.stringify(storageDraft))
    this.setState({ selected: _list })
  }

  setChoice(cb) {
    let { list, currentIndex, selected } = this.state
    _.set(list, `practice.${currentIndex}.choice`, selected)
    this.setState({ list })
    if(cb) {
      cb(list.practice)
    }
  }

  prev() {
    const { dispatch } = this.props
    const { currentIndex, list } = this.state
    if(currentIndex > 0) {
      this.setChoice()
      const selected = list.practice[ `${currentIndex - 1}` ].choice
      this.setState({ currentIndex: currentIndex - 1, selected })
      dispatch(set('warmup_currentIndex', currentIndex - 1))
      window.scrollTo(0, 0)
    }
  }

  next() {
    const { dispatch } = this.props
    const { selected, list, currentIndex, practiceCount } = this.state
    if(selected.length === 0) {
      dispatch(alertMsg('你还没有选择答案哦'))
      return
    }

    if(currentIndex < practiceCount - 1) {
      this.setChoice()
      let selected = list.practice[ `${currentIndex + 1}` ].choice
      if(!selected) {
        selected = []
      }
      let questionId = _.get(list, `practice[${currentIndex}].id`)
      mark({ module: '打点', function: questionId, action: '做选择题', memo: currentIndex })
      this.setState({ currentIndex: currentIndex + 1, selected })
      window.scrollTo(0, 0)
    }
  }

  onSubmit() {
    const { dispatch } = this.props
    const { selected, currentIndex, practiceCount, list } = this.state
    const { practicePlanId } = this.props.location.query
    if(selected.length === 0) {
      dispatch(alertMsg('你还没有选择答案哦'))
      return
    }
    if(currentIndex === practiceCount - 1) {
      let questionId = _.get(list, `practice[${currentIndex}].id`)
      mark({
        module: '打点',
        function: questionId,
        action: '做选择题',
        memo: currentIndex
      })
      this.setChoice(p => {
        dispatch(startLoad())
        let res = answer({ practice: p }, practicePlanId).then(res => {
          dispatch(endLoad())
          const { code, msg } = res
          if(code === 200) {
            const { total, rightNumber, point } = msg
            dispatch(set('completePracticePlanId', practicePlanId))
            this.clearStorage()
            // redux 存储弹卡片弹出区分变量
            dispatch(set('CompleteChapterPracticePlanId', practicePlanId))
            this.setState({ data: msg, submit: true }, () => {
              $('.result').circleProgress({
                value: rightNumber / total,
                size: 138,
                startAngle: -Math.PI / 2,
                fill: {
                  gradient: [ "#FF983F", "#FFC701" ]
                }
              })
            })

          } else {
            dispatch(alertMsg(msg))
          }
        }).catch(e => {
          dispatch(alertMsg(e))
        })
      })
    }
  }

  goAnalysis() {
    this.setState(this.getInitialState(), () => this.props.analysis())
  }

  clearStorage() {
    window.localStorage.removeItem(WARMUP_AUTO_SAVING)
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    const { openStatus } = this.state
    const { openConsolidation } = openStatus

    if(openConsolidation) {
      consolidationStatus().then(res => {
        const { code, msg } = res
        if(code === 200) {
          this.setState({ openStatus: _.merge({}, openStatus, { openConsolidation: true }) })
        } else {
          dispatch(alertMsg(msg))
        }
      })
    }
  }

  render() {
    const {
      list, currentIndex, selected, practiceCount, openStatus = {}, integrated,
      submit, data
    } = this.state
    const { planId } = this.props.location.query
    const { total, rightNumber, point } = data
    const { openConsolidation } = openStatus
    const { practice = [] } = list

    const questionRender = (practice) => {
      const { question, pic, choiceList = [], score = 0 } = practice
      return (
        <div className="intro-container">
          {
            practiceCount !== 0 && currentIndex <= practiceCount - 1 &&
            <div className="intro-index">
              <span className="index">第{currentIndex + 1}/{practiceCount}题</span>
              <span className="tip">正确选项可能不止一个</span>
              <div className="type"><span className="number">{score}</span>分</div>
            </div>
          }
          {
            pic &&
            <div className="context-img">
              <AssetImg url={pic}/>
            </div>
          }
          <div className="question">
            <div dangerouslySetInnerHTML={{ __html: question }}/>
          </div>
          <div className="choice-list">
            {choiceList.map((choice, idx) => choiceRender(choice, idx))}
          </div>
          { integrated == 'false' && <div className="knowledge-link"
                                          onClick={() => this.refs.sectionProgress.goSeriesPage(SectionProgressStep.KNOWLEDGE)}>
            不确定?瞄一眼知识点
          </div>
          }
        </div>
      )
    }

    const choiceRender = (choice, idx) => {
      const { id, subject } = choice
      return (
        <div key={id} className={`choice${selected.indexOf(id) > -1 ? ' selected' : ''}`}
             onClick={e => this.onChoiceSelected(id)}>
          <span className={`index ${selected.indexOf(id) > -1 ? ' selected' : ''}`}>{sequenceMap[ idx ]}</span>
          <span
            className={`text`}>{sequenceMap[ idx ]}&nbsp;&nbsp;{subject}</span>
        </div>
      )
    }

    return (
      <div className="warm-up-container">
        <SectionProgressHeader ref={'sectionProgress'} planId={planId}
                               practicePlanId={this.props.location.query.practicePlanId} currentIndex={1}/>
        { !openConsolidation && <div className="progress-section-tip">
          <div className="tip-angle" />
          点这里可以回看学过的知识点
        </div> }
        {questionRender(practice[ currentIndex ] || {})}

        <FooterButton btnArray={[
          { click: () => this.prev(), text: '上一题' },
          {
            click: () => {
              currentIndex !== practiceCount - 1 ?
                this.next() : this.onSubmit()
            },
            text: currentIndex !== practiceCount - 1 ? '下一题' : '提交'
          }
        ]}/>
        {  submit &&
        <div className="result-mask">
          <div className="result-dialog">
            <div className="result">
              <div className="result-title">答对题数</div>
              <div className="result-number">{rightNumber + '/' + total}</div>
            </div>
            <div className="award-title">获得奖励</div>
            <div className="award-detail">任务得分{' '}<span>{'+' + point}</span></div>
            <div className="go-analysis" onClick={()=>this.goAnalysis()}>查看解析</div>
          </div>
        </div>
        }
      </div>
    )
  }
}
