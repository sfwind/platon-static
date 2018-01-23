import * as React from 'react'
import { SelfInit } from './SelfInit'
import { SelfComplete } from './SelfComplete'

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
        return <SelfInit/>
        break
      case this.self_evaluate_steps.content:
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
