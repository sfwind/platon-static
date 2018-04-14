import * as React from 'react'
import './SectionProgressHeader.less'
import { loadPlanSeries, loadPracticePlan } from './async'
import _ from 'lodash'
import { randomStr } from '../../../utils/helpers'
import { MarkBlock } from '../../../components/markblock/MarkBlock'
import requestProxy from '../../../components/requestproxy/requestProxy'

interface SectionProgressHeaderProps {
  practicePlanId: string,
}

export class SectionProgressHeader extends React.Component<SectionProgressHeaderProps, any> {
  constructor() {
    super()
    this.state = {
      progress: [],
      title: '',
      currentIndex: 0,
    }
    this.goSeriesPage = this.goSeriesPage.bind(this)
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.unlockSeries()
  }

  async unlockSeries() {
    const { practicePlanId } = this.props

    if(practicePlanId) {
      let res = await loadPlanSeries(practicePlanId)
      this.setState({
        title: res.msg.planSeriesTitle,
        progress: res.msg.planSeriesStatuses,
        currentIndex: res.msg.index - 1,
      })
    }
  }

  goNextPage() {
    const { progress, currentIndex } = this.state
    const detailProgress = progress[ currentIndex + 1 ]

    this.goPage(detailProgress, currentIndex + 1)
  }

  goSeriesPage(index) {
    const { progress } = this.state
    const detailProgress = progress[ index ]

    this.goPage(detailProgress, index)
  }

  async goPage(progress, index) {
    const { planId, practicePlanId, practiceId, complete, type } = progress
    let res = await loadPracticePlan(practicePlanId)
    const { code, msg } = res
    const { unlocked } = msg
    if(!unlocked) {
      requestProxy.alertMessage('练习尚未解锁')
      return
    }

    this.setState({ currentIndex: index })

    let queryParam = {
      complete: complete,
      planId: planId,
      practicePlanId: practicePlanId,
    }
    switch(type) {
      case 41:
        this.context.router.push({
          pathname: '/rise/static/practice/preview',
          query: queryParam,
        })
        break
      case 31:
        this.context.router.push({
          pathname: '/rise/static/practice/knowledge',
          query: queryParam,
        })
        break
      case 32:
        this.context.router.push({
          pathname: '/rise/static/practice/knowledge/review',
          query: queryParam,
        })
        break
      case 1:
      case 2:
        this.context.router.push({
          pathname: '/rise/static/practice/warmup',
          query: queryParam,
        })
        break
      case 11:
      case 12:
        this.context.router.push({
          pathname: '/rise/static/practice/application',
          query: _.merge(queryParam, {
            id: practiceId,
          }),
        })
        break
      default:
        break
    }
  }

  selfSeriesSwitch(index) {
    this.goSeriesPage(index)
  }

  render() {
    const { title, progress = [], currentIndex } = this.state

    const { planId } = this.props

    return (
      <div className="section-progress-component"
           key={randomStr(12)}>
        <div className="progress-head">
          <div className="progress-title">{title}</div>
          <MarkBlock module={'打点'}
                     func={'首页'}
                     action={'返回学习首页'}
                     className={`goto-learn-page`}
                     onClick={() => this.context.router.push({
                       pathname: '/rise/static/plan/study', query: { planId },
                     })}>
            返回大纲
          </MarkBlock>
        </div>
        <div className="progress-text-container">
          {
            !_.isEmpty(progress) && progress.map((part, index) => {
              const { unlock, complete } = part
              return (
                <div className={`progress-text ${unlock ? 'unlock' : 'lock'} ${index == currentIndex ? 'current' : ''}`}
                     onClick={() => this.selfSeriesSwitch(index)} key={index}>
                  {part.name}
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }

}
