import * as React from 'react'
import './OtherInit.less'
import { FooterButton } from '../../../components/submitbutton/FooterButton'

interface OtherInitProps {
  handleStart: any
}

export class OtherInit extends React.Component<OtherInitProps, any> {

  constructor() {
    super()
  }

  render() {
    const { handleStart = () => {} } = this.props

    return (
      <div className="other-init-component">
        <div className='other-survey-tips'>
          {this.props.upName}邀请你，帮助ta完成一份能力测评。测评旨在帮助{this.props.upName}学习和提升，更好地理解自己的优劣势，不会对ta产生任何其他影响，请你根据工作、学习或生活中对ta的观察，客观选取最符合ta现状的描述。
        </div>
        <FooterButton btnArray={[ {
          text: '开始',
          click: () => handleStart()
        } ]}/>
      </div>
    )
  }

}
