import * as React from 'react'
import './SelfInit.less'
import { FooterButton } from '../../../components/submitbutton/FooterButton'

interface SelfInitProps {
  handleStart: any
}

export class SelfInit extends React.Component<SelfInitProps, any> {

  constructor() {
    super()
  }

  render() {
    const { handleStart = () => {} } = this.props

    return (
      <div className="self-init-component">
        <FooterButton btnArray={[{
          click: () => handleStart(), text: '开始'
        }]}/>
      </div>
    )
  }

}
