import * as React from 'react'
import './SelfComplete.less'

interface SelfCompleteProps {
  handleComplete: any
}

export class SelfComplete extends React.Component {

  constructor() {
    super()
  }

  render() {
    const { handleComplete = () => {} } = this.props

    return (
      <div className="self-complete-complete">

      </div>
    )
  }

}
