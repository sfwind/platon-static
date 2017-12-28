import * as React from 'react'
import './AnnualSummary.less'
import { NextStepButton } from './components/NextStepButton'
import { Step1_SchoolGate } from './steps/Step1_SchoolGate'
import { Step2_ActivityCenter } from './steps/Step2_ActivityCenter'
import { Step3_TeachingBuilding } from './steps/Step3_TeachingBuilding'
import { Step4_Library } from './steps/Step4_Library'
import { Step5_Auditorium } from './steps/Step5_Auditorium'

export default class AnnualSummary extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  PERSON_STEPS = {
    init: 'init',
    building1: 'building1',
    building2: 'building2',
    building3: 'building3',
    building4: 'building4',
    building5: 'building5'
  }

  handleNextStep() {
    this.setState({
      stepBox: <div></div>
    })
    let person = document.getElementById('person')
    let step = person.dataset.nextstep
    let nextStep = ''
    switch(step) {
      case this.PERSON_STEPS.init:
        nextStep = this.PERSON_STEPS.building1
        break
      case this.PERSON_STEPS.building1:
        nextStep = this.PERSON_STEPS.building2
        break
      case this.PERSON_STEPS.building2:
        nextStep = this.PERSON_STEPS.building3
        break
      case this.PERSON_STEPS.building3:
        nextStep = this.PERSON_STEPS.building4
        break
      case this.PERSON_STEPS.building4:
        nextStep = this.PERSON_STEPS.building5
        break
      default:
        break
    }
    person.dataset.nextstep = nextStep
    this.setState({ personStep: nextStep }, () => {
      setTimeout(() => {
        this.setState({
          stepBox: this.loadCurrentBuilding()
        })
      }, 4000)
    })
  }

  loadCurrentBuilding() {
    let personStep = this.state.personStep
    let result = []
    switch(personStep) {
      case this.PERSON_STEPS.init:
        return
      case this.PERSON_STEPS.building1:
        result.push(<Step1_SchoolGate/>)
        result.push(<NextStepButton text="下一步" func={() => this.handleNextStep()}/>)
        break
      case this.PERSON_STEPS.building2:
        result.push(<Step2_ActivityCenter/>)
        result.push(<NextStepButton text="下一步" func={() => this.handleNextStep()}/>)
        break
      case this.PERSON_STEPS.building3:
        result.push(<Step3_TeachingBuilding/>)
        result.push(<NextStepButton text="下一步" func={() => this.handleNextStep()}/>)
        break
      case this.PERSON_STEPS.building4:
        result.push(<Step4_Library/>)
        result.push(<NextStepButton text="下一步" func={() => this.handleNextStep()}/>)
        break
      case this.PERSON_STEPS.building5:
        result.push(<Step5_Auditorium/>)
        result.push(<NextStepButton text="分享" func={() => this.handleNextStep()}/>)
        break
      default:
        return
    }
    result.push(<div className="mask"></div>)
    return result
  }

  render() {
    const { personStep = this.PERSON_STEPS.init, stepBox = <div></div> } = this.state
    return (
      <div className="annual-summary-container" onClick={() => this.handleNextStep()}>
        <div className="move-block">
          <div id="person" className={`person step-${personStep}`}
               data-nextstep={this.PERSON_STEPS.init}>
            <div className="headimage"
                 style={{ background: 'url(https://static.iqycamp.com/headImage-97yboxsa-blob) no-repeat' }}>
            </div>
          </div>
          {stepBox}
          {/*<Step2_ActivityCenter/>*/}
          {/*<div className="mask"></div>*/}
        </div>
      </div>
    )
  }

}
