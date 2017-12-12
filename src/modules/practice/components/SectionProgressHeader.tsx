import * as React from 'react'
import './SectionProgressHeader.less'
import { pget } from '../../../utils/request'
import { ColumnSpan } from '../../../components/ColumnSpan'
import _ from 'lodash'
import { randomStr } from '../../../utils/helpers'

interface SectionProgressHeaderProps {
  practicePlanId: string
}

const SectionProgressStep = {
  KNOWLEDEGE: 0,
  WARMUP: 1,
  BASE_APPLICATION: 2,
  UPGRADE_APPLICATION: 3
}

class SectionProgressHeader extends React.Component<SectionProgressHeaderProps, any> {

  constructor() {
    super()
    this.state = {
      progress: []
    }
    this.goSeriesPage = this.goSeriesPage.bind(this)
  }

  PROGRESS_TEXT = [
    '知识点',
    '选择题',
    '基础应用题',
    '进阶应用题'
  ]

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { practicePlanId } = this.props

    pget(`/rise/plan/load/series/${practicePlanId}`).then(res => {
      if(res.code === 200) {
        this.setState({
          title: res.msg.planSeriesTitle,
          progress: res.msg.planSeriesStatuses
        })
      }
    })
  }

  goSeriesPage(index) {
    const { progress } = this.state
    const { planId, practicePlanId, practiceId, complete, unlock } = progress[index]
    if(!unlock) {
      return
    }
    let queryParam = {
      complete: complete,
      planId: planId,
      practicePlanId: practicePlanId
    }
    switch(index) {
      case 0:
        this.context.router.push({
          pathname: '/rise/static/practice/knowledge',
          query: queryParam
        })
        break
      case 1:
        this.context.router.push({
          pathname: '/rise/static/practice/warmup',
          query: queryParam
        })
        break
      case 2:
        this.context.router.push({
          pathname: '/rise/static/practice/application',
          query: _.merge(queryParam, {
            id: practiceId
          })
        })
        break
      case 3:
        this.context.router.push({
          pathname: '/rise/static/practice/application',
          query: _.merge(queryParam, {
            id: practiceId
          })
        })
        break
      default:
        break
    }
    return
  }

  render() {
    const { title, progress } = this.state

    return (
      <div className="section-progress-component" key={randomStr(12)}>
        <div className="progress-title">{title}</div>
        {
          progress.map((part, index) => {
            const { unlock, complete } = part
            return (
              <div key={index} className="progress-part"
                   onClick={() => this.goSeriesPage(index)}>
                <span className="progress-text">{this.PROGRESS_TEXT[index]}</span>
                <div
                  className={`${unlock ? complete ? 'complete' : 'unlock' : 'lock'} progress-icon ${index === 0 ? 'beforenone' : '' } ${index === progress.length - 1 ? 'afternone' : ''}`}>
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

export { SectionProgressStep, SectionProgressHeader }
