import * as React from 'react'
import { connect } from 'react-redux'
import './Result.less'
import { startLoad, endLoad, alertMsg } from '../../../redux/actions'
import AssetImg from '../../../components/AssetImg'
import RenderInBody from '../../../components/RenderInBody'
import { mark } from '../../../utils/request'
import { MarkBlock } from '../../../components/markblock/MarkBlock'

/**
 * 选择题答完之后的结果页
 */
@connect(state => state)
export class Result extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      data: {}
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    mark({
      module: '打点',
      function: '学习',
      action: '加载选择题结果页'
    })
  }

  onSubmit() {
    window.history.back()
  }

  nextTask() {
    const { dispatch } = this.props
    const { series, planId } = this.props.location.query
    window.history.go(-2)
  }

  render() {
    const { rightNumber, point, total } = this.props.location.query
    const { data } = this.state

    return (
      <div>
        <div className="container has-footer">
          <div className="warm-up-result">
            <div className="page-header">{'选择题'}</div>
            <div className="intro-container">
              <div className="section">
                <div className="section-title">答对题数</div>
                <div className="count-circle">
                  <div className="context-img">
                    <div className="answer-pic">
                      {rightNumber === total ? <AssetImg width="100%" style={{ margin: '0 auto' }}
                                                         url="https://static.iqycamp.com/images/answer_allright.png"/>
                        : <AssetImg style={{ margin: '0 auto' }} width="100%"
                                    url="https://static.iqycamp.com/images/answer_not_allright.png"/>}
                      <div className="answer-word"><span className="answer-right">{rightNumber}</span><span
                        className="answer-total">{'/ '}{total}</span></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section">
                <div className="section-title">任务得分</div>
                <div className="count">
                  <span className="count-main">{point}</span><span className="count-sub">分</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RenderInBody>
          <div className="button-footer">
            <MarkBlock module={'打点'} func={'选择题结果页'} action={'点击返回按钮'} className="left"
                       onClick={this.nextTask.bind(this)}>返回</MarkBlock>
            <MarkBlock module={'打点'} func={'选择题结果页'} action={'点击答案解析按钮'} className="right"
                       onClick={this.onSubmit.bind(this)}>答题解析</MarkBlock>
          </div>
        </RenderInBody>
      </div>
    )
  }
}
