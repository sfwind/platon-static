import * as React from 'react'
import './SectionProgressHeader.less'
import { pget } from '../../../utils/request'
import _ from 'lodash'
import { randomStr } from '../../../utils/helpers'
import { MarkBlock } from '../../../components/markblock/MarkBlock'

interface SectionProgressHeaderProps {
  practicePlanId: string,
  currentIndex: number
}

const SectionProgressStep = {
  KNOWLEDGE: 0,
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
    '应用题1',
    '应用题2'
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

  componentWillReceiveProps(nextProps){
    if(nextProps.currentIndex !== this.props.currentIndex) {
      this.componentWillMount()
    }
  }

  goSeriesPage(index) {
    const { progress } = this.state
    const { planId, practicePlanId, practiceId, complete, unlock, type } = progress[index]

    if(!unlock) return

    let queryParam = {
      complete: complete,
      planId: planId,
      practicePlanId: practicePlanId
    }
    switch(index) {
      case 0:
        if(type === 31){
          this.context.router.push({
            pathname: '/rise/static/practice/knowledge',
            query: queryParam
          })
        }else if(type === 32){
          this.context.router.push({
            pathname: '/rise/static/practice/knowledge/review',
            query: queryParam
          })
        }
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

  selfSeriesSwitch(index) {
    this.goSeriesPage(index)
  }

  render() {
    const { title, progress } = this.state
    const { currentIndex, planId } = this.props

    return (
      <div className="section-progress-component" key={randomStr(12)}>
        <div>
          <div className="progress-title">{title}</div>
          <MarkBlock module={'打点'} func={'首页'} action={'返回学习首页'}
                     className={`goto-learn-page`}
                     onClick={() => this.context.router.push({pathname:'/rise/static/plan/study', query:{planId}})}>
            返回
          </MarkBlock>
        </div>
        {
          progress.map((part, index) => {
            const { unlock, complete } = part
            return (
              <div className={`${unlock ? 'unlock' : 'lock'} progress-text ${index == currentIndex ? 'current' : ''}`}
                   onClick={() => this.selfSeriesSwitch(index)} key={index}>
                {this.PROGRESS_TEXT[index]}
              </div>
            )
          })
        }
      </div>
    )
  }

}

export { SectionProgressStep, SectionProgressHeader }
