import * as React from 'react'
import { OtherInit } from './OtherInit'
import { OtherComplete } from './OtherComplete'

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
        return <OtherInit/>
        break
      case this.other_evaluate_steps.content:
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
