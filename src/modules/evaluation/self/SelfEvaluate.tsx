import * as React from 'react'
import { connect } from 'react-redux';
import { startLoad, endLoad, alertMsg, set } from 'redux/actions'
import { SelfInit } from './SelfInit'
import { SelfComplete } from './SelfComplete'
import { QuestionGroup } from '../components/QuestionGroup'
import { loadSurveySubmit } from '../async';
import * as _ from 'lodash';
import { configShare } from '../../helpers/JsConfig'

@connect(state => state)
export default class SelfEvaluate extends React.Component {

  constructor() {
    super()
    this.state = {
      currentStep: this.self_evaluate_steps.init
    }
  }

  self_evaluate_steps = {
    init: 'init',
    content: 'questionare',
    complete: 'complete'
  }

  async componentWillMount() {
    const { dispatch } = this.props;
    dispatch(startLoad());
    let res = await loadSurveySubmit('evaluation-self');
    dispatch(endLoad());
    if(res.code === 200) {
      this.setState({ selfSubmitId: res.msg, currentStep: this.self_evaluate_steps.complete });
    } else {
      // dispatch(alertMsg(res.msg))
    }
  }

  handleClickStart() {
    const { dispatch } = this.props;
    const { selfSubmitId } = this.state;
    if(!selfSubmitId) {
      this.setState({ currentStep: this.self_evaluate_steps.content })
    } else {
      dispatch(alertMsg('您已经提交过测评问卷'));
      this.setState({ currentStep: this.self_evaluate_steps.complete })
    }
  }

  handleComplete() {
    const { dispatch } = this.props;
    const { selfSubmitId } = this.state;
    configShare(
      `圈外商学院--测评问卷`,
      `https://${window.location.hostname}/rise/static/value/evaluation/other?referId=${selfSubmitId}`,
      'https://static.iqycamp.com/images/rise_share.jpg?imageslim',
      '问卷问卷问卷问卷'
    )
  }

  handleSubmit(submitId) {
    this.setState({ currentStep: this.self_evaluate_steps.complete, selfSubmitId: submitId });
  }

  renderComponentByStep() {
    const { currentStep } = this.state
    switch(currentStep) {
      case this.self_evaluate_steps.init :
        return <SelfInit handleStart={() => this.handleClickStart()}/>
        break
      case this.self_evaluate_steps.content:
        return <QuestionGroup category='evaluation-self' header='职业发展核心能力和心理品质量表'
                              onSubmit={(submitId) => this.handleSubmit(submitId)}
                              firstTips={{ 10: '请仔细阅读以下题目，根据您的实际情况，选出一个最能准确描述您的选项。' }}/>
        break
      case this.self_evaluate_steps.complete:
        return <SelfComplete handleComplete={() => this.handleComplete()}/>
        break
      default:
        break
    }
  }

  render() {
    return this.renderComponentByStep()
  }

}
