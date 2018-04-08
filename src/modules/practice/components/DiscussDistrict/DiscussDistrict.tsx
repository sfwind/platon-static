import * as React from 'react'
import { loadPriorityWarmUpAnalysis } from '../../warmup/async'
import AssetImg from '../../../../components/AssetImg'

import './DiscussDistrict.less'
import { formatDate, getRealLength, splitContent } from '../../../../utils/helpers'

export default class DiscussDistrict extends React.Component {

  constructor () {
    super()
    this.state = {}
  }

  componentWillMount () {
    let {
      originDiscuss = {},
      priorityDiscuss = {},
    } = this.props
    if (!originDiscuss) {
      originDiscuss = JSON.parse(JSON.stringify(priorityDiscuss))
      priorityDiscuss = null
    }
    if (originDiscuss) {
      originDiscuss.showAll = false
    }
    if (priorityDiscuss) {
      priorityDiscuss.showAll = false
    }
    this.setState({
      originDiscuss: originDiscuss,
      priorityDiscuss: priorityDiscuss,
    })
  }

  handleClickToggleOriginDiscuss () {
    let targetOriginDiscuss = Object.assign({}, this.state.originDiscuss)
    targetOriginDiscuss.showAll = !this.state.originDiscuss.showAll
    this.setState({
      originDiscuss: targetOriginDiscuss,
    })
  }

  handleClickTogglePriorityDiscuss () {
    let targetPriorityDiscuss = Object.assign({}, this.state.priorityDiscuss)
    targetPriorityDiscuss.showAll = !this.state.priorityDiscuss.showAll
    this.setState({
      priorityDiscuss: targetPriorityDiscuss,
    })
  }

  render () {
    let {
      originDiscuss = {},
      priorityDiscuss = {},
    } = this.state

    return (
      <div className="discuss-district-component">
        <div className="origin-block">
          <AssetImg url={originDiscuss.avatar}
                    className="headimg"/>
          <div className="right-block">
            <div className="nickname">{originDiscuss.nickname}</div>
            <div className="comment">
              {originDiscuss.showAll ? originDiscuss.content : splitContent(originDiscuss.content, 90)}
            </div>
            {
              getRealLength(originDiscuss.content) > 90 &&
              <div className="show-tips"
                   onClick={() => this.handleClickToggleOriginDiscuss()}>
                {originDiscuss.showAll ? '收起' : '展开'}
              </div>
            }
            <div className="publish">{formatDate(new Date(originDiscuss.publishTime), 'yyyy-MM-dd hh:mm')}</div>
          </div>
        </div>
        {
          priorityDiscuss &&
          <div className="origin-block priority-block">
            <AssetImg url={priorityDiscuss.avatar}
                      className="headimg"/>
            <div className="right-block">
              <div className="nickname">{priorityDiscuss.nickname}</div>
              <div className="comment">
                {priorityDiscuss.showAll ? priorityDiscuss.content : splitContent(priorityDiscuss.content, 75)}
              </div>
              {
                getRealLength(priorityDiscuss.content) > 75 &&
                <div className="show-tips"
                     onClick={() => this.handleClickTogglePriorityDiscuss()}>
                  {priorityDiscuss.showAll ? '收起' : '展开'}
                </div>
              }
              <div className="publish">{formatDate(new Date(priorityDiscuss.publishTime), 'yyyy-MM-dd hh:mm')}</div>
            </div>
          </div>
        }
      </div>
    )
  }

}
