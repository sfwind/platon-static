import * as React from 'react'
import { SelfInit } from './SelfInit'
import { SelfComplete } from './SelfComplete'
import { QuestionGroup } from '../components/QuestionGroup'

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

  renderComponentByStep() {
    const { currentStep } = this.state
    switch(currentStep) {
      case this.self_evaluate_steps.init :
        return <SelfInit handleStart={() => this.setState({ currentStep: this.self_evaluate_steps.content })}/>
        break
      case this.self_evaluate_steps.content:
        return <QuestionGroup category='evaluation-self' header='职业发展核心能力和心理品质量表'
                              onSubmit={() => this.setState({ currentStep: this.self_evaluate_steps.complete })}
                              firstTips={{ 10: '请仔细阅读以下题目，根据您的实际情况，选出一个最能准确描述您的选项。' }}/>
        break
      case this.self_evaluate_steps.complete:
        return <SelfComplete/>
        break
      default:
        break
    }
  }

  render() {
    return this.renderComponentByStep()
  }

}
