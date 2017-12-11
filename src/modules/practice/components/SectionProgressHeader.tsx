import * as React from 'react'
import './SectionProgressHeader.less'
import { pget } from '../../../utils/request'
import { Sidebar } from '../../../components/Sidebar'
import { ColumnSpan } from '../../../components/ColumnSpan'

interface SectionProgressHeaderProps {
  practicePlanId: string
}

export class SectionProgressHeader extends React.Component<SectionProgressHeaderProps, any> {

  constructor() {
    super()
    this.state = {
      progress: []
    }
  }

  PROGRESS_TEXT = {
    KNOWLEDGE: '知识点',
    WARMUP: '选择题',
    SIMPLE_APPLICATION: '基础应用题',
    UPGRADE_APPLICATION: '进阶应用题'
  }

  componentWillMount() {
    const { practicePlanId } = this.props
    let progress

    pget(`/rise/plan/load/series/${practicePlanId}`).then(res => {
      console.log(res)
      if(res.code === 200) {
        this.setState({
          title: res.msg.planSeriesTitle,
          progress: res.msg.planSeriesStatuses
        })
      }
    })
  }

  render() {
    const { title, progress } = this.state

    return (
      <div className="section-progress-component">
        <div className="progress-title">{title}</div>
        {
          progress.map((part, index) => {
            const { unlock, complete } = part
            return (
              <div key={index} className="progress-part">
                <span className="progress-text">{this.PROGRESS_TEXT[index]}</span>
                <div className={`${unlock ? complete ? 'complete' : 'unlock' : 'lock'} progress-icon ${index === 0 ? 'beforenone' : '' } ${index === progress.length - 1 ? 'afternone' : ''}`}>
                  <div className='progress-content'></div>
                </div>
              </div>
            )
          })
        }
        <ColumnSpan height={5} style={{ marginTop: '2.5rem' }}/>
      </div>
    )
  }

}
