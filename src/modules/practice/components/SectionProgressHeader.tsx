import * as React from 'react'
import './SectionProgressHeader.less'
import { loadPlanSeries, loadPracticePlan } from './async'
import _ from 'lodash'
import { randomStr } from '../../../utils/helpers'
import { MarkBlock } from '../../../components/markblock/MarkBlock'
import { alertMsg } from 'reduxutil/actions'

interface SectionProgressHeaderProps {
  practicePlanId: string,
  currentIndex: number
}

const SectionProgressStep = {
  PREVIEW: 0,
  KNOWLEDGE: 1,
  WARMUP: 2,
  BASE_APPLICATION: 3,
  UPGRADE_APPLICATION: 4,
}

class SectionProgressHeader extends React.Component<SectionProgressHeaderProps, any> {
  constructor () {
    super()
    this.state = {
      progress: [],
    }
    this.goSeriesPage = this.goSeriesPage.bind(this)
  }


  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.unlockSeries()
  }

  unlockSeries(){
    const { practicePlanId } = this.props

    if (practicePlanId) {
      loadPlanSeries(practicePlanId).then(res => {
        if (res.code === 200) {
          this.setState({
            title: res.msg.planSeriesTitle,
            progress: res.msg.planSeriesStatuses,
          })
        }
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.currentIndex !== this.props.currentIndex) {
      this.props.currentIndex = nextProps.currentIndex
      this.unlockSeries()
    }
  }

  goSeriesPage (index, dispatch) {
    const { progress } = this.state
    const { planId, practicePlanId, practiceId, complete, type } = progress[index]

    console.log("index:"+index)

    loadPracticePlan(practicePlanId).then(res => {
      const { code, msg } = res
      if (code === 200) {
        const { unlocked } = msg
        if (!unlocked) {
          dispatch(alertMsg('练习尚未解锁'))
          return
        }

        progress[index] = msg
        this.setState({ progress })

        let queryParam = {
          complete: complete,
          planId: planId,
          practicePlanId: practicePlanId,
        }
        switch (index) {
          case SectionProgressStep.PREVIEW:
            this.context.router.push({
              pathname: '/rise/static/practice/preview',
              query: queryParam,
            })
            break
          case SectionProgressStep.KNOWLEDGE:
            if (type === 31) {
              this.context.router.push({
                pathname: '/rise/static/practice/knowledge',
                query: queryParam,
              })
            } else if (type === 32) {
              this.context.router.push({
                pathname: '/rise/static/practice/knowledge/review',
                query: queryParam,
              })
            }
            break
          case SectionProgressStep.WARMUP:
            this.context.router.push({
              pathname: '/rise/static/practice/warmup',
              query: queryParam,
            })
            break
          case SectionProgressStep.BASE_APPLICATION:
            this.context.router.push({
              pathname: '/rise/static/practice/application',
              query: _.merge(queryParam, {
                id: practiceId,
              }),
            })
            break
          case SectionProgressStep.UPGRADE_APPLICATION:
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
      } else {
        dispatch(alertMsg(msg))
      }
    }).catch(er => alertMsg(er))
  }

  selfSeriesSwitch (index) {
    this.goSeriesPage(index)
  }

  render () {
    const { title, progress = [] } = this.state

    const { currentIndex, planId } = this.props

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

export { SectionProgressStep, SectionProgressHeader }
