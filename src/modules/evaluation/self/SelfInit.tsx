import * as React from 'react'
import './SelfInit.less'

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
        <div onClick={() => handleStart()}>开始</div>
      </div>
    )
  }

}
