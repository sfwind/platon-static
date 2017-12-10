import * as React from 'react'
import './SectionProgressHeader.less'

interface sectionPart {
  text: string,
  unlock: boolean,
  complete: boolean
}

interface SectionProgressHeaderProps {
  progress: [sectionPart]
}

export class SectionProgressHeader extends React.Component<SectionProgressHeaderProps, any> {

  constructor() {
    super()
  }

  render() {
    // const { progress } = this.props

    const progress = [
      { text: '知识点', unlock: true, complete: true },
      { text: '选择题', unlock: true, complete: false },
      { text: '基础应用题', unlock: false, complete: false },
      { text: '进阶应用题', unlock: false, complete: false }
    ]

    return (
      <div className="section-progress-component">
        {
          progress.map((part, index) => {
            const { text, unlock, complete } = part
            return (
              <div key={index} className="progress-part">
                <span className="progress-text">{text}</span>
                <div className={`${unlock ? complete ? 'complete' : 'unlock' : 'lock'} progress-icon`}>
                  <div className='progress-content'></div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }

}
