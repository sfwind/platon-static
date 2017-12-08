import * as React from 'react'
import './SectionProgressHeader.less'

interface SectionProgressHeaderProps {
  progress: [{
    text: string,
    unlock: boolean,
    complete: boolean
  }]
}

export class SectionProgressHeader extends React.Component<SectionProgressHeaderProps, any> {

  constructor() {
    super()
  }

  render() {
    const { progress } = this.props

    return (
      <div className="section-progress-component">
        {
          progress.map((part, index) => {
            const { text, unlock, complete } = part
            return (
              <div key={index} className="progress-part">
                <span className="progress-text">{text}</span>
                <div className="progress-icon"></div>
              </div>
            )
          })
        }
      </div>
    )
  }

}
