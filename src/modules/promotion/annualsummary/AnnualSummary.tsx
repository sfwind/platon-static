import * as React from 'react'
import AssetImg from '../../../components/AssetImg'
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
    console.log('click')
    let person = document.getElementById('person')
    let step = person.dataset.nextstep
    let nextStep = ''
    switch(step) {
      case this.PERSON_STEPS.init:
        nextStep = this.PERSON_STEPS.building1
        console.log(nextStep)
        person.dataset.nextstep = nextStep
        this.setState({ personStep: nextStep })
        break
      case this.PERSON_STEPS.building1:
        nextStep = this.PERSON_STEPS.building2
        console.log(nextStep)
        person.dataset.nextstep = nextStep
        this.setState({ personStep: nextStep })
        break
      case this.PERSON_STEPS.building2:
        nextStep = this.PERSON_STEPS.building3
        console.log(nextStep)
        person.dataset.nextstep = nextStep
        this.setState({ personStep: nextStep })
        break
      case this.PERSON_STEPS.building3:
        nextStep = this.PERSON_STEPS.building4
        console.log(nextStep)
        person.dataset.nextstep = nextStep
        this.setState({ personStep: nextStep })
        break
      case this.PERSON_STEPS.building4:
        nextStep = this.PERSON_STEPS.building5
        console.log(nextStep)
        person.dataset.nextstep = nextStep
        this.setState({ personStep: nextStep })
        break
      default:
        break
    }
  }

  render() {
    const { personStep = this.PERSON_STEPS.init } = this.state
    return (
      <div className="annual-summary-container" onClick={() => this.handleNextStep()}>
        <div className="move-block">
          <div id="person" className={`person step-${personStep}`} data-nextstep={this.PERSON_STEPS.init}></div>
          {/*<AssetImg className="summary-map" url='https://static.iqycamp.com/images/annual_summary_map.jpg'/>*/}
          <div className="mask"></div>
          <Step5_Auditorium/>
        </div>
      </div>
    )
  }

}
