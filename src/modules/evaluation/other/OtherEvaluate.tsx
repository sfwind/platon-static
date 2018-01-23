import * as React from 'react'
import { OtherInit } from './OtherInit'
import { OtherComplete } from './OtherComplete'
import { QuestionGroup } from '../components/QuestionGroup'

export default class OtherEvaluate extends React.Component {

  constructor() {
    super()
    this.state = {
      currentStep: this.other_evaluate_steps.init
    }
  }

  other_evaluate_steps = {
    init: 'init',
    content: 'questionare',
    complete: 'complete'
  }

  renderComponentByStep() {
    const { currentStep } = this.state
    switch(currentStep) {
      case this.other_evaluate_steps.init :
        return <OtherInit handleStart={() => this.setState({ currentStep: this.other_evaluate_steps.content })}/>
        break
      case this.other_evaluate_steps.content:
        return <QuestionGroup category='evaluation-other' header='职业发展核心能力和心理品质量表'
                              onSubmit={() => this.setState({ currentStep: this.other_evaluate_steps.complete })}
                              firstTips={{ 10: '请仔细阅读以下题目，根据您对 TA 的了解，从中选出一个最能准确描述其实际情况的选项。' }}/>
        break
      case this.other_evaluate_steps.complete:
        return <OtherComplete/>
        break
      default:
        break
    }
  }

  render() {
    return this.renderComponentByStep()
  }

}
