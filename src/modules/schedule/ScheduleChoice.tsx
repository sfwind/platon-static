import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg } from 'redux/actions'
import './ScheduleChoice.less'
import AssetImg from '../../components/AssetImg'
import { mark } from '../../utils/request'
import { initSchedule, loadQuestions } from './async'
import $ from 'jquery'
import { SubmitButton } from './components/SubmitButton'

let _ = require('lodash')

const sequenceMap = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'F',
  6: 'G'
}

@connect(state => state)
export default class ScheduleChoice extends Component {
  constructor() {
    super()
    this.state = {
      practice: [],
      currentIndex: 0,
      practiceCount: 0,
      selected: [],
      showResult: false,
      showNext: false,
      analysis: '',
      isRight: true,
      fadeOut: false,
      fadeIn: false,
      fadePrevOut: false,
      fadePrevIn: false
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    mark({ module: '打点', function: '课程计划', action: '打开选择题页面' })
    const { dispatch } = this.props
    dispatch(startLoad())
    loadQuestions().then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.setState({ practice: res.msg, practiceCount: res.msg.length })
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  prevChoice() {
    const { practice, currentIndex, practiceCount } = this.state
    let scheduleChoices = practice[ currentIndex ].scheduleChoices
    $(this.refs.questionGroup).animateCss('fadeOutRight', () => {
      console.log('exit')
      this.setState({ practice: practice, currentIndex: currentIndex - 1 },
        () => {
          $(this.refs.questionGroup).animateCss('fadeInLeft')
        }
      )
    })
  }

  handleClickChoice(choice) {
    const { practice, currentIndex, practiceCount } = this.state
    let scheduleChoices = practice[ currentIndex ].scheduleChoices
    _.forEach(scheduleChoices, (item) => {
      item.choice = item.id === choice.id
    })
    if(currentIndex < (practiceCount - 1)) {
      this.setState({ practice: practice }, () => {
        $(this.refs.questionGroup).animateCss('fadeOutLeft', () => {
          this.setState({ currentIndex: currentIndex + 1 }, () => {
            $(this.refs.questionGroup).animateCss('fadeInRight')
          })
        })
      })
    } else {
      this.setState({ practice: practice, selected: choice })
    }
  }

  handleClickSubmit() {
    const { dispatch } = this.props
    const { practice, currentIndex, practiceCount } = this.state
    let canSubmit = true
    _.forEach(practice, question => {
      let matchObj = _.find(question.scheduleChoices, { choice: true })
      if(_.isEmpty(matchObj)) {
        canSubmit = false
      }
    })
    if(!canSubmit) {
      dispatch(alertMsg('请选择答案'))
      return
    }

    let questionList = _.cloneDeep(practice)
    _.forEach(questionList, question => {
      question.scheduleChoices = _.remove(question.scheduleChoices, { choice: true })
      question.question = undefined
    })

    dispatch(startLoad())
    initSchedule(questionList).then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        window.ENV.showExplore = 'false'
        this.context.router.push({
          pathname: '/rise/static/course/schedule/overview'
        })
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  render() {

    const { practice, currentIndex, practiceCount } = this.state

    const isSelected = (scheduleChoices, choice) => {
      console.log(currentIndex, practiceCount, (currentIndex / (practiceCount - 1)).toFixed(2))
      return !_.isEmpty(_.find(scheduleChoices, {
        id: choice.id, choice: true
      }))
    }

    const questionRender = (practice) => {
      const { question, scheduleChoices = [] } = practice
      return (
        <div className="intro-container">
          <div className="intro-index">
            {practiceCount !== 0 && currentIndex <= practiceCount - 1 && currentIndex != 0 ?
              <span className="prev" onClick={() => this.prevChoice()}>上一题</span> : null}
          </div>
          <div ref="questionGroup" className='question-group'>
            <div className="question">
              <div
                dangerouslySetInnerHTML={{ __html: question ? ((currentIndex + 1) + '.&nbsp;&nbsp;' + question) : '' }}/>
            </div>
            <div className="choice-list">
              {scheduleChoices.map((choice, idx) => {
                return (
                  <div key={choice.id}
                       className={`choice${isSelected(scheduleChoices, choice) ? ' selected' : ''}`}
                       onClick={e => this.handleClickChoice(choice)}>
                    <span className={`index`}>{sequenceMap[ idx ]}</span>
                    <span className={`text`}>{choice.subject}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="schedule-choice" style={{ minHeight: window.innerHeight }}>
        <div className="eva-container">
          <div className="eva-page-header">制定学习计划</div>
          <div className="rate">{((currentIndex / practiceCount) * 100).toFixed(2)}%
          </div>
          <div className="eva-progress">
            <div className="eva-progress-bar"
                 style={{ width: (window.innerWidth - 90) * (currentIndex / practiceCount ) }}/>
          </div>
          {questionRender(practice[ currentIndex ] || {})}
        </div>
        {currentIndex === practiceCount - 1 ?
          <SubmitButton clickFunc={() => this.handleClickSubmit()} buttonText="提交"/>
          : null}
      </div>
    )
  }
}
