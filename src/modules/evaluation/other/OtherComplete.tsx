import * as React from 'react'
import './OtherComplete.less'

interface OtherCompleteProps {
  handleComplete: any
}

export class OtherComplete extends React.Component<OtherCompleteProps, any> {

  constructor() {
    super()
  }

  render() {
    const { handleComplete = () => {} } = this.props

    return (
      <div className="other-complete-component">
      </div>
    )
  }

}
