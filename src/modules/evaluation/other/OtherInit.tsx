import * as React from 'react'
import './OtherInit.less'

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
        <div onClick={() => handleStart()}>开始</div>
      </div>
    )
  }

}
