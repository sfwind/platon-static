import * as React from 'react'
import './SelfComplete.less'

interface SelfCompleteProps {
  handleComplete: any
}

export class SelfComplete extends React.Component<SelfCompleteProps, any> {

  constructor() {
    super()
  }

  render() {
    const { handleComplete = () => {} } = this.props

    return (
      <div className="self-complete-complete">
        <div onClick={() => handleComplete()}>分享</div>
      </div>
    )
  }

}
